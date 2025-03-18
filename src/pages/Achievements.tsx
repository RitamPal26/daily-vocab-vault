
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getStreakData } from '@/lib/streakUtils';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Trophy, Calendar, Award, Star, Lock } from 'lucide-react';
import { badgeInfo } from '@/lib/streakUtils';
import SocialShare from '@/components/SocialShare';
import { getTodayWord } from '@/lib/data';

const Achievements = () => {
  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    highestStreak: 0,
    badges: [] as string[],
    totalDaysPlayed: 0,
    lastPlayedDate: ''
  });
  
  const todayWord = getTodayWord();
  
  useEffect(() => {
    const data = getStreakData();
    setStreakData(data);
  }, []);
  
  // Define all possible badges to show both earned and locked ones
  const allBadges = [
    'week-streak',
    'month-streak',
    'century-streak',
    'dedicated-learner',
    'vocabulary-enthusiast'
  ];
  
  const getBadgeIcon = (badgeId: string, earned: boolean) => {
    if (!earned) {
      return <Lock className="h-10 w-10 text-muted-foreground" />;
    }
    
    switch (badgeId) {
      case 'week-streak':
        return <Calendar className="h-10 w-10 text-blue-500" />;
      case 'month-streak':
        return <Trophy className="h-10 w-10 text-purple-500" />;
      case 'century-streak':
        return <Star className="h-10 w-10 text-yellow-500" />;
      case 'dedicated-learner':
        return <Award className="h-10 w-10 text-green-500" />;
      case 'vocabulary-enthusiast':
        return <Trophy className="h-10 w-10 text-orange-500" />;
      default:
        return <Award className="h-10 w-10 text-gray-500" />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">
              <Trophy className="h-3.5 w-3.5 mr-1" />
              Achievements
            </Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Your Learning Journey
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track your progress and collect badges as you expand your vocabulary.
            </p>
          </div>
          
          <Card className="p-6 mb-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold mb-1">Current Streak</h2>
                <p className="text-4xl font-bold text-primary">{streakData.currentStreak} days</p>
                {streakData.highestStreak > streakData.currentStreak && (
                  <p className="text-sm text-muted-foreground">
                    Best: {streakData.highestStreak} days
                  </p>
                )}
              </div>
              
              <div className="flex flex-col items-center">
                <p className="text-sm text-muted-foreground mb-1">Total Days</p>
                <p className="text-3xl font-bold">{streakData.totalDaysPlayed}</p>
              </div>
              
              <div className="flex flex-col items-center">
                <p className="text-sm text-muted-foreground mb-1">Badges Earned</p>
                <p className="text-3xl font-bold">{streakData.badges.length}</p>
              </div>
            </div>
          </Card>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Your Badges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allBadges.map(badgeId => {
                const earned = streakData.badges.includes(badgeId);
                return (
                  <Card 
                    key={badgeId}
                    className={`p-6 ${!earned ? 'opacity-60' : ''}`}
                  >
                    <div className="flex items-center">
                      <div className="mr-4">
                        {getBadgeIcon(badgeId, earned)}
                      </div>
                      <div>
                        <h3 className="text-xl font-medium mb-1">
                          {badgeInfo[badgeId]?.name || badgeId}
                        </h3>
                        <p className="text-muted-foreground">
                          {badgeInfo[badgeId]?.description}
                        </p>
                        {!earned && (
                          <p className="text-sm font-medium text-orange-500 mt-2">
                            Not yet earned
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
          
          <div className="flex justify-center">
            <SocialShare 
              word={todayWord.word}
              definition={todayWord.definition}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Achievements;
