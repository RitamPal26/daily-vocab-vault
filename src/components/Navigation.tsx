import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Book, Calendar, Award, Menu, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const currentStreak = 5; // This would come from user data in a real app

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);
  const isActive = (path: string) => location.pathname === path;
  const navItems = [{
    name: "Today's Word",
    path: '/',
    icon: <Book className="h-4 w-4" />
  }, {
    name: 'Word Archive',
    path: '/archive',
    icon: <Calendar className="h-4 w-4" />
  }, {
    name: 'Daily Quiz',
    path: '/quiz',
    icon: <Award className="h-4 w-4" />
  }];
  return <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Book className="h-6 w-6" />
          <h1 className="font-serif text-xl font-bold">Word Daily</h1>
        </Link>
        
        {isMobile ? <>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="px-3 py-1 flex items-center gap-1">
                <Award className="h-3.5 w-3.5" />
                <span>Streak: {currentStreak}</span>
              </Badge>
              
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
            
            {isMenuOpen && <div className="absolute top-full left-0 right-0 p-4 bg-background border-b shadow-md animate-fade-in">
                <nav className="flex flex-col space-y-2">
                  {navItems.map(item => <Button key={item.path} variant={isActive(item.path) ? "default" : "ghost"} className="justify-start" asChild>
                      <Link to={item.path} className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    </Button>)}
                </nav>
              </div>}
          </> : <div className="flex items-center gap-6">
            <nav className="flex items-center gap-1">
              {navItems.map(item => <Button key={item.path} variant={isActive(item.path) ? "default" : "ghost"} size="sm" asChild>
                  <Link to={item.path} className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </Button>)}
            </nav>
            
            <Separator orientation="vertical" className="h-6" />
            
            <Badge variant="outline" className="px-3 py-1 flex items-center gap-1 animate-pulse-subtle">
              <Award className="h-3.5 w-3.5" />
              <span>Streak: {currentStreak}</span>
            </Badge>
          </div>}
      </div>
    </header>;
};
export default Navigation;