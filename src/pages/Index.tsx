
import { useState, useEffect } from 'react';
import { getTodayWord, getQuizQuestions, getWordSubmissions } from '@/lib/data';
import WordCard from '@/components/WordCard';
import DailyQuiz from '@/components/DailyQuiz';
import WordArchive from '@/components/WordArchive';
import SubmissionForm from '@/components/SubmissionForm';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Share2, 
  ChevronDown 
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { toast } = useToast();
  
  const todayWord = getTodayWord();
  const quizQuestions = getQuizQuestions(todayWord.id);
  const approvedSubmissions = getWordSubmissions(todayWord.id);
  const wordData = [getTodayWord(), ...Array(6).keys()].map((_, i) => getTodayWord());
  
  // Toggle section visibility
  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };
  
  // Share functionality
  const handleShare = () => {
    const shareText = `I learned the word "${todayWord.word}" today: ${todayWord.definition} #LexiconDaily`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Lexicon Daily - Word of the Day',
        text: shareText,
        url: window.location.href,
      }).catch(() => {
        // Fallback if share fails
        copyToClipboard(shareText);
      });
    } else {
      // Fallback for browsers that don't support sharing
      copyToClipboard(shareText);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Now you can paste and share it anywhere!",
      });
    });
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
            
            <div className="mb-10">
              <WordCard word={todayWord} />
            </div>
            
            <div className="flex justify-center">
              <Button
                onClick={handleShare}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                <span>Share This Word</span>
              </Button>
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
