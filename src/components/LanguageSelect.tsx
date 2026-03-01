import React from 'react';
import { languages } from '../data/languages';
import { Language } from '../types';

interface LanguageSelectProps {
  onSelect: (language: Language) => void;
}

export const LanguageSelect: React.FC<LanguageSelectProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">اختر اللغة التي تريد تعلمها</h1>
        <p className="text-slate-400 text-lg">Which language do you want to master?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => onSelect(lang.id)}
            className="group relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl p-8 text-left hover:from-indigo-900 hover:to-purple-900 transition-all duration-300 border border-slate-600 hover:border-indigo-500 hover:scale-105"
          >
            <span className="text-7xl mb-4 block group-hover:scale-110 transition-transform">{lang.flag}</span>
            <h2 className="text-2xl font-bold text-white mb-1">{lang.name}</h2>
            <p className="text-slate-400 mb-2">{lang.nativeName}</p>
            <div className="flex items-center text-slate-500 text-sm">
              <span>📍 {lang.country}</span>
            </div>
            
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-700 group-hover:bg-indigo-600 flex items-center justify-center transition-colors">
              <svg className="w-5 h-5 text-slate-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      <p className="mt-8 text-slate-500 text-sm">
        المزيد من اللغات قريباً: 🇫🇷 🇩🇪 🇮🇹 🇯🇵 🇨🇳
      </p>
    </div>
  );
};
