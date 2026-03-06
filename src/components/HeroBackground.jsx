import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import useStore from '../store/useStore'

// Theme color palettes
const THEMES = {
    dark: {
        bg: '#0f172a',
        gridLine: '#1e293b',
        floorColor: '#0f172a',
        particleColor: '#22d3ee',
        particleOpacity: 0.5,
        light1: '#6366f1',
        light2: '#8b5cf6',
        light3: '#22d3ee',
        ambientIntensity: 0.2,
        light1Intensity: 1,
        light2Intensity: 0.5,
        light3Intensity: 2,
        bloomIntensity: 1.5,
        bloomThreshold: 0.2,
        vignetteOffset: 0.1,
        vignetteDarkness: 0.8,
        fogNear: 5,
        fogFar: 20,
    },
    light: {
        bg: '#e4ecf7',
        gridLine: '#c5d0e0',
        floorColor: '#dae3f0',
        particleColor: '#4f46e5',
        particleOpacity: 0.6,
        light1: '#3b82f6',
        light2: '#8b5cf6',
        light3: '#0ea5e9',
        ambientIntensity: 0.6,
        light1Intensity: 0.6,
        light2Intensity: 0.3,
        light3Intensity: 1,
        bloomIntensity: 0.4,
        bloomThreshold: 0.5,
        vignetteOffset: 0.2,
        vignetteDarkness: 0.3,
        fogNear: 6,
        fogFar: 22,
    }
}

// Responsive breakpoints
function useResponsive() {
    const [tier, setTier] = useState(() => {
        if (typeof window === 'undefined') return 'desktop'
        const w = window.innerWidth
        if (w < 768) return 'mobile'
        if (w < 1024) return 'tablet'
        return 'desktop'
    })

    useEffect(() => {
        let timeout
        const update = () => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                const w = window.innerWidth
                if (w < 768) setTier('mobile')
                else if (w < 1024) setTier('tablet')
                else setTier('desktop')
            }, 200)
        }
        window.addEventListener('resize', update, { passive: true })
        return () => {
            clearTimeout(timeout)
            window.removeEventListener('resize', update)
        }
    }, [])

    return tier
}

const RESPONSIVE = {
    mobile:  { particles: 60,  dpr: [1, 1],   fov: 50, parallax: 0.5, bloom: false, gridSize: 30, gridDivs: 30 },
    tablet:  { particles: 100, dpr: [1, 1.2], fov: 55, parallax: 1.0, bloom: true,  gridSize: 40, gridDivs: 40 },
    desktop: { particles: 150, dpr: [1, 1.5], fov: 60, parallax: 1.5, bloom: true,  gridSize: 50, gridDivs: 50 },
}

// Subtle fading grid floor
function GridFloor({ colors, gridSize = 50, gridDivs = 50 }) {
    const gridRef = useRef()
    const matRef = useRef()

    useFrame(() => {
        if (matRef.current) {
            matRef.current.color.lerp(new THREE.Color(colors.floorColor), 0.05)
        }
    })

    return (
        <group position={[0, -2.5, 0]}>
            <gridHelper ref={gridRef} args={[gridSize, gridDivs, colors.gridLine, colors.gridLine]} />
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[gridSize, gridSize]} />
                <meshStandardMaterial
                    ref={matRef}
                    color={colors.floorColor}
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
function Particles({ count = 150, colors }) {
    const mesh = useRef()
    const matRef = useRef()

    const dummy = useMemo(() => new THREE.Object3D(), [])
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100
            const factor = 2 + Math.random() * 10
            const speed = 0.001 + Math.random() * 0.002
            const xFactor = -15 + Math.random() * 30
            const yFactor = -8 + Math.random() * 16
            const zFactor = -10 + Math.random() * 15
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor })
        }
        return temp
    }, [count])

    useFrame(() => {
        // Smoothly transition particle color
        if (matRef.current) {
            matRef.current.color.lerp(new THREE.Color(colors.particleColor), 0.05)
            matRef.current.opacity += (colors.particleOpacity - matRef.current.opacity) * 0.05
        }

        particles.forEach((particle, i) => {
            let { factor, xFactor, yFactor, zFactor } = particle
            const t = (particle.t += particle.speed)

            const s = Math.max(0.3, (Math.cos(t) + 1) / 2)

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
            <meshBasicMaterial
                ref={matRef}
                color={colors.particleColor}
                transparent
                opacity={colors.particleOpacity}
            />
        </instancedMesh>
    )
}

// Mouse/touch parallax rig
function CameraRig({ parallaxStrength = 1.5 }) {
    const { camera } = useThree()
    const mouse = useRef({ x: 0, y: 0 })
    const vec = useMemo(() => new THREE.Vector3(), [])

    useEffect(() => {
        // Pointer (desktop)
        const onMove = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
        }
        // Touch (mobile/tablet) — use first touch
        const onTouch = (e) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0]
                mouse.current.x = (touch.clientX / window.innerWidth) * 2 - 1
                mouse.current.y = -(touch.clientY / window.innerHeight) * 2 + 1
            }
        }
        // Device orientation (gyroscope on mobile)
        const onOrientation = (e) => {
            if (e.gamma !== null && e.beta !== null) {
                // gamma: -90 to 90 (tilt left-right), beta: -180 to 180 (tilt front-back)
                mouse.current.x = Math.max(-1, Math.min(1, e.gamma / 30))
                mouse.current.y = Math.max(-1, Math.min(1, (e.beta - 45) / 30))
            }
        }

        window.addEventListener('pointermove', onMove)
        window.addEventListener('touchmove', onTouch, { passive: true })
        window.addEventListener('deviceorientation', onOrientation, { passive: true })

        return () => {
            window.removeEventListener('pointermove', onMove)
            window.removeEventListener('touchmove', onTouch)
            window.removeEventListener('deviceorientation', onOrientation)
        }
    }, [])

    useFrame(() => {
        camera.position.lerp(
            vec.set(mouse.current.x * parallaxStrength, mouse.current.y * (parallaxStrength * 0.5), 5),
            0.03
        )
        camera.lookAt(0, 0, 0)
    })

    return null
}

