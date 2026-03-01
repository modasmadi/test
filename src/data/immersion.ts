import { ImmersionScenario } from '../types';

export const englishImmersionDay: ImmersionScenario[] = [
  {
    id: 'morning-wake',
    timeOfDay: 'morning',
    location: '🏠 Your Apartment',
    situation: 'You wake up in your New York apartment. Your roommate is in the kitchen.',
    dialogues: [
      {
        id: 'd1',
        speaker: 'Roommate',
        text: "Morning! Did you sleep well?",
        translation: "صباح الخير! هل نمت جيداً؟"
      },
      {
        id: 'd2',
        speaker: 'Roommate',
        text: "I made coffee if you want some. It's still hot.",
        translation: "صنعت قهوة إن أردت. لا زالت ساخنة."
      }
    ],
    userResponses: [
      "Yeah, pretty well. Thanks!",
      "Not really, I couldn't fall asleep.",
      "Thanks! I'd love some coffee."
    ]
  },
  {
    id: 'morning-cafe',
    timeOfDay: 'morning',
    location: '☕ Local Coffee Shop',
    situation: 'You stop by your favorite coffee shop on the way to work.',
    dialogues: [
      {
        id: 'd1',
        speaker: 'Barista',
        text: "Hey! The usual?",
        translation: "مرحباً! الطلب المعتاد؟"
      },
      {
        id: 'd2',
        speaker: 'Barista',
        text: "Coming right up. Oh, we have a new seasonal latte if you want to try something different.",
        translation: "حالاً. بالمناسبة، لدينا لاتيه موسمي جديد إن أردت تجربة شيء مختلف."
      }
    ],
    userResponses: [
      "Yes, please! You know me well.",
      "Actually, I'll try the seasonal latte today.",
      "What's in the seasonal latte?"
    ]
  },
  {
    id: 'morning-commute',
    timeOfDay: 'morning',
    location: '🚇 Subway Station',
    situation: 'You\'re at the subway. A tourist looks confused.',
    dialogues: [
      {
        id: 'd1',
        speaker: 'Tourist',
        text: "Excuse me, does this train go to Times Square?",
        translation: "عذراً، هل هذا القطار يذهب إلى تايمز سكوير؟"
      },
      {
        id: 'd2',
        speaker: 'Tourist',
        text: "Oh great, thank you so much! Is it far?",
        translation: "رائع، شكراً جزيلاً! هل هو بعيد؟"
      }
    ],
    userResponses: [
      "Yes, it does! Just stay on for about 4 stops.",
      "No, you need the other platform. The uptown train.",
      "Yeah, about 10 minutes from here."
    ]
  },
  {
    id: 'afternoon-work',
    timeOfDay: 'afternoon',
    location: '💼 Office',
    situation: 'You\'re at work. A colleague needs help with a project.',
    dialogues: [
      {
        id: 'd1',
        speaker: 'Colleague',
        text: "Hey, do you have a minute? I need your opinion on something.",
        translation: "مرحباً، هل لديك دقيقة؟ أحتاج رأيك في شيء."
      },
      {
        id: 'd2',
        speaker: 'Colleague',
        text: "I'm trying to decide between these two designs. Which one do you think works better?",
        translation: "أحاول الاختيار بين هذين التصميمين. أيهما تعتقد أنه أفضل؟"
      }
    ],
    userResponses: [
      "Sure, what's up?",
      "I like the first one. It's cleaner.",
      "Hmm, the second one is more modern, but the first is easier to read."
    ]
  },
  {
    id: 'afternoon-lunch',
    timeOfDay: 'afternoon',
    location: '🍔 Restaurant',
    situation: 'Lunch break with coworkers at a nearby restaurant.',
    dialogues: [
      {
        id: 'd1',
        speaker: 'Coworker',
        text: "Have you been here before? Their burgers are amazing.",
        translation: "هل زرت هذا المكان من قبل؟ البرغر هنا رائع."
      },
      {
        id: 'd2',
        speaker: 'Server',
        text: "Ready to order?",
        translation: "جاهزون للطلب؟"
      }
    ],
    userResponses: [
      "No, it's my first time. What do you recommend?",
      "Yes, I'll have the cheeseburger with fries, please.",
      "Can I see the menu for a minute?"
    ]
  },
  {
    id: 'evening-gym',
    timeOfDay: 'evening',
    location: '🏋️ Gym',
    situation: 'After work, you go to the gym. Someone asks about the equipment.',
    dialogues: [
      {
        id: 'd1',
        speaker: 'Gym Member',
        text: "Hey, are you using this machine?",
        translation: "مرحباً، هل تستخدم هذا الجهاز؟"
      },
      {
        id: 'd2',
        speaker: 'Gym Member',
        text: "Cool, thanks! Do you know how to adjust the seat?",
        translation: "رائع، شكراً! هل تعرف كيف أضبط المقعد؟"
      }
    ],
    userResponses: [
      "No, go ahead!",
      "I'm almost done, just one more set.",
      "Yeah, there's a lever on the side."
    ]
  },
  {
    id: 'evening-grocery',
    timeOfDay: 'evening',
    location: '🛒 Grocery Store',
    situation: 'You stop by the grocery store for dinner ingredients.',
    dialogues: [
      {
        id: 'd1',
        speaker: 'Store Employee',
        text: "Can I help you find something?",
        translation: "هل يمكنني مساعدتك في إيجاد شيء؟"
      },
      {
        id: 'd2',
        speaker: 'Store Employee',
        text: "Fresh herbs are in aisle 3, near the vegetables.",
        translation: "الأعشاب الطازجة في الممر 3، بالقرب من الخضروات."
      }
    ],
    userResponses: [
      "Yes, where can I find fresh basil?",
      "No thanks, I'm just looking.",
      "Actually, do you have any organic options?"
    ]
  },
  {
    id: 'night-dinner',
    timeOfDay: 'night',
    location: '🏠 Home',
    situation: 'You\'re having dinner with your roommate.',
    dialogues: [
      {
        id: 'd1',
        speaker: 'Roommate',
        text: "This smells amazing! What are you making?",
        translation: "الرائحة رائعة! ماذا تحضر؟"
      },
      {
        id: 'd2',
        speaker: 'Roommate',
        text: "Want to watch something after dinner? I found a good show.",
        translation: "هل تريد مشاهدة شيء بعد العشاء؟ وجدت مسلسلاً جيداً."
      }
    ],
    userResponses: [
      "Just some pasta with homemade sauce.",
      "Sure, what kind of show is it?",
      "Actually, I'm pretty tired. Maybe tomorrow?"
    ]
  }
];

