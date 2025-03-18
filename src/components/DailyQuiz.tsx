
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QuizQuestion } from '@/lib/data';
import { CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface DailyQuizProps {
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
}

const DailyQuiz = ({ questions, onComplete }: DailyQuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleOptionSelect = (optionIndex: number) => {
    if (answered) return;
    
    setSelectedOption(optionIndex);
    setAnswered(true);
    
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore(prevScore => prevScore + 1);
      toast({
        title: "Correct!",
        description: currentQuestion.explanation,
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: currentQuestion.explanation,
        variant: "destructive",
      });
    }
  };
  
  const handleNextQuestion = () => {
    setSelectedOption(null);
    setAnswered(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setQuizCompleted(true);
      if (onComplete) {
        onComplete(score, questions.length);
      }
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };
  
  if (!questions.length) {
    return (
      <Card className="p-6 animate-fade-in">
        <p className="text-center">No quiz questions available for today's word.</p>
      </Card>
    );
  }
  
  if (quizCompleted) {
    return (
      <Card className="p-8 flex flex-col items-center justify-center animate-scale-in">
        <h2 className="text-2xl font-bold mb-6">Quiz Completed!</h2>
        <div className="text-5xl font-bold mb-8">
          {score}/{questions.length}
        </div>
        <p className="mb-6 text-center">
          {score === questions.length
            ? "Perfect score! You've mastered today's word."
            : score > questions.length / 2
            ? "Great job! You're on your way to expanding your vocabulary."
            : "Keep practicing! Learning new words takes time."}
        </p>
        <Button onClick={resetQuiz} className="mt-4">
          Try Again
        </Button>
      </Card>
    );
  }
  
  return (
    <Card className="p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <Badge variant="outline" className="px-3 py-1">
          Question {currentQuestionIndex + 1} of {questions.length}
        </Badge>
        <Badge variant="secondary" className="px-3 py-1">
          Score: {score}
        </Badge>
      </div>
      
      <h3 className="text-xl font-medium mb-6">{currentQuestion.question}</h3>
      
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option, index) => (
          <Button
            key={index}
            variant={selectedOption === null ? "outline" : 
                   selectedOption === index ? 
                   (index === currentQuestion.correctAnswer ? "default" : "destructive") :
                   index === currentQuestion.correctAnswer && answered ? "default" : "outline"}
            className={`w-full justify-start h-auto py-4 px-6 text-left ${
              answered && "cursor-default"
            }`}
            onClick={() => handleOptionSelect(index)}
            disabled={answered}
          >
            <span className="flex items-center w-full">
              <span className="flex-1">{option}</span>
              {answered && index === currentQuestion.correctAnswer && (
                <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
              )}
              {answered && selectedOption === index && index !== currentQuestion.correctAnswer && (
                <XCircle className="h-5 w-5 text-red-500 ml-2" />
              )}
            </span>
          </Button>
        ))}
      </div>
      
      {answered && (
        <Button onClick={handleNextQuestion} className="w-full">
          {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Complete Quiz"}
        </Button>
      )}
    </Card>
  );
};

export default DailyQuiz;
