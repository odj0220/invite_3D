"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapTheme } from "@/types";

interface FormData {
  // 맵 테마
  mapTheme: MapTheme;

  // 예식 정보
  weddingDate: string;
  weddingTime: string;
  weddingVenue: string;
  weddingAddress: string;

  // 신랑 정보
  groomName: string;
  groomPhone: string;
  groomFather: string;
  groomMother: string;
  groomBank: string;
  groomAccount: string;

  // 신부 정보
  brideName: string;
  bridePhone: string;
  brideFather: string;
  brideMother: string;
  brideBank: string;
  brideAccount: string;

  // 교통 정보
  subway: string;
  bus: string;
  parking: string;
}

const initialFormData: FormData = {
  mapTheme: "garden",
  weddingDate: "",
  weddingTime: "",
  weddingVenue: "",
  weddingAddress: "",
  groomName: "",
  groomPhone: "",
  groomFather: "",
  groomMother: "",
  groomBank: "",
  groomAccount: "",
  brideName: "",
  bridePhone: "",
  brideFather: "",
  brideMother: "",
  brideBank: "",
  brideAccount: "",
  subway: "",
  bus: "",
  parking: "",
};

const mapThemes = [
  { id: "garden" as MapTheme, name: "클래식 가든", description: "정원 테마의 로맨틱한 분위기" },
  { id: "city" as MapTheme, name: "모던 시티", description: "도시적인 세련된 분위기" },
  { id: "forest" as MapTheme, name: "포레스트", description: "자연 속 힐링 컨셉" },
];

const steps = ["예식 정보", "신랑 정보", "신부 정보", "교통 정보", "미리보기"];

