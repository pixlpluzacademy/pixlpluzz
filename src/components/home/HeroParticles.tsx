'use client'
import { useEffect, useRef } from 'react'

const SCALE = 0.55

/* Γ shape: wide top + right vertical bar (remove BOTTOM-LEFT notch) */
function insideGamma(x: number, y: number, z: number) {
  const inBounds = x >= -2.25 && x <= 1.75 && y >= -2.25 && y <= 1.75 && z >= -1 && z <= 1
  return inBounds && !(x <= -0.25 && y <= -0.25)
}

const lerp = (c: number, t: number, f: number) => c + (t - c) * f

/* ── GLSL ─────────────────────────────────────────────────── */
const VERT = `
uniform float uTime;
uniform vec2  uMouse;
uniform float uHover;
uniform float uNoiseAmt;
uniform float uDPR;
attribute vec3 base;
attribute vec3 seed;
varying  float vAlpha;
varying  float vDepth;

float hash(vec2 p) { return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p) {
  vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
}
float fbm(vec2 p){ return noise(p)*.5+noise(p*2.1)*.25+noise(p*4.3)*.125; }

void main() {
  vec3 pos = base;

  /* idle breathing */
  float idle = 1.0 - uHover * 0.85;
  float n = fbm(seed.xy*3.0+uTime*0.18)*2.0-1.0;
  pos.x += sin(uTime*0.40+seed.x*6.28+n*0.8)*0.022*idle;
  pos.y += cos(uTime*0.35+seed.y*6.28+n*0.6)*0.018*idle;
  pos.z += sin(uTime*0.28+seed.z*4.20)       *0.012*idle;

  /* fractal noise scatter on hover */
  float nx = fbm(seed.xy*5.5+uTime*0.45)*2.0-1.0;
  float ny = fbm(seed.yx*5.5+uTime*0.55)*2.0-1.0;
  pos.x += nx*uNoiseAmt*0.30;
  pos.y += ny*uNoiseAmt*0.30;

  /* square-zone repulsion (Chebyshev) */
  vec4 bClip = projectionMatrix*modelViewMatrix*vec4(base,1.0);
  vec2 bNDC  = bClip.xy/bClip.w;
  vec2 diff  = bNDC-uMouse;
  float dSq  = max(abs(diff.x),abs(diff.y));
  float force= smoothstep(1.8,0.0,dSq)*uHover*3.0;
  pos.xy += (diff/(dSq+0.0001))*force*1.4;
  pos.z  += force*0.35;

  /* vDepth: 0=back, 1=front (object-space Z) */
  vDepth = clamp((pos.z+0.55)/1.1, 0.0, 1.0);

  /* edge glow: boost particles near bounding faces & notch boundary */
  float dBox = min(min(1.1-abs(base.x), 1.1-abs(base.y)), 0.55-abs(base.z));
  float dNotchX = (base.x < 0.0) ? abs(base.y) : 9.9;
  float dNotchY = (base.y < 0.0) ? abs(base.x) : 9.9;
  float dEdge = min(dBox, min(dNotchX, dNotchY));
  float edgeGlow = smoothstep(0.15, 0.0, dEdge)*0.3;

  vAlpha = 0.45 + seed.z*0.55 + edgeGlow;

  /* size: 1.5–5.0, closer Z = bigger, scaled by DPR */
  float baseSize = 1.5 + seed.z*3.5;
  gl_PointSize = baseSize*(1.0+pos.z*0.4)*uDPR;
  gl_Position  = projectionMatrix*modelViewMatrix*vec4(pos,1.0);
}
`

const FRAG = `
varying float vAlpha;
varying float vDepth;
void main() {
  vec2  uv = gl_PointCoord - 0.5;
  float d  = length(uv);
  if (d > 0.5) discard;
  vec3  col  = vec3(0.329, 0.890, 0.275);
  float core = smoothstep(0.3, 0.0, d);
  col = mix(col, vec3(1.0,1.0,0.95), core*0.65);
  float alpha = smoothstep(0.5, 0.02, d)*vAlpha*0.38;
  gl_FragColor = vec4(col, alpha*(0.6+vDepth*0.4));
}
`

