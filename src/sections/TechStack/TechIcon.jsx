import { useState, useRef } from 'react'
import { Html, Float } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export function TechIcon({ item, position }) {
    const [hovered, setHovered] = useState(false)
    const meshRef = useRef()
    const { camera } = useThree()

    // Scale icon based on distance from camera for natural perspective feel
    useFrame(() => {
        if (meshRef.current) {
            const dist = camera.position.distanceTo(
                new THREE.Vector3(...position)
            )
            const scale = THREE.MathUtils.clamp(18 / dist, 0.6, 1.4)
            meshRef.current.scale.setScalar(scale)
        }
    })

    return (
        <Float
            speed={1.8}
            rotationIntensity={0}
            floatIntensity={0.6}
            position={position}
        >
            {/* Invisible mesh used for distance-based scale */}
            <mesh ref={meshRef} visible={false}>
                <sphereGeometry args={[0.1]} />
                <meshBasicMaterial />
            </mesh>

            <Html
                transform
                distanceFactor={11}
                center
                occlude={false}
                style={{ pointerEvents: 'auto' }}
                // Billboard: always face camera
                sprite
            >
                <div
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        transform: hovered ? 'scale(1.4) translateY(-4px)' : 'scale(1)',
                    }}
                >
                    {/* Icon container — glass ring, NOT opaque box */}
                    <div style={{
                        position: 'relative',
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',           // ← Circle, not square
                        background: hovered
                            ? `radial-gradient(circle at 35% 35%, ${item.color}15, transparent)`
                            : 'rgba(255, 255, 255, 0.04)',
                        border: `1px solid ${hovered ? item.color + '80' : 'rgba(255,255,255,0.2)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        transition: 'all 0.25s ease',
                        // Glow that matches the tech color — feels lit from within
                        boxShadow: hovered
                            ? `0 0 24px ${item.color}50, 0 0 8px ${item.color}30, inset 0 1px 0 rgba(255,255,255,0.2)`
                            : `0 0 8px ${item.color}15, inset 0 1px 0 rgba(255,255,255,0.1)`,
                    }}>
                        {/* Specular highlight — top-left shine like a sphere */}
                        <div style={{
                            position: 'absolute',
                            top: '8px',
                            left: '10px',
                            width: '16px',
                            height: '10px',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.35)',
                            filter: 'blur(4px)',
                            pointerEvents: 'none',
                        }} />

                        <img
                            src={item.icon}
                            alt={item.label}
                            width={24}
                            height={24}
                            style={{
                                objectFit: 'contain',
                                filter: hovered ? 'brightness(1.2)' : 'brightness(0.9)',
                                transition: 'filter 0.2s ease',
                                position: 'relative',
                                zIndex: 1,
                            }}
                        />
                    </div>

                    {/* Label — slides up on hover */}
                    <div style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        color: hovered ? item.color : 'rgba(255,255,255,0.7)',
                        background: 'rgba(4,5,15,0.75)',
                        padding: '3px 9px',
                        borderRadius: '20px',
                        whiteSpace: 'nowrap',
                        backdropFilter: 'blur(8px)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        border: `1px solid ${hovered ? item.color + '40' : 'rgba(255,255,255,0.1)'}`,
                        opacity: hovered ? 1 : 0,
                        transform: hovered ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.9)',
                        transition: 'all 0.2s ease',
                        pointerEvents: 'none',
                        boxShadow: hovered ? `0 0 10px ${item.color}30` : 'none',
                    }}>
                        {item.label}
                    </div>
                </div>
            </Html>
        </Float>
    )
}
