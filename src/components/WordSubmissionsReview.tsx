
import { useState, useEffect } from 'react';
import { UserSubmission, wordData } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock submissions data - in a real app this would come from the backend
const mockSubmissions: UserSubmission[] = [
  {
    id: "s3",
    wordId: "1",
    sentence: "The ephemeral beauty of cherry blossoms reminds us to appreciate each moment.",
    author: "Daniel R.",
    approved: false,
    date: "2023-06-08"
  },
  {
    id: "s4",
    wordId: "2",
    sentence: "Finding my passion for photography was a serendipity that changed the course of my life.",
    author: "Elena T.",
    approved: false,
    date: "2023-06-09"
  },
  {
    id: "s5",
    wordId: "3",
    sentence: "In today's digital age, smartphones have become ubiquitous even in the most remote locations.",
    author: "Marcus W.",
    approved: false,
    date: "2023-06-10"
  }
];

const WordSubmissionsReview = () => {
  const [submissions, setSubmissions] = useState<UserSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching submissions from a backend
    setTimeout(() => {
      setSubmissions(mockSubmissions);
      setLoading(false);
    }, 1000);
  }, []);

  const getWordById = (wordId: string) => {
    return wordData.find(word => word.id === wordId);
  };

  const handleApprove = (submission: UserSubmission) => {
    setProcessingIds(prev => [...prev, submission.id]);
    
    // Simulate API call
    setTimeout(() => {
      setSubmissions(prev => 
        prev.filter(item => item.id !== submission.id)
      );
      
      toast({
        title: "Submission approved",
        description: "The sentence has been added to the word examples.",
      });
      
      setProcessingIds(prev => prev.filter(id => id !== submission.id));
    }, 1000);
  };

  const handleReject = (submission: UserSubmission) => {
    setProcessingIds(prev => [...prev, submission.id]);
    
    // Simulate API call
    setTimeout(() => {
      setSubmissions(prev => 
        prev.filter(item => item.id !== submission.id)
      );
      
      toast({
        title: "Submission rejected",
        description: "The sentence has been removed from the queue.",
      });
      
      setProcessingIds(prev => prev.filter(id => id !== submission.id));
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No pending submissions to review.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-medium">Review User Submissions</h2>
      
      <div className="space-y-4">
        {submissions.map((submission) => {
          const word = getWordById(submission.wordId);
          const isProcessing = processingIds.includes(submission.id);
          
          return (
            <Card key={submission.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-lg">
                      {word?.word || "Unknown Word"}
                    </h3>
                    <Badge variant="outline">{submission.date}</Badge>
                  </div>
                  
                  <p className="italic mb-2">"{submission.sentence}"</p>
                  
                  <p className="text-sm text-muted-foreground">
                    Submitted by: {submission.author}
                  </p>
                </div>
                
                <div className="flex gap-2 self-end md:self-start">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReject(submission)}
                    disabled={isProcessing}
                    className="border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    {isProcessing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <X className="h-4 w-4 mr-1" />
                    )}
                    <span>Reject</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleApprove(submission)}
                    disabled={isProcessing}
                    className="border-green-200 text-green-500 hover:bg-green-50 hover:text-green-600"
                  >
                    {isProcessing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Check className="h-4 w-4 mr-1" />
                    )}
                    <span>Approve</span>
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default WordSubmissionsReview;
