'use client'
import { useEffect, useRef } from 'react'

/* ─── shape sampler ──────────────────────────────────────────
   Γ-shape: full box x[-2.25,1.75] y[-2.25,1.75] z[-1,1]
   minus the BOTTOM-LEFT notch (x ≤ -0.25 AND y ≤ -0.25)
───────────────────────────────────────────────────────────── */
const SCALE = 1.0
const CX = -0.25, CY = -0.25

function inGamma(x, y, z) {
  return (
    x >= -2.25 && x <= 1.75 &&
    y >= -2.25 && y <= 1.75 &&
    z >= -1    && z <= 1    &&
    !(x <= -0.25 && y <= -0.25)
  )
}

const lerp = (a, b, t) => a + (b - a) * t

/* ─── GLSL shaders ───────────────────────────────────────── */
const VERT = /* glsl */`
uniform float uTime;
uniform vec2  uMouse;
uniform float uHover;
uniform float uDPR;
attribute vec3 base;
attribute vec3 seed;
varying  float vAlpha;
varying  float vDepth;

float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5); }
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
}
float fbm(vec2 p){ return noise(p)*.5+noise(p*2.1)*.25+noise(p*4.2)*.125; }

void main(){
  vec3 pos = base;

  // idle breathing
  float idle = 1.0 - uHover*0.85;
  float n = fbm(seed.xy*3.+uTime*.18)*2.-1.;
  pos.x += sin(uTime*.40+seed.x*6.28+n*.8)*.04*idle;
  pos.y += cos(uTime*.35+seed.y*6.28+n*.6)*.03*idle;
  pos.z += sin(uTime*.28+seed.z*4.20)      *.02*idle;

  // hover scatter
  float nx = fbm(seed.xy*5.5+uTime*.45)*2.-1.;
  float ny = fbm(seed.yx*5.5+uTime*.55)*2.-1.;
  pos.x += nx*uHover*.35;
  pos.y += ny*uHover*.35;

  // Chebyshev mouse repulsion
  vec4 bc  = projectionMatrix*modelViewMatrix*vec4(base,1.);
  vec2 bNDC= bc.xy/bc.w;
  vec2 d   = bNDC-uMouse;
  float ds = max(abs(d.x),abs(d.y));
  float f  = smoothstep(1.8,0.,ds)*uHover*3.;
  pos.xy  += (d/(ds+.0001))*f*1.5;
  pos.z   += f*.4;

  // edge glow
  float dBox  = min(min(2.-abs(base.x),2.-abs(base.y)),1.-abs(base.z));
  float dNX   = base.x<0.? abs(base.y):99.;
  float dNY   = base.y<0.? abs(base.x):99.;
  float dEdge = min(dBox,min(dNX,dNY));
  float eGlow = smoothstep(.2,0.,dEdge)*.35;

  vDepth = clamp((pos.z+1.)/2.,0.,1.);
  vAlpha = .4+seed.z*.6+eGlow;

  float sz = (1.5+seed.z*4.)*( 1.+pos.z*.35)*uDPR;
  gl_PointSize = sz;
  gl_Position  = projectionMatrix*modelViewMatrix*vec4(pos,1.);
}
`

const FRAG = /* glsl */`
varying float vAlpha;
varying float vDepth;
void main(){
  vec2  uv=gl_PointCoord-.5;
  float d=length(uv);
  if(d>.5) discard;
  vec3 col=vec3(.329,.890,.275);
  col=mix(col,vec3(1.,1.,.95),smoothstep(.3,0.,d)*.6);
  float a=smoothstep(.5,.02,d)*vAlpha*.30*(0.6+vDepth*.4);
  gl_FragColor=vec4(col,a);
}
`

