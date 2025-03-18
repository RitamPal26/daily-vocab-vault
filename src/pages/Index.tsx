
import { useState, useEffect } from 'react';
import { getTodayWord, getQuizQuestions, getWordSubmissions } from '@/lib/data';
import WordCard from '@/components/WordCard';
import DailyQuiz from '@/components/DailyQuiz';
import WordArchive from '@/components/WordArchive';
import SubmissionForm from '@/components/SubmissionForm';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BadgeDisplay from '@/components/BadgeDisplay';
import SocialShare from '@/components/SocialShare';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown,
  Award,
  Trophy,
  Flame
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import { getStreakData, updateStreak } from '@/lib/streakUtils';

const Index = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { toast } = useToast();
  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    highestStreak: 0,
    badges: [] as string[],
    totalDaysPlayed: 0
  });
  
  const todayWord = getTodayWord();
  const quizQuestions = getQuizQuestions(todayWord.id);
  const approvedSubmissions = getWordSubmissions(todayWord.id);
  const wordData = [getTodayWord(), ...Array(6).keys()].map((_, i) => getTodayWord());
  
  // Initialize streak data on component mount
  useEffect(() => {
    // Update streak when visiting the home page
    const updatedData = updateStreak();
    setStreakData({
      currentStreak: updatedData.currentStreak,
      highestStreak: updatedData.highestStreak,
      badges: updatedData.badges,
      totalDaysPlayed: updatedData.totalDaysPlayed
    });
  }, []);
  
  // Toggle section visibility
  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <Badge className="mb-4" variant="outline">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight">
                Expand Your Vocabulary
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover a new word every day, master its meaning, and enhance your lexical prowess.
              </p>
            </div>
            
            {/* Streak display */}
            {streakData.currentStreak > 0 && (
              <div className="mb-8 flex justify-center">
                <div className="flex flex-col items-center">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-xl">
                    <Card className="p-4 flex flex-col items-center justify-center">
                      <Flame className="h-8 w-8 text-orange-500 mb-1" />
                      <p className="text-muted-foreground text-xs">Current Streak</p>
                      <p className="text-2xl font-bold">{streakData.currentStreak}</p>
                    </Card>
                    
                    <Card className="p-4 flex flex-col items-center justify-center">
                      <Trophy className="h-8 w-8 text-yellow-500 mb-1" />
                      <p className="text-muted-foreground text-xs">Best Streak</p>
                      <p className="text-2xl font-bold">{streakData.highestStreak}</p>
                    </Card>
                    
                    <Card className="p-4 flex flex-col items-center justify-center">
                      <Award className="h-8 w-8 text-blue-500 mb-1" />
                      <p className="text-muted-foreground text-xs">Days Played</p>
                      <p className="text-2xl font-bold">{streakData.totalDaysPlayed}</p>
                    </Card>
                  </div>
                  
                  {streakData.badges.length > 0 && (
                    <div className="mt-4">
                      <BadgeDisplay badges={streakData.badges} compact />
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="mb-10">
              <WordCard word={todayWord} />
            </div>
            
            <div className="flex justify-center">
              <SocialShare 
                word={todayWord.word} 
                definition={todayWord.definition}
                compact
              />
            </div>
          </div>
        </section>
        
        {/* Quiz section */}
        <section className="py-12 px-4 bg-secondary">
          <div className="container mx-auto max-w-3xl">
            <div 
              className="flex items-center justify-between cursor-pointer mb-6"
              onClick={() => toggleSection('quiz')}
            >
              <h2 className="text-2xl font-serif font-bold">Test Your Knowledge</h2>
              <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${
                activeSection === 'quiz' ? 'transform rotate-180' : ''
              }`} />
            </div>
            
            {(activeSection === 'quiz' || activeSection === null) && (
              <div className="animate-fade-in">
                <DailyQuiz 
                  questions={quizQuestions}
                  onComplete={(score, total) => {
                    if (score === total) {
                      toast({
                        title: "Perfect score!",
                        description: "You've mastered today's word.",
                      });
                    }
                  }}
                />
              </div>
            )}
          </div>
        </section>
        
        {/* User submissions section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-3xl">
            <div 
              className="flex items-center justify-between cursor-pointer mb-6"
              onClick={() => toggleSection('submissions')}
            >
              <h2 className="text-2xl font-serif font-bold">Community Examples</h2>
              <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${
                activeSection === 'submissions' ? 'transform rotate-180' : ''
              }`} />
            </div>
            
            {activeSection === 'submissions' && (
              <div className="space-y-8 animate-fade-in">
                {approvedSubmissions.length > 0 ? (
                  <>
                    <div className="space-y-4">
                      {approvedSubmissions.map((submission) => (
                        <Card key={submission.id} className="p-6">
                          <p className="italic mb-2">"{submission.sentence}"</p>
                          <p className="text-sm text-muted-foreground text-right">
                            — {submission.author}
                          </p>
                        </Card>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-center text-muted-foreground">
                    No community examples yet. Be the first to contribute!
                  </p>
                )}
                
                <SubmissionForm wordId={todayWord.id} wordText={todayWord.word} />
              </div>
            )}
          </div>
        </section>
        
        {/* Archive preview section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <div 
              className="flex items-center justify-between cursor-pointer mb-8"
              onClick={() => toggleSection('archive')}
            >
              <h2 className="text-2xl font-serif font-bold">Explore Past Words</h2>
              <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${
                activeSection === 'archive' ? 'transform rotate-180' : ''
              }`} />
            </div>
            
            {activeSection === 'archive' && (
              <div className="animate-fade-in">
                <WordArchive words={wordData} compact />
              </div>
            )}
          </div>
        </section>
        
        {/* Achievements section */}
        {streakData.badges.length > 0 && (
          <section className="py-12 px-4 bg-secondary/50">
            <div className="container mx-auto max-w-3xl">
              <div 
                className="flex items-center justify-between cursor-pointer mb-6"
                onClick={() => toggleSection('achievements')}
              >
                <h2 className="text-2xl font-serif font-bold">Your Achievements</h2>
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${
                  activeSection === 'achievements' ? 'transform rotate-180' : ''
                }`} />
              </div>
              
              {activeSection === 'achievements' && (
                <div className="animate-fade-in">
                  <BadgeDisplay badges={streakData.badges} />
                  
                  <div className="mt-8 flex justify-center">
                    <SocialShare 
                      word={todayWord.word}
                      definition={todayWord.definition}
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