// Smoothly animate the scene background, fog, and lights
function SceneUpdater({ colors }) {
    const { scene } = useThree()
    const bgColor = useMemo(() => new THREE.Color(colors.bg), [colors.bg])

    useFrame(() => {
        scene.background.lerp(bgColor, 0.05)
        if (scene.fog) {
            scene.fog.color.lerp(bgColor, 0.05)
            scene.fog.near += (colors.fogNear - scene.fog.near) * 0.05
            scene.fog.far += (colors.fogFar - scene.fog.far) * 0.05
        }
    })

    return null
}

// Smoothly animate light colors and intensities
function AnimatedLights({ colors }) {
    const ambient = useRef()
    const point1 = useRef()
    const point2 = useRef()
    const spot = useRef()

    const targetColor1 = useMemo(() => new THREE.Color(colors.light1), [colors.light1])
    const targetColor2 = useMemo(() => new THREE.Color(colors.light2), [colors.light2])
    const targetColor3 = useMemo(() => new THREE.Color(colors.light3), [colors.light3])

    useFrame(() => {
        if (ambient.current)
            ambient.current.intensity += (colors.ambientIntensity - ambient.current.intensity) * 0.05
        if (point1.current) {
            point1.current.color.lerp(targetColor1, 0.05)
            point1.current.intensity += (colors.light1Intensity - point1.current.intensity) * 0.05
        }
        if (point2.current) {
            point2.current.color.lerp(targetColor2, 0.05)
            point2.current.intensity += (colors.light2Intensity - point2.current.intensity) * 0.05
        }
        if (spot.current) {
            spot.current.color.lerp(targetColor3, 0.05)
            spot.current.intensity += (colors.light3Intensity - spot.current.intensity) * 0.05
        }
    })

    return (
        <>
            <ambientLight ref={ambient} intensity={colors.ambientIntensity} />
            <pointLight ref={point1} position={[10, 10, 10]} intensity={colors.light1Intensity} color={colors.light1} />
            <pointLight ref={point2} position={[-10, -10, -10]} intensity={colors.light2Intensity} color={colors.light2} />
            <spotLight ref={spot} position={[0, 5, 0]} intensity={colors.light3Intensity} color={colors.light3} penumbra={1} />
        </>
    )
}

export default function HeroBackground() {
    const theme = useStore((s) => s.theme)
    const colors = THEMES[theme] || THEMES.dark
    const tier = useResponsive()
    const r = RESPONSIVE[tier]

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: r.fov }}
                gl={{ antialias: false, powerPreference: "high-performance" }}
                dpr={r.dpr}
                style={{ background: colors.bg }}
            >
                <color attach="background" args={[colors.bg]} />
                <fog attach="fog" args={[colors.bg, colors.fogNear, colors.fogFar]} />

                <SceneUpdater colors={colors} />
                <AnimatedLights colors={colors} />

                {/* Scene Elements */}
                <CameraRig parallaxStrength={r.parallax} />
                <Particles count={r.particles} colors={colors} />
                <GridFloor colors={colors} gridSize={r.gridSize} gridDivs={r.gridDivs} />

                {/* Postprocessing — disabled on mobile for performance */}
                {r.bloom && (
                    <EffectComposer disableNormalPass multisampling={0}>
                        <Bloom
                            luminanceThreshold={colors.bloomThreshold}
                            luminanceSmoothing={0.9}
                            intensity={colors.bloomIntensity}
                            mipmapBlur
                        />
                        <Vignette eskil={false} offset={colors.vignetteOffset} darkness={colors.vignetteDarkness} />
                    </EffectComposer>
                )}
            </Canvas>
        </div>
    )
}
