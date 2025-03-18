import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Settings,
  ClipboardList,
  BookOpen,
  Home,
  Award,
  Menu,
  X
} from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';

const NavigationAdmin = () => {
  const [activeLink, setActiveLink] = useState("/");
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);
  
  const NavLinks = () => (
    <>
      <Button variant="ghost" asChild>
        <Link 
          to="/"
          className={activeLink === "/" ? "bg-secondary" : ""}
          onClick={() => setActiveLink("/")}
        >
          <Home className="h-4 w-4 mr-2" />
          Home
        </Link>
      </Button>
      
      <Button variant="ghost" asChild>
        <Link 
          to="/archive" 
          className={activeLink === "/archive" ? "bg-secondary" : ""}
          onClick={() => setActiveLink("/archive")}
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Archive
        </Link>
      </Button>
      
      <Button variant="ghost" asChild>
        <Link 
          to="/quiz" 
          className={activeLink === "/quiz" ? "bg-secondary" : ""}
          onClick={() => setActiveLink("/quiz")}
        >
          <ClipboardList className="h-4 w-4 mr-2" />
          Quiz
        </Link>
      </Button>
      
      <Button variant="ghost" asChild>
        <Link 
          to="/achievements" 
          className={activeLink === "/achievements" ? "bg-secondary" : ""}
          onClick={() => setActiveLink("/achievements")}
        >
          <Award className="h-4 w-4 mr-2" />
          Achievements
        </Link>
      </Button>
      
      <Button variant="ghost" asChild>
        <Link 
          to="/admin" 
          className={activeLink === "/admin" ? "bg-secondary" : ""}
          onClick={() => setActiveLink("/admin")}
        >
          <Settings className="h-4 w-4 mr-2" />
          Admin
        </Link>
      </Button>
    </>
  );
  
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center space-x-2">
          <Badge variant="outline" className="font-serif text-lg font-bold px-3 py-1 h-auto">
            Word of the Day
          </Badge>
        </Link>
        
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col py-4 space-y-2">
                <SheetClose asChild>
                  <NavLinks />
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex items-center space-x-1">
            <NavLinks />
          </nav>
        )}
      </div>
    </header>
  );
};

export default NavigationAdmin;
