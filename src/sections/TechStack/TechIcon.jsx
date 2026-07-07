import { useState, useRef, useMemo } from 'react'
import { Html, Float } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const _worldPos = new THREE.Vector3()
const _camDir = new THREE.Vector3()
const _camToIcon = new THREE.Vector3()
const _iconRelative = new THREE.Vector3()
const _viewDir = new THREE.Vector3()
const _projected = new THREE.Vector3()
const _temp = new THREE.Vector3()

export function TechIcon({ item, position, planetRadius = 7.5, planetCenter = [0, -1.5, 0] }) {
    const [hovered, setHovered] = useState(false)
    const meshRef = useRef()
    const htmlRef = useRef()
    const groupRef = useRef()
    const { camera } = useThree()

    // Precompute planet center vector
    const pCenter = useMemo(() => new THREE.Vector3(...planetCenter), [planetCenter])

    useFrame(() => {
        if (!groupRef.current) return

        // Get world position of this icon
        groupRef.current.getWorldPosition(_worldPos)

        // Distance-based scale
        const dist = camera.position.distanceTo(_worldPos)
        const scale = THREE.MathUtils.clamp(18 / dist, 0.6, 1.4)
        if (meshRef.current) {
            meshRef.current.scale.setScalar(scale)
        }

        // ── Occlusion: hide icons behind the planet ──
        // Direction from camera to planet center
        _camDir.copy(pCenter).sub(camera.position).normalize()

        // Direction from camera to this icon
        _camToIcon.copy(_worldPos).sub(camera.position)
        const iconDist = _camToIcon.length()
        _camToIcon.normalize()

        // Project icon position onto the camera-to-planet axis
        const dot = _camToIcon.dot(_camDir)

        // Distance from planet center to icon
        const iconToPlanet = _worldPos.distanceTo(pCenter)

        // Check if the icon is roughly behind the planet
        // If the icon is farther than the planet center along the view axis
        // and within the planet's silhouette radius, it should be hidden
        const camToPlanetDist = camera.position.distanceTo(pCenter)
        const isBehind = iconDist > camToPlanetDist

        // Project icon position onto plane perpendicular to view at planet center
        _iconRelative.copy(_worldPos).sub(pCenter)
        _viewDir.copy(pCenter).sub(camera.position).normalize()
        const behindAmount = _iconRelative.dot(_viewDir) // positive = behind planet from camera

        // Lateral distance from the view axis through planet center
        _temp.copy(_viewDir).multiplyScalar(behindAmount)
        _projected.copy(_iconRelative).sub(_temp)
        const lateralDist = _projected.length()

        // Effective occlusion radius — slightly smaller than visual radius for smooth edge
        const occlusionRadius = planetRadius * 0.85

        let opacity = 1
        if (behindAmount > 0) {
            // Icon is behind the planet center
            if (lateralDist < occlusionRadius) {
                // Fully behind — hide completely
                opacity = 0
            } else if (lateralDist < occlusionRadius + 2.5) {
                // Transition zone — smooth fade at the edge
                opacity = THREE.MathUtils.smoothstep(lateralDist, occlusionRadius, occlusionRadius + 2.5)
            }
        } else if (behindAmount > -2) {
            // Approaching from the front edge — slight fade for depth
            if (lateralDist < occlusionRadius * 0.6) {
                const edgeFade = THREE.MathUtils.smoothstep(-behindAmount, 0, 2)
                opacity = Math.max(edgeFade, 0.3)
            }
        }

        // Apply opacity to the HTML element
        if (htmlRef.current) {
            htmlRef.current.style.opacity = opacity
            htmlRef.current.style.pointerEvents = opacity < 0.1 ? 'none' : 'auto'
            htmlRef.current.style.transition = 'opacity 0.15s ease-out'
        }
    })

    return (
        <Float
            speed={1.8}
            rotationIntensity={0}
            floatIntensity={0.6}
            position={position}
        >
            <group ref={groupRef}>
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
                    sprite
                >
                    <div
                        ref={htmlRef}
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
                        {/* Icon container — glass ring */}
                        <div style={{
                            position: 'relative',
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
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
                            boxShadow: hovered
                                ? `0 0 24px ${item.color}50, 0 0 8px ${item.color}30, inset 0 1px 0 rgba(255,255,255,0.2)`
                                : `0 0 8px ${item.color}15, inset 0 1px 0 rgba(255,255,255,0.1)`,
                        }}>
                            {/* Specular highlight */}
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
            </group>
        </Float>
    )
}