export default function CreatePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        map_theme: formData.mapTheme,
        wedding_date: formData.weddingDate,
        wedding_time: formData.weddingTime,
        venue_name: formData.weddingVenue,
        venue_address: formData.weddingAddress,
        groom_name: formData.groomName,
        groom_phone: formData.groomPhone,
        groom_father: formData.groomFather,
        groom_mother: formData.groomMother,
        bride_name: formData.brideName,
        bride_phone: formData.bridePhone,
        bride_father: formData.brideFather,
        bride_mother: formData.brideMother,
        transportation: `지하철: ${formData.subway}\n버스: ${formData.bus}\n주차: ${formData.parking}`,
        account_groom: formData.groomBank ? `${formData.groomBank} ${formData.groomAccount}` : "",
        account_bride: formData.brideBank ? `${formData.brideBank} ${formData.brideAccount}` : "",
      };

      const response = await fetch("/api/invitation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create invitation");
      }

      const { data } = await response.json();
      router.push(`/invitation/${data.id}`);
    } catch (error) {
      console.error("Error creating invitation:", error);
      alert("청첩장 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-pink-500">
            3D 청첩장
          </Link>
          <div className="text-sm text-gray-500">
            {currentStep + 1} / {steps.length}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`flex-1 py-4 text-sm font-medium border-b-2 transition ${
                  index === currentStep
                    ? "border-pink-500 text-pink-500"
                    : index < currentStep
                    ? "border-green-500 text-green-500"
                    : "border-transparent text-gray-400"
                }`}
              >
                {step}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step 1: 예식 정보 */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                예식 정보
              </h2>

              {/* 맵 테마 선택 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  청첩장 테마
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {mapThemes.map((theme) => (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => updateField("mapTheme", theme.id)}
                      className={`p-4 rounded-lg border-2 text-left transition ${
                        formData.mapTheme === theme.id
                          ? "border-pink-500 bg-pink-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="font-medium text-gray-800">{theme.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{theme.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    예식 날짜
                  </label>
                  <input
                    type="date"
                    value={formData.weddingDate}
                    onChange={(e) => updateField("weddingDate", e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    예식 시간
                  </label>
                  <input
                    type="time"
                    value={formData.weddingTime}
                    onChange={(e) => updateField("weddingTime", e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  예식장 이름
                </label>
                <input
                  type="text"
                  placeholder="예: 그랜드 웨딩홀"
                  value={formData.weddingVenue}
                  onChange={(e) => updateField("weddingVenue", e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  예식장 주소
                </label>
                <input
                  type="text"
                  placeholder="예: 서울시 강남구 테헤란로 123"
                  value={formData.weddingAddress}
                  onChange={(e) => updateField("weddingAddress", e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Step 2: 신랑 정보 */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                신랑 정보
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이름
                  </label>
                  <input
                    type="text"
                    placeholder="홍길동"
                    value={formData.groomName}
                    onChange={(e) => updateField("groomName", e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    연락처
                  </label>
                  <input
                    type="tel"
                    placeholder="010-1234-5678"
                    value={formData.groomPhone}
                    onChange={(e) => updateField("groomPhone", e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    아버지 성함
                  </label>
                  <input
                    type="text"
                    placeholder="홍판서"
                    value={formData.groomFather}
                    onChange={(e) => updateField("groomFather", e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    어머니 성함
                  </label>
                  <input
                    type="text"
                    placeholder="김순자"
                    value={formData.groomMother}
                    onChange={(e) => updateField("groomMother", e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    은행
                  </label>
                  <input
                    type="text"
                    placeholder="신한은행"
                    value={formData.groomBank}
                    onChange={(e) => updateField("groomBank", e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    계좌번호
                  </label>
                  <input
                    type="text"
                    placeholder="110-123-456789"
                    value={formData.groomAccount}
                    onChange={(e) => updateField("groomAccount", e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: 신부 정보 */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                신부 정보
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이름
                  </label>
                  <input
                    type="text"
                    placeholder="김영희"
                    value={formData.brideName}
                    onChange={(e) => updateField("brideName", e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    연락처
                  </label>
                  <input
                    type="tel"
                    placeholder="010-1234-5678"
                    value={formData.bridePhone}
                    onChange={(e) => updateField("bridePhone", e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    아버지 성함
                  </label>
                  <input
                    type="text"
                    placeholder="김철수"
                    value={formData.brideFather}
                    onChange={(e) => updateField("brideFather", e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    어머니 성함
                  </label>
                  <input
                    type="text"
                    placeholder="이영자"
                    value={formData.brideMother}
                    onChange={(e) => updateField("brideMother", e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    은행
                  </label>
                  <input
                    type="text"
                    placeholder="카카오뱅크"
                    value={formData.brideBank}
                    onChange={(e) => updateField("brideBank", e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    계좌번호
                  </label>
                  <input
                    type="text"
                    placeholder="3333-12-3456789"
                    value={formData.brideAccount}
                    onChange={(e) => updateField("brideAccount", e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: 교통 정보 */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                교통 정보
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  지하철
                </label>
                <input
                  type="text"
                  placeholder="2호선 강남역 3번 출구에서 도보 5분"
                  value={formData.subway}
                  onChange={(e) => updateField("subway", e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  버스
                </label>
                <input
                  type="text"
                  placeholder="140, 144, 145번 강남역 정류장 하차"
                  value={formData.bus}
                  onChange={(e) => updateField("bus", e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  주차 안내
                </label>
                <input
                  type="text"
                  placeholder="건물 지하 주차장 2시간 무료"
                  value={formData.parking}
                  onChange={(e) => updateField("parking", e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Step 5: 미리보기 */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                입력 정보 확인
              </h2>

              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-700 mb-2">테마</h3>
                  <p className="text-sm text-gray-600">
                    {mapThemes.find((t) => t.id === formData.mapTheme)?.name}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">예식 정보</h3>
                  <p className="text-sm text-gray-600">
                    {formData.weddingDate} {formData.weddingTime}
                  </p>
                  <p className="text-sm text-gray-600">{formData.weddingVenue}</p>
                  <p className="text-sm text-gray-600">{formData.weddingAddress}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-700 mb-2">신랑</h3>
                    <p className="text-sm text-gray-600">{formData.groomName}</p>
                    <p className="text-sm text-gray-600">{formData.groomPhone}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.groomFather} · {formData.groomMother}
                    </p>
                  </div>
                  <div className="p-4 bg-pink-50 rounded-lg">
                    <h3 className="font-semibold text-pink-700 mb-2">신부</h3>
                    <p className="text-sm text-gray-600">{formData.brideName}</p>
                    <p className="text-sm text-gray-600">{formData.bridePhone}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.brideFather} · {formData.brideMother}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">교통 정보</h3>
                  <p className="text-sm text-gray-600">지하철: {formData.subway}</p>
                  <p className="text-sm text-gray-600">버스: {formData.bus}</p>
                  <p className="text-sm text-gray-600">주차: {formData.parking}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={prevStep}
              disabled={currentStep === 0 || isSubmitting}
              className={`px-6 py-3 rounded-lg font-medium ${
                currentStep === 0 || isSubmitting
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              이전
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600"
              >
                다음
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-lg font-medium ${
                  isSubmitting
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                {isSubmitting ? "생성 중..." : "청첩장 생성하기"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
