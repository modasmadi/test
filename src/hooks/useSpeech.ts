import { useState, useCallback, useEffect } from 'react';

interface UseSpeechReturn {
  speak: (text: string, lang?: string) => void;
  stop: () => void;
  speaking: boolean;
  supported: boolean;
}

export const useSpeech = (): UseSpeechReturn => {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported('speechSynthesis' in window);
  }, []);

  const speak = useCallback((text: string, lang: string = 'en-US') => {
    if (!supported) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  }, [supported]);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  return { speak, stop, speaking, supported };
};

interface UseSpeechRecognitionReturn {
  startListening: () => void;
  stopListening: () => void;
  transcript: string;
  listening: boolean;
  supported: boolean;
  resetTranscript: () => void;
}

export const useSpeechRecognition = (): UseSpeechRecognitionReturn => {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setSupported(true);
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event: any) => {
        const current = event.resultIndex;
        const result = event.results[current];
        if (result.isFinal) {
          setTranscript(result[0].transcript);
        }
      };
      
      recognitionInstance.onend = () => {
        setListening(false);
      };
      
      recognitionInstance.onerror = () => {
        setListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, []);

  const startListening = useCallback(() => {
    if (!recognition) return;
    setTranscript('');
    setListening(true);
    recognition.start();
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (!recognition) return;
    recognition.stop();
    setListening(false);
  }, [recognition]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    startListening,
    stopListening,
    transcript,
    listening,
    supported,
    resetTranscript
  };
};
