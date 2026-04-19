import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls, Float } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Planet } from './Planet'
import { OrbitalRing } from './OrbitalRing'
import { techRings } from './techData'

export function TechOrbitCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 2, 28], fov: 55 }}
      gl={{ 
        antialias: true, 
        alpha: true, 
        toneMapping: 4,           // ACESFilmic
        toneMappingExposure: 1.1,
      }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      {/* Brighter lighting setup */}
      <ambientLight intensity={0.6} />

      <directionalLight
        position={[15, 12, 8]}
        intensity={4.5}
        color="#ffffff"
      />

      <pointLight
        position={[-10, -2, -15]}
        intensity={3.0}
        color="#a78bfa"
        distance={80}
      />

      <pointLight
        position={[0, -20, 5]}
        intensity={1.5}
        color="#60a5fa"
        distance={60}
      />

      {/* Stars removed to merge with global background */}

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1.2}>
        <group position={[0, -1.5, 0]}>
          <Planet radius={7.5} />
          {techRings.map((ring) => (
            <OrbitalRing
              key={ring.id}
              radius={ring.radius}
              speed={ring.speed}
              tilt={ring.tilt}
              items={ring.items}
            />
          ))}
        </group>
      </Float>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        target={[0, -0.5, 0]}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.7}
        minAzimuthAngle={-0.3}
        maxAzimuthAngle={0.3}
        dampingFactor={0.05}
        enableDamping
      />

      {/* POST PROCESSING: Bloom only, no vignette which caused the sharp line */}
      <EffectComposer disableNormalPass multisampling={0}>
        <Bloom 
          intensity={1.8} 
          luminanceThreshold={0.2} 
          luminanceSmoothing={0.9} 
          mipmapBlur 
        />
      </EffectComposer>
    </Canvas>
  )
}
