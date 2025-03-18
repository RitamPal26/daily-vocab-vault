import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, Heart, Book, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-secondary mt-16 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-6">
            <Book className="h-6 w-6" />
            <h2 className="font-serif text-xl font-bold">Word Daily</h2>
          </div>
          
          <p className="text-muted-foreground max-w-md mb-8">
            Expanding your vocabulary one day at a time with carefully selected words and their meanings.
          </p>
          
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Email">
              <Mail className="h-5 w-5" />
            </Button>
          </div>
          
          <Separator className="mb-8" />
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
          
          <div className="mt-8 flex items-center gap-1 text-sm text-muted-foreground">
            <span>© {currentYear} Lexicon Daily. Made with</span>
            <Heart className="h-3 w-3 text-red-500 inline" />
            <span>for word enthusiasts.</span>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;