import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import useStore from '../store/useStore'

const COUNT = 3000
const DUST_COUNT = 700

/* ── Shape targets — one recognizable glyph per platform ─────────────
   0 intro    : spiral galaxy
   1 github   : contribution cube lattice
   2 leetcode : torus knot
   3 linkedin : network sphere
   4 youtube  : play triangle
   5 instagram: squircle + lens + dot
   6 x        : the ✕ glyph
─────────────────────────────────────────────────────────────────── */
const SHAPES = (() => {
    const shapes = []
    const make = (fn) => {
        const arr = new Float32Array(COUNT * 3)
        for (let i = 0; i < COUNT; i++) {
            const [x, y, z] = fn(i)
            arr[i * 3] = x
            arr[i * 3 + 1] = y
            arr[i * 3 + 2] = z
        }
        shapes.push(arr)
    }

    // 0. Spiral galaxy with dense core & double spiral arms
    make(() => {
        const arm = Math.floor(Math.random() * 3)
        const t = Math.pow(Math.random(), 0.6)
        const angle = arm * ((Math.PI * 2) / 3) + t * 4.6 + (Math.random() - 0.5) * 0.4
        const r = 0.15 + t * 2.5
        return [
            Math.cos(angle) * r,
            Math.sin(angle) * r * 0.85,
            (Math.random() - 0.5) * 0.45 * (1 - t),
        ]
    })

    // 1. Cube lattice — a 3D contribution graph
    const side = Math.ceil(Math.cbrt(COUNT))
    make((i) => {
        const x = (i % side) - side / 2
        const y = (Math.floor(i / side) % side) - side / 2
        const z = (Math.floor(i / (side * side)) % side) - side / 2
        return [x * 0.26, y * 0.26, z * 0.26]
    })

    // 2. Torus knot
    make((i) => {
        const t = (i / COUNT) * Math.PI * 2 * 3
        const q = 3
        const r = 0.65 * (2 + Math.sin(q * t))
        return [
            r * Math.cos(2 * t) * 1.15 + (Math.random() - 0.5) * 0.1,
            r * Math.sin(2 * t) * 1.15 + (Math.random() - 0.5) * 0.1,
            r * Math.cos(q * t) * 0.75 + (Math.random() - 0.5) * 0.1,
        ]
    })

    // 3. Network sphere — fibonacci-distributed nodes
    make((i) => {
        const phi = Math.acos(1 - (2 * (i + 0.5)) / COUNT)
        const theta = Math.PI * (1 + Math.sqrt(5)) * i
        const r = 1.85 + (Math.random() - 0.5) * 0.1
        return [
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta),
            r * Math.cos(phi),
        ]
    })

    // 4. Play triangle (barycentric fill of a prism)
    make(() => {
        const r1 = Math.sqrt(Math.random())
        const r2 = Math.random()
        const x = (1 - r1) * -1 + r1 * (1 - r2) * -1 + r1 * r2 * 1.95
        const y = (1 - r1) * 1.45 + r1 * (1 - r2) * -1.45
        return [x, y, (Math.random() - 0.5) * 0.35]
    })

    // 5. Squircle ring + lens + corner dot (the Instagram glyph)
    make(() => {
        const pick = Math.random()
        if (pick < 0.7) {
            const t = Math.random() * Math.PI * 2
            const c = Math.cos(t)
            const s = Math.sin(t)
            const a = 1.75 + (Math.random() - 0.5) * 0.12
            return [
                Math.sign(c) * Math.pow(Math.abs(c), 0.5) * a,
                Math.sign(s) * Math.pow(Math.abs(s), 0.5) * a,
                (Math.random() - 0.5) * 0.25,
            ]
        }
        if (pick < 0.92) {
            const t = Math.random() * Math.PI * 2
            const r = 0.68 + (Math.random() - 0.5) * 0.1
            return [Math.cos(t) * r, Math.sin(t) * r, (Math.random() - 0.5) * 0.25]
        }
        const t = Math.random() * Math.PI * 2
        const r = Math.sqrt(Math.random()) * 0.16
        return [1.05 + Math.cos(t) * r, 1.05 + Math.sin(t) * r, (Math.random() - 0.5) * 0.2]
    })

    // 6. The ✕ — two crossing bars
    make(() => {
        const dir = Math.random() > 0.5 ? 1 : -1
        const t = (Math.random() - 0.5) * 2
        const along = t * 1.9
        const thick = (Math.random() - 0.5) * 0.32
        const inv = 1 / Math.SQRT2
        return [
            along * inv - dir * thick * inv,
            along * inv * dir + thick * inv,
            (Math.random() - 0.5) * 0.3,
        ]
    })

    return shapes
})()

