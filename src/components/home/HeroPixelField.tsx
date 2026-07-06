'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Sparkk-style 3D cube cluster — a dense swarm of large lit cubes
 * anchored to one side of the hero. Big cubes at the core, smaller
 * ones scattering outward, all slowly tumbling and breathing.
 */

// Deterministic PRNG so the cluster looks identical on every load
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Strict brand palette only
const CORE_COLORS = [0x54e346, 0x54e346, 0x54e346]
const EDGE_COLORS = [0x153e90, 0x153e90, 0x54e346, 0x153e90]

export function HeroPixelField({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768
    const COUNT = isMobile ? 110 : 230

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x060b16, 16, 34)

    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    )
    camera.position.set(0, 0, 16)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Strong key light so cube faces get distinct bright/dark shading
    scene.add(new THREE.AmbientLight(0x153e90, 0.45))
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4)
    keyLight.position.set(4, 8, 10)
    scene.add(keyLight)
    const rimLight = new THREE.DirectionalLight(0x54e346, 1.1)
    rimLight.position.set(-6, -3, -4)
    scene.add(rimLight)

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.42,
      metalness: 0.1,
    })
    const mesh = new THREE.InstancedMesh(geometry, material, COUNT)
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

    // Whole cluster lives in a group anchored to the right of the headline
    const cluster = new THREE.Group()
    cluster.add(mesh)
    scene.add(cluster)

    // Cluster starts centre-stage, then glides aside as the text reveals
    const clusterStart = new THREE.Vector3()
    const clusterEnd = new THREE.Vector3()
    const positionCluster = () => {
      const aspect = mount.clientWidth / Math.max(mount.clientHeight, 1)
      if (aspect < 1) {
        // Portrait — centre → top
        clusterStart.set(0.4, 0.2, -3)
        clusterEnd.set(1.2, 4.4, -3)
        cluster.scale.setScalar(0.62)
      } else {
        clusterStart.set(0, 0.2, -1)
        clusterEnd.set(Math.min(7.2, aspect * 4.4), 0.6, -1)
        cluster.scale.setScalar(1)
      }
      cluster.position.copy(clusterStart)
    }
    positionCluster()

    const rng = mulberry32(20260703)
    const dummy = new THREE.Object3D()
    const color = new THREE.Color()

    const MAX_R = 7.5

    interface Cube {
      x: number
      y: number
      z: number
      size: number
      swayAmp: number
      swayFreq: number
      phase: number
      rotX: number
      rotY: number
      rotZ: number
      rotSpeedX: number
      rotSpeedY: number
    }

    // Placed cubes with their collision radius, so no cube spawns inside another
    const cubes: Cube[] = []
    const placed: { x: number; y: number; z: number; radius: number }[] = []

    // Tight packing: slightly under the cube's mean rotated extent, so
    // neighbours sit almost touching without visibly merging
    const collisionRadius = (size: number, swayAmp: number) =>
      size * 0.58 + swayAmp * 0.5

    for (let i = 0; i < COUNT; i++) {
      let x = 0
      let y = 0
      let z = 0
      let t = 0
      let size = 0
      const swayAmp = 0.06 + rng() * 0.12

      let ok = false
      for (let attempt = 0; attempt < 60 && !ok; attempt++) {
        // Random direction on a sphere, radius biased toward the core
        const theta = rng() * Math.PI * 2
        const cosPhi = rng() * 2 - 1
        const sinPhi = Math.sqrt(1 - cosPhi * cosPhi)
        const r = MAX_R * Math.pow(rng(), 0.55)

        x = Math.cos(theta) * sinPhi * r * 1.25
        y = cosPhi * r * 0.95
        z = Math.sin(theta) * sinPhi * r * 0.8

        // Big cubes in the core, small debris at the edges —
        // shrink slightly on retries so crowded spots still find room
        t = r / MAX_R
        const shrink = 1 - Math.min(attempt, 30) * 0.015
        size = (1.75 - t * 1.45) * (0.75 + rng() * 0.5) * shrink

        const radius = collisionRadius(size, swayAmp)
        ok = true
        for (const p of placed) {
          const dx = x - p.x
          const dy = y - p.y
          const dz = z - p.z
          const minDist = radius + p.radius
          if (dx * dx + dy * dy + dz * dz < minDist * minDist) {
            ok = false
            break
          }
        }
      }
      // If no free spot was found the cube is left tiny at the rim
      if (!ok) size *= 0.4

      placed.push({ x, y, z, radius: collisionRadius(size, swayAmp) })

      cubes.push({
        x,
        y,
        z,
        size,
        swayAmp,
        swayFreq: 0.2 + rng() * 0.3,
        phase: rng() * Math.PI * 2,
        rotX: rng() * Math.PI,
        rotY: rng() * Math.PI,
        rotZ: rng() * Math.PI,
        rotSpeedX: (rng() - 0.5) * 0.5,
        rotSpeedY: (rng() - 0.5) * 0.5,
      })

      // Core → brand green, edges → brand blue, with lightness variation
      const palette = t < 0.45 ? CORE_COLORS : EDGE_COLORS
      color.setHex(palette[Math.floor(rng() * palette.length)])
      color.multiplyScalar(0.75 + rng() * 0.45)
      mesh.setColorAt(i, color)
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true

    // 0 at top of page → 1 after ~1.5 viewport heights (matches the pinned hero)
    let scrollProgress = 0
    const readScroll = () => {
      scrollProgress = Math.min(
        Math.max(window.scrollY / window.innerHeight, 0),
        1,
      )
    }
    readScroll()

    const writeInstances = (time: number, scatter: number) => {
      // Cubes fly apart as you scroll — edge cubes travel further than core ones
      const spread = 1 + scatter * 2.6

      for (let i = 0; i < COUNT; i++) {
        const c = cubes[i]
        const sway = Math.sin(time * c.swayFreq + c.phase)
        dummy.position.set(
          c.x * spread + sway * c.swayAmp,
          c.y * spread + Math.cos(time * c.swayFreq * 0.8 + c.phase) * c.swayAmp,
          c.z * spread,
        )
        dummy.rotation.set(
          c.rotX + scatter * c.rotSpeedX * 6,
          c.rotY + scatter * c.rotSpeedY * 6,
          c.rotZ,
        )
        dummy.scale.setScalar(c.size * (1 - scatter * 0.35))
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
      }
      mesh.instanceMatrix.needsUpdate = true
    }

    // Mouse parallax
    const pointer = { x: 0, y: 0 }
    const camTarget = { x: 0, y: 0 }
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      positionCluster()
    }
    window.addEventListener('resize', onResize)

    const clock = new THREE.Clock()
    let raf = 0
    let smoothScatter = 0

    if (reduceMotion) {
      // Static frame with content visible — park the cluster at its side anchor
      cluster.position.copy(clusterEnd)
      writeInstances(0, 0)
      renderer.render(scene, camera)
    } else {
      const animate = () => {
        raf = requestAnimationFrame(animate)
        if (document.hidden) return

        const delta = Math.min(clock.getDelta(), 0.05)
        const time = clock.getElapsedTime()

        readScroll()
        // Smooth the scroll value so the scatter feels weighty, not jittery
        smoothScatter += (scrollProgress - smoothScatter) * 0.08

        for (const c of cubes) {
          c.rotX += c.rotSpeedX * delta
          c.rotY += c.rotSpeedY * delta
        }
        writeInstances(time, smoothScatter)

        // Idle tumble + scroll-driven swing and drift
        cluster.rotation.y = Math.sin(time * 0.08) * 0.35 + smoothScatter * 1.1
        cluster.rotation.x = Math.cos(time * 0.06) * 0.12 - smoothScatter * 0.3

        // Glide from centre to the side anchor during the first 55% of scroll,
        // then keep drifting upward as the cubes scatter away
        const glide = Math.min(smoothScatter / 0.55, 1)
        const eased = glide * glide * (3 - 2 * glide)
        cluster.position.lerpVectors(clusterStart, clusterEnd, eased)
        cluster.position.y += smoothScatter * 3.5

        camTarget.x += (pointer.x * 1.0 - camTarget.x) * 0.04
        camTarget.y += (-pointer.y * 0.6 - camTarget.y) * 0.04
        camera.position.x = camTarget.x
        camera.position.y = camTarget.y
        camera.lookAt(0, 0, 0)

        renderer.render(scene, camera)
      }
      animate()
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className={className} aria-hidden />
}
