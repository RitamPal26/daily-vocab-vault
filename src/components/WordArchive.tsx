
import { useState, useEffect } from 'react';
import { Word, wordData } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Calendar, ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '@/lib/animations';
import { Link } from 'react-router-dom';

interface WordArchiveProps {
  words: Word[];
  compact?: boolean;
}

const WordArchive = ({ words, compact = false }: WordArchiveProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredWords, setFilteredWords] = useState<Word[]>(words);
  const [ref, isVisible] = useIntersectionObserver();
  
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredWords(words);
    } else {
      const filtered = words.filter(word => 
        word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.definition.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredWords(filtered);
    }
  }, [searchTerm, words]);
  
  return (
    <div>
      {!compact && (
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search words or definitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      )}
      
      <div 
        className={`grid ${compact ? 'grid-cols-1 sm:grid-cols-2 gap-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'}`}
        ref={ref as any}
      >
        {filteredWords.slice(0, compact ? 4 : undefined).map((word, index) => (
          <Card 
            key={word.id}
            className={`p-6 hover:shadow-md transition-all duration-300 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-serif text-xl font-bold">{word.word}</h3>
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{word.date}</span>
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{word.pronunciation} • {word.partOfSpeech}</p>
            <p className="mb-4 line-clamp-3">{word.definition}</p>
            <div className="flex justify-end">
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/word/${word.id}`} className="flex items-center gap-1">
                  <span>View Details</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      {compact && filteredWords.length > 4 && (
        <div className="mt-8 text-center">
          <Button asChild>
            <Link to="/archive" className="flex items-center gap-2">
              <span>View All Words</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
      
      {!compact && filteredWords.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No words found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default WordArchive;
