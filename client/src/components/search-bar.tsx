import { useState, useEffect, FormEvent } from 'react';
import { useLocation } from 'wouter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchBarProps {
  autoFocus?: boolean;
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({ 
  autoFocus = false, 
  className = '',
  placeholder = 'البحث عن مقالات، نصائح...',
  onSearch
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [, setLocation] = useLocation();
  
  // If autoFocus, focus the input when mounted
  useEffect(() => {
    if (autoFocus) {
      const inputElement = document.querySelector('input[type="search"]') as HTMLInputElement;
      if (inputElement) {
        inputElement.focus();
      }
    }
  }, [autoFocus]);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery);
      } else {
        setLocation(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative flex items-center">
        <Search className="absolute right-3 text-gray-400 dark:text-gray-500 h-5 w-5" />
        <Input
          type="search"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="py-6 pr-10 rounded-lg border border-gray-300 dark:border-gray-700 w-full"
        />
        <Button 
          type="submit" 
          className="absolute left-1"
          variant="ghost"
        >
          بحث
        </Button>
      </div>
    </form>
  );
}