const SHAPE_COLORS = {
    dark: ['#a78bfa', '#60a5fa', '#f59e0b', '#38bdf8', '#ef4444', '#ec4899', '#cbd5e1'],
    light: ['#7c3aed', '#2563eb', '#d97706', '#0284c7', '#dc2626', '#db2777', '#475569'],
}

const BG = { dark: '#080c14', light: '#f8fafc' }

/* ═══════════════════ STARFIELD DUST LAYER ═══════════════════ */

function AmbientDust({ theme }) {
    const pointsRef = useRef()
    const isDark = theme !== 'light'

    const { positions, randoms } = useMemo(() => {
        const pos = new Float32Array(DUST_COUNT * 3)
        const rand = new Float32Array(DUST_COUNT)
        for (let i = 0; i < DUST_COUNT; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 16
            pos[i * 3 + 1] = (Math.random() - 0.5) * 14
            pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2
            rand[i] = Math.random()
        }
        return { positions: pos, randoms: rand }
    }, [])

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(isDark ? '#94a3b8' : '#64748b') },
        uOpacity: { value: isDark ? 0.45 : 0.25 },
    }), [isDark])

    useFrame((state, delta) => {
        if (!pointsRef.current) return
        const dt = Math.min(delta, 0.1)
        uniforms.uTime.value = state.clock.getElapsedTime()
        pointsRef.current.rotation.y += 0.008 * dt
        pointsRef.current.rotation.x += 0.004 * dt
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-aRand" args={[randoms, 1]} />
            </bufferGeometry>
            <shaderMaterial
                key={`dust-${isDark ? 'dark' : 'light'}`}
                vertexShader={`
                    attribute float aRand;
                    uniform float uTime;
                    void main() {
                        vec3 p = position;
                        p.y += sin(uTime * 0.2 + aRand * 6.28) * 0.15;
                        p.x += cos(uTime * 0.15 + aRand * 6.28) * 0.15;
                        vec4 mv = modelViewMatrix * vec4(p, 1.0);
                        gl_Position = projectionMatrix * mv;
                        gl_PointSize = (0.8 + sin(uTime * 1.5 + aRand * 6.28) * 0.5) * (180.0 / -mv.z);
                    }
                `}
                fragmentShader={`
                    uniform vec3 uColor;
                    uniform float uOpacity;
                    void main() {
                        float dist = length(gl_PointCoord - vec2(0.5));
                        if (dist > 0.5) discard;
                        float alpha = smoothstep(0.5, 0.05, dist);
                        gl_FragColor = vec4(uColor, alpha * uOpacity);
                    }
                `}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
            />
        </points>
    )
}

/* ═══════════════════ QUANTUM GYROSCOPIC RINGS ═══════════════════ */

function QuantumRings({ activeIdx, velocity, theme }) {
    const ring1Ref = useRef()
    const ring2Ref = useRef()
    const isDark = theme !== 'light'

    const color1 = useMemo(() => new THREE.Color(), [])
    const color2 = useMemo(() => new THREE.Color(), [])

    useFrame((state, delta) => {
        const dt = Math.min(delta, 0.1)
        const time = state.clock.getElapsedTime()
        const v = velocity ? Math.min(Math.abs(velocity.get()) / 1500, 2) : 0
        const speed = (0.4 + v * 0.8) * dt

        if (ring1Ref.current) {
            ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(time * 0.25) * 0.2
            ring1Ref.current.rotation.y += speed * 0.8
            ring1Ref.current.rotation.z += speed * 0.4
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.x = -Math.PI / 4 + Math.cos(time * 0.2) * 0.2
            ring2Ref.current.rotation.y -= speed * 0.6
            ring2Ref.current.rotation.z += speed * 0.7
        }

        const palette = SHAPE_COLORS[theme] || SHAPE_COLORS.dark
        const targetColor = new THREE.Color(palette[activeIdx] || palette[0])

        color1.lerp(targetColor, 1.0 - Math.pow(0.005, dt))
        color2.lerp(targetColor, 1.0 - Math.pow(0.005, dt))

        if (ring1Ref.current?.material) {
            ring1Ref.current.material.color = color1
            ring1Ref.current.material.opacity = isDark ? 0.35 + Math.sin(time * 1.5) * 0.08 : 0.2
        }
        if (ring2Ref.current?.material) {
            ring2Ref.current.material.color = color2
            ring2Ref.current.material.opacity = isDark ? 0.25 + Math.cos(time * 1.2) * 0.06 : 0.15
        }
    })

    return (
        <group>
            {/* Outer Ring */}
            <mesh ref={ring1Ref}>
                <torusGeometry args={[2.5, 0.008, 16, 120]} />
                <meshBasicMaterial
                    transparent
                    opacity={0.35}
                    depthWrite={false}
                    blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
                />
            </mesh>

            {/* Inner Ring */}
            <mesh ref={ring2Ref}>
                <torusGeometry args={[2.0, 0.006, 16, 100]} />
                <meshBasicMaterial
                    transparent
                    opacity={0.25}
                    depthWrite={false}
                    blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
                />
            </mesh>
        </group>
    )
}

