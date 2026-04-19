import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { TechIcon } from './TechIcon'

export function OrbitalRing({ radius, speed, tilt, items }) {
    const groupRef = useRef()

    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * speed
        }
    })

    const angleStep = (2 * Math.PI) / items.length

    // More tilted rings = more transparent path line (they recede into space)
    const ringOpacity = THREE.MathUtils.mapLinear(Math.abs(tilt), 0, 25, 0.1, 0.04)

    return (
        <group rotation={[
            THREE.MathUtils.degToRad(tilt),           // X tilt
            0,
            THREE.MathUtils.degToRad(tilt * 0.3),     // subtle Z lean
        ]}>
            {/* Orbital path — thinner and opacity tied to tilt */}
            <mesh>
                <torusGeometry args={[radius, 0.01, 2, 256]} />
                <meshBasicMaterial
                    color="#A090FF"
                    transparent
                    opacity={ringOpacity}
                    depthWrite={false}
                />
            </mesh>

            <group ref={groupRef}>
                {items.map((item, i) => {
                    const angle = angleStep * i
                    const x = Math.cos(angle) * radius
                    const z = Math.sin(angle) * radius
                    return (
                        <TechIcon
                            key={item.id}
                            item={item}
                            position={[x, 0, z]}
                        />
                    )
                })}
            </group>
        </group>
    )
}
