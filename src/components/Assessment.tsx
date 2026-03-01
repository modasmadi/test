import React, { useState } from 'react';
import { Language } from '../types';
import { useSpeech } from '../hooks/useSpeech';

interface AssessmentProps {
  language: Language;
  onComplete: (level: number) => void;
}

interface Question {
  id: number;
  type: 'listening' | 'reading' | 'speaking';
  question: string;
  questionAr: string;
  audio?: string;
  options: string[];
  correct: number;
  difficulty: number;
}

const englishQuestions: Question[] = [
  {
    id: 1,
    type: 'listening',
    question: "What does 'How's it going?' mean?",
    questionAr: "ماذا تعني 'How's it going?'",
    options: ["What time is it?", "How are you?", "Where are you going?", "What's happening?"],
    correct: 1,
    difficulty: 1
  },
  {
    id: 2,
    type: 'reading',
    question: "Complete: 'Nice to ___ you'",
    questionAr: "أكمل: 'Nice to ___ you'",
    options: ["see", "meet", "know", "look"],
    correct: 1,
    difficulty: 1
  },
  {
    id: 3,
    type: 'listening',
    question: "In a coffee shop, 'For here or to go?' means:",
    questionAr: "في المقهى، 'For here or to go?' تعني:",
    options: ["Cash or card?", "Big or small?", "Eat here or take away?", "Hot or cold?"],
    correct: 2,
    difficulty: 2
  },
  {
    id: 4,
    type: 'reading',
    question: "What does 'I'm running late' mean?",
    questionAr: "ماذا تعني 'I'm running late'?",
    options: ["I'm exercising", "I'm going to be late", "I lost my watch", "I'm in a hurry"],
    correct: 1,
    difficulty: 2
  },
  {
    id: 5,
    type: 'listening',
    question: "'Let's grab lunch' is an invitation to:",
    questionAr: "'Let's grab lunch' هي دعوة لـ:",
    options: ["Take food quickly", "Eat lunch together", "Go shopping", "Take a break"],
    correct: 1,
    difficulty: 2
  },
  {
    id: 6,
    type: 'reading',
    question: "What's the natural response to 'What's up?'",
    questionAr: "ما هو الرد الطبيعي على 'What's up?'",
    options: ["The ceiling", "Not much, you?", "I'm fine, thank you", "Good morning"],
    correct: 1,
    difficulty: 3
  },
  {
    id: 7,
    type: 'listening',
    question: "'I could use some coffee' means:",
    questionAr: "'I could use some coffee' تعني:",
    options: ["I don't like coffee", "I want coffee", "I make coffee", "Coffee is useful"],
    correct: 1,
    difficulty: 3
  },
  {
    id: 8,
    type: 'reading',
    question: "'Rain check' in 'Can I take a rain check?' means:",
    questionAr: "'Rain check' في 'Can I take a rain check?' تعني:",
    options: ["Check the weather", "Postpone to another time", "Pay for rain", "Cancel completely"],
    correct: 1,
    difficulty: 4
  }
];

const spanishQuestions: Question[] = [
  {
    id: 1,
    type: 'listening',
    question: "¿Qué significa '¿Qué tal?'?",
    questionAr: "ماذا تعني '¿Qué tal?'",
    options: ["¿Qué hora es?", "¿Cómo estás?", "¿Dónde vas?", "¿Qué pasa?"],
    correct: 1,
    difficulty: 1
  },
  {
    id: 2,
    type: 'reading',
    question: "Completa: 'Mucho ___'",
    questionAr: "أكمل: 'Mucho ___'",
    options: ["bien", "gusto", "hola", "gracias"],
    correct: 1,
    difficulty: 1
  },
  {
    id: 3,
    type: 'listening',
    question: "En un bar, '¿Qué te pongo?' significa:",
    questionAr: "في البار، '¿Qué te pongo?' تعني:",
    options: ["¿Cuánto cuesta?", "¿Qué quieres beber?", "¿Dónde te sientas?", "¿Cómo pagas?"],
    correct: 1,
    difficulty: 2
  },
  {
    id: 4,
    type: 'reading',
    question: "¿Qué significa 'Voy tarde'?",
    questionAr: "ماذا تعني 'Voy tarde'?",
    options: ["Voy despacio", "Llegaré tarde", "Es de noche", "Voy después"],
    correct: 1,
    difficulty: 2
  },
  {
    id: 5,
    type: 'listening',
    question: "'Quedamos a las 8' significa:",
    questionAr: "'Quedamos a las 8' تعني:",
    options: ["Son las 8", "Nos vemos a las 8", "Faltan 8 minutos", "Tengo 8 años"],
    correct: 1,
    difficulty: 2
  },
  {
    id: 6,
    type: 'reading',
    question: "Respuesta natural a '¿Qué hay?':",
    questionAr: "الرد الطبيعي على '¿Qué hay?':",
    options: ["Hay comida", "Poca cosa, ¿y tú?", "Estoy bien, gracias", "Buenos días"],
    correct: 1,
    difficulty: 3
  },
  {
    id: 7,
    type: 'listening',
    question: "'Me vendría bien un café' significa:",
    questionAr: "'Me vendría bien un café' تعني:",
    options: ["No me gusta el café", "Quiero café", "Vendo café", "El café es bueno"],
    correct: 1,
    difficulty: 3
  },
  {
    id: 8,
    type: 'reading',
    question: "'Mola' en español coloquial significa:",
    questionAr: "'Mola' في الإسبانية العامية تعني:",
    options: ["Es malo", "Es genial", "Es grande", "Es fácil"],
    correct: 1,
    difficulty: 4
  }
];

