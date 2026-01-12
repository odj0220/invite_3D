"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useInteraction } from "@/hooks/useInteraction";
import { useGame } from "@/contexts/GameContext";
import { NPCData } from "@/types";

interface NPCCharacterProps {
  data: NPCData;
}

export function NPCCharacter({ data }: NPCCharacterProps) {
  const { id, position, color, label } = data;
  const { openModal } = useGame();
  const meshRef = useRef<THREE.Group>(null);

  const { isNear, hovered, setHovered, handleClick } = useInteraction(
    position,
    () => openModal(id)
  );

  useFrame((state) => {
    // 살짝 위아래로 움직이는 애니메이션
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group position={position}>
      <group ref={meshRef}>
        {/* 몸통 */}
        <mesh
          position={[0, 0.7, 0]}
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <capsuleGeometry args={[0.35, 0.6, 4, 8]} />
          <meshStandardMaterial
            color={isNear && hovered ? "#ffd700" : color}
            opacity={isNear ? 1 : 0.8}
            transparent
          />
        </mesh>

        {/* 머리 */}
        <mesh position={[0, 1.4, 0]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#ffd5b4" />
        </mesh>
      </group>

      {/* 이름 라벨 */}
      <Text
        position={[0, 2, 0]}
        fontSize={0.35}
        color={isNear ? "#333" : "#999"}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>

      {isNear && (
        <Text
          position={[0, 2.4, 0]}
          fontSize={0.25}
          color="#22c55e"
          anchorX="center"
          anchorY="middle"
        >
          클릭하세요
        </Text>
      )}
    </group>
  );
}
