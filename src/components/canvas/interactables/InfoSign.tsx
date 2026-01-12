"use client";

import { Text } from "@react-three/drei";
import { useInteraction } from "@/hooks/useInteraction";
import { useGame } from "@/contexts/GameContext";

interface InfoSignProps {
  position: [number, number, number];
}

export function InfoSign({ position }: InfoSignProps) {
  const { openModal } = useGame();

  const { isNear, hovered, setHovered, handleClick } = useInteraction(
    position,
    () => openModal("info")
  );

  return (
    <group position={position}>
      {/* 기둥 */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* 표지판 */}
      <mesh
        position={[0, 1.8, 0]}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1.5, 1, 0.1]} />
        <meshStandardMaterial
          color={isNear && hovered ? "#ffd700" : "#f5f5dc"}
          opacity={isNear ? 1 : 0.7}
          transparent
        />
      </mesh>

      <Text
        position={[0, 1.8, 0.1]}
        fontSize={0.25}
        color={isNear ? "#333" : "#999"}
        anchorX="center"
      >
        예식 안내
      </Text>

      {isNear && (
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.25}
          color="#22c55e"
          anchorX="center"
        >
          클릭하세요
        </Text>
      )}
    </group>
  );
}