export const spanishImmersionDay: ImmersionScenario[] = [
  {
    id: 'morning-wake',
    timeOfDay: 'morning',
    location: '🏠 Tu Piso',
    situation: 'Te despiertas en tu piso en Madrid. Tu compañero está en la cocina.',
    dialogues: [
      {
        id: 'd1',
        speaker: 'Compañero',
        text: "¡Buenos días! ¿Has dormido bien?",
        translation: "صباح الخير! هل نمت جيداً؟"
      },
      {
        id: 'd2',
        speaker: 'Compañero',
        text: "He hecho café si quieres. Todavía está caliente.",
        translation: "صنعت قهوة إن أردت. لا زالت ساخنة."
      }
    ],
    userResponses: [
      "Sí, muy bien. ¡Gracias!",
      "No muy bien, no podía dormir.",
      "¡Genial! Me encantaría un café."
    ]
  },
  {
    id: 'morning-cafe',
    timeOfDay: 'morning',
    location: '☕ Cafetería',
    situation: 'Paras en tu cafetería favorita camino al trabajo.',
    dialogues: [
      {
        id: 'd1',
        speaker: 'Camarero',
        text: "¡Hola! ¿Lo de siempre?",
        translation: "مرحباً! الطلب المعتاد؟"
      },
      {
        id: 'd2',
        speaker: 'Camarero',
        text: "Marchando. Por cierto, tenemos un café especial nuevo, por si quieres probar.",
        translation: "حالاً. بالمناسبة، لدينا قهوة خاصة جديدة إن أردت تجربتها."
      }
    ],
    userResponses: [
      "¡Sí, por favor! Me conoces bien.",
      "Hoy voy a probar el especial.",
      "¿Qué lleva el especial?"
    ]
  },
  {
    id: 'morning-metro',
    timeOfDay: 'morning',
    location: '🚇 Metro',
    situation: 'Estás en el metro. Un turista parece perdido.',
    dialogues: [
      {
        id: 'd1',
        speaker: 'Turista',
        text: "Perdona, ¿este metro va a Sol?",
        translation: "عذراً، هل هذا المترو يذهب إلى سول؟"
      },
      {
        id: 'd2',
        speaker: 'Turista',
        text: "¡Muchas gracias! ¿Cuántas paradas son?",
        translation: "شكراً جزيلاً! كم عدد المحطات؟"
      }
    ],
    userResponses: [
      "Sí, son unas 4 paradas.",
      "No, tienes que coger la otra línea.",
      "Sí, unos 10 minutos desde aquí."
    ]
  },
  {
    id: 'afternoon-work',
    timeOfDay: 'afternoon',
    location: '💼 Oficina',
    situation: 'Estás en el trabajo. Un compañero necesita ayuda.',
    dialogues: [
      {
        id: 'd1',
        speaker: 'Compañero',
        text: "Oye, ¿tienes un momento? Necesito tu opinión.",
        translation: "سمعت، هل لديك لحظة؟ أحتاج رأيك."
      },
      {
        id: 'd2',
        speaker: 'Compañero',
        text: "Estoy entre estos dos diseños. ¿Cuál te parece mejor?",
        translation: "أنا محتار بين هذين التصميمين. أيهما تعتقد أنه أفضل؟"
      }
    ],
    userResponses: [
      "Claro, dime.",
      "Me gusta más el primero. Es más limpio.",
      "El segundo es más moderno, pero el primero es más fácil de leer."
    ]
  },
  {
    id: 'evening-tapas',
    timeOfDay: 'evening',
    location: '🍷 Bar de Tapas',
    situation: 'Sales a tomar tapas con amigos después del trabajo.',
    dialogues: [
      {
        id: 'd1',
        speaker: 'Amigo',
        text: "¿Qué vas a pedir? Aquí las patatas bravas están muy buenas.",
        translation: "ماذا ستطلب؟ البطاطس الحارة هنا لذيذة جداً."
      },
      {
        id: 'd2',
        speaker: 'Camarero',
        text: "¿Qué les pongo?",
        translation: "ماذا أحضر لكم؟"
      }
    ],
    userResponses: [
      "Pues ponme unas bravas y una caña.",
      "Yo quiero jamón y una copa de vino.",
      "¿Qué tapas tenéis hoy?"
    ]
  }
];

export const getImmersionDay = (language: 'english' | 'spanish'): ImmersionScenario[] => {
  return language === 'english' ? englishImmersionDay : spanishImmersionDay;
};
