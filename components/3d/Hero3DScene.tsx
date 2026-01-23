'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, MeshTransmissionMaterial, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

// Floating Architectural Cube
function ArchitecturalCube({ position, scale = 1, speed = 1 }: { position: [number, number, number], scale?: number, speed?: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 * speed) * 0.1;
            meshRef.current.rotation.y += 0.003 * speed;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <boxGeometry args={[1, 1, 1]} />
                <MeshTransmissionMaterial
                    backside
                    samples={16}
                    resolution={512}
                    transmission={0.95}
                    roughness={0.1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    thickness={0.5}
                    chromaticAberration={0.5}
                    anisotropy={0.3}
                    distortion={0.2}
                    distortionScale={0.2}
                    temporalDistortion={0.1}
                    color="#ffffff"
                />
            </mesh>
        </Float>
    );
}

// Wireframe Building
function WireframeBuilding({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
        }
    });

    return (
        <group ref={groupRef} position={position} scale={scale}>
            {/* Main tower */}
            <mesh position={[0, 2, 0]}>
                <boxGeometry args={[1.5, 4, 1.5]} />
                <meshBasicMaterial color="#ffffff" wireframe opacity={0.6} transparent />
            </mesh>
            {/* Base */}
            <mesh position={[0, -0.5, 0]}>
                <boxGeometry args={[2.5, 1, 2.5]} />
                <meshBasicMaterial color="#ffffff" wireframe opacity={0.3} transparent />
            </mesh>
            {/* Side wing
            <mesh position={[1.5, 0.5, 0]}>
                <boxGeometry args={[1, 2, 1.5]} />
                <meshBasicMaterial color="#ffffff" wireframe opacity={0.4} transparent />
            </mesh> */}
        </group>
    );
}

// Floating Sphere with Glass Effect
function GlassSphere({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.3;
        }
    });

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            <sphereGeometry args={[1, 64, 64]} />
            <MeshTransmissionMaterial
                backside
                samples={16}
                resolution={256}
                transmission={0.9}
                roughness={0}
                clearcoat={1}
                thickness={0.3}
                chromaticAberration={0.8}
                color="#ffffff"
            />
        </mesh>
    );
}

// Floating Ring
function FloatingRing({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
            meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
        }
    });

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            <torusGeometry args={[1, 0.1, 16, 100]} />
            <meshStandardMaterial
                color="#ffffff"
                metalness={0.9}
                roughness={0.1}
                emissive="#ffffff"
                emissiveIntensity={0.1}
            />
        </mesh>
    );
}

// Particle Field
function ParticleField() {
    const count = 200;
    const mesh = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return positions;
    }, []);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
            mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particles, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#ffffff"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

// Grid Floor
function GridFloor() {
    return (
        <group position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <gridHelper args={[30, 30, '#ffffff', '#333333']} rotation={[Math.PI / 2, 0, 0]} />
        </group>
    );
}

// Camera Animation
function CameraRig() {
    const { camera } = useThree();

    useFrame((state) => {
        camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.5;
        camera.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 0.15) * 0.3;
        camera.lookAt(0, 0, 0);
    });

    return null;
}

// Main 3D Scene
function Scene() {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
            <spotLight
                position={[0, 10, 0]}
                angle={0.3}
                penumbra={1}
                intensity={1}
                color="#ffffff"
            />

            {/* Environment for reflections */}
            <Environment preset="city" />

            {/* 3D Objects */}
            <ArchitecturalCube position={[3, 1, -2]} scale={1.2} speed={0.8} />
            {/* <ArchitecturalCube position={[-3, -1, -3]} scale={0.8} speed={1.2} /> */}
            <ArchitecturalCube position={[0, 2, -5]} scale={0.6} speed={1} />

            <WireframeBuilding position={[5, 0, -4]} scale={0.8} />
            <WireframeBuilding position={[-4, 0, -6]} scale={0.6} />

            {/* <GlassSphere position={[-2, 2, -3]} scale={0.5} /> */}
            <GlassSphere position={[4, -1, -2]} scale={0.3} />

            <FloatingRing position={[2, 3, -4]} scale={0.8} />
            <FloatingRing position={[-3, 1, -5]} scale={0.5} />

            <ParticleField />
            <GridFloor />

            <CameraRig />
        </>
    );
}

// Main Component Export
export function Hero3DScene() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <Scene />
            </Canvas>
        </div>
    );
}