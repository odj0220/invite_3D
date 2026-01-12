"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { characterPositionRef } from "@/contexts/GameContext";
import { useGame } from "@/contexts/GameContext";

const SPEED = 3;

export function Character() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { targetPosition } = useGame();

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const current = meshRef.current.position;
    const direction = new THREE.Vector3()
      .subVectors(targetPosition, current)
      .setY(0);

    if (direction.length() > 0.1) {
      direction.normalize();
      current.x += direction.x * SPEED * delta;
      current.z += direction.z * SPEED * delta;
      meshRef.current.lookAt(targetPosition.x, current.y, targetPosition.z);
    }

    characterPositionRef.current.copy(current);
  });

  return (
    <mesh ref={meshRef} position={[0, 0.5, 0]}>
      <capsuleGeometry args={[0.3, 0.5, 4, 8]} />
      <meshStandardMaterial color="#4a90d9" />
    </mesh>
  );
}