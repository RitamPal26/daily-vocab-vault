
import { useState, useEffect } from 'react';
import { getTodayWord, getQuizQuestions } from '@/lib/data';
import DailyQuiz from '@/components/DailyQuiz';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BadgeDisplay from '@/components/BadgeDisplay';
import { Badge } from '@/components/ui/badge';
import { Award, Trophy, Flame } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getStreakData } from '@/lib/streakUtils';
import SocialShare from '@/components/SocialShare';

const Quiz = () => {
  const { toast } = useToast();
  const todayWord = getTodayWord();
  const quizQuestions = getQuizQuestions(todayWord.id);
  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    highestStreak: 0,
    badges: [] as string[],
    totalDaysPlayed: 0
  });
  
  // Mock stats for the quiz UI - in a real app, these would come from localStorage too
  const [stats, setStats] = useState({
    totalCompleted: 0,
    correctAnswers: 0,
    totalQuestions: 0
  });
  
  useEffect(() => {
    // Load streak data
    const data = getStreakData();
    setStreakData({
      currentStreak: data.currentStreak,
      highestStreak: data.highestStreak,
      badges: data.badges,
      totalDaysPlayed: data.totalDaysPlayed
    });
    
    // In a real app, we would load quiz stats from localStorage here
    // For this demo, we'll set some mock data based on the streak
    setStats({
      totalCompleted: Math.min(data.totalDaysPlayed, 12),
      correctAnswers: Math.floor(data.totalDaysPlayed * 2.5),
      totalQuestions: Math.floor(data.totalDaysPlayed * 3)
    });
  }, []);
  
  const handleQuizComplete = (score: number, total: number) => {
    // In a real app, we would update the quiz stats in localStorage here
    toast({
      title: score === total ? "Perfect score!" : "Quiz completed!",
      description: `You got ${score} out of ${total} questions correct.`,
    });
    
    // Update mock stats
    setStats(prev => ({
      ...prev,
      totalCompleted: prev.totalCompleted + 1,
      correctAnswers: prev.correctAnswers + score,
      totalQuestions: prev.totalQuestions + total
    }));
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">
              <Award className="h-3.5 w-3.5 mr-1" />
              Daily Challenge
            </Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Test Your Knowledge
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Take the daily quiz to reinforce your understanding of "{todayWord.word}".
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card className="p-6 flex flex-col items-center justify-center">
              <Flame className="h-10 w-10 text-orange-500 mb-2" />
              <p className="text-muted-foreground text-sm mb-1">Current Streak</p>
              <p className="text-3xl font-bold">{streakData.currentStreak}</p>
            </Card>
            
            <Card className="p-6 flex flex-col items-center justify-center">
              <Trophy className="h-10 w-10 text-yellow-500 mb-2" />
              <p className="text-muted-foreground text-sm mb-1">Quizzes Completed</p>
              <p className="text-3xl font-bold">{stats.totalCompleted}</p>
            </Card>
            
            <Card className="p-6 flex flex-col items-center justify-center">
              <div className="mb-2">
                <Progress 
                  value={stats.totalQuestions > 0 ? (stats.correctAnswers / stats.totalQuestions) * 100 : 0} 
                  className="h-3 w-24" 
                />
              </div>
              <p className="text-muted-foreground text-sm mb-1">Accuracy</p>
              <p className="text-3xl font-bold">
                {stats.totalQuestions > 0 
                  ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100) 
                  : 0}%
              </p>
            </Card>
          </div>
          
          {streakData.badges.length > 0 && (
            <div className="mb-10">
              <BadgeDisplay badges={streakData.badges} compact />
            </div>
          )}
          
          <DailyQuiz 
            questions={quizQuestions} 
            onComplete={handleQuizComplete}
          />
          
          <div className="mt-8 flex justify-center">
            <SocialShare 
              word={todayWord.word}
              definition={todayWord.definition}
              compact
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Quiz;
