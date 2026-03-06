import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

// Subtle fading grid floor
function GridFloor() {
    return (
        <group position={[0, -2.5, 0]}>
            <gridHelper args={[50, 50, '#1e293b', '#1e293b']} />
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial
                    color="#0f172a"
                    transparent
                    opacity={0.6}
                    roughness={0.8}
                    metalness={0.2}
                />
            </mesh>
        </group>
    )
}

// Glowing Soft Particles — slow, smooth drifting
function Particles({ count = 150 }) {
    const mesh = useRef()

    const dummy = useMemo(() => new THREE.Object3D(), [])
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100
            const factor = 2 + Math.random() * 10          // Much smaller factor → gentler arc
            const speed = 0.001 + Math.random() * 0.002     // 10x slower tick
            const xFactor = -15 + Math.random() * 30
            const yFactor = -8 + Math.random() * 16
            const zFactor = -10 + Math.random() * 15
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor })
        }
        return temp
    }, [count])

    useFrame(() => {
        particles.forEach((particle, i) => {
            let { factor, xFactor, yFactor, zFactor } = particle
            const t = (particle.t += particle.speed)

            const a = Math.cos(t) * 0.5
            const b = Math.sin(t) * 0.5
            const s = Math.max(0.3, (Math.cos(t) + 1) / 2) // scale stays positive & gentle

            // Gentle floating positions
            dummy.position.set(
                xFactor + Math.sin(t * 0.3) * factor * 0.5,
                yFactor + Math.cos(t * 0.2) * factor * 0.3,
                zFactor + Math.sin(t * 0.15) * factor * 0.3
            )
            dummy.scale.setScalar(s)
            dummy.updateMatrix()

            mesh.current.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <sphereGeometry args={[0.04, 6, 6]} />
            <meshBasicMaterial color="#22d3ee" transparent opacity={0.5} />
        </instancedMesh>
    )
}

// Mouse parallax rig
function CameraRig() {
    const { camera } = useThree()
    const mouse = useRef({ x: 0, y: 0 })
    const vec = useMemo(() => new THREE.Vector3(), [])

    // Listen to pointer events on the window (works even with pointer-events:none on the canvas wrapper)
    useMemo(() => {
        const onMove = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
        }
        window.addEventListener('pointermove', onMove)
        return () => window.removeEventListener('pointermove', onMove)
    }, [])

    useFrame(() => {
        camera.position.lerp(
            vec.set(mouse.current.x * 1.5, mouse.current.y * 0.8, 5),
            0.03
        )
        camera.lookAt(0, 0, 0)
    })

    return null
}

export default function HeroBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 60 }}
                gl={{ antialias: false, powerPreference: "high-performance" }}
                dpr={[1, 1.5]}
                style={{ background: '#0f172a' }}
            >
                <color attach="background" args={['#0f172a']} />
                <fog attach="fog" args={['#0f172a', 5, 20]} />

                {/* Cinematic Lighting */}
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
                <spotLight position={[0, 5, 0]} intensity={2} color="#22d3ee" penumbra={1} />

                {/* Scene Elements */}
                <CameraRig />
                <Particles count={150} />
                <GridFloor />

                {/* Postprocessing */}
                <EffectComposer disableNormalPass multisampling={0}>
                    <Bloom
                        luminanceThreshold={0.2}
                        luminanceSmoothing={0.9}
                        intensity={1.5}
                        mipmapBlur
                    />
                    <Vignette eskil={false} offset={0.1} darkness={0.8} />
                </EffectComposer>
            </Canvas>
        </div>
    )
}
