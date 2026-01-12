"use client";

import { Canvas } from "@react-three/fiber";
import { GameProvider, useGame } from "@/contexts/GameContext";
import {
  CameraController,
  Character,
  Ground,
  TargetMarker,
  Building,
  NPCCharacter,
  InfoSign,
  GuestbookWall,
} from "@/components/canvas";
import { Modal } from "@/components/ui/Modal";
import Link from "next/link";

function Scene() {
  const { mapData } = useGame();
  const { buildings, npcs, infoSignPosition, guestbookPosition } = mapData;

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 15, 10]} intensity={1} castShadow />

      <Ground />
      <Character />
      <TargetMarker />

      {/* 안내판 */}
      <InfoSign position={infoSignPosition} />

      {/* 건물들 */}
      {buildings.map((building) => (
        <Building key={building.id} data={building} />
      ))}

      {/* 방명록 */}
      <GuestbookWall position={guestbookPosition} />

      {/* NPC들 */}
      {npcs.map((npc) => (
        <NPCCharacter key={npc.id} data={npc} />
      ))}

      <CameraController />
    </>
  );
}

export default function InvitationPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <GameProvider mapId={params.id}>
      <main className="w-full h-screen relative">
        {/* 상단 네비게이션 */}
        <div className="absolute top-4 left-4 z-10">
          <Link
            href="/"
            className="px-4 py-2 bg-white/90 backdrop-blur rounded-full text-gray-700 hover:bg-white transition shadow-lg flex items-center gap-2"
          >
            <span>←</span>
            <span>홈으로</span>
          </Link>
        </div>

        {/* 안내 UI */}
        <div className="absolute top-4 right-4 z-10">
          <div className="px-4 py-2 bg-white/90 backdrop-blur rounded-lg text-sm text-gray-600 shadow-lg">
            화면을 터치하여 이동하세요
          </div>
        </div>

        {/* 3D Canvas */}
        <Canvas camera={{ fov: 60 }} shadows>
          <Scene />
        </Canvas>

        {/* 모달 */}
        <Modal />
      </main>
    </GameProvider>
  );
}
