import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import useStore from '../store/useStore'

const count = 1200

// Generate particle coordinate shapes
const SHAPES = (() => {
    const tempShapes = []

    // 0. Sphere (Intro)
    const sphere = []
    for (let i = 0; i < count; i++) {
        const u = Math.random()
        const v = Math.random()
        const theta = u * 2.0 * Math.PI
        const phi = Math.acos(2.0 * v - 1.0)
        const r = 2.0
        sphere.push(new THREE.Vector3(
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta),
            r * Math.cos(phi)
        ))
    }
    tempShapes.push(sphere)

    // 1. Matrix Grid (GitHub)
    const grid = []
    const side = Math.ceil(Math.pow(count, 1/3)) // ~10
    for (let i = 0; i < count; i++) {
        const x = (i % side) - side/2
        const y = (Math.floor(i / side) % side) - side/2
        const z = (Math.floor(i / (side * side)) % side) - side/2
        grid.push(new THREE.Vector3(x * 0.35, y * 0.35, z * 0.35))
    }
    tempShapes.push(grid)

    // 2. Torus Knot (LeetCode)
    const torus = []
    for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2 * 3
        const p = 2
        const q = 3
        const r = 0.6 * (2 + Math.sin(q * t))
        torus.push(new THREE.Vector3(
            r * Math.cos(p * t) * 1.1,
            r * Math.sin(p * t) * 1.1,
            r * Math.cos(q * t) * 0.7
        ))
    }
    tempShapes.push(torus)

    // 3. Connection Network Cube (LinkedIn)
    const cube = []
    for (let i = 0; i < count; i++) {
        const sideIdx = Math.floor(Math.random() * 3)
        const val = Math.random() > 0.5 ? 1.6 : -1.6
        const x = sideIdx === 0 ? val : (Math.random() - 0.5) * 3.2
        const y = sideIdx === 1 ? val : (Math.random() - 0.5) * 3.2
        const z = sideIdx === 2 ? val : (Math.random() - 0.5) * 3.2
        cube.push(new THREE.Vector3(x, y, z))
    }
    tempShapes.push(cube)

    // 4. Wave Helix (YouTube)
    const helix = []
    for (let i = 0; i < count; i++) {
        const t = (i / count) * 8 * Math.PI
        helix.push(new THREE.Vector3(
            (i / count - 0.5) * 6,
            Math.sin(t) * 1.1,
            Math.cos(t) * 1.1
        ))
    }
    tempShapes.push(helix)

    // 5. Flat Grid Plane (Instagram)
    const plane = []
    const pSize = Math.ceil(Math.sqrt(count))
    for (let i = 0; i < count; i++) {
        const x = (i % pSize) - pSize/2
        const z = Math.floor(i / pSize) - pSize/2
        plane.push(new THREE.Vector3(x * 0.14, (Math.random() - 0.5) * 0.15, z * 0.14))
    }
    tempShapes.push(plane)

    // 6. Tunnel Vortex (Twitter)
    const tunnel = []
    for (let i = 0; i < count; i++) {
        const z = (Math.random() - 0.5) * 6.5
        const angle = Math.random() * Math.PI * 2
        const r = 1.3 + Math.random() * 0.3
        tunnel.push(new THREE.Vector3(
            Math.cos(angle) * r,
            Math.sin(angle) * r,
            z
        ))
    }
    tempShapes.push(tunnel)

    return tempShapes
})()

const THEME_COLORS = {
    dark: {
        bg: '#0f172a',
        point: '#60a5fa',
        pointAlt: '#a78bfa'
    },
    light: {
        bg: '#f8fafc',
        point: '#2563eb',
        pointAlt: '#7c3aed'
    }
}

function ParticleSystem({ activeIdx, theme }) {
    const pointsRef = useRef()
    const colors = THEME_COLORS[theme] || THEME_COLORS.dark

    // Initialize point positions buffer
    const initialPositions = useMemo(() => {
        const pos = new Float32Array(count * 3)
        // Start as sphere
        SHAPES[0].forEach((pt, i) => {
            pos[i * 3] = pt.x
            pos[i * 3 + 1] = pt.y
            pos[i * 3 + 2] = pt.z
        })
        return pos
    }, [])

    useFrame((state) => {
        if (!pointsRef.current) return
        const time = state.clock.getElapsedTime()
        
        const targets = SHAPES[activeIdx] || SHAPES[0]
        const posAttr = pointsRef.current.geometry.attributes.position
        const positions = posAttr.array

        // Morph points smoothly using lerping
        for (let i = 0; i < count; i++) {
            const i3 = i * 3
            const target = targets[i]

            positions[i3]     += (target.x - positions[i3])     * 0.08
            positions[i3 + 1] += (target.y - positions[i3 + 1]) * 0.08
            positions[i3 + 2] += (target.z - positions[i3 + 2]) * 0.08
        }
        posAttr.needsUpdate = true

        // Slowly rotate global scene
        pointsRef.current.rotation.y = time * 0.04
        pointsRef.current.rotation.x = time * 0.02
    })

    const uniforms = useMemo(() => ({
        uSize: { value: 0.16 },
        uColor: { value: new THREE.Color(colors.point) }
    }), [])

    useEffect(() => {
        uniforms.uColor.value.set(colors.point)
    }, [colors.point, uniforms])

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[initialPositions, 3]}
                />
            </bufferGeometry>
            <shaderMaterial
                vertexShader={`
                    uniform float uSize;
                    void main() {
                        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                        gl_Position = projectionMatrix * mvPosition;
                        gl_PointSize = uSize * (300.0 / -mvPosition.z);
                    }
                `}
                fragmentShader={`
                    uniform vec3 uColor;
                    void main() {
                        float dist = length(gl_PointCoord - vec2(0.5, 0.5));
                        if (dist > 0.5) discard;
                        float alpha = smoothstep(0.5, 0.15, dist);
                        gl_FragColor = vec4(uColor, alpha * 0.85);
                    }
                `}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

function SceneUpdater({ theme }) {
    const colors = THEME_COLORS[theme] || THEME_COLORS.dark
    const bgColor = useMemo(() => new THREE.Color(colors.bg), [colors.bg])

    useFrame((state) => {
        state.scene.background = bgColor
        if (state.scene.fog) {
            state.scene.fog.color = bgColor
        }
    })

    return null
}

export default function LinksBackground3D({ activeIdx }) {
    const theme = useStore((s) => s.theme)
    const colors = THEME_COLORS[theme] || THEME_COLORS.dark

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" style={{ background: colors.bg }}>
            <Canvas
                camera={{ position: [0, 0, 4.5], fov: 60 }}
                gl={{ antialias: false, powerPreference: "high-performance" }}
                dpr={[1, 1.5]}
            >
                <color attach="background" args={[colors.bg]} />
                <fog attach="fog" args={[colors.bg, 3, 10]} />
                
                <SceneUpdater theme={theme} />
                
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} intensity={1.5} />

                <ParticleSystem activeIdx={activeIdx} theme={theme} />

                <EffectComposer disableNormalPass multisampling={0}>
                    <Bloom
                        luminanceThreshold={0.15}
                        luminanceSmoothing={0.9}
                        intensity={1.2}
                        mipmapBlur
                    />
                </EffectComposer>
            </Canvas>
        </div>
    )
}
