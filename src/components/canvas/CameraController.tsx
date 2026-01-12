"use client";

import { useThree } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { characterPositionRef } from "@/contexts/GameContext";

const cameraOffset = new THREE.Vector3(0, 8, 10);

export function CameraController() {
  const { camera } = useThree();

  useFrame(() => {
    const charPos = characterPositionRef.current;
    camera.position.set(
      charPos.x + cameraOffset.x,
      charPos.y + cameraOffset.y,
      charPos.z + cameraOffset.z
    );
    camera.lookAt(charPos.x, charPos.y, charPos.z);
  });

  return null;
}