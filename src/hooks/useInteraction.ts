"use client";

import { useState } from "react";
import { useFrame } from "@react-three/fiber";
import { characterPositionRef } from "@/contexts/GameContext";
import { InteractionType, UseInteractionResult } from "@/types";

const INTERACTION_DISTANCE = 4;

// 거리 계산 함수
function calculateDistance(
  position: [number, number, number]
): number {
  const charPos = characterPositionRef.current;
  const dx = charPos.x - position[0];
  const dz = charPos.z - position[2];
  return Math.sqrt(dx * dx + dz * dz);
}

// 인터랙션 훅
export function useInteraction(
  position: [number, number, number],
  onInteract: () => void
): UseInteractionResult {
  const [isNear, setIsNear] = useState(false);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    const distance = calculateDistance(position);
    setIsNear(distance < INTERACTION_DISTANCE);
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (isNear) {
      onInteract();
    }
  };

  return {
    isNear,
    hovered,
    setHovered,
    handleClick,
  };
}

// 거리 체크만 필요한 경우
export function useNearCheck(position: [number, number, number]): boolean {
  const [isNear, setIsNear] = useState(false);

  useFrame(() => {
    const distance = calculateDistance(position);
    setIsNear(distance < INTERACTION_DISTANCE);
  });

  return isNear;
}