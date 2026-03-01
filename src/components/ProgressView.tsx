import React from 'react';
import { UserProgress, Language } from '../types';

interface ProgressViewProps {
  progress: UserProgress;
  language: Language;
  onClose: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  progress,
  language,
  onClose
}) => {
  const languageName = language === 'english' ? 'الإنجليزية' : 'الإسبانية';
  const languageFlag = language === 'english' ? '🇺🇸' : '🇪🇸';

  const getLevelInfo = (level: number) => {
    const levels = [
      { name: 'مبتدئ', nameEn: 'Beginner', emoji: '🌱', color: 'from-green-500 to-emerald-600', nextXP: 500 },
      { name: 'أساسي', nameEn: 'Elementary', emoji: '🌿', color: 'from-blue-500 to-cyan-600', nextXP: 1500 },
      { name: 'متوسط', nameEn: 'Intermediate', emoji: '🌳', color: 'from-purple-500 to-pink-600', nextXP: 3500 },
      { name: 'متقدم', nameEn: 'Advanced', emoji: '🏆', color: 'from-yellow-500 to-orange-600', nextXP: 7000 },
      { name: 'متميز', nameEn: 'Fluent', emoji: '👑', color: 'from-amber-500 to-red-600', nextXP: 15000 }
    ];
    return levels[level - 1] || levels[0];
  };

  const levelInfo = getLevelInfo(progress.level);
  const xpProgress = progress.xp % (levelInfo.nextXP / progress.level);
  const xpNeeded = levelInfo.nextXP / progress.level;
  const progressPercent = (xpProgress / xpNeeded) * 100;

  const skills = [
    { name: 'الاستماع', nameEn: 'Listening', icon: '🎧', score: progress.listeningScore, color: 'from-blue-500 to-cyan-500' },
    { name: 'التحدث', nameEn: 'Speaking', icon: '🎤', score: progress.speakingScore, color: 'from-purple-500 to-pink-500' },
    { name: 'القراءة', nameEn: 'Reading', icon: '📖', score: progress.readingScore, color: 'from-green-500 to-emerald-500' }
  ];

  const achievements = [
    { id: 'first-lesson', name: 'الدرس الأول', icon: '🎯', unlocked: progress.completedLessons.length >= 1 },
    { id: 'week-streak', name: 'أسبوع متواصل', icon: '🔥', unlocked: progress.streak >= 7 },
    { id: 'vocab-50', name: '50 كلمة', icon: '📚', unlocked: progress.vocabularyMastered >= 50 },
    { id: 'vocab-100', name: '100 كلمة', icon: '📖', unlocked: progress.vocabularyMastered >= 100 },
    { id: 'speak-master', name: 'متحدث بارع', icon: '🎤', unlocked: progress.speakingScore >= 80 },
    { id: 'listen-master', name: 'مستمع ماهر', icon: '🎧', unlocked: progress.listeningScore >= 80 },
    { id: 'five-lessons', name: '5 دروس', icon: '⭐', unlocked: progress.completedLessons.length >= 5 },
    { id: 'ten-lessons', name: '10 دروس', icon: '🌟', unlocked: progress.completedLessons.length >= 10 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-700 transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h1 className="text-white font-medium">التقدم والإحصائيات</h1>
          
          <div className="w-10" /> {/* Spacer */}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 pb-24">
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl p-6 border border-slate-600 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${levelInfo.color} flex items-center justify-center text-4xl`}>
              {levelInfo.emoji}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{levelInfo.name}</h2>
              <p className="text-slate-400">{levelInfo.nameEn}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl">{languageFlag}</span>
                <span className="text-slate-300">{languageName}</span>
              </div>
            </div>
          </div>

          {/* XP Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">التقدم للمستوى التالي</span>
              <span className="text-indigo-400">{Math.round(xpProgress)} / {Math.round(xpNeeded)} XP</span>
            </div>
            <div className="h-3 bg-slate-600 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${levelInfo.color} transition-all duration-500`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{progress.xp}</div>
              <div className="text-slate-400 text-sm">⚡ XP</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">{progress.streak}</div>
              <div className="text-slate-400 text-sm">🔥 أيام متتالية</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{progress.completedLessons.length}</div>
              <div className="text-slate-400 text-sm">✅ دروس</div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white mb-4">📊 المهارات</h3>
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.name} className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <div>
                      <p className="text-white font-medium">{skill.name}</p>
                      <p className="text-slate-400 text-sm">{skill.nameEn}</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-white">{skill.score}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-500`}
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vocabulary */}
        <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📚</span>
              <div>
                <p className="text-white font-medium">المفردات المتعلمة</p>
                <p className="text-slate-400 text-sm">Vocabulary Mastered</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-400">{progress.vocabularyMastered}</p>
              <p className="text-slate-400 text-sm">كلمة</p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white mb-4">🏆 الإنجازات</h3>
          <div className="grid grid-cols-4 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-3 transition-all ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br from-indigo-500/30 to-purple-500/30 border border-indigo-500/50' 
                    : 'bg-slate-800 border border-slate-700 opacity-50'
                }`}
              >
                <span className={`text-3xl mb-1 ${!achievement.unlocked && 'grayscale'}`}>
                  {achievement.icon}
                </span>
                <span className="text-xs text-center text-slate-300 leading-tight">
                  {achievement.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Motivation */}
        <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl p-5 border border-indigo-500/30 text-center">
          <p className="text-xl text-white mb-2">🌟 استمر في التقدم!</p>
          <p className="text-slate-300 text-sm">
            أنت على الطريق الصحيح لإتقان اللغة {languageName}
          </p>
        </div>
      </main>
    </div>
  );
};
