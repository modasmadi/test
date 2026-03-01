// Language Types
export type Language = 'english' | 'spanish';

export interface LanguageConfig {
  id: Language;
  name: string;
  nativeName: string;
  flag: string;
  country: string;
}

// User Types
export interface UserProgress {
  currentLanguage: Language;
  level: number;
  xp: number;
  streak: number;
  completedLessons: string[];
  vocabularyMastered: number;
  listeningScore: number;
  speakingScore: number;
  readingScore: number;
}

// Lesson Types
export type LessonType = 'listening' | 'speaking' | 'vocabulary' | 'grammar' | 'immersion';

export interface Lesson {
  id: string;
  type: LessonType;
  title: string;
  titleAr: string;
  description: string;
  scenario: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  duration: number;
  xpReward: number;
  content: LessonContent;
}

export interface LessonContent {
  dialogues?: Dialogue[];
  vocabulary?: VocabularyItem[];
  exercises?: Exercise[];
  grammarTip?: GrammarTip;
}

export interface Dialogue {
  id: string;
  speaker: string;
  text: string;
  translation: string;
  audioUrl?: string;
}

export interface VocabularyItem {
  id: string;
  word: string;
  translation: string;
  pronunciation: string;
  example: string;
  exampleTranslation: string;
  context: string;
  audioUrl?: string;
}

export interface Exercise {
  id: string;
  type: 'listen-repeat' | 'fill-blank' | 'respond' | 'translate' | 'roleplay';
  prompt: string;
  correctAnswer: string;
  alternatives?: string[];
  hint?: string;
}

export interface GrammarTip {
  title: string;
  explanation: string;
  examples: string[];
}

// Assessment Types
export interface AssessmentQuestion {
  id: string;
  type: 'listening' | 'reading' | 'speaking';
  question: string;
  options?: string[];
  correctAnswer: string;
  audioUrl?: string;
}

// Immersion Day Types
export interface ImmersionScenario {
  id: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  location: string;
  situation: string;
  dialogues: Dialogue[];
  userResponses: string[];
}

// App State
export type AppScreen = 
  | 'welcome' 
  | 'language-select' 
  | 'assessment' 
  | 'dashboard' 
  | 'lesson' 
  | 'immersion'
  | 'progress'
  | 'settings';