/* ── Canvas 2D fallback (fixed fullscreen) ────────────────── */
function runCanvas2D(canvas: HTMLCanvasElement, onDispose: (fn: () => void) => void) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const N = 18000
  const CX = -0.25, CY = -0.25
  type P = { bx: number; by: number; x: number; y: number; r: number; seed: number }
  const pts: P[] = []

  while (pts.length < N) {
    const rx = Math.random() * 4 - 2.25
    const ry = Math.random() * 4 - 2.25
    const rz = Math.random() * 2 - 1
    if (!insideGamma(rx, ry, rz)) continue
    pts.push({
      bx: (rx - CX) * SCALE, by: (ry - CY) * SCALE,
      x: (rx - CX) * SCALE,  y: (ry - CY) * SCALE,
      r: 0.5 + Math.random() * 1.0, seed: Math.random() * Math.PI * 2,
    })
  }

  let mxN = 0.5, myN = 0.5, hovering = false, animId = 0

  /* project world → screen; scale fills ~80% of the shorter viewport dimension */
  const toS = (wx: number, wy: number) => {
    const scale = Math.min(canvas.width / 2.8, canvas.height / 2.2)
    return { sx: wx * scale + canvas.width / 2, sy: canvas.height / 2 - wy * scale }
  }

  const onMove = (e: MouseEvent) => {
    mxN = e.clientX / window.innerWidth
    myN = e.clientY / window.innerHeight
    hovering = true
  }
  const onLeave = () => { hovering = false }
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseleave', onLeave)

  const onResize = () => {
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
  }
  window.addEventListener('resize', onResize)
  onResize()

  const t0 = performance.now()
  const tick = () => {
    animId = requestAnimationFrame(tick)
    const t = (performance.now() - t0) / 1000
    const W = canvas.width, H = canvas.height

    ctx.fillStyle = '#060b16'
    ctx.fillRect(0, 0, W, H)
    ctx.globalCompositeOperation = 'lighter'

    for (const p of pts) {
      const hf = hovering ? 1 : 0
      const tx = p.bx + Math.cos(t * 0.40 + p.seed) * 0.015 * (1 - hf * 0.85)
      const ty = p.by + Math.sin(t * 0.35 + p.seed * 1.3) * 0.012 * (1 - hf * 0.85)

      let fx = tx, fy = ty
      if (hovering) {
        const { sx: bsx, sy: bsy } = toS(tx, ty)
        const dx = bsx / W - mxN, dy = bsy / H - myN
        const dC = Math.max(Math.abs(dx), Math.abs(dy))
        const fall = Math.max(0, 1 - dC / 0.20)
        const fo = fall * fall * 0.20
        fx += (dx / (dC + 0.0001)) * fo
        fy -= (dy / (dC + 0.0001)) * fo * (H / W)
      }

      p.x = lerp(p.x, fx, 0.07)
      p.y = lerp(p.y, fy, 0.07)

      const { sx, sy } = toS(p.x, p.y)
      ctx.beginPath()
      ctx.arc(sx, sy, p.r, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(84,227,70,0.07)'
      ctx.fill()
    }
    ctx.globalCompositeOperation = 'source-over'
  }

  animId = requestAnimationFrame(tick)
  onDispose(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseleave', onLeave)
    window.removeEventListener('resize', onResize)
  })
}

