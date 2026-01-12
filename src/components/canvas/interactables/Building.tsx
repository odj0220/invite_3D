"use client";

import { Text } from "@react-three/drei";
import { useInteraction } from "@/hooks/useInteraction";
import { useGame } from "@/contexts/GameContext";
import { BuildingData } from "@/types";

interface BuildingProps {
  data: BuildingData;
}

export function Building({ data }: BuildingProps) {
  const { id, position, color, label, size = [2, 2, 2] } = data;
  const { openModal } = useGame();

  const { isNear, hovered, setHovered, handleClick } = useInteraction(
    position,
    () => openModal(id)
  );

  return (
    <group position={position}>
      <mesh
        position={[0, size[1] / 2, 0]}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={isNear && hovered ? "#ffd700" : color}
          opacity={isNear ? 1 : 0.7}
          transparent
        />
      </mesh>

      <Text
        position={[0, size[1] + 0.5, 0]}
        fontSize={0.4}
        color={isNear ? "#333" : "#999"}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>

      {isNear && (
        <Text
          position={[0, size[1] + 1, 0]}
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