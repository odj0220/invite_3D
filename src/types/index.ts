import * as THREE from "three";

// 인터랙션 가능한 오브젝트 타입
export type InteractionType =
  | "info"
  | "gallery"
  | "transport"
  | "gift"
  | "guestbook"
  | "groom"
  | "bride";

// 맵 테마 타입
export type MapTheme = "garden" | "city" | "forest";

// 건물 데이터 타입
export interface BuildingData {
  id: InteractionType;
  position: [number, number, number];
  color: string;
  label: string;
  size?: [number, number, number];
}

// NPC 데이터 타입
export interface NPCData {
  id: InteractionType;
  position: [number, number, number];
  color: string;
  label: string;
}

// 바닥 스타일 타입
export interface GroundStyle {
  grassColor: string;
  plazaColor: string;
  pathColor: string;
}

// 맵 데이터 타입
export interface MapData {
  id: string;
  theme: MapTheme;
  name: string;
  description: string;
  groundStyle: GroundStyle;
  buildings: BuildingData[];
  npcs: NPCData[];
  infoSignPosition: [number, number, number];
  guestbookPosition: [number, number, number];
}

// 모달 콘텐츠 타입
export interface ModalContent {
  title: string;
  body: React.ReactNode;
}

// 게임 상태 타입
export interface GameState {
  targetPosition: THREE.Vector3;
  activeModal: InteractionType | null;
  characterPosition: THREE.Vector3;
}

// 게임 액션 타입
export interface GameActions {
  setTargetPosition: (pos: THREE.Vector3) => void;
  openModal: (type: InteractionType) => void;
  closeModal: () => void;
}

// 인터랙션 훅 반환 타입
export interface UseInteractionResult {
  isNear: boolean;
  hovered: boolean;
  setHovered: (value: boolean) => void;
  handleClick: (e: { stopPropagation: () => void }) => void;
}