/* ── WebGL path ───────────────────────────────────────────── */
async function runWebGL(
  canvas: HTMLCanvasElement,
  disposed: () => boolean,
  onDispose: (fn: () => void) => void
): Promise<boolean> {
  let THREE: typeof import('three')
  try { THREE = await import('three') } catch { return false }
  if (disposed()) return false

  const W = window.innerWidth, H = window.innerHeight
  const dpr = Math.min(window.devicePixelRatio, 2)

  const _ce = console.error; console.error = () => {}
  let rdr: InstanceType<typeof THREE.WebGLRenderer>
  try {
    rdr = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
  } catch { console.error = _ce; return false }
  console.error = _ce
  if (disposed()) { rdr.dispose(); return false }

  rdr.setPixelRatio(dpr)
  rdr.setSize(W, H, false)
  rdr.setClearColor(0x060b16, 1)

  const scene  = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.01, 100)
  camera.position.set(0, 1.5, 7)
  camera.lookAt(0, -0.5, 0)

  /* subtle glow plane behind shape */
  const glowMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0, 0.12, 0.02),
    transparent: true, opacity: 0.15,
    side: THREE.DoubleSide, depthWrite: false,
  })
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), glowMat)
  glow.position.z = -1.5
  scene.add(glow)

  /* Γ-shape particles */
  const N = 20000
  const pos   = new Float32Array(N * 3)
  const base  = new Float32Array(N * 3)
  const seeds = new Float32Array(N * 3)
  const CX = -0.25, CY = -0.25

  let filled = 0
  while (filled < N) {
    const rx = Math.random() * 4 - 2.25
    const ry = Math.random() * 4 - 2.25
    const rz = Math.random() * 2 - 1
    if (!insideGamma(rx, ry, rz)) continue
    const i = filled * 3
    pos[i]   = base[i]   = (rx - CX) * SCALE
    pos[i+1] = base[i+1] = (ry - CY) * SCALE
    pos[i+2] = base[i+2] = rz * SCALE
    seeds[i] = Math.random(); seeds[i+1] = Math.random(); seeds[i+2] = Math.random()
    filled++
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos,          3))
  geo.setAttribute('base',     new THREE.BufferAttribute(base.slice(), 3))
  geo.setAttribute('seed',     new THREE.BufferAttribute(seeds,        3))

  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTime:     { value: 0 },
      uMouse:    { value: new THREE.Vector2() },
      uHover:    { value: 0 },
      uNoiseAmt: { value: 0 },
      uDPR:      { value: dpr },
    },
    vertexShader: VERT, fragmentShader: FRAG,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  })

  const pts = new THREE.Points(geo, mat)
  scene.add(pts)

  const mouse = new THREE.Vector2(), target = new THREE.Vector2()
  let hC = 0, hT = 0, nC = 0, nT = 0, animId = 0

  /* window-level mouse (canvas is pointer-events:none) */
  const onMove = (e: MouseEvent) => {
    target.set((e.clientX / W - 0.5) * 2, -(e.clientY / H - 0.5) * 2)
    hT = 1; nT = 1
  }
  const onLeave = () => { hT = 0; nT = 0; target.set(0, 0) }
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseleave', onLeave)

  const onResize = () => {
    const w = window.innerWidth, h = window.innerHeight
    camera.aspect = w / h; camera.updateProjectionMatrix()
    rdr.setSize(w, h, false)
  }
  window.addEventListener('resize', onResize)

  const t0 = performance.now()
  const tick = () => {
    if (disposed()) return
    animId = requestAnimationFrame(tick)
    const t = (performance.now() - t0) / 1000

    mouse.x = lerp(mouse.x, target.x, 0.06)
    mouse.y = lerp(mouse.y, target.y, 0.06)
    hC = lerp(hC, hT, 0.04); nC = lerp(nC, nT, 0.035)

    const idleX = Math.sin(t * 0.30) * 0.08 * (1 - hC)
    const idleY = Math.cos(t * 0.22) * 0.05 * (1 - hC)

    mat.uniforms.uTime.value     = t
    mat.uniforms.uMouse.value.set(mouse.x + idleX, mouse.y + idleY)
    mat.uniforms.uHover.value    = hC
    mat.uniforms.uNoiseAmt.value = nC

    /* gentle oscillation — keeps shape face-on (XY) with subtle 3D tilt */
    pts.rotation.y = Math.sin(t * 0.12) * 0.12 + mouse.x * 0.08
    pts.rotation.x = Math.sin(t * 0.09) * 0.06 + mouse.y * (-0.05)

    rdr.render(scene, camera)
  }
  animId = requestAnimationFrame(tick)

  onDispose(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseleave', onLeave)
    window.removeEventListener('resize', onResize)
    geo.dispose(); mat.dispose(); glowMat.dispose(); rdr.dispose()
  })

  return true
}

/* ── Component ────────────────────────────────────────────── */
export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let dead = false
    let disposeFn: (() => void) | null = null
    const onDispose = (fn: () => void) => { disposeFn = fn }

    runWebGL(canvas, () => dead, onDispose).then(ok => {
      if (!ok && !dead) runCanvas2D(canvas, onDispose)
    })

    return () => { dead = true; disposeFn?.() }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position:      'fixed',
        inset:         0,
        width:         '100vw',
        height:        '100vh',
        zIndex:        0,
        display:       'block',
        pointerEvents: 'none',
      }}
    />
  )
}
