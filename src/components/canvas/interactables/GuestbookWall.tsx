"use client";

import { Text } from "@react-three/drei";
import { useInteraction } from "@/hooks/useInteraction";
import { useGame } from "@/contexts/GameContext";

interface GuestbookWallProps {
  position: [number, number, number];
}

const memoColors = ["#fffacd", "#e6e6fa", "#ffe4e1", "#e0ffff", "#fff0f5"];
const memoPositions: [number, number][] = [
  [-1, 1],
  [0, 0.8],
  [1, 1.2],
  [-0.5, 0.5],
  [0.5, 0.6],
];

export function GuestbookWall({ position }: GuestbookWallProps) {
  const { openModal } = useGame();

  const { isNear, hovered, setHovered, handleClick } = useInteraction(
    position,
    () => openModal("guestbook")
  );

  return (
    <group position={position}>
      <mesh
        position={[0, 1.25, 0]}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[4, 2.5, 0.3]} />
        <meshStandardMaterial
          color={isNear && hovered ? "#ffd700" : "#f0e6d3"}
          opacity={isNear ? 1 : 0.7}
          transparent
        />
      </mesh>

      <Text
        position={[0, 2.2, 0.2]}
        fontSize={0.35}
        color={isNear ? "#333" : "#999"}
        anchorX="center"
      >
        방명록
      </Text>

      {isNear && (
        <Text
          position={[0, 2.8, 0.2]}
          fontSize={0.25}
          color="#22c55e"
          anchorX="center"
        >
          클릭하세요
        </Text>
      )}

      {/* 메모지들 */}
      {memoPositions.map(([x, y], i) => (
        <mesh key={i} position={[x, y + 0.5, 0.2]}>
          <planeGeometry args={[0.5, 0.5]} />
          <meshStandardMaterial color={memoColors[i]} />
        </mesh>
      ))}
    </group>
  );
}
