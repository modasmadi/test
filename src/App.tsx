import { useState, useEffect } from 'react';
import { Language, UserProgress, AppScreen } from './types';
import { getLessons } from './data/lessons';
import { useLocalStorage } from './hooks/useLocalStorage';

// Components
import { WelcomeScreen } from './components/WelcomeScreen';
import { LanguageSelect } from './components/LanguageSelect';
import { Assessment } from './components/Assessment';
import { Dashboard } from './components/Dashboard';
import { LessonView } from './components/LessonView';
import { ImmersionMode } from './components/ImmersionMode';
import { ProgressView } from './components/ProgressView';

const defaultProgress: UserProgress = {
  currentLanguage: 'english',
  level: 1,
  xp: 0,
  streak: 0,
  completedLessons: [],
  vocabularyMastered: 0,
  listeningScore: 0,
  speakingScore: 0,
  readingScore: 0
};

function App() {
  const [screen, setScreen] = useLocalStorage<AppScreen>('fluency-screen', 'welcome');
  const [selectedLanguage, setSelectedLanguage] = useLocalStorage<Language | null>('fluency-language', null);
  const [progress, setProgress] = useLocalStorage<UserProgress>('fluency-progress', defaultProgress);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);

  // Check streak on app load
  useEffect(() => {
    const lastVisit = localStorage.getItem('fluency-last-visit');
    const today = new Date().toDateString();
    
    if (lastVisit) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastVisit === yesterday.toDateString()) {
        // Visited yesterday, increment streak
        setProgress(prev => ({ ...prev, streak: prev.streak + 1 }));
      } else if (lastVisit !== today) {
        // Missed a day, reset streak
        setProgress(prev => ({ ...prev, streak: 1 }));
      }
    } else {
      setProgress(prev => ({ ...prev, streak: 1 }));
    }
    
    localStorage.setItem('fluency-last-visit', today);
  }, []);

  const handleStart = () => {
    setScreen('language-select');
  };

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setProgress(prev => ({ ...prev, currentLanguage: language }));
    setScreen('assessment');
  };

  const handleAssessmentComplete = (level: number) => {
    setProgress(prev => ({
      ...prev,
      level,
      listeningScore: Math.min(level * 15, 60),
      speakingScore: Math.min(level * 10, 40),
      readingScore: Math.min(level * 20, 70)
    }));
    setScreen('dashboard');
  };

  const handleStartLesson = (lessonId: string) => {
    setCurrentLessonId(lessonId);
    setScreen('lesson');
  };

  const handleLessonComplete = (xp: number) => {
    setProgress(prev => ({
      ...prev,
      xp: prev.xp + xp,
      completedLessons: currentLessonId && !prev.completedLessons.includes(currentLessonId) 
        ? [...prev.completedLessons, currentLessonId]
        : prev.completedLessons,
      vocabularyMastered: prev.vocabularyMastered + 3,
      listeningScore: Math.min(prev.listeningScore + 2, 100),
      speakingScore: Math.min(prev.speakingScore + 3, 100),
      readingScore: Math.min(prev.readingScore + 2, 100)
    }));
    setCurrentLessonId(null);
    setScreen('dashboard');
  };

  const handleImmersionComplete = (xp: number) => {
    setProgress(prev => ({
      ...prev,
      xp: prev.xp + xp,
      speakingScore: Math.min(prev.speakingScore + 5, 100),
      listeningScore: Math.min(prev.listeningScore + 5, 100)
    }));
    setScreen('dashboard');
  };

  const currentLesson = currentLessonId && selectedLanguage 
    ? getLessons(selectedLanguage).find(l => l.id === currentLessonId)
    : null;

  // Render screens
  switch (screen) {
    case 'welcome':
      return <WelcomeScreen onStart={handleStart} />;
    
    case 'language-select':
      return <LanguageSelect onSelect={handleLanguageSelect} />;
    
    case 'assessment':
      if (!selectedLanguage) {
        setScreen('language-select');
        return null;
      }
      return (
        <Assessment 
          language={selectedLanguage} 
          onComplete={handleAssessmentComplete} 
        />
      );
    
    case 'dashboard':
      if (!selectedLanguage) {
        setScreen('language-select');
        return null;
      }
      return (
        <Dashboard
          language={selectedLanguage}
          progress={progress}
          onStartLesson={handleStartLesson}
          onStartImmersion={() => setScreen('immersion')}
          onViewProgress={() => setScreen('progress')}
        />
      );
    
    case 'lesson':
      if (!selectedLanguage || !currentLesson) {
        setScreen('dashboard');
        return null;
      }
      return (
        <LessonView
          lesson={currentLesson}
          language={selectedLanguage}
          onComplete={handleLessonComplete}
          onClose={() => {
            setCurrentLessonId(null);
            setScreen('dashboard');
          }}
        />
      );
    
    case 'immersion':
      if (!selectedLanguage) {
        setScreen('dashboard');
        return null;
      }
      return (
        <ImmersionMode
          language={selectedLanguage}
          onComplete={handleImmersionComplete}
          onClose={() => setScreen('dashboard')}
        />
      );
    
    case 'progress':
      if (!selectedLanguage) {
        setScreen('dashboard');
        return null;
      }
      return (
        <ProgressView
          progress={progress}
          language={selectedLanguage}
          onClose={() => setScreen('dashboard')}
        />
      );
    
    default:
      return <WelcomeScreen onStart={handleStart} />;
  }
}

export default App;
