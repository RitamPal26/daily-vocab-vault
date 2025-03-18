
import { useState, useEffect } from 'react';
import { getTodayWord, getQuizQuestions } from '@/lib/data';
import DailyQuiz from '@/components/DailyQuiz';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Award, Trophy, Flame } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Quiz = () => {
  const { toast } = useToast();
  const todayWord = getTodayWord();
  const quizQuestions = getQuizQuestions(todayWord.id);
  
  // In a real app, these would come from user data
  const stats = {
    streak: 5,
    totalCompleted: 12,
    correctAnswers: 28,
    totalQuestions: 36
  };
  
  const handleQuizComplete = (score: number, total: number) => {
    toast({
      title: score === total ? "Perfect score!" : "Quiz completed!",
      description: `You got ${score} out of ${total} questions correct.`,
    });
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
              <p className="text-3xl font-bold">{stats.streak}</p>
            </Card>
            
            <Card className="p-6 flex flex-col items-center justify-center">
              <Trophy className="h-10 w-10 text-yellow-500 mb-2" />
              <p className="text-muted-foreground text-sm mb-1">Quizzes Completed</p>
              <p className="text-3xl font-bold">{stats.totalCompleted}</p>
            </Card>
            
            <Card className="p-6 flex flex-col items-center justify-center">
              <div className="mb-2">
                <Progress value={(stats.correctAnswers / stats.totalQuestions) * 100} className="h-3 w-24" />
              </div>
              <p className="text-muted-foreground text-sm mb-1">Accuracy</p>
              <p className="text-3xl font-bold">{Math.round((stats.correctAnswers / stats.totalQuestions) * 100)}%</p>
            </Card>
          </div>
          
          <DailyQuiz 
            questions={quizQuestions} 
            onComplete={handleQuizComplete}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Quiz;
