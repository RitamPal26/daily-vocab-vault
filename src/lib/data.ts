export interface Word {
  id: string;
  word: string;
  pronunciation: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  date: string;
  etymology?: string;
}

export interface QuizQuestion {
  id: string;
  wordId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface UserSubmission {
  id: string;
  wordId: string;
  sentence: string;
  author: string;
  approved: boolean;
  date: string;
}

export interface WordSuggestion {
  id: string;
  word: string;
  definition: string;
  example: string;
  submittedBy: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const wordData: Word[] = [
  {
    id: "1",
    word: "Ephemeral",
    pronunciation: "/əˈfem(ə)rəl/",
    partOfSpeech: "adjective",
    definition: "Lasting for a very short time; transitory.",
    example: "The ephemeral beauty of cherry blossoms makes them all the more precious.",
    date: "2023-06-01",
    etymology: "From Greek ephēmeros, lasting only a day.",
  },
  {
    id: "2",
    word: "Serendipity",
    pronunciation: "/ˌserənˈdipədē/",
    partOfSpeech: "noun",
    definition: "The occurrence and development of events by chance in a happy or beneficial way.",
    example: "The serendipity of meeting an old friend while traveling abroad made the trip unforgettable.",
    date: "2023-06-02",
    etymology: "Coined by Horace Walpole in 1754 based on the Persian fairy tale 'The Three Princes of Serendip'.",
  },
  {
    id: "3",
    word: "Ubiquitous",
    pronunciation: "/yo͞uˈbikwədəs/",
    partOfSpeech: "adjective",
    definition: "Present, appearing, or found everywhere.",
    example: "Smartphones have become ubiquitous in modern society.",
    date: "2023-06-03",
    etymology: "From Latin ubique, meaning 'everywhere'.",
  },
  {
    id: "4",
    word: "Perspicacious",
    pronunciation: "/ˌpərspəˈkāSHəs/",
    partOfSpeech: "adjective",
    definition: "Having a ready insight into and understanding of things.",
    example: "Her perspicacious analysis of the complex situation impressed everyone in the meeting.",
    date: "2023-06-04",
    etymology: "From Latin perspicax, meaning 'clear-sighted'.",
  },
  {
    id: "5",
    word: "Mellifluous",
    pronunciation: "/məˈliflo͞oəs/",
    partOfSpeech: "adjective",
    definition: "Pleasingly smooth and musical to hear.",
    example: "The speaker's mellifluous voice had a calming effect on the audience.",
    date: "2023-06-05",
    etymology: "From Latin mel (honey) and fluere (to flow).",
  },
  {
    id: "6",
    word: "Ineffable",
    pronunciation: "/inˈefəb(ə)l/",
    partOfSpeech: "adjective",
    definition: "Too great or extreme to be expressed or described in words.",
    example: "The beauty of the aurora borealis was almost ineffable.",
    date: "2023-06-06",
    etymology: "From Latin ineffabilis, from in- 'not' + effabilis 'able to be expressed'.",
  },
  {
    id: "7",
    word: "Surreptitious",
    pronunciation: "/ˌsərəpˈtiSHəs/",
    partOfSpeech: "adjective",
    definition: "Kept secret, especially because it would not be approved of.",
    example: "He cast a surreptitious glance at his watch during the long meeting.",
    date: "2023-06-07",
    etymology: "From Latin surrepticius, from surripere 'take secretly'.",
  }
];

export const quizData: QuizQuestion[] = [
  {
    id: "q1",
    wordId: "1",
    question: "What does 'ephemeral' mean?",
    options: [
      "Long-lasting and permanent",
      "Lasting for a very short time",
      "Beautiful and ornate",
      "Dangerous or harmful"
    ],
    correctAnswer: 1,
    explanation: "Ephemeral means lasting for a very short time or transitory."
  },
  {
    id: "q2",
    wordId: "1",
    question: "Which of these would be described as 'ephemeral'?",
    options: [
      "A stone monument",
      "A mountain range",
      "A snowflake",
      "A diamond"
    ],
    correctAnswer: 2,
    explanation: "A snowflake is ephemeral because it exists only briefly before melting."
  },
  {
    id: "q3",
    wordId: "2",
    question: "What is an example of 'serendipity'?",
    options: [
      "Planning a detailed vacation itinerary",
      "Finding a valuable book by chance while looking for something else",
      "Working hard to achieve a specific goal",
      "Deliberately searching for a rare item"
    ],
    correctAnswer: 1,
    explanation: "Serendipity refers to finding something valuable or beneficial by chance, not through deliberate searching."
  }
];

export const userSubmissions: UserSubmission[] = [
  {
    id: "s1",
    wordId: "1",
    sentence: "The ephemeral nature of fashion trends means what is popular today may be forgotten tomorrow.",
    author: "Michelle K.",
    approved: true,
    date: "2023-06-01"
  },
  {
    id: "s2",
    wordId: "2",
    sentence: "It was pure serendipity that I found my lost ring while gardening years after I had lost it.",
    author: "Thomas L.",
    approved: true,
    date: "2023-06-02"
  }
];

export const wordSuggestions: WordSuggestion[] = [
  {
    id: "sug1",
    word: "Petrichor",
    definition: "The pleasant smell that accompanies the first rain after a dry spell.",
    example: "After weeks of dry weather, the petrichor from the sudden downpour was invigorating.",
    submittedBy: "Rain Lover",
    date: "2023-06-15",
    status: 'pending'
  },
  {
    id: "sug2",
    word: "Vellichor",
    definition: "The strange wistfulness of used bookshops.",
    example: "The vellichor of the old bookstore transported her to another time.",
    submittedBy: "Book Enthusiast",
    date: "2023-06-16",
    status: 'pending'
  }
];

export const getTodayWord = (): Word => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  const index = dayOfYear % wordData.length;
  
  return wordData[index];
};

export const getQuizQuestions = (wordId: string): QuizQuestion[] => {
  return quizData.filter(question => question.wordId === wordId);
};

export const getWordSubmissions = (wordId: string): UserSubmission[] => {
  return userSubmissions.filter(submission => submission.wordId === wordId && submission.approved);
};

export const addWord = (word: Word): Promise<Word> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(word);
    }, 500);
  });
};

export const addUserSubmission = (submission: Omit<UserSubmission, 'id' | 'date' | 'approved'>): Promise<UserSubmission> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newSubmission: UserSubmission = {
        ...submission,
        id: `s${Math.floor(Math.random() * 10000)}`,
        date: new Date().toISOString().split('T')[0],
        approved: false
      };
      
      resolve(newSubmission);
    }, 500);
  });
};

export const addWordSuggestion = (suggestion: Omit<WordSuggestion, 'id' | 'date' | 'status'>): Promise<WordSuggestion> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newSuggestion: WordSuggestion = {
        ...suggestion,
        id: `sug${Math.floor(Math.random() * 10000)}`,
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
      };
      
      resolve(newSuggestion);
    }, 500);
  });
};

export const fetchWordDefinition = async (word: string): Promise<any> => {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch word definition');
    }
    
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error('Error fetching word definition:', error);
    throw error;
  }
};
