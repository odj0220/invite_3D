"use client";

import { useEffect, useState, use } from "react";
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
import { Invitation } from "@/types";
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
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInvitation() {
      try {
        const response = await fetch(`/api/invitation/${id}`);
        if (!response.ok) {
          throw new Error("청첩장을 찾을 수 없습니다");
        }
        const { data } = await response.json();
        setInvitation(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "오류가 발생했습니다");
      } finally {
        setLoading(false);
      }
    }

    fetchInvitation();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">청첩장을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Link
            href="/"
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <GameProvider invitation={invitation}>
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
