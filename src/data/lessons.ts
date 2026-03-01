import { Lesson } from '../types';

export const englishLessons: Lesson[] = [
  {
    id: 'en-1-cafe',
    type: 'listening',
    title: 'Ordering Coffee',
    titleAr: 'طلب القهوة',
    description: 'Learn to order your favorite drink at a café',
    scenario: 'café',
    difficulty: 1,
    duration: 10,
    xpReward: 50,
    content: {
      dialogues: [
        {
          id: 'd1',
          speaker: 'Barista',
          text: "Hi! Welcome to Blue Cup. What can I get for you today?",
          translation: "مرحباً! أهلاً بك في بلو كب. ماذا أحضر لك اليوم؟"
        },
        {
          id: 'd2',
          speaker: 'Customer',
          text: "Hi, can I get a medium latte, please?",
          translation: "مرحباً، هل يمكنني الحصول على لاتيه وسط، من فضلك؟"
        },
        {
          id: 'd3',
          speaker: 'Barista',
          text: "Sure! Would you like that hot or iced?",
          translation: "بالتأكيد! هل تريده ساخناً أم مثلجاً؟"
        },
        {
          id: 'd4',
          speaker: 'Customer',
          text: "Iced, please. And can I add an extra shot of espresso?",
          translation: "مثلجاً من فضلك. وهل يمكنني إضافة شوت إسبريسو إضافي؟"
        },
        {
          id: 'd5',
          speaker: 'Barista',
          text: "Of course! That'll be $5.75. Can I get a name for the order?",
          translation: "بالطبع! المجموع 5.75 دولار. هل يمكنني معرفة اسمك للطلب؟"
        }
      ],
      vocabulary: [
        {
          id: 'v1',
          word: 'latte',
          translation: 'لاتيه',
          pronunciation: '/ˈlɑːteɪ/',
          example: "I'd like a vanilla latte, please.",
          exampleTranslation: "أريد لاتيه بالفانيليا من فضلك.",
          context: 'coffee shop'
        },
        {
          id: 'v2',
          word: 'iced',
          translation: 'مثلج',
          pronunciation: '/aɪst/',
          example: "It's hot today, I'll have an iced coffee.",
          exampleTranslation: "الجو حار اليوم، سآخذ قهوة مثلجة.",
          context: 'drinks'
        },
        {
          id: 'v3',
          word: 'extra shot',
          translation: 'شوت إضافي',
          pronunciation: '/ˈekstrə ʃɒt/',
          example: "I need an extra shot, I'm so tired today.",
          exampleTranslation: "أحتاج شوت إضافي، أنا متعب جداً اليوم.",
          context: 'coffee customization'
        }
      ],
      exercises: [
        {
          id: 'e1',
          type: 'listen-repeat',
          prompt: "Listen and repeat: 'Can I get a medium latte, please?'",
          correctAnswer: "Can I get a medium latte, please?"
        },
        {
          id: 'e2',
          type: 'respond',
          prompt: "The barista asks: 'Would you like that hot or iced?' - How do you respond?",
          correctAnswer: "Iced, please",
          alternatives: ["Hot, please", "Iced", "Hot"]
        },
        {
          id: 'e3',
          type: 'roleplay',
          prompt: "Order a large cappuccino with oat milk",
          correctAnswer: "Can I get a large cappuccino with oat milk, please?",
          hint: "Use 'Can I get...' or 'I'd like...'"
        }
      ],
      grammarTip: {
        title: "Polite Requests",
        explanation: "Use 'Can I get...?' or 'Could I have...?' for polite ordering. Adding 'please' makes it even more polite!",
        examples: [
          "Can I get a coffee, please?",
          "Could I have a muffin?",
          "I'd like a tea, please."
        ]
      }
    }
  },
  {
    id: 'en-2-intro',
    type: 'speaking',
    title: 'Meeting New People',
    titleAr: 'التعارف على أشخاص جدد',
    description: 'Introduce yourself naturally like a native',
    scenario: 'social',
    difficulty: 1,
    duration: 12,
    xpReward: 60,
    content: {
      dialogues: [
        {
          id: 'd1',
          speaker: 'Alex',
          text: "Hey! I don't think we've met. I'm Alex.",
          translation: "مرحباً! أعتقد أننا لم نتعارف من قبل. أنا أليكس."
        },
        {
          id: 'd2',
          speaker: 'Sam',
          text: "Hi Alex! Nice to meet you. I'm Sam. Are you new here?",
          translation: "مرحباً أليكس! تشرفت بمعرفتك. أنا سام. هل أنت جديد هنا؟"
        },
        {
          id: 'd3',
          speaker: 'Alex',
          text: "Yeah, I just moved here from Chicago. What about you?",
          translation: "نعم، انتقلت للتو من شيكاغو. ماذا عنك؟"
        },
        {
          id: 'd4',
          speaker: 'Sam',
          text: "Oh cool! I've been here for about three years now. You'll love it here!",
          translation: "رائع! أنا هنا منذ حوالي ثلاث سنوات. ستحب المكان هنا!"
        }
      ],
      vocabulary: [
        {
          id: 'v1',
          word: "Nice to meet you",
          translation: 'تشرفت بمعرفتك',
          pronunciation: '/naɪs tuː miːt juː/',
          example: "Nice to meet you! I've heard so much about you.",
          exampleTranslation: "تشرفت بمعرفتك! سمعت الكثير عنك.",
          context: 'introductions'
        },
        {
          id: 'v2',
          word: "What about you?",
          translation: 'ماذا عنك؟',
          pronunciation: '/wɒt əˈbaʊt juː/',
          example: "I'm from Egypt. What about you?",
          exampleTranslation: "أنا من مصر. ماذا عنك؟",
          context: 'conversation'
        }
      ],
      exercises: [
        {
          id: 'e1',
          type: 'roleplay',
          prompt: "Introduce yourself to someone at a party",
          correctAnswer: "Hey! I'm [name]. Nice to meet you!",
          hint: "Start casual with 'Hey' or 'Hi'"
        },
        {
          id: 'e2',
          type: 'respond',
          prompt: "Someone says: 'Nice to meet you!' - What do you say?",
          correctAnswer: "Nice to meet you too!",
          alternatives: ["Nice to meet you as well!", "You too!"]
        }
      ]
    }
  },
  {
    id: 'en-3-restaurant',
    type: 'listening',
    title: 'At the Restaurant',
    titleAr: 'في المطعم',
    description: 'Order food and handle common restaurant situations',
    scenario: 'restaurant',
    difficulty: 2,
    duration: 15,
    xpReward: 75,
    content: {
      dialogues: [
        {
          id: 'd1',
          speaker: 'Server',
          text: "Good evening! Table for two? Right this way.",
          translation: "مساء الخير! طاولة لشخصين؟ تفضلوا من هنا."
        },
        {
          id: 'd2',
          speaker: 'Server',
          text: "Here are your menus. Can I start you off with something to drink?",
          translation: "تفضلوا قوائم الطعام. هل أبدأ بطلب المشروبات؟"
        },
        {
          id: 'd3',
          speaker: 'Customer',
          text: "Yes, I'll have a sparkling water, and she'll have a glass of red wine.",
          translation: "نعم، سآخذ ماء فوار، وهي ستأخذ كأس نبيذ أحمر."
        },
        {
          id: 'd4',
          speaker: 'Server',
          text: "Perfect. Are you ready to order, or do you need a few more minutes?",
          translation: "ممتاز. هل أنتم جاهزون للطلب، أم تحتاجون بضع دقائق إضافية؟"
        },
        {
          id: 'd5',
          speaker: 'Customer',
          text: "Actually, I have a question. What do you recommend?",
          translation: "في الواقع، لدي سؤال. ماذا تنصح؟"
        }
      ],
      vocabulary: [
        {
          id: 'v1',
          word: 'sparkling water',
          translation: 'ماء فوار',
          pronunciation: '/ˈspɑːrklɪŋ ˈwɔːtər/',
          example: "Can I get a bottle of sparkling water?",
          exampleTranslation: "هل يمكنني الحصول على زجاجة ماء فوار؟",
          context: 'restaurant drinks'
        },
        {
          id: 'v2',
          word: 'recommend',
          translation: 'ينصح / يوصي',
          pronunciation: '/ˌrekəˈmend/',
          example: "What do you recommend for a first-timer?",
          exampleTranslation: "ماذا تنصح لشخص يزور للمرة الأولى؟",
          context: 'asking for advice'
        }
      ],
      exercises: [
        {
          id: 'e1',
          type: 'listen-repeat',
          prompt: "Listen and repeat: 'Can I start you off with something to drink?'",
          correctAnswer: "Can I start you off with something to drink?"
        },
        {
          id: 'e2',
          type: 'roleplay',
          prompt: "Ask the server what they recommend",
          correctAnswer: "What do you recommend?",
          alternatives: ["What would you recommend?", "What's good here?"]
        }
      ]
    }
  },
  {
    id: 'en-4-work',
    type: 'speaking',
    title: 'Office Small Talk',
    titleAr: 'محادثات العمل القصيرة',
    description: 'Navigate everyday office conversations',
    scenario: 'work',
    difficulty: 2,
    duration: 15,
    xpReward: 80,
    content: {
      dialogues: [
        {
          id: 'd1',
          speaker: 'Colleague',
          text: "Hey! How was your weekend?",
          translation: "مرحباً! كيف كانت عطلتك الأسبوعية؟"
        },
        {
          id: 'd2',
          speaker: 'You',
          text: "It was great, thanks! I finally got some rest. How about yours?",
          translation: "كانت رائعة، شكراً! أخيراً حصلت على بعض الراحة. ماذا عنك؟"
        },
        {
          id: 'd3',
          speaker: 'Colleague',
          text: "Not bad! Hey, are you going to the team meeting at 3?",
          translation: "ليست سيئة! هل ستحضر اجتماع الفريق الساعة 3؟"
        },
        {
          id: 'd4',
          speaker: 'You',
          text: "Yeah, I'll be there. Do you know what it's about?",
          translation: "نعم، سأكون هناك. هل تعرف موضوعه؟"
        }
      ],
      vocabulary: [
        {
          id: 'v1',
          word: 'How was your weekend?',
          translation: 'كيف كانت عطلتك؟',
          pronunciation: '/haʊ wɒz jɔːr ˈwiːkend/',
          example: "Hey! How was your weekend? Did you do anything fun?",
          exampleTranslation: "مرحباً! كيف كانت عطلتك؟ هل فعلت شيئاً ممتعاً؟",
          context: 'office small talk'
        }
      ],
      exercises: [
        {
          id: 'e1',
          type: 'respond',
          prompt: "Your colleague asks: 'How was your weekend?' - Respond naturally",
          correctAnswer: "It was good, thanks! How about yours?",
          alternatives: ["Pretty good! And yours?", "Not bad! How was yours?"]
        }
      ]
    }
  },
  {
    id: 'en-5-directions',
    type: 'listening',
    title: 'Getting Around Town',
    titleAr: 'التنقل في المدينة',
    description: 'Ask for and understand directions',
    scenario: 'street',
    difficulty: 2,
    duration: 12,
    xpReward: 70,
    content: {
      dialogues: [
        {
          id: 'd1',
          speaker: 'Tourist',
          text: "Excuse me, could you tell me how to get to the train station?",
          translation: "عذراً، هل يمكنك إخباري كيف أصل إلى محطة القطار؟"
        },
        {
          id: 'd2',
          speaker: 'Local',
          text: "Sure! Go straight for two blocks, then turn left at the traffic light.",
          translation: "بالتأكيد! امشِ مستقيماً لمسافة شارعين، ثم انعطف يساراً عند إشارة المرور."
        },
        {
          id: 'd3',
          speaker: 'Local',
          text: "You'll see it on your right. It's about a 10-minute walk.",
          translation: "ستراها على يمينك. المسافة حوالي 10 دقائق مشياً."
        },
        {
          id: 'd4',
          speaker: 'Tourist',
          text: "Got it! Straight, then left at the light. Thanks so much!",
          translation: "فهمت! مستقيم، ثم يسار عند الإشارة. شكراً جزيلاً!"
        }
      ],
      vocabulary: [
        {
          id: 'v1',
          word: 'go straight',
          translation: 'امشِ مستقيماً',
          pronunciation: '/ɡoʊ streɪt/',
          example: "Go straight for about 5 minutes.",
          exampleTranslation: "امشِ مستقيماً لمدة 5 دقائق تقريباً.",
          context: 'directions'
        },
        {
          id: 'v2',
          word: 'turn left/right',
          translation: 'انعطف يساراً/يميناً',
          pronunciation: '/tɜːrn left/raɪt/',
          example: "Turn right at the corner.",
          exampleTranslation: "انعطف يميناً عند الزاوية.",
          context: 'directions'
        },
        {
          id: 'v3',
          word: 'traffic light',
          translation: 'إشارة المرور',
          pronunciation: '/ˈtræfɪk laɪt/',
          example: "Stop at the traffic light and turn left.",
          exampleTranslation: "توقف عند إشارة المرور وانعطف يساراً.",
          context: 'street'
        }
      ],
      exercises: [
        {
          id: 'e1',
          type: 'roleplay',
          prompt: "Ask someone how to get to the nearest pharmacy",
          correctAnswer: "Excuse me, could you tell me how to get to the nearest pharmacy?",
          hint: "Start with 'Excuse me' to be polite"
        }
      ]
    }
  }
];

