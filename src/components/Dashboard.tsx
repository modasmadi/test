import React from 'react';
import { Language, UserProgress, LessonType } from '../types';
import { getLessons } from '../data/lessons';

interface DashboardProps {
  language: Language;
  progress: UserProgress;
  onStartLesson: (lessonId: string) => void;
  onStartImmersion: () => void;
  onViewProgress: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  language,
  progress,
  onStartLesson,
  onStartImmersion,
  onViewProgress
}) => {
  const lessons = getLessons(language);
  const languageFlag = language === 'english' ? '🇺🇸' : '🇪🇸';
  const languageName = language === 'english' ? 'الإنجليزية' : 'الإسبانية';

  const getLevelName = (level: number) => {
    const names = ['مبتدئ', 'أساسي', 'متوسط', 'متقدم', 'متميز'];
    return names[level - 1] || names[0];
  };

  const getTypeIcon = (type: LessonType) => {
    const icons = {
      listening: '🎧',
      speaking: '🎤',
      vocabulary: '📚',
      grammar: '📝',
      immersion: '🌍'
    };
    return icons[type];
  };

  const getTypeColor = (type: LessonType) => {
    const colors = {
      listening: 'from-blue-500 to-cyan-500',
      speaking: 'from-purple-500 to-pink-500',
      vocabulary: 'from-green-500 to-emerald-500',
      grammar: 'from-orange-500 to-yellow-500',
      immersion: 'from-indigo-500 to-purple-500'
    };
    return colors[type];
  };

  const isLessonCompleted = (lessonId: string) => {
    return progress.completedLessons.includes(lessonId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{languageFlag}</span>
            <div>
              <h1 className="text-white font-bold">{languageName}</h1>
              <p className="text-slate-400 text-sm">المستوى: {getLevelName(progress.level)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Streak */}
            <div className="flex items-center gap-1 bg-orange-500/20 px-3 py-1 rounded-full">
              <span>🔥</span>
              <span className="text-orange-400 font-bold">{progress.streak}</span>
            </div>
            
            {/* XP */}
            <div className="flex items-center gap-1 bg-indigo-500/20 px-3 py-1 rounded-full">
              <span>⚡</span>
              <span className="text-indigo-400 font-bold">{progress.xp}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 pb-24">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-slate-800 rounded-2xl p-4 text-center border border-slate-700">
            <div className="text-2xl mb-1">🎧</div>
            <div className="text-xl font-bold text-white">{progress.listeningScore}%</div>
            <div className="text-slate-400 text-xs">استماع</div>
          </div>
          <div className="bg-slate-800 rounded-2xl p-4 text-center border border-slate-700">
            <div className="text-2xl mb-1">🎤</div>
            <div className="text-xl font-bold text-white">{progress.speakingScore}%</div>
            <div className="text-slate-400 text-xs">تحدث</div>
          </div>
          <div className="bg-slate-800 rounded-2xl p-4 text-center border border-slate-700">
            <div className="text-2xl mb-1">📚</div>
            <div className="text-xl font-bold text-white">{progress.vocabularyMastered}</div>
            <div className="text-slate-400 text-xs">كلمة</div>
          </div>
        </div>

        {/* Immersion Feature */}
        <button
          onClick={onStartImmersion}
          className="w-full mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 text-left relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-4xl">🌍</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm text-white">جديد</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">يومك في البلد</h2>
            <p className="text-purple-100">
              عش يوماً كاملاً باللغة {languageName} - من الصباح حتى المساء
            </p>
          </div>
          <div className="absolute -right-4 -bottom-4 text-8xl opacity-20 group-hover:scale-110 transition-transform">
            🏙️
          </div>
        </button>

        {/* Lessons */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>📖</span>
            دروس اليوم
          </h2>
          
          <div className="space-y-4">
            {lessons.slice(0, 5).map((lesson) => {
              const completed = isLessonCompleted(lesson.id);
              
              return (
                <button
                  key={lesson.id}
                  onClick={() => onStartLesson(lesson.id)}
                  className={`w-full bg-slate-800 rounded-2xl p-5 text-left border transition-all hover:scale-[1.02] ${
                    completed ? 'border-green-500/50' : 'border-slate-700 hover:border-indigo-500'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Lesson number/icon */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${getTypeColor(lesson.type)} flex items-center justify-center text-2xl flex-shrink-0`}>
                      {completed ? '✓' : getTypeIcon(lesson.type)}
                    </div>
                    
                    {/* Lesson info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-semibold truncate">{lesson.titleAr}</h3>
                        {completed && (
                          <span className="text-green-400 text-xs bg-green-400/20 px-2 py-0.5 rounded-full">مكتمل</span>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm truncate">{lesson.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-slate-500 text-xs flex items-center gap-1">
                          <span>⏱️</span> {lesson.duration} دقيقة
                        </span>
                        <span className="text-slate-500 text-xs flex items-center gap-1">
                          <span>⚡</span> +{lesson.xpReward} XP
                        </span>
                        <span className="text-slate-500 text-xs">
                          {'⭐'.repeat(lesson.difficulty)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* View all progress button */}
        <button
          onClick={onViewProgress}
          className="w-full bg-slate-800 rounded-2xl p-4 text-center border border-slate-700 hover:border-indigo-500 transition-colors"
        >
          <span className="text-indigo-400 font-medium">عرض كل التقدم والإحصائيات →</span>
        </button>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-700 py-3 px-6">
        <div className="max-w-4xl mx-auto flex justify-around">
          <button className="flex flex-col items-center text-indigo-400">
            <span className="text-2xl mb-1">🏠</span>
            <span className="text-xs">الرئيسية</span>
          </button>
          <button 
            onClick={onStartImmersion}
            className="flex flex-col items-center text-slate-400 hover:text-white transition-colors"
          >
            <span className="text-2xl mb-1">🌍</span>
            <span className="text-xs">المحاكاة</span>
          </button>
          <button 
            onClick={onViewProgress}
            className="flex flex-col items-center text-slate-400 hover:text-white transition-colors"
          >
            <span className="text-2xl mb-1">📊</span>
            <span className="text-xs">التقدم</span>
          </button>
          <button className="flex flex-col items-center text-slate-400 hover:text-white transition-colors">
            <span className="text-2xl mb-1">⚙️</span>
            <span className="text-xs">الإعدادات</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
