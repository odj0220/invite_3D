import Link from "next/link";

const demos = [
  { id: "demo1", title: "클래식 가든", description: "정원 테마의 로맨틱한 청첩장" },
  { id: "demo2", title: "모던 시티", description: "도시적인 세련된 청첩장" },
  { id: "demo3", title: "포레스트", description: "자연 속 힐링 컨셉 청첩장" },
];

const features = [
  {
    title: "인터랙티브 3D 경험",
    description: "하객들이 직접 캐릭터를 움직이며 청첩장을 탐험합니다",
    icon: "🎮",
  },
  {
    title: "모바일 최적화",
    description: "어떤 기기에서도 완벽하게 작동하는 반응형 디자인",
    icon: "📱",
  },
  {
    title: "쉬운 커스터마이징",
    description: "간단한 정보 입력만으로 나만의 청첩장 완성",
    icon: "✨",
  },
  {
    title: "다양한 기능",
    description: "갤러리, 오시는 길, 축의금, 방명록까지 한 번에",
    icon: "📋",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          특별한 날을 위한
          <br />
          <span className="text-pink-500">3D 청첩장</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          평범한 모바일 청첩장은 이제 그만!
          <br />
          하객들이 직접 탐험하는 인터랙티브 3D 청첩장으로
          <br />
          특별한 초대장을 만들어보세요.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/create"
            className="px-8 py-4 bg-pink-500 text-white rounded-full font-semibold text-lg hover:bg-pink-600 transition shadow-lg"
          >
            청첩장 만들기
          </Link>
          <Link
            href="/invitation/demo1"
            className="px-8 py-4 bg-white text-pink-500 border-2 border-pink-500 rounded-full font-semibold text-lg hover:bg-pink-50 transition"
          >
            데모 보기
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          왜 3D 청첩장인가요?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            데모 청첩장
          </h2>
          <p className="text-center text-gray-600 mb-12">
            다양한 테마의 청첩장을 직접 체험해보세요
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {demos.map((demo) => (
              <Link
                key={demo.id}
                href={`/invitation/${demo.id}`}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
                  <div className="h-48 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
                    <span className="text-6xl">💒</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-pink-500 transition">
                      {demo.title}
                    </h3>
                    <p className="text-gray-600 mt-2">{demo.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          이용 방법
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {[
            { step: "1", title: "정보 입력", desc: "예식 정보와 사진 업로드" },
            { step: "2", title: "테마 선택", desc: "원하는 디자인 선택" },
            { step: "3", title: "공유하기", desc: "링크로 하객에게 전달" },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-16 h-16 bg-pink-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                {item.step}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
              {index < 2 && (
                <div className="hidden md:block text-4xl text-gray-300 ml-4">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-pink-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-pink-100 mb-8 text-lg">
            5분이면 나만의 특별한 청첩장을 만들 수 있어요
          </p>
          <Link
            href="/create"
            className="inline-block px-10 py-4 bg-white text-pink-500 rounded-full font-semibold text-lg hover:bg-pink-50 transition shadow-lg"
          >
            무료로 만들기
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-10">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 3D 청첩장. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
