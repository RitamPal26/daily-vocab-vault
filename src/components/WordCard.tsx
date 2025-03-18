
import { useState, useEffect } from 'react';
import { Word } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Volume2 } from 'lucide-react';

interface WordCardProps {
  word: Word;
}

const WordCard = ({ word }: WordCardProps) => {
  const [flipped, setFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setFlipped(!flipped);
      setTimeout(() => setIsAnimating(false), 600); // Match duration to animation
    }
  };

  // Speak the word when the volume button is clicked
  const speakWord = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slightly slower rate for clarity
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div 
      className={`flip-card w-full max-w-md mx-auto h-[400px] ${flipped ? 'flipped' : ''}`}
      onClick={handleFlip}
    >
      <div className="flip-card-inner relative w-full h-full">
        {/* Front of card */}
        <Card className="flip-card-front absolute w-full h-full flex flex-col justify-center items-center p-8 cursor-pointer hover:shadow-lg transition-shadow duration-300">
          <Badge className="mb-2 bg-secondary text-secondary-foreground" variant="secondary">
            Word of the Day
          </Badge>
          <h1 className="font-serif text-5xl font-bold mb-2">{word.word}</h1>
          <div className="flex items-center gap-2 text-lg text-muted-foreground mb-6">
            <span>{word.pronunciation}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                speakWord(word.word);
              }}
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-muted-foreground italic text-center">{word.partOfSpeech}</p>
          <p className="mt-6 text-center">Tap card to see definition</p>
        </Card>

        {/* Back of card */}
        <Card className="flip-card-back absolute w-full h-full flex flex-col justify-center items-center p-8 cursor-pointer hover:shadow-lg transition-shadow duration-300">
          <h2 className="font-serif text-3xl font-bold mb-4">{word.word}</h2>
          <p className="text-lg mb-6 text-center font-medium">{word.definition}</p>
          <div className="bg-secondary p-4 rounded-md w-full">
            <p className="text-secondary-foreground italic text-center">{word.example}</p>
          </div>
          {word.etymology && (
            <div className="mt-6">
              <p className="text-sm text-muted-foreground">Etymology: {word.etymology}</p>
            </div>
          )}
          <p className="mt-6 text-center">Tap card to flip back</p>
        </Card>
      </div>
    </div>
  );
};

export default WordCard;
