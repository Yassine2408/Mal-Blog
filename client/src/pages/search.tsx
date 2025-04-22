import { useEffect, useState } from 'react';
import { useLocation, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '@/components/search-bar';
import ArticleCard from '@/components/article-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Search, ArrowLeft } from 'lucide-react';
import { ArticleWithRelations } from '@shared/schema';

export default function SearchPage() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Parse query from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
      setSearchQuery(q);
      setIsSearching(true);
    }
  }, []);

  // Search articles query
  const { data: searchResults, isLoading } = useQuery<ArticleWithRelations[]>({
    queryKey: [`/api/search?q=${encodeURIComponent(searchQuery)}`],
    enabled: isSearching && searchQuery.length > 0,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    setLocation(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto mb-12">
        <SearchBar 
          placeholder="ابحث عن مقالات، نصائح مالية..." 
          className="mb-4"
          onSearch={handleSearch}
        />
        
        {searchQuery && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isLoading ? 'جاري البحث...' : 
              searchResults ? 
                `نتائج البحث عن "${searchQuery}" (${searchResults.length} نتيجة)` : 
                'لا توجد نتائج'}
          </p>
        )}
      </div>

      {!searchQuery && !isSearching ? (
        <div className="text-center py-12">
          <Search className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
          <h2 className="text-2xl font-almarai font-bold mb-2">ابحث في مدونة مالتك</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
            ابحث عن مقالات ونصائح في مجال التمويل الشخصي والتكنولوجيا المالية
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" onClick={() => handleSearch('الاستثمار')}>
              الاستثمار
            </Button>
            <Button variant="outline" onClick={() => handleSearch('التوفير')}>
              التوفير
            </Button>
            <Button variant="outline" onClick={() => handleSearch('التقاعد')}>
              التقاعد
            </Button>
            <Button variant="outline" onClick={() => handleSearch('العملات الرقمية')}>
              العملات الرقمية
            </Button>
          </div>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <Skeleton className="w-full md:w-40 h-48 md:h-auto" />
              <div className="p-6 flex-1 space-y-4">
                <Skeleton className="h-5 w-20 mb-1" />
                <Skeleton className="h-7 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      ) : searchResults && searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {searchResults.map(article => (
            <ArticleCard key={article.id} article={article} variant="compact" className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md" />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <h3 className="text-xl font-medium mb-2">لا توجد نتائج للبحث</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            لم نتمكن من العثور على نتائج تطابق "{searchQuery}". يرجى المحاولة بكلمات بحث أخرى.
          </p>
          <Link href="/">
            <Button className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              <span>العودة للصفحة الرئيسية</span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
