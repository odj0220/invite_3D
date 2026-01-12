"use client";

import { useRef, useMemo, Suspense } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useInteraction } from "@/hooks/useInteraction";
import { useGame } from "@/contexts/GameContext";
import { NPCData, BodyType } from "@/types";

interface NPCCharacterProps {
  data: NPCData;
}

// 체형별 설정
const bodyTypeConfig: Record<BodyType, { bodyRadius: number; bodyHeight: number; scale: number }> = {
  slim: { bodyRadius: 0.28, bodyHeight: 0.7, scale: 0.95 },
  normal: { bodyRadius: 0.35, bodyHeight: 0.6, scale: 1 },
  chubby: { bodyRadius: 0.42, bodyHeight: 0.5, scale: 1.05 },
};

export function NPCCharacter({ data }: NPCCharacterProps) {
  const { id, position, color, label } = data;
  const { openModal, invitation } = useGame();
  const meshRef = useRef<THREE.Group>(null);

  // 캐릭터 정보 가져오기
  const isGroom = id === "groom";
  const characterData = useMemo(() => {
    if (!invitation) return null;
    return isGroom
      ? {
          height: invitation.groom_height,
          bodyType: invitation.groom_body_type,
          faceImage: invitation.groom_face_image,
        }
      : {
          height: invitation.bride_height,
          bodyType: invitation.bride_body_type,
          faceImage: invitation.bride_face_image,
        };
  }, [invitation, isGroom]);

  // 체형 설정
  const bodyConfig = bodyTypeConfig[characterData?.bodyType || "normal"];

  // 키에 따른 스케일 (160cm 기준, ±20cm 범위에서 조정)
  const heightScale = useMemo(() => {
    if (!characterData?.height) return 1;
    return 0.8 + (characterData.height - 140) * 0.005; // 140cm=0.8, 180cm=1.0, 200cm=1.1
  }, [characterData?.height]);

  const { isNear, hovered, setHovered, handleClick } = useInteraction(
    position,
    () => openModal(id)
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  const totalScale = heightScale * bodyConfig.scale;

  return (
    <group position={position}>
      <group ref={meshRef} scale={[totalScale, totalScale, totalScale]}>
        {/* 몸통 */}
        <mesh
          position={[0, 0.7, 0]}
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <capsuleGeometry args={[bodyConfig.bodyRadius, bodyConfig.bodyHeight, 4, 8]} />
          <meshStandardMaterial
            color={isNear && hovered ? "#ffd700" : color}
            opacity={isNear ? 1 : 0.8}
            transparent
          />
        </mesh>

        {/* 머리 */}
        <group position={[0, 1.4, 0]}>
          {/* 머리 뒷부분 */}
          <mesh>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial color="#ffd5b4" />
          </mesh>

          {/* 얼굴 (텍스처가 있으면 적용) */}
          {characterData?.faceImage && (
            <Suspense fallback={null}>
              <FaceTexture imageUrl={characterData.faceImage} />
            </Suspense>
          )}
        </group>
      </group>

      {/* 이름 라벨 */}
      <Text
        position={[0, 2 * totalScale, 0]}
        fontSize={0.35}
        color={isNear ? "#333" : "#999"}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>

      {isNear && (
        <Text
          position={[0, 2.4 * totalScale, 0]}
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

// 얼굴 텍스처 컴포넌트
function FaceTexture({ imageUrl }: { imageUrl: string }) {
  const texture = useLoader(THREE.TextureLoader, imageUrl);

  return (
    <mesh position={[0, 0, 0.2]} rotation={[0, 0, 0]}>
      <circleGeometry args={[0.2, 32]} />
      <meshBasicMaterial map={texture} side={THREE.FrontSide} />
    </mesh>
  );
}
