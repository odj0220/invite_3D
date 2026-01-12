"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import * as THREE from "three";
import { InteractionType, MapData } from "@/types";
import { getMapById } from "@/data/mapData";

// 캐릭터 위치 ref (Three.js 렌더링 루프에서 직접 접근)
export const characterPositionRef = { current: new THREE.Vector3(0, 0.5, 0) };

// Context 타입
interface GameContextType {
  targetPosition: THREE.Vector3;
  activeModal: InteractionType | null;
  mapData: MapData;
  setTargetPosition: (pos: THREE.Vector3) => void;
  openModal: (type: InteractionType) => void;
  closeModal: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

// Provider 컴포넌트
interface GameProviderProps {
  children: ReactNode;
  mapId?: string;
}

export function GameProvider({ children, mapId = "demo1" }: GameProviderProps) {
  const [targetPosition, setTargetPositionState] = useState(
    () => new THREE.Vector3(0, 0, 0)
  );
  const [activeModal, setActiveModal] = useState<InteractionType | null>(null);
  const mapData = getMapById(mapId);

  const setTargetPosition = (pos: THREE.Vector3) => {
    setTargetPositionState(pos.clone());
  };

  const openModal = (type: InteractionType) => {
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <GameContext.Provider
      value={{
        targetPosition,
        activeModal,
        mapData,
        setTargetPosition,
        openModal,
        closeModal,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

// Custom hook for using game context
export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}