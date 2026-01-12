import { MapData, BuildingData, NPCData, GroundStyle } from "@/types";

// 클래식 가든 테마
const gardenMap: MapData = {
  id: "demo1",
  theme: "garden",
  name: "클래식 가든",
  description: "정원 테마의 로맨틱한 청첩장",
  groundStyle: {
    grassColor: "#7ec850",
    plazaColor: "#d4c4a8",
    pathColor: "#c9b896",
  },
  buildings: [
    {
      id: "gallery",
      position: [-7, 0, 0],
      color: "#e8d4b8",
      label: "갤러리",
      size: [3, 2.5, 3],
    },
    {
      id: "transport",
      position: [7, 0, 0],
      color: "#b8d4e8",
      label: "오시는 길",
      size: [2.5, 2, 2.5],
    },
    {
      id: "gift",
      position: [-5, 0, 7],
      color: "#d4a574",
      label: "축의금",
      size: [2, 1.5, 2],
    },
  ],
  npcs: [
    {
      id: "groom",
      position: [-2, 0, 0],
      color: "#3b82f6",
      label: "신랑",
    },
    {
      id: "bride",
      position: [2, 0, 0],
      color: "#ec4899",
      label: "신부",
    },
  ],
  infoSignPosition: [0, 0, -3],
  guestbookPosition: [0, 0, -8],
};

// 모던 시티 테마
const cityMap: MapData = {
  id: "demo2",
  theme: "city",
  name: "모던 시티",
  description: "도시적인 세련된 청첩장",
  groundStyle: {
    grassColor: "#4a5568",
    plazaColor: "#718096",
    pathColor: "#a0aec0",
  },
  buildings: [
    {
      id: "gallery",
      position: [-8, 0, -2],
      color: "#2d3748",
      label: "갤러리",
      size: [3, 4, 3],
    },
    {
      id: "transport",
      position: [8, 0, -2],
      color: "#4a5568",
      label: "오시는 길",
      size: [3, 3.5, 3],
    },
    {
      id: "gift",
      position: [0, 0, 8],
      color: "#553c9a",
      label: "축의금",
      size: [2.5, 2, 2.5],
    },
  ],
  npcs: [
    {
      id: "groom",
      position: [-1.5, 0, -1],
      color: "#1a365d",
      label: "신랑",
    },
    {
      id: "bride",
      position: [1.5, 0, -1],
      color: "#702459",
      label: "신부",
    },
  ],
  infoSignPosition: [0, 0, -4],
  guestbookPosition: [-6, 0, 6],
};

// 포레스트 테마
const forestMap: MapData = {
  id: "demo3",
  theme: "forest",
  name: "포레스트",
  description: "자연 속 힐링 컨셉 청첩장",
  groundStyle: {
    grassColor: "#276749",
    plazaColor: "#68d391",
    pathColor: "#9ae6b4",
  },
  buildings: [
    {
      id: "gallery",
      position: [-6, 0, 3],
      color: "#744210",
      label: "갤러리",
      size: [3, 2, 3],
    },
    {
      id: "transport",
      position: [6, 0, 3],
      color: "#5a3e1b",
      label: "오시는 길",
      size: [2.5, 2, 2.5],
    },
    {
      id: "gift",
      position: [5, 0, -5],
      color: "#7b341e",
      label: "축의금",
      size: [2, 1.8, 2],
    },
  ],
  npcs: [
    {
      id: "groom",
      position: [-2, 0, -2],
      color: "#2c5282",
      label: "신랑",
    },
    {
      id: "bride",
      position: [2, 0, -2],
      color: "#b83280",
      label: "신부",
    },
  ],
  infoSignPosition: [0, 0, 2],
  guestbookPosition: [-5, 0, -6],
};

// 모든 맵 데이터
export const maps: Record<string, MapData> = {
  demo1: gardenMap,
  demo2: cityMap,
  demo3: forestMap,
};

// ID로 맵 가져오기
export function getMapById(id: string): MapData {
  return maps[id] || gardenMap; // 기본값은 가든
}

// 맵 목록 가져오기
export function getAllMaps(): MapData[] {
  return Object.values(maps);
}

// 하위 호환성을 위한 기존 export
export const buildings = gardenMap.buildings;
export const npcs = gardenMap.npcs;
export const infoSignPosition = gardenMap.infoSignPosition;
export const guestbookPosition = gardenMap.guestbookPosition;
