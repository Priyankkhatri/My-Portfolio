import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

const PARTICLE_COUNT = 350
const SPREAD = 24
const tempObject = new THREE.Object3D()

/* ── Large floating shapes ─────────────────────────────── */
function FloatingParticles() {
    const meshRef = useRef()
    const mouseRef = useRef({ x: 0, y: 0 })
    const { viewport } = useThree()

    const particles = useMemo(() => {
        const arr = []
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            arr.push({
                position: [
                    (Math.random() - 0.5) * SPREAD,
                    (Math.random() - 0.5) * SPREAD * 0.8,
                    (Math.random() - 0.5) * SPREAD,
                ],
                speed: 0.1 + Math.random() * 0.35,
                offset: Math.random() * Math.PI * 2,
                scale: 0.02 + Math.random() * 0.1,
                rotSpeed: (Math.random() - 0.5) * 0.015,
            })
        }
        return arr
    }, [])

    useFrame((state) => {
        if (!meshRef.current) return
        const time = state.clock.elapsedTime
        const pointer = state.pointer

        mouseRef.current.x += (pointer.x * viewport.width * 0.5 - mouseRef.current.x) * 0.03
        mouseRef.current.y += (pointer.y * viewport.height * 0.5 - mouseRef.current.y) * 0.03

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const p = particles[i]
            const x = p.position[0] + Math.sin(time * p.speed + p.offset) * 1.2
            const y = p.position[1] + Math.cos(time * p.speed * 0.6 + p.offset) * 0.8
            const z = p.position[2] + Math.sin(time * p.speed * 0.4 + p.offset * 2) * 0.6

            const dx = x - mouseRef.current.x
            const dy = y - mouseRef.current.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const force = Math.max(0, 4 - dist) * 0.2
            const fx = dist > 0.01 ? (dx / dist) * force : 0
            const fy = dist > 0.01 ? (dy / dist) * force : 0

            tempObject.position.set(x + fx, y + fy, z)
            tempObject.rotation.set(
                time * p.rotSpeed + p.offset,
                time * p.rotSpeed * 1.4,
                time * p.rotSpeed * 0.6
            )
            tempObject.scale.setScalar(p.scale)
            tempObject.updateMatrix()
            meshRef.current.setMatrixAt(i, tempObject.matrix)
        }
        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[null, null, PARTICLE_COUNT]} frustumCulled={false}>
            <icosahedronGeometry args={[1, 1]} />
            <meshPhysicalMaterial
                color="#1a1a2e"
                roughness={0.75}
                metalness={0.15}
                transmission={0.05}
                thickness={0.5}
                envMapIntensity={0.2}
                transparent
                opacity={0.9}
            />
        </instancedMesh>
    )
}

/* ── Accent particles (tiny bright dots) ────────────────── */
function AccentDots() {
    const meshRef = useRef()
    const COUNT = 120

    const dots = useMemo(() => {
        const arr = []
        for (let i = 0; i < COUNT; i++) {
            arr.push({
                position: [
                    (Math.random() - 0.5) * 30,
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 30,
                ],
                speed: 0.05 + Math.random() * 0.15,
                offset: Math.random() * Math.PI * 2,
                scale: 0.008 + Math.random() * 0.015,
            })
        }
        return arr
    }, [])

    useFrame((state) => {
        if (!meshRef.current) return
        const time = state.clock.elapsedTime
        for (let i = 0; i < COUNT; i++) {
            const d = dots[i]
            tempObject.position.set(
                d.position[0] + Math.sin(time * d.speed + d.offset) * 0.5,
                d.position[1] + Math.cos(time * d.speed * 0.8 + d.offset) * 0.4,
                d.position[2] + Math.sin(time * d.speed * 0.3 + d.offset * 1.5) * 0.3
            )
            tempObject.scale.setScalar(d.scale)
            tempObject.updateMatrix()
            meshRef.current.setMatrixAt(i, tempObject.matrix)
        }
        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[null, null, COUNT]} frustumCulled={false}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color="#4a5568" transparent opacity={0.4} />
        </instancedMesh>
    )
}

/* ── Slowly rotating wireframe rings ────────────────────── */
function AmbientRings() {
    const ring1 = useRef()
    const ring2 = useRef()
    const ring3 = useRef()

    useFrame((state) => {
        const t = state.clock.elapsedTime
        if (ring1.current) {
            ring1.current.rotation.x = t * 0.02
            ring1.current.rotation.z = t * 0.015
        }
        if (ring2.current) {
            ring2.current.rotation.y = t * 0.025
            ring2.current.rotation.x = t * 0.01
        }
        if (ring3.current) {
            ring3.current.rotation.z = t * 0.018
            ring3.current.rotation.y = t * 0.012
        }
    })

    return (
        <>
            <mesh ref={ring1} position={[6, 3, -8]}>
                <torusGeometry args={[3, 0.01, 8, 64]} />
                <meshBasicMaterial color="#2a2a3a" transparent opacity={0.15} />
            </mesh>
            <mesh ref={ring2} position={[-7, -2, -10]}>
                <torusGeometry args={[4, 0.01, 8, 64]} />
                <meshBasicMaterial color="#1e293b" transparent opacity={0.1} />
            </mesh>
            <mesh ref={ring3} position={[0, 5, -12]}>
                <torusGeometry args={[5, 0.005, 8, 96]} />
                <meshBasicMaterial color="#334155" transparent opacity={0.08} />
            </mesh>
        </>
    )
}

function Lights() {
    return (
        <>
            <ambientLight intensity={0.12} color="#94a3b8" />
            <directionalLight position={[5, 8, 5]} intensity={0.4} color="#e2e8f0" />
            <directionalLight position={[-5, -3, -5]} intensity={0.12} color="#64748b" />
            <pointLight position={[0, 0, 8]} intensity={0.15} color="#cbd5e1" distance={25} />
            <pointLight position={[-8, 4, -5]} intensity={0.08} color="#94a3b8" distance={20} />
            <pointLight position={[8, -4, -3]} intensity={0.06} color="#475569" distance={15} />
        </>
    )
}

export default function Scene() {
    return (
        <>
            <fog attach="fog" args={['#0a0a0a', 4, 28]} />
            <Lights />
            <FloatingParticles />
            <AccentDots />
            <AmbientRings />
            <Environment preset="city" environmentIntensity={0.04} />
        </>
    )
}
