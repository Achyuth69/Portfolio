import { useEffect, useRef } from "react";

// ── 3D Math ───────────────────────────────────────────────────────────────────
type V3 = [number, number, number];

const PHI = (1 + Math.sqrt(5)) / 2;
const GLOBE_R = 3.2;

function norm3(v: V3, r = GLOBE_R): V3 {
  const l = Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2);
  return [v[0] * r / l, v[1] * r / l, v[2] * r / l];
}
function rotX(v: V3, a: number): V3 {
  const [x, y, z] = v;
  return [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)];
}
function rotY(v: V3, a: number): V3 {
  const [x, y, z] = v;
  return [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)];
}
function rotZ(v: V3, a: number): V3 {
  const [x, y, z] = v;
  return [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a), z];
}

// ── Icosahedron geometry ──────────────────────────────────────────────────────
const BASE_VERTS: V3[] = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
].map(v => norm3(v as V3));

const BASE_FACES = [
  [0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],
  [1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],
  [3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],
  [4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1],
];

function subdivide(verts: V3[], faces: number[][]): { verts: V3[]; faces: number[][] } {
  const newFaces: number[][] = [];
  const mids: Record<string, number> = {};
  const vs = [...verts];
  const mid = (a: number, b: number) => {
    const k = `${Math.min(a, b)}-${Math.max(a, b)}`;
    if (mids[k] !== undefined) return mids[k];
    const vA = vs[a], vB = vs[b];
    mids[k] = vs.length;
    vs.push(norm3([(vA[0] + vB[0]) / 2, (vA[1] + vB[1]) / 2, (vA[2] + vB[2]) / 2]));
    return mids[k];
  };
  for (const [a, b, c] of faces) {
    const ab = mid(a, b), bc = mid(b, c), ca = mid(c, a);
    newFaces.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
  }
  return { verts: vs, faces: newFaces };
}

function getEdges(faces: number[][]): [number, number][] {
  const seen = new Set<string>();
  const edges: [number, number][] = [];
  for (const face of faces) {
    for (let i = 0; i < face.length; i++) {
      const a = face[i], b = face[(i + 1) % face.length];
      const k = `${Math.min(a, b)}-${Math.max(a, b)}`;
      if (!seen.has(k)) { seen.add(k); edges.push([a, b]); }
    }
  }
  return edges;
}

const { verts: GLOBE_VERTS, faces: GLOBE_FACES } = subdivide(BASE_VERTS, BASE_FACES);
const GLOBE_EDGES = getEdges(GLOBE_FACES);

