import { useRef, useMemo } from 'react'
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

// Subtle fading grid floor
function GridFloor({ colors }) {
    const gridRef = useRef()
    const matRef = useRef()

    useFrame(() => {
        if (gridRef.current) {
            const c = gridRef.current
            // gridHelper doesn't support dynamic color updates easily,
            // so we just keep it as-is — the floor plane color matters more
        }
        if (matRef.current) {
            matRef.current.color.lerp(new THREE.Color(colors.floorColor), 0.05)
        }
    })

    return (
        <group position={[0, -2.5, 0]}>
            <gridHelper ref={gridRef} args={[50, 50, colors.gridLine, colors.gridLine]} />
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[50, 50]} />
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

// Mouse parallax rig
function CameraRig() {
    const { camera } = useThree()
    const mouse = useRef({ x: 0, y: 0 })
    const vec = useMemo(() => new THREE.Vector3(), [])

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

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 60 }}
                gl={{ antialias: false, powerPreference: "high-performance" }}
                dpr={[1, 1.5]}
                style={{ background: colors.bg }}
            >
                <color attach="background" args={[colors.bg]} />
                <fog attach="fog" args={[colors.bg, colors.fogNear, colors.fogFar]} />

                <SceneUpdater colors={colors} />
                <AnimatedLights colors={colors} />

                {/* Scene Elements */}
                <CameraRig />
                <Particles count={150} colors={colors} />
                <GridFloor colors={colors} />

                {/* Postprocessing */}
                <EffectComposer disableNormalPass multisampling={0}>
                    <Bloom
                        luminanceThreshold={colors.bloomThreshold}
                        luminanceSmoothing={0.9}
                        intensity={colors.bloomIntensity}
                        mipmapBlur
                    />
                    <Vignette eskil={false} offset={colors.vignetteOffset} darkness={colors.vignetteDarkness} />
                </EffectComposer>
            </Canvas>
        </div>
    )
}
