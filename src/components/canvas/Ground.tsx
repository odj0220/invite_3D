"use client";

import { ThreeEvent } from "@react-three/fiber";
import { useGame } from "@/contexts/GameContext";

export function Ground() {
  const { setTargetPosition, mapData } = useGame();
  const { grassColor, plazaColor, pathColor } = mapData.groundStyle;

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setTargetPosition(e.point.clone());
  };

  return (
    <>
      {/* 전체 바닥 */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        onClick={handleClick}
      >
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color={grassColor} />
      </mesh>

      {/* 중앙 광장 */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 0]}
        onClick={handleClick}
      >
        <circleGeometry args={[4, 32]} />
        <meshStandardMaterial color={plazaColor} />
      </mesh>

      {/* 길 - 앞 */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, -5]}
        onClick={handleClick}
      >
        <planeGeometry args={[2, 6]} />
        <meshStandardMaterial color={pathColor} />
      </mesh>

      {/* 길 - 왼쪽 */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-5, 0.01, 0]}
        onClick={handleClick}
      >
        <planeGeometry args={[6, 2]} />
        <meshStandardMaterial color={pathColor} />
      </mesh>

      {/* 길 - 오른쪽 */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[5, 0.01, 0]}
        onClick={handleClick}
      >
        <planeGeometry args={[6, 2]} />
        <meshStandardMaterial color={pathColor} />
      </mesh>

      {/* 길 - 뒤 */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 5]}
        onClick={handleClick}
      >
        <planeGeometry args={[2, 6]} />
        <meshStandardMaterial color={pathColor} />
      </mesh>
    </>
  );
}