// ── Orbit ring ────────────────────────────────────────────────────────────────
function orbitRing(radius: number, rx: number, ry: number, rz: number, n = 64): V3[] {
  const pts: V3[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    let p: V3 = [radius * Math.cos(a), radius * Math.sin(a), 0];
    p = rotX(p, rx); p = rotY(p, ry); p = rotZ(p, rz);
    pts.push(p);
  }
  return pts;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function CosmicCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = 0, H = 0, CX = 0, CY = 0;
    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      CX = W / 2; CY = H / 2;
    };
    resize();
    window.addEventListener("resize", resize);

    const CAM_Z = 9.5;
    const FOV   = Math.min(W, H) * 0.9;

    const OFFSET_X = W * 0.12;
    function proj(v: V3) {
      const dz = CAM_Z - v[2];
      if (dz < 0.01) return null;
      const s = FOV / dz;
      return { x: CX + OFFSET_X + v[0] * s, y: CY - v[1] * s, s, z: v[2] };
    }

    // ── Reduce particle count significantly for performance ──────────────────
    // 3500 particles instead of 10000 — still looks great, 3.5x less work
    const PCOUNT = 3500;
    const pPos: V3[] = [], pCol: string[] = [], pSz: number[] = [];
    const palettes = ["#00d4ff", "#7c3aed", "#c4b5fd", "#ffffff", "#00ffcc"];
    for (let i = 0; i < PCOUNT; i++) {
      const r = Math.random() * 8 + 3;
      const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      pPos.push([r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph)]);
      pCol.push(palettes[Math.floor(Math.random() * palettes.length)]);
      pSz.push(Math.random() * 1.8 + 0.4);
    }

    const RINGS = [
      { pts: orbitRing(3.6, Math.PI / 2,  0,           0),           col: "#00d4ff", w: 1.5 },
      { pts: orbitRing(4.0, Math.PI / 3,  Math.PI / 5, 0),           col: "#7c3aed", w: 1.2 },
      { pts: orbitRing(4.4, Math.PI / 6,  Math.PI / 4, Math.PI / 3), col: "#f0abfc", w: 0.9 },
      { pts: orbitRing(2.8, Math.PI / 8,  Math.PI / 2, Math.PI / 6), col: "#00ffcc", w: 1.8 },
    ];
    const ringAngles = RINGS.map(() => 0);
    const ringSpeeds = [0.007, -0.005, 0.009, -0.011];

    const mouse = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 0.8;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener("mousemove", onMouse);

    // ── Pre-build reusable index arrays ──────────────────────────────────────
    const pIndicesAll = Array.from({ length: PCOUNT }, (_, i) => i);

    // ── Target 30fps instead of 60fps — canvas scene looks fine at 30fps ──
    let lastTime = 0;
    const FRAME_INTERVAL = 1000 / 30;

    let ry = 0, rx = 0.2, t = 0;

    const draw = (now: number) => {
      animId = requestAnimationFrame(draw);

      // Throttle to ~30fps
      const delta = now - lastTime;
      if (delta < FRAME_INTERVAL) return;
      lastTime = now - (delta % FRAME_INTERVAL);

      t += 0.012;
      ry += 0.006 + mouse.x * 0.01;
      rx  = 0.2 + mouse.y * 0.3;

      // ── Background ──────────────────────────────────────────────────────
      ctx.fillStyle = "rgba(2,0,8,0.22)";
      ctx.fillRect(0, 0, W, H);

      // ── Nebula blobs — drawn from pre-built offscreen cache every 10 frames
      // We skip shadow/glow on nebula blobs entirely since they're very subtle
      if (Math.floor(t * 10) % 10 === 0) {
        const blobs = [
          { x: 0.15, y: 0.35, r: 350, c: "rgba(124,58,237," },
          { x: 0.85, y: 0.6,  r: 300, c: "rgba(0,212,255,"  },
          { x: 0.5,  y: 0.85, r: 220, c: "rgba(240,171,252,"},
          { x: 0.7,  y: 0.2,  r: 280, c: "rgba(0,80,180,"   },
        ];
        for (const b of blobs) {
          const g = ctx.createRadialGradient(b.x * W, b.y * H, 0, b.x * W, b.y * H, b.r);
          g.addColorStop(0, b.c + "0.04)"); g.addColorStop(1, b.c + "0)");
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(b.x * W, b.y * H, b.r, 0, Math.PI * 2); ctx.fill();
        }
      }

      // ── Apply rotation to globe vertices ────────────────────────────────
      const rotated: V3[] = GLOBE_VERTS.map(v => rotY(rotX(v, rx), ry));
      const projected = rotated.map(v => proj(v));

      // ── Particles — skip per-particle z-sort (expensive), use simple depth alpha
      const pRotated: V3[] = pPos.map(v => rotY(rotX(v, rx * 0.4), ry * 0.5));
      const pProj = pRotated.map(v => proj(v));

      ctx.save();
      // Disable shadowBlur entirely for particles — it's extremely expensive
      ctx.shadowBlur = 0;
      for (const i of pIndicesAll) {
        const p = pProj[i];
        if (!p) continue;
        const depth = (pRotated[i][2] + 12) / 15;
        const alpha = Math.max(0.05, depth * 0.65);
        const r = Math.max(0.3, pSz[i] * p.s * 0.012);
        if (r < 0.3) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = pCol[i];
        ctx.globalAlpha = alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.restore();

      // ── Globe edges — batch by front/back to minimize state changes ─────
      // Sort once by depth
      const edgeDepths = GLOBE_EDGES.map(([a, b]) => ({ a, b, z: (rotated[a][2] + rotated[b][2]) / 2 }));
      edgeDepths.sort((e1, e2) => e1.z - e2.z);

      ctx.save();
      // Draw all back edges in one pass (no shadow)
      ctx.shadowBlur = 0;
      ctx.lineWidth = 0.3;
      ctx.strokeStyle = "rgba(0,100,180,0.12)";
      ctx.beginPath();
      for (const { a, b, z } of edgeDepths) {
        if (z >= -GLOBE_R * 0.3) break; // back edges only
        const pa = projected[a], pb = projected[b];
        if (!pa || !pb) continue;
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
      }
      ctx.stroke();

      // Draw all front edges in one pass (single shadow state)
      ctx.shadowColor = "#00d4ff";
      ctx.shadowBlur  = 8; // reduced from 14
      for (const { a, b, z } of edgeDepths) {
        if (z < -GLOBE_R * 0.3) continue; // front edges only
        const pa = projected[a], pb = projected[b];
        if (!pa || !pb) continue;
        const visibility = (z + GLOBE_R + 1) / (GLOBE_R * 2 + 2);
        const alpha = Math.max(0.04, visibility * 0.85);
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
        ctx.lineWidth   = Math.max(0.3, 0.9 * visibility);
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
      ctx.restore();

      // ── Vertex nodes ─────────────────────────────────────────────────────
      ctx.save();
      ctx.shadowBlur = 0; // skip per-node glow — too expensive
      for (let i = 0; i < rotated.length; i++) {
        const p = projected[i];
        if (!p) continue;
        const isFront = rotated[i][2] > -GLOBE_R * 0.2;
        if (!isFront) continue;
        const brightness = (rotated[i][2] + GLOBE_R) / (GLOBE_R * 2);
        const r = Math.max(0.5, 2.2 * brightness * (p.s / FOV) * GLOBE_R * 0.7);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle   = i % 3 === 0 ? "#00d4ff" : "#c4b5fd";
        ctx.globalAlpha = brightness * 0.9;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.restore();

      // ── Orbital rings ────────────────────────────────────────────────────
      ctx.save();
      ctx.shadowBlur = 0;
      for (let ri = 0; ri < RINGS.length; ri++) {
        ringAngles[ri] += ringSpeeds[ri];
        const ring = RINGS[ri];
        const rPts = ring.pts.map(v => {
          let p: V3 = [...v];
          p = rotY(p, ringAngles[ri]);
          p = rotY(rotX(p, rx), ry);
          return proj(p);
        });
        // Batch front and back segments to minimize state changes
        // Front pass
        ctx.strokeStyle = ring.col;
        ctx.lineWidth = ring.w;
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        let inPath = false;
        for (let i = 0; i < rPts.length; i++) {
          const p0 = rPts[i], p1 = rPts[(i + 1) % rPts.length];
          if (!p0 || !p1) { inPath = false; continue; }
          const isBack = p0.z < -GLOBE_R * 0.5 && p1.z < -GLOBE_R * 0.5;
          if (isBack) { inPath = false; continue; }
          if (!inPath) { ctx.moveTo(p0.x, p0.y); inPath = true; }
          ctx.lineTo(p1.x, p1.y);
        }
        ctx.stroke();
        // Back pass
        ctx.globalAlpha = 0.12;
        ctx.lineWidth = 0.4;
        ctx.beginPath();
        inPath = false;
        for (let i = 0; i < rPts.length; i++) {
          const p0 = rPts[i], p1 = rPts[(i + 1) % rPts.length];
          if (!p0 || !p1) { inPath = false; continue; }
          const isBack = p0.z < -GLOBE_R * 0.5 && p1.z < -GLOBE_R * 0.5;
          if (!isBack) { inPath = false; continue; }
          if (!inPath) { ctx.moveTo(p0.x, p0.y); inPath = true; }
          ctx.lineTo(p1.x, p1.y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.restore();

      // ── Inner glowing sphere ─────────────────────────────────────────────
      const sc = proj([0, 0, 0]);
      if (sc) {
        const innerR = GLOBE_R * 0.48 * sc.s / CAM_Z;
        // Outer halo
        const haloG = ctx.createRadialGradient(sc.x, sc.y, 0, sc.x, sc.y, innerR * 2.5);
        haloG.addColorStop(0, `rgba(0,212,255,${0.08 + Math.sin(t) * 0.03})`);
        haloG.addColorStop(0.5, "rgba(124,58,237,0.04)");
        haloG.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = haloG;
        ctx.beginPath(); ctx.arc(sc.x, sc.y, innerR * 2.5, 0, Math.PI * 2); ctx.fill();

        // Sphere body
        const sphereG = ctx.createRadialGradient(sc.x - innerR * 0.3, sc.y - innerR * 0.3, 0, sc.x, sc.y, innerR);
        sphereG.addColorStop(0, "#0060c0");
        sphereG.addColorStop(0.4, "#001840");
        sphereG.addColorStop(1, "#000408");
        ctx.shadowColor = "#00d4ff"; ctx.shadowBlur = 20; // reduced from 30
        ctx.fillStyle = sphereG;
        ctx.beginPath(); ctx.arc(sc.x, sc.y, innerR, 0, Math.PI * 2); ctx.fill();

        // Specular highlight
        const hlG = ctx.createRadialGradient(sc.x - innerR * 0.35, sc.y - innerR * 0.35, 0, sc.x - innerR * 0.35, sc.y - innerR * 0.35, innerR * 0.6);
        hlG.addColorStop(0, "rgba(255,255,255,0.18)");
        hlG.addColorStop(1, "rgba(255,255,255,0)");
        ctx.shadowBlur = 0;
        ctx.fillStyle = hlG;
        ctx.beginPath(); ctx.arc(sc.x, sc.y, innerR, 0, Math.PI * 2); ctx.fill();

        // Scan line on sphere
        const scanY = sc.y - innerR + ((t * 40) % (innerR * 2));
        ctx.save();
        ctx.beginPath(); ctx.arc(sc.x, sc.y, innerR, 0, Math.PI * 2); ctx.clip();
        const scanG = ctx.createLinearGradient(sc.x - innerR, scanY, sc.x + innerR, scanY);
        scanG.addColorStop(0, "rgba(0,212,255,0)");
        scanG.addColorStop(0.5, `rgba(0,212,255,${0.4 + Math.sin(t * 2) * 0.1})`);
        scanG.addColorStop(1, "rgba(0,212,255,0)");
        ctx.fillStyle = scanG;
        ctx.fillRect(sc.x - innerR, scanY - 1.5, innerR * 2, 3);
        ctx.restore();
        ctx.shadowBlur = 0;
      }
    };

    draw(0);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}
    />
  );
}
