import { InteractionType, ModalContent } from "@/types";

export const modalContents: Record<InteractionType, ModalContent> = {
  info: {
    title: "예식 안내",
    body: (
      <div className="space-y-2">
        <p>
          <strong>일시:</strong> 2025년 O월 O일 오후 O시
        </p>
        <p>
          <strong>장소:</strong> OO웨딩홀
        </p>
        <p>
          <strong>신랑:</strong> 홍길동
        </p>
        <p>
          <strong>신부:</strong> 김영희
        </p>
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
          <strong>주소:</strong> 서울시 OO구 OO동
        </p>
        <p>
          <strong>지하철:</strong> O호선 OO역 O번 출구
        </p>
        <p>
          <strong>버스:</strong> OOO, OOO번
        </p>
        <p>
          <strong>주차:</strong> 지하 주차장 이용 가능
        </p>
      </div>
    ),
  },
  gift: {
    title: "축의금",
    body: (
      <div className="space-y-3">
        <div className="p-3 bg-blue-50 rounded">
          <p className="font-semibold">신랑측</p>
          <p className="text-sm">OO은행 000-000-000000</p>
          <p className="text-sm text-gray-600">예금주: 홍길동</p>
        </div>
        <div className="p-3 bg-pink-50 rounded">
          <p className="font-semibold">신부측</p>
          <p className="text-sm">OO은행 000-000-000000</p>
          <p className="text-sm text-gray-600">예금주: 김영희</p>
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
          <h3 className="text-xl font-bold">홍길동</h3>
          <p className="text-gray-500">신랑</p>
        </div>
        <div className="space-y-2 text-sm">
          <p>
            <strong>생년월일:</strong> 1990년 O월 O일
          </p>
          <p>
            <strong>직업:</strong> OO회사 개발자
          </p>
          <p>
            <strong>취미:</strong> 등산, 독서
          </p>
          <p>
            <strong>MBTI:</strong> INTJ
          </p>
        </div>
        <div className="p-3 bg-blue-50 rounded text-center">
          <p className="text-sm text-gray-600 mb-2">신랑에게 연락하기</p>
          <p className="font-mono">010-0000-0000</p>
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
          <h3 className="text-xl font-bold">김영희</h3>
          <p className="text-gray-500">신부</p>
        </div>
        <div className="space-y-2 text-sm">
          <p>
            <strong>생년월일:</strong> 1992년 O월 O일
          </p>
          <p>
            <strong>직업:</strong> OO병원 간호사
          </p>
          <p>
            <strong>취미:</strong> 요리, 여행
          </p>
          <p>
            <strong>MBTI:</strong> ENFP
          </p>
        </div>
        <div className="p-3 bg-pink-50 rounded text-center">
          <p className="text-sm text-gray-600 mb-2">신부에게 연락하기</p>
          <p className="font-mono">010-0000-0000</p>
        </div>
      </div>
    ),
  },
};