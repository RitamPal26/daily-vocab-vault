
import { useState } from 'react';
import { Word } from '@/lib/data';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card } from '@/components/ui/card';
import { Check, Loader2, X, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface WordFormProps {
  initialData?: Word;
  onSubmit: (word: Word) => void;
  onCancel?: () => void;
}

const wordSchema = z.object({
  word: z.string().min(1, { message: "Word is required" }),
  pronunciation: z.string().min(1, { message: "Pronunciation is required" }),
  partOfSpeech: z.string().min(1, { message: "Part of speech is required" }),
  definition: z.string().min(1, { message: "Definition is required" }),
  example: z.string().min(1, { message: "Example is required" }),
  etymology: z.string().optional(),
});

type FormValues = z.infer<typeof wordSchema>;

const WordForm = ({ initialData, onSubmit, onCancel }: WordFormProps) => {
  const [loading, setLoading] = useState(false);
  const [fetchingDefinition, setFetchingDefinition] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(wordSchema),
    defaultValues: initialData || {
      word: '',
      pronunciation: '',
      partOfSpeech: '',
      definition: '',
      example: '',
      etymology: '',
    },
  });

  const handleSubmit = (values: FormValues) => {
    const newWord: Word = {
      id: initialData?.id || Date.now().toString(),
      date: initialData?.date || new Date().toISOString().split('T')[0],
      ...values,
    };
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit(newWord);
      
      if (!initialData) {
        form.reset({
          word: '',
          pronunciation: '',
          partOfSpeech: '',
          definition: '',
          example: '',
          etymology: '',
        });
      }
      
      setLoading(false);
    }, 1000);
  };

  const fetchDefinition = async () => {
    const wordToFetch = form.getValues("word");
    
    if (!wordToFetch) {
      toast({
        title: "No word to fetch",
        description: "Please enter a word first.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setFetchingDefinition(true);
      
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToFetch}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch word definition.");
      }
      
      const data = await response.json();
      
      if (data && data[0]) {
        const result = data[0];
        const meaning = result.meanings[0];
        
        form.setValue("pronunciation", result.phonetic || `/ˈ${wordToFetch}/`);
        form.setValue("partOfSpeech", meaning.partOfSpeech || '');
        form.setValue("definition", meaning.definitions[0].definition || '');
        form.setValue("example", meaning.definitions[0].example || `The ${wordToFetch} was evident in their work.`);
        
        if (result.origin) {
          form.setValue("etymology", result.origin);
        }
        
        toast({
          title: "Definition fetched",
          description: "Word details have been populated from the dictionary API.",
        });
      }
    } catch (error) {
      console.error("Error fetching definition:", error);
      toast({
        title: "Error fetching definition",
        description: "Could not find this word in the dictionary API. Please fill in the details manually.",
        variant: "destructive",
      });
    } finally {
      setFetchingDefinition(false);
    }
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="word"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Word</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input {...field} placeholder="Enter word" />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={fetchDefinition}
                        disabled={fetchingDefinition}
                      >
                        {fetchingDefinition ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <FormDescription>
                      Use the refresh button to fetch definition from API
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pronunciation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pronunciation</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="/prəˌnənsēˈāSHən/" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="partOfSpeech"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Part of Speech</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="noun, verb, adjective, etc." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="definition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Definition</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Enter definition" rows={3} />
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
                      <Textarea {...field} placeholder="Enter an example sentence" rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="etymology"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Etymology (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Word origin or history" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  {initialData ? 'Update Word' : 'Add Word'}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default WordForm;
