import { useState } from 'react';
import { Link } from 'wouter';
import { Moon, Sun, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useTheme } from '@/lib/context';
import { cn } from '@/lib/utils';
import SearchBar from '@/components/search-bar';

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [showSearch, setShowSearch] = useState(false);
  
  return (
    <header className={cn(
      "sticky top-0 z-50 w-full",
      transparent 
        ? "bg-transparent text-white" 
        : "bg-white dark:bg-gray-900 shadow-md"
    )}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and primary navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <img 
                  src="/logo.svg" 
                  alt="مالتك" 
                  className={cn(
                    "h-8 w-auto",
                    transparent ? "filter brightness-0 invert" : ""
                  )}
                />
                <span className={cn(
                  "font-almarai font-bold text-2xl",
                  transparent 
                    ? "text-white" 
                    : "text-primary dark:text-secondary"
                )}>
                  مال<span className="text-accent">تك</span>
                </span>
              </Link>
            </div>
            <div className="hidden sm:mr-6 sm:flex sm:space-x-8 sm:space-x-reverse">
              <Link href="/" className={cn(
                "border-b-2 flex items-center h-full px-1 pt-1 font-tajawal font-medium",
                transparent 
                  ? "text-white border-white" 
                  : "border-primary text-primary dark:text-light dark:border-secondary"
              )}>
                الرئيسية
              </Link>
              <Link href="/category/all" className={cn(
                "border-b-2 border-transparent hover:border-accent hover:text-accent flex items-center h-full px-1 pt-1 font-tajawal font-medium",
                transparent 
                  ? "text-white/80 hover:text-white" 
                  : "text-gray-500 dark:text-gray-300"
              )}>
                المقالات
              </Link>
              <Link href="/tools" className={cn(
                "border-b-2 border-transparent hover:border-accent hover:text-accent flex items-center h-full px-1 pt-1 font-tajawal font-medium",
                transparent 
                  ? "text-white/80 hover:text-white" 
                  : "text-gray-500 dark:text-gray-300"
              )}>
                الحاسبات المالية
              </Link>
              <Link href="/about" className={cn(
                "border-b-2 border-transparent hover:border-accent hover:text-accent flex items-center h-full px-1 pt-1 font-tajawal font-medium",
                transparent 
                  ? "text-white/80 hover:text-white" 
                  : "text-gray-500 dark:text-gray-300"
              )}>
                عن المدونة
              </Link>
            </div>
          </div>
          
          {/* Secondary Navigation and Actions */}
          <div className="flex items-center gap-4">
            {/* Search Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowSearch(!showSearch)}
              className={cn(
                transparent 
                  ? "text-white hover:text-white/80" 
                  : "text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-secondary"
              )}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">البحث</span>
            </Button>
            
            {/* Dark Mode Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className={cn(
                transparent 
                  ? "text-white hover:text-white/80" 
                  : "text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-secondary"
              )}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">تبديل الوضع المظلم</span>
            </Button>
            
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn(
                    "sm:hidden",
                    transparent 
                      ? "text-white hover:text-white/80" 
                      : "text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-secondary"
                  )}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">فتح القائمة</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 sm:max-w-sm">
                <div className="flex flex-col h-full">
                  <div className="font-almarai font-bold text-2xl mb-6 text-primary dark:text-secondary">
                    مال<span className="text-accent">تك</span>
                  </div>
                  <nav className="flex flex-col gap-3">
                    <Link href="/" className="bg-primary/10 dark:bg-dark-light border-r-4 border-primary dark:border-secondary block pr-3 py-2 font-medium text-primary dark:text-secondary">
                      الرئيسية
                    </Link>
                    <Link href="/category/all" className="hover:bg-gray-100 dark:hover:bg-dark-light hover:border-r-4 hover:border-accent block pr-3 py-2 font-medium text-gray-500 dark:text-gray-300">
                      المقالات
                    </Link>
                    <Link href="/tools" className="hover:bg-gray-100 dark:hover:bg-dark-light hover:border-r-4 hover:border-accent block pr-3 py-2 font-medium text-gray-500 dark:text-gray-300">
                      الحاسبات المالية
                    </Link>
                    <Link href="/about" className="hover:bg-gray-100 dark:hover:bg-dark-light hover:border-r-4 hover:border-accent block pr-3 py-2 font-medium text-gray-500 dark:text-gray-300">
                      عن المدونة
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
      
      {/* Search Overlay */}
      {showSearch && (
        <div className="absolute inset-0 w-full h-screen bg-background/95 backdrop-blur-sm flex items-start justify-center pt-24 px-4 z-50">
          <div className="w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-almarai font-bold">البحث في المقالات</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowSearch(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <SearchBar autoFocus />
          </div>
        </div>
      )}
    </header>
  );
}
