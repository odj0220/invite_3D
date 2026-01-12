"use client";

import { useGame } from "@/contexts/GameContext";

export function TargetMarker() {
  const { targetPosition } = useGame();

  return (
    <mesh
      position={[targetPosition.x, 0.05, targetPosition.z]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <ringGeometry args={[0.3, 0.5, 32]} />
      <meshBasicMaterial color="#ff6b6b" transparent opacity={0.7} />
    </mesh>
  );
}