export const spanishLessons: Lesson[] = [
  {
    id: 'es-1-cafe',
    type: 'listening',
    title: 'Pedir un Café',
    titleAr: 'طلب القهوة',
    description: 'Aprende a pedir tu bebida favorita',
    scenario: 'cafetería',
    difficulty: 1,
    duration: 10,
    xpReward: 50,
    content: {
      dialogues: [
        {
          id: 'd1',
          speaker: 'Camarero',
          text: "¡Hola! Buenos días. ¿Qué le pongo?",
          translation: "مرحباً! صباح الخير. ماذا أحضر لك؟"
        },
        {
          id: 'd2',
          speaker: 'Cliente',
          text: "Hola, un café con leche, por favor.",
          translation: "مرحباً، قهوة بالحليب من فضلك."
        },
        {
          id: 'd3',
          speaker: 'Camarero',
          text: "¿Grande o pequeño?",
          translation: "كبير أم صغير؟"
        },
        {
          id: 'd4',
          speaker: 'Cliente',
          text: "Grande, por favor. ¿Cuánto es?",
          translation: "كبير من فضلك. كم الثمن؟"
        },
        {
          id: 'd5',
          speaker: 'Camarero',
          text: "Son dos euros con cincuenta.",
          translation: "يورووان وخمسون سنتاً."
        }
      ],
      vocabulary: [
        {
          id: 'v1',
          word: 'café con leche',
          translation: 'قهوة بالحليب',
          pronunciation: '/kaˈfe kon ˈletʃe/',
          example: "Quiero un café con leche caliente.",
          exampleTranslation: "أريد قهوة بالحليب ساخنة.",
          context: 'cafetería'
        },
        {
          id: 'v2',
          word: 'por favor',
          translation: 'من فضلك',
          pronunciation: '/por faˈβor/',
          example: "Un vaso de agua, por favor.",
          exampleTranslation: "كوب ماء من فضلك.",
          context: 'polite expressions'
        },
        {
          id: 'v3',
          word: '¿Cuánto es?',
          translation: 'كم الثمن؟',
          pronunciation: '/ˈkwanto es/',
          example: "¿Cuánto es todo junto?",
          exampleTranslation: "كم المجموع الكلي؟",
          context: 'shopping/paying'
        }
      ],
      exercises: [
        {
          id: 'e1',
          type: 'listen-repeat',
          prompt: "Escucha y repite: 'Un café con leche, por favor'",
          correctAnswer: "Un café con leche, por favor"
        },
        {
          id: 'e2',
          type: 'roleplay',
          prompt: "Pide un té verde en una cafetería",
          correctAnswer: "Un té verde, por favor",
          hint: "Usa 'por favor' al final"
        }
      ],
      grammarTip: {
        title: "Artículos Indefinidos",
        explanation: "En español usamos 'un' para masculino y 'una' para femenino: un café, una cerveza",
        examples: [
          "Un café con leche",
          "Una taza de té",
          "Un vaso de agua"
        ]
      }
    }
  },
  {
    id: 'es-2-presentacion',
    type: 'speaking',
    title: 'Conocer Gente Nueva',
    titleAr: 'التعرف على أشخاص جدد',
    description: 'Preséntate de forma natural',
    scenario: 'social',
    difficulty: 1,
    duration: 12,
    xpReward: 60,
    content: {
      dialogues: [
        {
          id: 'd1',
          speaker: 'Carlos',
          text: "¡Hola! Soy Carlos. ¿Y tú, cómo te llamas?",
          translation: "مرحباً! أنا كارلوس. وأنت، ما اسمك؟"
        },
        {
          id: 'd2',
          speaker: 'María',
          text: "¡Hola Carlos! Me llamo María. Encantada.",
          translation: "مرحباً كارلوس! اسمي ماريا. تشرفت."
        },
        {
          id: 'd3',
          speaker: 'Carlos',
          text: "Encantado. ¿De dónde eres?",
          translation: "تشرفت. من أين أنتِ؟"
        },
        {
          id: 'd4',
          speaker: 'María',
          text: "Soy de Barcelona, pero vivo aquí en Madrid. ¿Y tú?",
          translation: "أنا من برشلونة، لكنني أعيش هنا في مدريد. وأنت؟"
        }
      ],
      vocabulary: [
        {
          id: 'v1',
          word: 'Me llamo',
          translation: 'اسمي',
          pronunciation: '/me ˈʝamo/',
          example: "Me llamo Ahmed, mucho gusto.",
          exampleTranslation: "اسمي أحمد، تشرفت بمعرفتك.",
          context: 'introductions'
        },
        {
          id: 'v2',
          word: 'Encantado/a',
          translation: 'تشرفت',
          pronunciation: '/enkanˈtaðo/',
          example: "Encantado de conocerte.",
          exampleTranslation: "تشرفت بمعرفتك.",
          context: 'introductions'
        },
        {
          id: 'v3',
          word: '¿De dónde eres?',
          translation: 'من أين أنت؟',
          pronunciation: '/de ˈdonde ˈeres/',
          example: "¿De dónde eres? Tu acento es muy interesante.",
          exampleTranslation: "من أين أنت؟ لهجتك مثيرة للاهتمام.",
          context: 'conversation'
        }
      ],
      exercises: [
        {
          id: 'e1',
          type: 'roleplay',
          prompt: "Preséntate a alguien en una fiesta",
          correctAnswer: "¡Hola! Me llamo [nombre]. Encantado/a.",
          hint: "Empieza con '¡Hola!' y usa 'Me llamo...'"
        },
        {
          id: 'e2',
          type: 'respond',
          prompt: "Alguien dice: '¿De dónde eres?' - Responde naturalmente",
          correctAnswer: "Soy de [país/ciudad].",
          alternatives: ["Soy de Egipto.", "Vengo de El Cairo."]
        }
      ]
    }
  },
  {
    id: 'es-3-restaurante',
    type: 'listening',
    title: 'En el Restaurante',
    titleAr: 'في المطعم',
    description: 'Pide comida y maneja situaciones en restaurantes',
    scenario: 'restaurante',
    difficulty: 2,
    duration: 15,
    xpReward: 75,
    content: {
      dialogues: [
        {
          id: 'd1',
          speaker: 'Camarero',
          text: "Buenas noches. ¿Mesa para dos?",
          translation: "مساء الخير. طاولة لشخصين؟"
        },
        {
          id: 'd2',
          speaker: 'Cliente',
          text: "Sí, por favor. ¿Tienen terraza?",
          translation: "نعم، من فضلك. هل لديكم شرفة؟"
        },
        {
          id: 'd3',
          speaker: 'Camarero',
          text: "Sí, por aquí. Aquí tienen la carta. ¿Les traigo algo de beber?",
          translation: "نعم، من هنا. تفضلوا قائمة الطعام. هل أحضر لكم شيئاً للشرب؟"
        },
        {
          id: 'd4',
          speaker: 'Cliente',
          text: "Sí, una botella de agua sin gas y dos copas de vino tinto.",
          translation: "نعم، زجاجة ماء بدون غاز وكأسين نبيذ أحمر."
        }
      ],
      vocabulary: [
        {
          id: 'v1',
          word: 'la carta',
          translation: 'قائمة الطعام',
          pronunciation: '/la ˈkarta/',
          example: "¿Me puede traer la carta, por favor?",
          exampleTranslation: "هل يمكنك إحضار قائمة الطعام من فضلك؟",
          context: 'restaurant'
        },
        {
          id: 'v2',
          word: 'agua sin gas',
          translation: 'ماء بدون غاز',
          pronunciation: '/ˈaɣwa sin ɣas/',
          example: "Prefiero agua sin gas.",
          exampleTranslation: "أفضل الماء بدون غاز.",
          context: 'drinks'
        }
      ],
      exercises: [
        {
          id: 'e1',
          type: 'listen-repeat',
          prompt: "Escucha y repite: '¿Les traigo algo de beber?'",
          correctAnswer: "¿Les traigo algo de beber?"
        }
      ]
    }
  }
];

export const getLessons = (language: 'english' | 'spanish'): Lesson[] => {
  return language === 'english' ? englishLessons : spanishLessons;
};
