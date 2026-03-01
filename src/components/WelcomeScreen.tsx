import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex flex-col items-center justify-center p-6 text-white">
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl animate-bounce" style={{ animationDuration: '3s' }}>🌍</div>
        <div className="absolute top-40 right-20 text-5xl animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>💬</div>
        <div className="absolute bottom-40 left-20 text-5xl animate-bounce" style={{ animationDuration: '2.8s', animationDelay: '1s' }}>🎯</div>
        <div className="absolute bottom-20 right-10 text-6xl animate-bounce" style={{ animationDuration: '3.2s', animationDelay: '0.3s' }}>🚀</div>
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        {/* Logo */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <span className="text-5xl">🗣️</span>
          </div>
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Fluency
          </h1>
          <p className="text-purple-200 text-xl">فلونسي</p>
        </div>

        {/* Tagline */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          تحدث كما لو عشت سنة في البلد
        </h2>
        <p className="text-purple-200 text-lg mb-8 leading-relaxed">
          ليس مجرد تعلم قواعد... بل محاكاة حقيقية للحياة اليومية
          <br />
          تحدث، استمع، وعش اللغة
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
            <span className="text-3xl mb-2 block">🎧</span>
            <p className="text-sm">محادثات حقيقية</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
            <span className="text-3xl mb-2 block">🎤</span>
            <p className="text-sm">تدريب على النطق</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
            <span className="text-3xl mb-2 block">🏠</span>
            <p className="text-sm">محاكاة يومك</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
            <span className="text-3xl mb-2 block">📈</span>
            <p className="text-sm">تقدم ذكي</p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="bg-white text-indigo-900 font-bold text-xl px-12 py-4 rounded-full shadow-2xl hover:scale-105 transition-transform duration-200 hover:shadow-white/25"
        >
          ابدأ رحلتك 🚀
        </button>

        <p className="mt-6 text-purple-300 text-sm">
          مجاني • بدون تسجيل • ابدأ فوراً
        </p>
      </div>
    </div>
  );
};
