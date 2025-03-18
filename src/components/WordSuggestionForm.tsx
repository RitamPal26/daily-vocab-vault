
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addWordSuggestion } from '@/lib/data';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Send, RefreshCw } from 'lucide-react';

const formSchema = z.object({
  word: z.string().min(1, "Word is required"),
  definition: z.string().min(1, "Definition is required"),
  example: z.string().min(1, "Example sentence is required"),
  submittedBy: z.string().min(1, "Your name is required")
});

type FormValues = z.infer<typeof formSchema>;

const WordSuggestionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      word: '',
      definition: '',
      example: '',
      submittedBy: ''
    }
  });
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Make sure we pass all required fields with the correct types
      await addWordSuggestion({
        word: data.word,
        definition: data.definition,
        example: data.example,
        submittedBy: data.submittedBy
      });
      
      toast({
        title: "Thank you for your suggestion!",
        description: "Your word has been submitted for review and may be added to our vocabulary collection.",
      });
      
      // Reset form after successful submission
      form.reset();
    } catch (error) {
      console.error("Error submitting word suggestion:", error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your suggestion. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const fetchDefinition = async () => {
    const word = form.getValues('word');
    
    if (!word) {
      toast({
        title: "No word entered",
        description: "Please enter a word to fetch its definition.",
        variant: "destructive",
      });
      return;
    }
    
    setIsFetching(true);
    
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      
      if (!response.ok) {
        throw new Error("Word not found in dictionary");
      }
      
      const data = await response.json();
      
      if (data && data[0] && data[0].meanings && data[0].meanings[0]) {
        const definition = data[0].meanings[0].definitions[0].definition;
        const example = data[0].meanings[0].definitions[0].example || '';
        
        form.setValue('definition', definition);
        
        if (example) {
          form.setValue('example', example);
        }
        
        toast({
          title: "Definition fetched",
          description: "The word definition has been filled automatically.",
        });
      }
    } catch (error) {
      console.error("Error fetching definition:", error);
      toast({
        title: "Definition not found",
        description: "Could not find this word in the dictionary. Please enter the definition manually.",
        variant: "destructive",
      });
    } finally {
      setIsFetching(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggest a New Word</CardTitle>
        <CardDescription>
          Help us expand our vocabulary collection by suggesting a word you find interesting.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="word"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Word</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input {...field} placeholder="Enter a word" />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={fetchDefinition}
                      disabled={isFetching}
                    >
                      {isFetching ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <FormDescription>
                    Click the button to automatically fetch the definition
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="definition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Definition</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Enter the definition" rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="example"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Example Sentence</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Provide a sentence using this word" rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="submittedBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Suggestion
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default WordSuggestionForm;
