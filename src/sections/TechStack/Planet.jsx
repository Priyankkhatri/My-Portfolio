import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Single clean Fresnel rim glow ───
function FresnelGlow({ radius }) {
  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color('#8050FF') },
      intensity: { value: 2.0 },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPos = modelViewMatrix * vec4(position, 1.0);
        vViewDir = normalize(-worldPos.xyz);
        gl_Position = projectionMatrix * worldPos;
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform float intensity;
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        float fresnel = pow(1.0 - dot(vNormal, vViewDir), 3.0);
        gl_FragColor = vec4(color, fresnel * intensity);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    depthWrite: false,
  }), [])

  return (
    <mesh>
      <sphereGeometry args={[radius * 1.15, 64, 64]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

// ─── Cinematic Procedural Surface with swirling nebula clouds ───
function PlanetSurface({ radius, meshRef }) {
  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      lightDir: { value: new THREE.Vector3(1.2, 0.8, 0.5).normalize() },
      baseColor: { value: new THREE.Color('#1A0845') },
      midColor: { value: new THREE.Color('#3D1B8E') },
      brightColor: { value: new THREE.Color('#6D3DD0') },
      cloudColor: { value: new THREE.Color('#8B5CF6') },
      hotColor: { value: new THREE.Color('#C084FC') },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 lightDir;
      uniform vec3 baseColor;
      uniform vec3 midColor;
      uniform vec3 brightColor;
      uniform vec3 cloudColor;
      uniform vec3 hotColor;
      varying vec3 vNormal;
      varying vec3 vPosition;

      float hash(vec3 p) {
        p = fract(p * vec3(0.1031, 0.1030, 0.0973));
        p += dot(p, p.yxz + 33.33);
        return fract((p.x + p.y) * p.z);
      }

      float noise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(mix(hash(i), hash(i+vec3(1,0,0)), f.x),
              mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), f.x), f.y),
          mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), f.x),
              mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), f.x), f.y), f.z
        );
      }

      float fbmLow(vec3 p) {
        float v = 0.0, a = 0.5;
        mat3 rot = mat3(
          0.8, 0.36, 0.48,
          -0.36, 0.93, -0.07,
          -0.48, -0.12, 0.88
        );
        for(int i = 0; i < 3; i++) {
          v += a * noise(p);
          p = rot * p * 2.1 + vec3(0.3);
          a *= 0.5;
        }
        return v;
      }

      float fbmHigh(vec3 p) {
        float v = 0.0, a = 0.5;
        mat3 rot = mat3(
          0.8, 0.36, 0.48,
          -0.36, 0.93, -0.07,
          -0.48, -0.12, 0.88
        );
        for(int i = 0; i < 4; i++) {
          v += a * noise(p);
          p = rot * p * 2.1 + vec3(0.3);
          a *= 0.5;
        }
        return v;
      }

      float swirl(vec3 p) {
        float t = time * 0.012;
        vec3 q = vec3(
          fbmLow(p + vec3(t, 0.0, 0.0)),
          fbmLow(p + vec3(0.0, t * 0.7, 0.0)),
          fbmLow(p + vec3(0.0, 0.0, t * 1.3))
        );
        return fbmHigh(p + q * 2.5);
      }

      void main() {
        vec3 pos = vPosition + vec3(time * 0.006, time * 0.003, 0.0);

        float surface = swirl(pos * 1.2);
        float clouds = fbmHigh(pos * 2.0 + vec3(time * 0.01));
        float detail = fbmHigh(pos * 4.0 - vec3(0.0, time * 0.008, 0.0));

        float diff = max(dot(vNormal, lightDir), 0.0);
        float darkSide = smoothstep(0.0, 0.5, diff);

        // Layered color
        vec3 color = mix(baseColor, midColor, surface * 0.7);
        color = mix(color, brightColor, pow(surface, 1.5) * 0.5);
        color = mix(color, cloudColor, clouds * 0.35 * darkSide);
        
        // Subtle energy veins
        float hotSpots = pow(detail, 3.0) * surface;
        color = mix(color, hotColor, hotSpots * 0.4 * darkSide);

        // Lighting
        color = mix(baseColor * 0.08, color, darkSide);

        // Terminator glow
        float terminator = smoothstep(0.0, 0.12, diff) * (1.0 - smoothstep(0.08, 0.35, diff));
        color += vec3(0.3, 0.1, 0.6) * terminator * 0.7;

        gl_FragColor = vec4(color, 1.0);
      }
    `,
  }), [])

  useFrame((_, delta) => {
    material.uniforms.time.value += delta
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 128, 128]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

// ─── Thin atmosphere haze (subtle, not bright) ───
function AtmosphereHaze({ radius }) {
  return (
    <mesh>
      <sphereGeometry args={[radius * 1.03, 64, 64]} />
      <meshStandardMaterial
        color="#5030A0"
        transparent
        opacity={0.1}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  )
}

// ─── Planet Rings — cleaner, less emissive ───
function PlanetRing({ radius }) {
  return (
    <group>
      {/* Main wide ring */}
      <mesh rotation={[Math.PI / 2.4, 0.05, 0]}>
        <torusGeometry args={[radius * 1.5, radius * 0.12, 2, 512]} />
        <meshStandardMaterial
          color="#7050C0"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
          depthWrite={false}
          roughness={0.8}
        />
      </mesh>
      {/* Inner bright accent ring */}
      <mesh rotation={[Math.PI / 2.4, 0.05, 0]}>
        <torusGeometry args={[radius * 1.32, radius * 0.03, 2, 512]} />
        <meshStandardMaterial
          color="#A080FF"
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
          depthWrite={false}
          emissive="#6040B0"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Outer faint ring */}
      <mesh rotation={[Math.PI / 2.4, 0.05, 0]}>
        <torusGeometry args={[radius * 1.72, radius * 0.05, 2, 512]} />
        <meshStandardMaterial
          color="#4030A0"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      {/* Thin bright line ring for definition */}
      <mesh rotation={[Math.PI / 2.4, 0.05, 0]}>
        <torusGeometry args={[radius * 1.42, radius * 0.008, 2, 512]} />
        <meshStandardMaterial
          color="#B0A0FF"
          transparent
          opacity={0.45}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

// ─── Subtle particle dust (no additive blending — that was causing glow) ───
function ParticleDust({ radius, count = 120 }) {
  const meshRef = useRef()
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = radius * (1.15 + Math.random() * 0.8)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [radius, count])

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.025
      meshRef.current.rotation.x += delta * 0.008
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#8070CC"
        transparent
        opacity={0.3}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

// ─── Subtle energy pulse (no emissive, just opacity animation) ───
function EnergyPulse({ radius }) {
  const ringRef = useRef()
  const matRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const cycle = (t * 0.25) % 1
    const scale = 1.0 + cycle * 0.3
    const opacity = (1.0 - cycle) * 0.15
    
    if (ringRef.current) ringRef.current.scale.setScalar(scale)
    if (matRef.current) matRef.current.opacity = opacity
  })

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2.4, 0.05, 0]}>
      <torusGeometry args={[radius * 1.2, radius * 0.006, 2, 256]} />
      <meshBasicMaterial
        ref={matRef}
        color="#9070DD"
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

export function Planet({ radius = 7.5 }) {
  const meshRef = useRef()

  return (
    <group>
      {/* Single soft point light for icon illumination */}
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#6030C0" distance={25} />

      {/* Procedural nebula surface */}
      <PlanetSurface radius={radius} meshRef={meshRef} />

      {/* Atmosphere — single tight layer */}
      <AtmosphereHaze radius={radius} />
      <FresnelGlow radius={radius} />

      {/* Ring system */}
      <PlanetRing radius={radius} />
      
      {/* Subtle animated pulse */}
      <EnergyPulse radius={radius} />

      {/* Sparse particle dust */}
      <ParticleDust radius={radius} count={100} />
    </group>
  )
}
