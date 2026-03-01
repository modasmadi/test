import React, { useState } from 'react';
import { Lesson } from '../types';
import { useSpeech, useSpeechRecognition } from '../hooks/useSpeech';

interface LessonViewProps {
  lesson: Lesson;
  language: 'english' | 'spanish';
  onComplete: (xp: number) => void;
  onClose: () => void;
}

type LessonPhase = 'intro' | 'dialogue' | 'vocabulary' | 'practice' | 'complete';

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  language,
  onComplete,
  onClose
}) => {
  const [phase, setPhase] = useState<LessonPhase>('intro');
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [vocabIndex, setVocabIndex] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [earnedXP, setEarnedXP] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const { speak, speaking } = useSpeech();
  const { startListening, stopListening, transcript, listening, supported: speechSupported, resetTranscript } = useSpeechRecognition();

  const langCode = language === 'english' ? 'en-US' : 'es-ES';
  const dialogues = lesson.content.dialogues || [];
  const vocabulary = lesson.content.vocabulary || [];
  const exercises = lesson.content.exercises || [];

  const currentDialogue = dialogues[dialogueIndex];
  const currentVocab = vocabulary[vocabIndex];
  const currentExercise = exercises[exerciseIndex];

  const playDialogue = (text: string) => {
    speak(text, langCode);
  };

  const handleNextDialogue = () => {
    if (dialogueIndex < dialogues.length - 1) {
      setDialogueIndex(prev => prev + 1);
      setShowTranslation(false);
    } else {
      setPhase(vocabulary.length > 0 ? 'vocabulary' : 'practice');
    }
  };

  const handleNextVocab = () => {
    if (vocabIndex < vocabulary.length - 1) {
      setVocabIndex(prev => prev + 1);
    } else {
      setPhase(exercises.length > 0 ? 'practice' : 'complete');
    }
  };

  const checkAnswer = (answer: string) => {
    const correct = currentExercise.correctAnswer.toLowerCase();
    const alternatives = currentExercise.alternatives?.map(a => a.toLowerCase()) || [];
    const userAnswerLower = answer.toLowerCase().trim();
    
    // Simple similarity check
    const isCorrect = userAnswerLower.includes(correct) || 
                      correct.includes(userAnswerLower) ||
                      alternatives.some(alt => userAnswerLower.includes(alt) || alt.includes(userAnswerLower));
    
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
      setEarnedXP(prev => prev + 10);
    }
    
    setTimeout(() => {
      setFeedback(null);
      setUserAnswer('');
      resetTranscript();
      
      if (exerciseIndex < exercises.length - 1) {
        setExerciseIndex(prev => prev + 1);
      } else {
        setPhase('complete');
      }
    }, 1500);
  };

  const handleSpeakingSubmit = () => {
    if (transcript) {
      checkAnswer(transcript);
    }
  };

  const renderIntro = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-5xl mb-6">
        {lesson.type === 'listening' ? '🎧' : lesson.type === 'speaking' ? '🎤' : '📚'}
      </div>
      
      <h1 className="text-3xl font-bold text-white mb-2">{lesson.titleAr}</h1>
      <h2 className="text-xl text-slate-400 mb-4">{lesson.title}</h2>
      
      <p className="text-slate-300 mb-8 max-w-md">{lesson.description}</p>
      
      <div className="flex items-center gap-4 text-slate-400 text-sm mb-8">
        <span>⏱️ {lesson.duration} دقيقة</span>
        <span>⚡ +{lesson.xpReward} XP</span>
        <span>{'⭐'.repeat(lesson.difficulty)}</span>
      </div>
      
      {lesson.content.grammarTip && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 mb-8 max-w-md text-left">
          <h3 className="text-amber-400 font-semibold mb-2">💡 {lesson.content.grammarTip.title}</h3>
          <p className="text-amber-200/80 text-sm">{lesson.content.grammarTip.explanation}</p>
        </div>
      )}
      
      <button
        onClick={() => setPhase('dialogue')}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-12 rounded-2xl hover:opacity-90 transition-opacity"
      >
        ابدأ الدرس 🚀
      </button>
    </div>
  );

  const renderDialogue = () => (
    <div className="flex-1 flex flex-col p-6">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>المحادثة</span>
          <span>{dialogueIndex + 1} / {dialogues.length}</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
            style={{ width: `${((dialogueIndex + 1) / dialogues.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Dialogue Card */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xl">
              👤
            </div>
            <span className="text-indigo-400 font-medium">{currentDialogue?.speaker}</span>
          </div>
          
          <p className="text-2xl text-white leading-relaxed mb-4">{currentDialogue?.text}</p>
          
          {showTranslation && (
            <p className="text-slate-400 border-t border-slate-700 pt-4 mt-4">
              {currentDialogue?.translation}
            </p>
          )}
          
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={() => playDialogue(currentDialogue?.text || '')}
              disabled={speaking}
              className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors ${
                speaking ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {speaking ? (
                <>
                  <span className="animate-pulse">🔊</span>
                  جاري التشغيل...
                </>
              ) : (
                <>
                  <span>🔊</span>
                  استمع
                </>
              )}
            </button>
            
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="flex-1 py-3 rounded-xl bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
            >
              {showTranslation ? '🙈 إخفاء الترجمة' : '👁️ إظهار الترجمة'}
            </button>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNextDialogue}
        className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-6 rounded-2xl hover:opacity-90 transition-opacity"
      >
        {dialogueIndex < dialogues.length - 1 ? 'التالي ←' : 'انتقل للمفردات ←'}
      </button>
    </div>
  );

  const renderVocabulary = () => (
    <div className="flex-1 flex flex-col p-6">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>المفردات</span>
          <span>{vocabIndex + 1} / {vocabulary.length}</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all"
            style={{ width: `${((vocabIndex + 1) / vocabulary.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Vocab Card */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 text-center">
          <div className="mb-6">
            <p className="text-4xl font-bold text-white mb-2">{currentVocab?.word}</p>
            <p className="text-slate-400 text-sm">{currentVocab?.pronunciation}</p>
          </div>
          
          <p className="text-2xl text-indigo-400 mb-6">{currentVocab?.translation}</p>
          
          <div className="bg-slate-700/50 rounded-xl p-4 text-left">
            <p className="text-white mb-1">"{currentVocab?.example}"</p>
            <p className="text-slate-400 text-sm">{currentVocab?.exampleTranslation}</p>
          </div>
          
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => playDialogue(currentVocab?.word || '')}
              className="px-6 py-2 rounded-full bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors"
            >
              🔊 استمع للنطق
            </button>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNextVocab}
        className="mt-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-6 rounded-2xl hover:opacity-90 transition-opacity"
      >
        {vocabIndex < vocabulary.length - 1 ? 'التالي ←' : 'انتقل للتمارين ←'}
      </button>
    </div>
  );

  const renderPractice = () => (
    <div className="flex-1 flex flex-col p-6">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>التمارين</span>
          <span>{exerciseIndex + 1} / {exercises.length}</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
            style={{ width: `${((exerciseIndex + 1) / exercises.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Exercise Card */}
      <div className="flex-1 flex flex-col justify-center">
        <div className={`bg-slate-800 rounded-3xl p-6 border transition-colors ${
          feedback === 'correct' ? 'border-green-500 bg-green-500/10' :
          feedback === 'incorrect' ? 'border-red-500 bg-red-500/10' :
          'border-slate-700'
        }`}>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
            currentExercise?.type === 'roleplay' ? 'bg-purple-500/20 text-purple-400' :
            currentExercise?.type === 'listen-repeat' ? 'bg-blue-500/20 text-blue-400' :
            'bg-green-500/20 text-green-400'
          }`}>
            {currentExercise?.type === 'roleplay' ? '🎭 تمثيل دور' :
             currentExercise?.type === 'listen-repeat' ? '🎧 استمع وكرر' :
             currentExercise?.type === 'respond' ? '💬 رد على السؤال' :
             '📝 تمرين'}
          </span>
          
          <p className="text-xl text-white mb-6">{currentExercise?.prompt}</p>
          
          {currentExercise?.hint && (
            <p className="text-slate-400 text-sm mb-4">💡 تلميح: {currentExercise.hint}</p>
          )}
          
          {/* Feedback */}
          {feedback && (
            <div className={`mb-4 p-4 rounded-xl ${
              feedback === 'correct' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {feedback === 'correct' ? (
                <p>✅ أحسنت! +10 XP</p>
              ) : (
                <p>❌ حاول مرة أخرى. الإجابة الصحيحة: {currentExercise?.correctAnswer}</p>
              )}
            </div>
          )}
          
          {/* Input area */}
          {!feedback && (
            <>
              {currentExercise?.type === 'roleplay' || currentExercise?.type === 'listen-repeat' ? (
                <div className="space-y-4">
                  {speechSupported ? (
                    <>
                      <button
                        onClick={listening ? stopListening : startListening}
                        className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
                          listening 
                            ? 'bg-red-500 text-white animate-pulse' 
                            : 'bg-indigo-500 text-white hover:bg-indigo-600'
                        }`}
                      >
                        {listening ? (
                          <>
                            <span className="text-xl">🎤</span>
                            جاري الاستماع... (اضغط للإيقاف)
                          </>
                        ) : (
                          <>
                            <span className="text-xl">🎤</span>
                            اضغط للتحدث
                          </>
                        )}
                      </button>
                      
                      {transcript && (
                        <div className="bg-slate-700 rounded-xl p-4">
                          <p className="text-slate-400 text-sm mb-1">ما قلته:</p>
                          <p className="text-white">{transcript}</p>
                          <button
                            onClick={handleSpeakingSubmit}
                            className="mt-3 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
                          >
                            تحقق من الإجابة
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && checkAnswer(userAnswer)}
                      placeholder="اكتب إجابتك هنا..."
                      className="w-full bg-slate-700 text-white rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {currentExercise?.alternatives?.map((alt, idx) => (
                    <button
                      key={idx}
                      onClick={() => checkAnswer(alt)}
                      className="w-full p-4 rounded-xl bg-slate-700 text-white text-left hover:bg-slate-600 transition-colors"
                    >
                      {alt}
                    </button>
                  ))}
                  {currentExercise?.correctAnswer && !currentExercise?.alternatives && (
                    <>
                      <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && checkAnswer(userAnswer)}
                        placeholder="اكتب إجابتك هنا..."
                        className="w-full bg-slate-700 text-white rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        onClick={() => checkAnswer(userAnswer)}
                        className="w-full bg-indigo-500 text-white py-3 rounded-xl hover:bg-indigo-600"
                      >
                        تحقق
                      </button>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderComplete = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-6xl mb-6 animate-bounce">
        🎉
      </div>
      
      <h1 className="text-3xl font-bold text-white mb-2">أحسنت!</h1>
      <p className="text-slate-400 mb-8">لقد أكملت الدرس بنجاح</p>
      
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-8 w-full max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-slate-400">النقاط المكتسبة</span>
          <span className="text-2xl font-bold text-yellow-400">+{lesson.xpReward + earnedXP} XP</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">الكلمات المتعلمة</span>
          <span className="text-xl font-bold text-green-400">+{vocabulary.length}</span>
        </div>
      </div>
      
      <button
        onClick={() => onComplete(lesson.xpReward + earnedXP)}
        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-12 rounded-2xl hover:opacity-90 transition-opacity"
      >
        العودة للرئيسية 🏠
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-700 transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <h1 className="text-white font-medium">{lesson.titleAr}</h1>
          
          <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1 rounded-full">
            <span>⚡</span>
            <span className="text-yellow-400 font-bold">{earnedXP}</span>
          </div>
        </div>
      </header>

      {/* Content */}
      {phase === 'intro' && renderIntro()}
      {phase === 'dialogue' && renderDialogue()}
      {phase === 'vocabulary' && renderVocabulary()}
      {phase === 'practice' && renderPractice()}
      {phase === 'complete' && renderComplete()}
    </div>
  );
};
