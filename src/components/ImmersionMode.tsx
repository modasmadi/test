import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { getImmersionDay } from '../data/immersion';
import { useSpeech, useSpeechRecognition } from '../hooks/useSpeech';

interface ImmersionModeProps {
  language: Language;
  onComplete: (xp: number) => void;
  onClose: () => void;
}

export const ImmersionMode: React.FC<ImmersionModeProps> = ({
  language,
  onComplete,
  onClose
}) => {
  const scenarios = getImmersionDay(language);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showResponse, setShowResponse] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const [earnedXP, setEarnedXP] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const { speak, speaking } = useSpeech();
  const { startListening, stopListening, transcript, listening, supported: speechSupported, resetTranscript } = useSpeechRecognition();

  const langCode = language === 'english' ? 'en-US' : 'es-ES';
  const currentScenario = scenarios[currentIndex];
  const currentDialogue = currentScenario?.dialogues[dialogueIndex];

  useEffect(() => {
    // Auto-play dialogue when it changes
    if (currentDialogue && !showResponse) {
      setTimeout(() => {
        speak(currentDialogue.text, langCode);
      }, 500);
    }
  }, [dialogueIndex, currentIndex]);

  const getTimeIcon = (time: string) => {
    const icons = {
      morning: '🌅',
      afternoon: '☀️',
      evening: '🌆',
      night: '🌙'
    };
    return icons[time as keyof typeof icons] || '🌍';
  };

  const getTimeName = (time: string) => {
    const names = {
      morning: 'الصباح',
      afternoon: 'الظهيرة',
      evening: 'المساء',
      night: 'الليل'
    };
    return names[time as keyof typeof names] || time;
  };

  const handleNext = () => {
    if (dialogueIndex < currentScenario.dialogues.length - 1) {
      setDialogueIndex(prev => prev + 1);
      setShowTranslation(false);
    } else {
      setShowResponse(true);
    }
  };

  const handleResponse = (response: string) => {
    setSelectedResponse(response);
    speak(response, langCode);
    setEarnedXP(prev => prev + 15);
    
    setTimeout(() => {
      if (currentIndex < scenarios.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setDialogueIndex(0);
        setShowResponse(false);
        setSelectedResponse(null);
        setShowTranslation(false);
        resetTranscript();
      } else {
        setIsComplete(true);
      }
    }, 2000);
  };

  const handleSpeakResponse = () => {
    if (transcript) {
      handleResponse(transcript);
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-6xl mb-6 animate-bounce">
          🌟
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2">أكملت يومك!</h1>
        <p className="text-slate-400 mb-8">لقد عشت يوماً كاملاً باللغة {language === 'english' ? 'الإنجليزية' : 'الإسبانية'}</p>
        
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-8 w-full max-w-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400">المواقف التي عشتها</span>
            <span className="text-xl font-bold text-indigo-400">{scenarios.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">النقاط المكتسبة</span>
            <span className="text-2xl font-bold text-yellow-400">+{earnedXP} XP</span>
          </div>
        </div>
        
        <button
          onClick={() => onComplete(earnedXP)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-12 rounded-2xl hover:opacity-90 transition-opacity"
        >
          العودة للرئيسية 🏠
        </button>
      </div>
    );
  }

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
          
          <div className="text-center">
            <h1 className="text-white font-medium">يومك في البلد</h1>
            <p className="text-slate-400 text-sm">{getTimeIcon(currentScenario?.timeOfDay)} {getTimeName(currentScenario?.timeOfDay)}</p>
          </div>
          
          <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1 rounded-full">
            <span>⚡</span>
            <span className="text-yellow-400 font-bold">{earnedXP}</span>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="max-w-4xl mx-auto w-full px-4 py-4">
        <div className="flex gap-1">
          {scenarios.map((_, idx) => (
            <div
              key={idx}
              className={`flex-1 h-2 rounded-full transition-colors ${
                idx < currentIndex ? 'bg-indigo-500' :
                idx === currentIndex ? 'bg-indigo-400' :
                'bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scenario Info */}
      <div className="max-w-4xl mx-auto w-full px-4 mb-4">
        <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl p-4 border border-indigo-500/30">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{currentScenario?.location.split(' ')[0]}</span>
            <div>
              <h2 className="text-white font-semibold">{currentScenario?.location}</h2>
              <p className="text-slate-300 text-sm">{currentScenario?.situation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 pb-6">
        {!showResponse ? (
          <>
            {/* Dialogue */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xl">
                    👤
                  </div>
                  <span className="text-indigo-400 font-medium">{currentDialogue?.speaker}</span>
                  
                  <button
                    onClick={() => speak(currentDialogue?.text || '', langCode)}
                    disabled={speaking}
                    className={`ml-auto p-2 rounded-full transition-colors ${
                      speaking ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {speaking ? '🔊' : '🔈'}
                  </button>
                </div>
                
                <p className="text-2xl text-white leading-relaxed mb-4">{currentDialogue?.text}</p>
                
                {showTranslation && (
                  <p className="text-slate-400 border-t border-slate-700 pt-4">{currentDialogue?.translation}</p>
                )}
                
                <button
                  onClick={() => setShowTranslation(!showTranslation)}
                  className="mt-4 text-slate-400 text-sm hover:text-white transition-colors"
                >
                  {showTranslation ? '🙈 إخفاء الترجمة' : '👁️ إظهار الترجمة'}
                </button>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-6 rounded-2xl hover:opacity-90 transition-opacity"
            >
              {dialogueIndex < currentScenario.dialogues.length - 1 ? 'استمر ←' : 'ردّ الآن 🎤'}
            </button>
          </>
        ) : (
          <>
            {/* Response Options */}
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-xl text-white font-semibold mb-4 text-center">دورك للرد!</h2>
              
              {/* Speaking option */}
              {speechSupported && (
                <div className="mb-6">
                  <button
                    onClick={listening ? stopListening : startListening}
                    disabled={selectedResponse !== null}
                    className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 transition-all ${
                      listening 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90'
                    }`}
                  >
                    {listening ? (
                      <>
                        <span className="text-2xl">🎤</span>
                        <span>جاري الاستماع... (اضغط للإيقاف)</span>
                      </>
                    ) : (
                      <>
                        <span className="text-2xl">🎤</span>
                        <span>تحدث بحرية</span>
                      </>
                    )}
                  </button>
                  
                  {transcript && !selectedResponse && (
                    <div className="mt-4 bg-slate-700 rounded-xl p-4">
                      <p className="text-slate-400 text-sm mb-1">ما قلته:</p>
                      <p className="text-white text-lg">{transcript}</p>
                      <button
                        onClick={handleSpeakResponse}
                        className="mt-3 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
                      >
                        ✓ تأكيد الرد
                      </button>
                    </div>
                  )}
                </div>
              )}

              <p className="text-slate-400 text-center mb-4">أو اختر من الردود المقترحة:</p>
              
              <div className="space-y-3">
                {currentScenario?.userResponses.map((response, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleResponse(response)}
                    disabled={selectedResponse !== null}
                    className={`w-full p-4 rounded-2xl text-left transition-all ${
                      selectedResponse === response 
                        ? 'bg-green-500/20 border-2 border-green-500 text-green-400' 
                        : selectedResponse 
                          ? 'bg-slate-800 border border-slate-700 text-slate-500'
                          : 'bg-slate-800 border border-slate-700 text-white hover:border-indigo-500 hover:bg-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl">💬</span>
                      <span>{response}</span>
                      {selectedResponse === response && <span className="ml-auto">✓</span>}
                    </span>
                  </button>
                ))}
              </div>
              
              {selectedResponse && (
                <div className="mt-6 text-center">
                  <p className="text-green-400 mb-2">✅ رائع! +15 XP</p>
                  <p className="text-slate-400 text-sm">جاري الانتقال للموقف التالي...</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