/* ─── WebGL runner ───────────────────────────────────────── */
async function startWebGL(canvas, disposed, onCleanup) {
  let THREE
  try { THREE = await import('three') } catch { return false }
  if (disposed()) return false

  const W = window.innerWidth, H = window.innerHeight
  const dpr = Math.min(devicePixelRatio, 2)

  const _ce = console.error; console.error = () => {}
  let rdr
  try { rdr = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false }) }
  catch { console.error = _ce; return false }
  console.error = _ce

  if (disposed()) { rdr.dispose(); return false }

  rdr.setPixelRatio(dpr)
  rdr.setSize(W, H, false)
  rdr.setClearColor(0x060b16, 1)

  const scene  = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.01, 100)
  camera.position.set(0, 1.5, 6)
  camera.lookAt(0, -0.5, 0)

  // particles
  const N = 20000
  const pos   = new Float32Array(N * 3)
  const base  = new Float32Array(N * 3)
  const seeds = new Float32Array(N * 3)
  let filled = 0
  while (filled < N) {
    const rx = Math.random() * 4 - 2.25
    const ry = Math.random() * 4 - 2.25
    const rz = Math.random() * 2 - 1
    if (!inGamma(rx, ry, rz)) continue
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
      uTime:  { value: 0 },
      uMouse: { value: new THREE.Vector2() },
      uHover: { value: 0 },
      uDPR:   { value: dpr },
    },
    vertexShader: VERT, fragmentShader: FRAG,
    transparent: true, depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  const pts = new THREE.Points(geo, mat)
  scene.add(pts)

  const mouse = new THREE.Vector2(), target = new THREE.Vector2()
  let hC = 0, hT = 0, raf = 0

  const onMove = e => {
    target.set((e.clientX / innerWidth - .5) * 2, -(e.clientY / innerHeight - .5) * 2)
    hT = 1
  }
  const onLeave = () => { hT = 0; target.set(0, 0) }
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseleave', onLeave)

  const onResize = () => {
    camera.aspect = innerWidth / innerHeight
    camera.updateProjectionMatrix()
    rdr.setSize(innerWidth, innerHeight, false)
  }
  window.addEventListener('resize', onResize)

  const t0 = performance.now()
  const tick = () => {
    if (disposed()) return
    raf = requestAnimationFrame(tick)
    const t = (performance.now() - t0) / 1000

    mouse.x = lerp(mouse.x, target.x, .06)
    mouse.y = lerp(mouse.y, target.y, .06)
    hC = lerp(hC, hT, .04)

    const idleX = Math.sin(t * .30) * .08 * (1 - hC)
    const idleY = Math.cos(t * .22) * .05 * (1 - hC)

    mat.uniforms.uTime.value  = t
    mat.uniforms.uMouse.value.set(mouse.x + idleX, mouse.y + idleY)
    mat.uniforms.uHover.value = hC

    pts.rotation.y = Math.sin(t * .12) * .12 + mouse.x * .08
    pts.rotation.x = Math.sin(t * .09) * .06 + mouse.y * (-.05)

    rdr.render(scene, camera)
  }
  raf = requestAnimationFrame(tick)

  onCleanup(() => {
    cancelAnimationFrame(raf)
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseleave', onLeave)
    window.removeEventListener('resize', onResize)
    geo.dispose(); mat.dispose(); rdr.dispose()
  })
  return true
}

/* ─── Canvas 2D fallback ─────────────────────────────────── */
function startCanvas2D(canvas, onCleanup) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // build particle list
  const N = 18000
  const pts = []
  while (pts.length < N) {
    const rx = Math.random() * 4 - 2.25
    const ry = Math.random() * 4 - 2.25
    const rz = Math.random() * 2 - 1
    if (!inGamma(rx, ry, rz)) continue
    pts.push({
      bx: (rx - CX) * SCALE, by: (ry - CY) * SCALE,
      x:  (rx - CX) * SCALE, y:  (ry - CY) * SCALE,
      r: 0.5 + Math.random() * 1.0,
      seed: Math.random() * Math.PI * 2,
    })
  }

  let mxN = .5, myN = .5, hovering = false, raf = 0

  /* world → screen projection that fills most of the viewport */
  const toS = (wx, wy) => {
    const s = Math.min(canvas.width / 2.8, canvas.height / 2.2)
    return { sx: wx * s + canvas.width / 2, sy: canvas.height / 2 - wy * s }
  }

  const onMove = e => { mxN = e.clientX / innerWidth; myN = e.clientY / innerHeight; hovering = true }
  const onLeave = () => { hovering = false }
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseleave', onLeave)

  const onResize = () => { canvas.width = innerWidth; canvas.height = innerHeight }
  window.addEventListener('resize', onResize)
  onResize()

  const t0 = performance.now()
  const tick = () => {
    raf = requestAnimationFrame(tick)
    const t = (performance.now() - t0) / 1000
    const W = canvas.width, H = canvas.height

    ctx.fillStyle = '#060b16'
    ctx.fillRect(0, 0, W, H)
    ctx.globalCompositeOperation = 'lighter'

    for (const p of pts) {
      const hf = hovering ? 1 : 0
      const tx = p.bx + Math.cos(t * .40 + p.seed) * .04 * (1 - hf * .85)
      const ty = p.by + Math.sin(t * .35 + p.seed * 1.3) * .03 * (1 - hf * .85)

      let fx = tx, fy = ty
      if (hovering) {
        const { sx: bsx, sy: bsy } = toS(tx, ty)
        const dx = bsx / W - mxN, dy = bsy / H - myN
        const dC = Math.max(Math.abs(dx), Math.abs(dy))
        const fo = Math.max(0, 1 - dC / .20) ** 2 * .22
        fx += (dx / (dC + .0001)) * fo
        fy -= (dy / (dC + .0001)) * fo * (H / W)
      }

      p.x = lerp(p.x, fx, .07)
      p.y = lerp(p.y, fy, .07)

      const { sx, sy } = toS(p.x, p.y)
      ctx.beginPath()
      ctx.arc(sx, sy, p.r, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(84,227,70,0.07)'
      ctx.fill()
    }
    ctx.globalCompositeOperation = 'source-over'
  }
  raf = requestAnimationFrame(tick)

  onCleanup(() => {
    cancelAnimationFrame(raf)
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseleave', onLeave)
    window.removeEventListener('resize', onResize)
  })
}

/* ─── React component ────────────────────────────────────── */
export default function ParticleHero() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    let dead = false
    let cleanup = null
    const onCleanup = fn => { cleanup = fn }

    startWebGL(canvas, () => dead, onCleanup).then(ok => {
      if (!ok && !dead) startCanvas2D(canvas, onCleanup)
    })

    return () => { dead = true; cleanup?.() }
  }, [])

  return (
    <canvas
      ref={ref}
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
