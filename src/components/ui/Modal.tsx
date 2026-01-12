"use client";

import { useGame } from "@/contexts/GameContext";
import { modalContents } from "@/data/modalContents";

export function Modal() {
  const { activeModal, closeModal } = useGame();

  if (!activeModal) return null;

  const { title, body } = modalContents[activeModal];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            &times;
          </button>
        </div>
        {body}
      </div>
    </div>
  );
}
