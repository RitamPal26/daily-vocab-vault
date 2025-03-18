
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import WordSuggestionForm from '@/components/WordSuggestionForm';
import { Badge } from '@/components/ui/badge';
import { Lightbulb } from 'lucide-react';

const Suggest = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">
              <Lightbulb className="h-3.5 w-3.5 mr-1" />
              Suggest Words
            </Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Contribute to Our Collection
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Help us expand our vocabulary archive by suggesting words you find interesting or valuable.
            </p>
          </div>
          
          <WordSuggestionForm />
          
          <div className="mt-12 p-6 bg-secondary rounded-lg">
            <h2 className="text-xl font-medium mb-3">What makes a good suggestion?</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>Words that are uncommon or have interesting meanings</li>
              <li>Words with rich etymological backgrounds</li>
              <li>Words that are useful in specific contexts or professions</li>
              <li>Words that have nuanced meanings or cultural significance</li>
              <li>Words that expand vocabulary in meaningful ways</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Suggest;