/* ═══════════════════ MAIN MORPHING PARTICLE CORE ═══════════════════ */

function ParticleSystem({ activeIdx, velocity, theme }) {
    const pointsRef = useRef()
    const prevIdxRef = useRef(activeIdx)
    const burstRef = useRef(0)
    const jitterRef = useRef(0)

    const rand = useMemo(() => {
        const arr = new Float32Array(COUNT)
        for (let i = 0; i < COUNT; i++) arr[i] = Math.random()
        return arr
    }, [])

    const positions = useMemo(() => SHAPES[0].slice(), [])

    const uniforms = useMemo(() => ({
        uSize: { value: 0.16 },
        uTime: { value: 0 },
        uJitter: { value: 0 },
        uBurst: { value: 0 },
        uColor: { value: new THREE.Color(SHAPE_COLORS.dark[0]) },
        uOpacity: { value: 0.92 },
    }), [])

    useFrame((state, delta) => {
        if (!pointsRef.current) return
        const time = state.clock.getElapsedTime()
        const dt = Math.min(delta, 0.1)
        uniforms.uTime.value = time

        if (prevIdxRef.current !== activeIdx) {
            burstRef.current = 0.9
            prevIdxRef.current = activeIdx
        }
        burstRef.current += (0 - burstRef.current) * (1.0 - Math.pow(0.01, dt))
        uniforms.uBurst.value = burstRef.current

        const v = velocity ? Math.min(Math.abs(velocity.get()) / 2500, 1.2) : 0
        jitterRef.current += (v * 0.22 - jitterRef.current) * (1.0 - Math.pow(0.02, dt))
        uniforms.uJitter.value = jitterRef.current

        const targets = SHAPES[activeIdx] || SHAPES[0]
        const posAttr = pointsRef.current.geometry.attributes.position
        const pos = posAttr.array
        for (let i = 0; i < COUNT; i++) {
            const i3 = i * 3
            const rate = 0.038 + rand[i] * 0.068
            const factor = 1.0 - Math.pow(1.0 - rate, dt * 60)
            pos[i3] += (targets[i3] - pos[i3]) * factor
            pos[i3 + 1] += (targets[i3 + 1] - pos[i3 + 1]) * factor
            pos[i3 + 2] += (targets[i3 + 2] - pos[i3 + 2]) * factor
        }
        posAttr.needsUpdate = true

        const palette = SHAPE_COLORS[theme] || SHAPE_COLORS.dark
        const targetColor = new THREE.Color(palette[activeIdx] || palette[0])
        uniforms.uColor.value.lerp(targetColor, 1.0 - Math.pow(0.004, dt))

        // Ambient rotation
        pointsRef.current.rotation.y = time * 0.048
        pointsRef.current.rotation.x = Math.sin(time * 0.09) * 0.08

        // Smooth camera parallax
        const targetCamX = state.pointer.x * 0.45
        const targetCamY = state.pointer.y * 0.28
        state.camera.position.x += (targetCamX - state.camera.position.x) * (1.0 - Math.pow(0.05, dt))
        state.camera.position.y += (targetCamY - state.camera.position.y) * (1.0 - Math.pow(0.05, dt))
        state.camera.lookAt(0, 0, 0)
    })

    const isDark = theme !== 'light'
    useEffect(() => {
        uniforms.uOpacity.value = isDark ? 0.92 : 0.95
    }, [isDark, uniforms])

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-aRand" args={[rand, 1]} />
            </bufferGeometry>
            <shaderMaterial
                key={isDark ? 'dark' : 'light'}
                vertexShader={`
                    attribute float aRand;
                    uniform float uSize;
                    uniform float uTime;
                    uniform float uJitter;
                    uniform float uBurst;
                    varying float vRand;
                    varying float vDist;
                    void main() {
                        vRand = aRand;
                        vec3 p = position;
                        float ph = aRand * 6.283185;
                        // idle organic breathing drift
                        p += 0.045 * vec3(
                            sin(uTime * 0.55 + ph),
                            cos(uTime * 0.45 + ph * 1.3),
                            sin(uTime * 0.35 + ph * 2.0)
                        );
                        // scroll velocity turbulence
                        p += uJitter * vec3(
                            sin(ph * 11.0 + uTime * 2.8),
                            cos(ph * 13.0 + uTime * 3.0),
                            sin(ph * 17.0 + uTime * 2.6)
                        );
                        // morph transition burst expansion
                        p *= 1.0 + uBurst * aRand * 0.45;
                        vDist = length(p);
                        vec4 mv = modelViewMatrix * vec4(p, 1.0);
                        gl_Position = projectionMatrix * mv;
                        gl_PointSize = uSize * (0.68 + aRand * 0.85) * (330.0 / -mv.z);
                    }
                `}
                fragmentShader={`
                    uniform vec3 uColor;
                    uniform float uOpacity;
                    varying float vRand;
                    varying float vDist;
                    void main() {
                        float dist = length(gl_PointCoord - vec2(0.5));
                        if (dist > 0.5) discard;
                        float alpha = smoothstep(0.5, 0.06, dist);
                        
                        // Chromatic core brightness: inner particles gain bright white-hot core
                        vec3 col = uColor;
                        if (vDist < 1.0) {
                            col = mix(col, vec3(1.0, 1.0, 1.0), 0.35 * (1.0 - vDist));
                        }
                        
                        gl_FragColor = vec4(col, alpha * uOpacity);
                    }
                `}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
            />
        </points>
    )
}