export const Assessment: React.FC<AssessmentProps> = ({ language, onComplete }) => {
  const questions = language === 'english' ? englishQuestions : spanishQuestions;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const { speak } = useSpeech();

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = (optionIndex: number) => {
    if (answered !== null) return;
    
    setAnswered(optionIndex);
    
    if (optionIndex === currentQuestion.correct) {
      setScore(prev => prev + currentQuestion.difficulty);
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setAnswered(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const calculateLevel = () => {
    const maxScore = questions.reduce((sum, q) => sum + q.difficulty, 0);
    const percentage = (score / maxScore) * 100;
    
    if (percentage < 25) return 1;
    if (percentage < 50) return 2;
    if (percentage < 75) return 3;
    return 4;
  };

  const getLevelInfo = (level: number) => {
    const levels = {
      1: { name: 'مبتدئ', nameEn: 'Beginner', emoji: '🌱', color: 'from-green-500 to-emerald-600' },
      2: { name: 'أساسي', nameEn: 'Elementary', emoji: '🌿', color: 'from-blue-500 to-cyan-600' },
      3: { name: 'متوسط', nameEn: 'Intermediate', emoji: '🌳', color: 'from-purple-500 to-pink-600' },
      4: { name: 'متقدم', nameEn: 'Advanced', emoji: '🏆', color: 'from-yellow-500 to-orange-600' }
    };
    return levels[level as keyof typeof levels];
  };

  const playQuestion = () => {
    const lang = language === 'english' ? 'en-US' : 'es-ES';
    speak(currentQuestion.question, lang);
  };

  if (showResult) {
    const level = calculateLevel();
    const levelInfo = getLevelInfo(level);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-6">
        <div className="bg-slate-800 rounded-3xl p-8 max-w-md w-full text-center border border-slate-700">
          <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${levelInfo.color} flex items-center justify-center text-5xl mb-6`}>
            {levelInfo.emoji}
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">مستواك الحالي</h2>
          <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text mb-2">
            {levelInfo.name}
          </h1>
          <p className="text-slate-400 mb-6">{levelInfo.nameEn}</p>
          
          <div className="bg-slate-700/50 rounded-xl p-4 mb-6">
            <p className="text-slate-300 text-sm mb-2">بناءً على إجاباتك، سنبني لك مساراً مخصصاً</p>
            <p className="text-slate-400 text-xs">
              سنركز على {level <= 2 ? 'الأساسيات والمواقف اليومية البسيطة' : 'المحادثات المتقدمة والمواقف المعقدة'}
            </p>
          </div>
          
          <button
            onClick={() => onComplete(level)}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity"
          >
            ابدأ التعلم 🚀
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col p-6">
      {/* Progress bar */}
      <div className="max-w-2xl mx-auto w-full mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-slate-400 text-sm">اختبار تحديد المستوى</span>
          <span className="text-slate-400 text-sm">{currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
        <div className="bg-slate-800 rounded-3xl p-8 w-full border border-slate-700">
          {/* Question type badge */}
          <div className="flex items-center justify-between mb-6">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              currentQuestion.type === 'listening' ? 'bg-blue-500/20 text-blue-400' :
              currentQuestion.type === 'reading' ? 'bg-green-500/20 text-green-400' :
              'bg-purple-500/20 text-purple-400'
            }`}>
              {currentQuestion.type === 'listening' ? '🎧 استماع' :
               currentQuestion.type === 'reading' ? '📖 قراءة' : '🎤 تحدث'}
            </span>
            
            {currentQuestion.type === 'listening' && (
              <button
                onClick={playQuestion}
                className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
              </button>
            )}
          </div>

          {/* Question text */}
          <h2 className="text-xl font-semibold text-white mb-2">{currentQuestion.question}</h2>
          <p className="text-slate-400 mb-8">{currentQuestion.questionAr}</p>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = answered === index;
              const isCorrect = index === currentQuestion.correct;
              const showCorrect = answered !== null && isCorrect;
              const showWrong = isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={answered !== null}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 border ${
                    showCorrect ? 'bg-green-500/20 border-green-500 text-green-400' :
                    showWrong ? 'bg-red-500/20 border-red-500 text-red-400' :
                    answered !== null ? 'bg-slate-700/50 border-slate-600 text-slate-500' :
                    'bg-slate-700 border-slate-600 text-white hover:border-indigo-500 hover:bg-slate-600'
                  }`}
                >
                  <span className="flex items-center">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-medium ${
                      showCorrect ? 'bg-green-500 text-white' :
                      showWrong ? 'bg-red-500 text-white' :
                      'bg-slate-600 text-slate-300'
                    }`}>
                      {showCorrect ? '✓' : showWrong ? '✗' : String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
