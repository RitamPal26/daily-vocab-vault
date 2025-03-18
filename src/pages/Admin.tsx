
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Word, wordData } from '@/lib/data';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import WordForm from '@/components/WordForm';
import WordSubmissionsReview from '@/components/WordSubmissionsReview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit } from 'lucide-react';

const Admin = () => {
  const { toast } = useToast();
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingWord, setEditingWord] = useState<Word | null>(null);

  useEffect(() => {
    // In a real app, this would fetch from a backend
    // For now, using the mock data
    setWords(wordData);
    setLoading(false);
  }, []);

  const handleAddWord = (newWord: Word) => {
    // In a real app, this would save to a backend
    setWords((prevWords) => [...prevWords, newWord]);
    toast({
      title: "Word added successfully",
      description: `"${newWord.word}" has been added to the vocabulary.`,
    });
  };

  const handleUpdateWord = (updatedWord: Word) => {
    // In a real app, this would update in the backend
    setWords((prevWords) => 
      prevWords.map(word => word.id === updatedWord.id ? updatedWord : word)
    );
    setEditingWord(null);
    toast({
      title: "Word updated successfully",
      description: `"${updatedWord.word}" has been updated.`,
    });
  };

  const handleEditWord = (word: Word) => {
    setEditingWord(word);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">
              Admin Dashboard
            </Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Vocabulary Management
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Add, edit, and manage your vocabulary collection.
            </p>
          </div>
          
          <Tabs defaultValue="add" className="mb-12">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="add">Add New Word</TabsTrigger>
              <TabsTrigger value="manage">Manage Words</TabsTrigger>
              <TabsTrigger value="submissions">User Submissions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="add" className="space-y-4">
              <h2 className="text-2xl font-serif font-medium mb-4 flex items-center gap-2">
                <PlusCircle className="h-5 w-5" />
                Add New Word
              </h2>
              <WordForm onSubmit={handleAddWord} />
            </TabsContent>
            
            <TabsContent value="manage" className="space-y-4">
              <h2 className="text-2xl font-serif font-medium mb-4 flex items-center gap-2">
                <Edit className="h-5 w-5" />
                Edit Existing Words
              </h2>
              {editingWord ? (
                <div className="space-y-4">
                  <h3 className="text-xl font-medium">Editing: {editingWord.word}</h3>
                  <WordForm 
                    initialData={editingWord} 
                    onSubmit={handleUpdateWord} 
                    onCancel={() => setEditingWord(null)}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {loading ? (
                    <p>Loading words...</p>
                  ) : (
                    words.map((word) => (
                      <div 
                        key={word.id} 
                        className="p-4 border rounded-md cursor-pointer hover:bg-secondary/50 transition-colors"
                        onClick={() => handleEditWord(word)}
                      >
                        <h3 className="font-serif font-medium text-lg">{word.word}</h3>
                        <p className="text-sm text-muted-foreground">{word.partOfSpeech} • {word.date}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="submissions" className="space-y-4">
              <WordSubmissionsReview />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