function SceneBackground({ theme }) {
    const bgColor = useMemo(() => new THREE.Color(BG[theme] || BG.dark), [theme])
    useFrame((state) => {
        state.scene.background = bgColor
        if (state.scene.fog) state.scene.fog.color = bgColor
    })
    return null
}

/* ═══════════════════ EXPORT CANVAS WRAPPER ═══════════════════ */

export default function LinksBackground3D({ activeIdx = 0, velocity = null }) {
    const theme = useStore((s) => s.theme)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsVisible(!document.hidden)
        }
        document.addEventListener('visibilitychange', handleVisibilityChange)
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
    }, [])

    const activeColor = SHAPE_COLORS[theme]?.[activeIdx] || SHAPE_COLORS.dark[activeIdx] || '#60a5fa'

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" style={{ background: BG[theme] || BG.dark }}>
            {/* Ambient Platform Color Aura Grid (CSS Layer) */}
            <div
                className="absolute inset-0 transition-opacity duration-1000 ease-out pointer-events-none"
                style={{
                    background: `radial-gradient(circle 800px at 50% 50%, ${activeColor}12, transparent 75%)`,
                }}
            />

            <Canvas
                frameloop={isVisible ? 'always' : 'never'}
                camera={{ position: [0, 0, 4.8], fov: 60 }}
                gl={{ antialias: false, powerPreference: 'high-performance' }}
                dpr={[1, 1.5]}
            >
                <color attach="background" args={[BG[theme] || BG.dark]} />
                <fog attach="fog" args={[BG[theme] || BG.dark, 3.4, 11]} />
                <SceneBackground theme={theme} />

                {/* Layer 1: Ambient Drifting Starfield Dust */}
                <AmbientDust theme={theme} />

                {/* Layer 2: Dual Quantum Gyroscopic Wireframe Rings */}
                <QuantumRings activeIdx={activeIdx} velocity={velocity} theme={theme} />

                {/* Layer 3: Central Morphing Particle Core */}
                <ParticleSystem activeIdx={activeIdx} velocity={velocity} theme={theme} />

                {theme !== 'light' && (
                    <EffectComposer disableNormalPass multisampling={0}>
                        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={1.4} mipmapBlur />
                    </EffectComposer>
                )}
            </Canvas>
        </div>
    )
}
