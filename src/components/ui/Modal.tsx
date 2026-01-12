"use client";

import { useGame } from "@/contexts/GameContext";
import { InteractionType, Invitation } from "@/types";

function getModalContent(type: InteractionType, invitation: Invitation | null) {
  // invitation이 없으면 기본 데모 데이터 사용
  const data = invitation || {
    wedding_date: "2025-01-01",
    wedding_time: "14:00",
    venue_name: "OO웨딩홀",
    venue_address: "서울시 OO구 OO동",
    groom_name: "홍길동",
    groom_phone: "010-0000-0000",
    groom_father: "홍판서",
    groom_mother: "김순자",
    bride_name: "김영희",
    bride_phone: "010-0000-0000",
    bride_father: "김철수",
    bride_mother: "이영자",
    transportation: "지하철: O호선 OO역\n버스: OOO번\n주차: 지하주차장 이용가능",
    account_groom: "OO은행 000-000-000000",
    account_bride: "OO은행 000-000-000000",
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const contents: Record<InteractionType, { title: string; body: React.ReactNode }> = {
    info: {
      title: "예식 안내",
      body: (
        <div className="space-y-2">
          <p>
            <strong>일시:</strong> {formatDate(data.wedding_date)} {data.wedding_time}
          </p>
          <p>
            <strong>장소:</strong> {data.venue_name}
          </p>
          <p>
            <strong>주소:</strong> {data.venue_address}
          </p>
          <div className="mt-4 pt-4 border-t">
            <p>
              <strong>신랑:</strong> {data.groom_father} · {data.groom_mother}의 아들 {data.groom_name}
            </p>
            <p>
              <strong>신부:</strong> {data.bride_father} · {data.bride_mother}의 딸 {data.bride_name}
            </p>
          </div>
        </div>
      ),
    },
    gallery: {
      title: "갤러리",
      body: (
        <div className="text-center">
          <p className="text-gray-500">웨딩 사진이 표시됩니다</p>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-200 h-24 rounded flex items-center justify-center"
              >
                사진 {i}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    transport: {
      title: "오시는 길",
      body: (
        <div className="space-y-2">
          <p>
            <strong>장소:</strong> {data.venue_name}
          </p>
          <p>
            <strong>주소:</strong> {data.venue_address}
          </p>
          <div className="mt-4 pt-4 border-t space-y-1">
            {data.transportation.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      ),
    },
    gift: {
      title: "축의금",
      body: (
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded">
            <p className="font-semibold">신랑측</p>
            <p className="text-sm">{data.account_groom || "계좌 정보 없음"}</p>
            <p className="text-sm text-gray-600">예금주: {data.groom_name}</p>
          </div>
          <div className="p-3 bg-pink-50 rounded">
            <p className="font-semibold">신부측</p>
            <p className="text-sm">{data.account_bride || "계좌 정보 없음"}</p>
            <p className="text-sm text-gray-600">예금주: {data.bride_name}</p>
          </div>
        </div>
      ),
    },
    guestbook: {
      title: "방명록",
      body: (
        <div className="space-y-3">
          <textarea
            className="w-full p-2 border rounded h-24"
            placeholder="축하 메시지를 남겨주세요..."
          />
          <button className="w-full py-2 bg-pink-400 text-white rounded hover:bg-pink-500">
            작성하기
          </button>
        </div>
      ),
    },
    groom: {
      title: "신랑 소개",
      body: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-4xl">🤵</span>
            </div>
            <h3 className="text-xl font-bold">{data.groom_name}</h3>
            <p className="text-gray-500">신랑</p>
          </div>
          <div className="space-y-2 text-sm">
            <p>
              <strong>아버지:</strong> {data.groom_father}
            </p>
            <p>
              <strong>어머니:</strong> {data.groom_mother}
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded text-center">
            <p className="text-sm text-gray-600 mb-2">신랑에게 연락하기</p>
            <a href={`tel:${data.groom_phone}`} className="font-mono text-blue-600">
              {data.groom_phone}
            </a>
          </div>
        </div>
      ),
    },
    bride: {
      title: "신부 소개",
      body: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-24 h-24 bg-pink-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-4xl">👰</span>
            </div>
            <h3 className="text-xl font-bold">{data.bride_name}</h3>
            <p className="text-gray-500">신부</p>
          </div>
          <div className="space-y-2 text-sm">
            <p>
              <strong>아버지:</strong> {data.bride_father}
            </p>
            <p>
              <strong>어머니:</strong> {data.bride_mother}
            </p>
          </div>
          <div className="p-3 bg-pink-50 rounded text-center">
            <p className="text-sm text-gray-600 mb-2">신부에게 연락하기</p>
            <a href={`tel:${data.bride_phone}`} className="font-mono text-pink-600">
              {data.bride_phone}
            </a>
          </div>
        </div>
      ),
    },
  };

  return contents[type];
}

export function Modal() {
  const { activeModal, closeModal, invitation } = useGame();

  if (!activeModal) return null;

  const { title, body } = getModalContent(activeModal, invitation);

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
