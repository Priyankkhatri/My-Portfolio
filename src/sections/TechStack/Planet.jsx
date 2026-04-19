import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Fresnel rim glow — the most cinematic effect, makes planet glow at edges
function FresnelGlow({ radius }) {
  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color('#8060FF') },
      intensity: { value: 1.8 },
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

// Procedural surface shader — noise-based surface detail
function PlanetSurface({ radius, meshRef }) {
  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      lightDir: { value: new THREE.Vector3(1.2, 0.8, 0.5).normalize() },
      baseColor: { value: new THREE.Color('#2A1070') },
      brightColor: { value: new THREE.Color('#5030B0') },
      cloudColor: { value: new THREE.Color('#6040C0') },
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
      uniform vec3 brightColor;
      uniform vec3 cloudColor;
      varying vec3 vNormal;
      varying vec3 vPosition;

      // Simple hash noise
      float hash(vec3 p) {
        p = fract(p * 0.3183099 + 0.1);
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }

      // Smooth noise
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

      // FBM — layered noise for cloud/continent shapes
      float fbm(vec3 p) {
        float v = 0.0;
        float a = 0.5;
        for(int i = 0; i < 5; i++) {
          v += a * noise(p);
          p *= 2.1;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        // Slow surface drift
        vec3 pos = vPosition + vec3(time * 0.008, 0.0, 0.0);

        // Surface detail
        float surface = fbm(pos * 1.8);
        float clouds = fbm(pos * 2.5 + vec3(0.5));

        // Diffuse lighting
        float diff = max(dot(vNormal, lightDir), 0.0);
        // Strong dark side — the dramatic light contrast
        float darkSide = smoothstep(0.0, 0.6, diff);

        // Base surface color mix
        vec3 color = mix(baseColor, brightColor, surface * 0.6);
        // Add cloud layer
        color = mix(color, cloudColor, clouds * 0.3 * darkSide);
        // Apply lighting — dark side very dark, lit side bright
        color = mix(baseColor * 0.15, color, darkSide);

        // Atmospheric scatter on the terminator (day/night boundary)
        float terminator = smoothstep(0.0, 0.15, diff) * (1.0 - smoothstep(0.1, 0.4, diff));
        color += vec3(0.3, 0.1, 0.6) * terminator * 0.8;

        gl_FragColor = vec4(color, 1.0);
      }
    `,
  }), [])

  // Animate time uniform for slow surface drift
  useFrame((_, delta) => {
    material.uniforms.time.value += delta
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.06
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 128, 128]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

function AtmosphereHaze({ radius }) {
  return (
    <mesh>
      <sphereGeometry args={[radius * 1.04, 64, 64]} />
      <meshStandardMaterial
        color="#5030A0"
        transparent
        opacity={0.12}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  )
}

function PlanetRing({ radius }) {
  // Wider, more visible ring with gradient-like opacity variation
  return (
    <group>
      {/* Main ring */}
      <mesh rotation={[Math.PI / 2.4, 0.05, 0]}>
        <torusGeometry args={[radius * 1.5, radius * 0.12, 2, 512]} />
        <meshStandardMaterial
          color="#7050C0"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          depthWrite={false}
          roughness={0.8}
        />
      </mesh>
      {/* Inner ring glow */}
      <mesh rotation={[Math.PI / 2.4, 0.05, 0]}>
        <torusGeometry args={[radius * 1.32, radius * 0.04, 2, 512]} />
        <meshStandardMaterial
          color="#A080FF"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      {/* Outer faint ring */}
      <mesh rotation={[Math.PI / 2.4, 0.05, 0]}>
        <torusGeometry args={[radius * 1.72, radius * 0.06, 2, 512]} />
        <meshStandardMaterial
          color="#4030A0"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

export function Planet({ radius = 7.5 }) {
  const meshRef = useRef()

  return (
    <group>
      {/* Self emission — makes nearby icons look lit */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#6030C0" distance={25} />

      {/* Procedural surface */}
      <PlanetSurface radius={radius} meshRef={meshRef} />

      {/* Layered atmosphere */}
      <AtmosphereHaze radius={radius} />
      <FresnelGlow radius={radius} />
      <PlanetRing radius={radius} />
    </group>
  )
}
