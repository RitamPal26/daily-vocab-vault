
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Send } from 'lucide-react';

interface SubmissionFormProps {
  wordId: string;
  wordText: string;
}

const SubmissionForm = ({ wordId, wordText }: SubmissionFormProps) => {
  const [sentence, setSentence] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sentence.trim() || !author.trim()) {
      toast({
        title: "Incomplete submission",
        description: "Please provide both your sentence and name.",
        variant: "destructive",
      });
      return;
    }
    
    if (!sentence.toLowerCase().includes(wordText.toLowerCase())) {
      toast({
        title: "Missing word",
        description: `Your sentence should include the word "${wordText}".`,
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Thank you for your submission!",
        description: "Your example has been submitted for review.",
      });
      
      // Reset form
      setSentence('');
      setAuthor('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Card className="p-6 animate-fade-in">
      <form onSubmit={handleSubmit}>
        <h3 className="text-xl font-medium mb-4">Submit Your Example</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sentence">Your sentence using "{wordText}"</Label>
            <Textarea
              id="sentence"
              placeholder={`Write a sentence using the word "${wordText}"...`}
              value={sentence}
              onChange={(e) => setSentence(e.target.value)}
              className="resize-none"
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="author">Your name</Label>
            <Input
              id="author"
              placeholder="Your name or pseudonym"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full flex items-center gap-2" 
            disabled={isSubmitting}
          >
            <span>Submit Example</span>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default SubmissionForm;
