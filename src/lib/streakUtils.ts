
// Utility functions for tracking and managing user streaks using localStorage

interface StreakData {
  currentStreak: number;
  lastPlayedDate: string;
  highestStreak: number;
  badges: string[];
  totalDaysPlayed: number;
}

const STORAGE_KEY = 'wordDailyStreak';

// Initialize streak data if it doesn't exist
export const initializeStreakData = (): StreakData => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  
  if (storedData) {
    return JSON.parse(storedData);
  }
  
  // Default initial values
  const initialData: StreakData = {
    currentStreak: 0,
    lastPlayedDate: '',
    highestStreak: 0,
    badges: [],
    totalDaysPlayed: 0
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  return initialData;
};

// Format today's date as YYYY-MM-DD for storage
const getFormattedDate = (): string => {
  const today = new Date();
  return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
};

// Check if the date is consecutive to the last played date
const isConsecutiveDay = (lastPlayedDate: string): boolean => {
  if (!lastPlayedDate) return false;
  
  const lastDate = new Date(lastPlayedDate);
  const today = new Date();
  
  // Reset hours to compare just the dates
  lastDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  // Calculate the difference in days
  const timeDiff = today.getTime() - lastDate.getTime();
  const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  
  // It's consecutive if it's exactly one day later
  return dayDiff === 1;
};

// Check if the user has already played today
export const hasPlayedToday = (): boolean => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (!storedData) return false;
  
  const { lastPlayedDate } = JSON.parse(storedData);
  return lastPlayedDate === getFormattedDate();
};

// Update streak when user engages with the word of the day
export const updateStreak = (): StreakData => {
  const streakData = initializeStreakData();
  const today = getFormattedDate();
  
  // If already played today, just return current data
  if (streakData.lastPlayedDate === today) {
    return streakData;
  }
  
  let { currentStreak, highestStreak, badges, totalDaysPlayed } = streakData;
  
  // Check if this is a consecutive day
  if (isConsecutiveDay(streakData.lastPlayedDate)) {
    currentStreak += 1;
  } else if (streakData.lastPlayedDate !== today) {
    // Reset streak if not consecutive and not same day
    currentStreak = 1;
  }
  
  // Update highest streak if current is higher
  if (currentStreak > highestStreak) {
    highestStreak = currentStreak;
  }
  
  // Increment total days played
  totalDaysPlayed += 1;
  
  // Check for new badges
  const newBadges = [...badges];
  
  // Streak milestones
  if (currentStreak >= 7 && !badges.includes('week-streak')) {
    newBadges.push('week-streak');
  }
  if (currentStreak >= 30 && !badges.includes('month-streak')) {
    newBadges.push('month-streak');
  }
  if (currentStreak >= 100 && !badges.includes('century-streak')) {
    newBadges.push('century-streak');
  }
  
  // Total days played milestones
  if (totalDaysPlayed >= 10 && !badges.includes('dedicated-learner')) {
    newBadges.push('dedicated-learner');
  }
  if (totalDaysPlayed >= 50 && !badges.includes('vocabulary-enthusiast')) {
    newBadges.push('vocabulary-enthusiast');
  }
  
  // Save the updated data
  const updatedData: StreakData = {
    currentStreak,
    lastPlayedDate: today,
    highestStreak,
    badges: newBadges,
    totalDaysPlayed
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  return updatedData;
};

// Get the current streak data without updating it
export const getStreakData = (): StreakData => {
  return initializeStreakData();
};

// Maps badge IDs to human-readable names and descriptions
export const badgeInfo: Record<string, { name: string; description: string }> = {
  'week-streak': {
    name: '7-Day Streak',
    description: 'Visited Word Daily for 7 consecutive days'
  },
  'month-streak': {
    name: '30-Day Streak',
    description: 'Maintained a learning streak for a full month'
  },
  'century-streak': {
    name: '100-Day Streak',
    description: 'An impressive vocabulary journey of 100 consecutive days'
  },
  'dedicated-learner': {
    name: 'Dedicated Learner',
    description: 'Explored at least 10 daily words'
  },
  'vocabulary-enthusiast': {
    name: 'Vocabulary Enthusiast',
    description: 'Studied 50 or more daily words'
  }
};
