
import { useState, useEffect } from 'react';
import { wordData } from '@/lib/data';
import WordArchive from '@/components/WordArchive';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

const Archive = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              Word Archive
            </Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Explore All Words
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse through our collection of carefully selected words from previous days.
            </p>
          </div>
          
          <WordArchive words={wordData} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Archive;
