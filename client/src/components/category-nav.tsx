import { useQuery } from '@tanstack/react-query';
import { useCategory } from '@/lib/context';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Category } from '@shared/schema';

export default function CategoryNav() {
  const { activeCategory, setActiveCategory } = useCategory();
  
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  return (
    <div className="bg-white dark:bg-gray-900 sticky top-16 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollArea className="w-full whitespace-nowrap py-4">
          <div className="flex space-x-8 space-x-reverse">
            <Button
              variant="link"
              className={
                activeCategory === 'all'
                  ? "text-primary dark:text-secondary border-b-2 border-primary dark:border-secondary font-medium p-0 h-auto rounded-none"
                  : "text-gray-500 dark:text-gray-300 border-b-2 border-transparent hover:text-primary dark:hover:text-secondary hover:border-primary dark:hover:border-secondary font-medium p-0 h-auto rounded-none"
              }
              onClick={() => setActiveCategory('all')}
            >
              جميع المقالات
            </Button>
            
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-6 w-24" />
              ))
            ) : (
              categories?.map(category => (
                <Button
                  key={category.id}
                  variant="link"
                  className={
                    activeCategory === category.slug
                      ? "text-primary dark:text-secondary border-b-2 border-primary dark:border-secondary font-medium p-0 h-auto rounded-none"
                      : "text-gray-500 dark:text-gray-300 border-b-2 border-transparent hover:text-primary dark:hover:text-secondary hover:border-primary dark:hover:border-secondary font-medium p-0 h-auto rounded-none"
                  }
                  onClick={() => setActiveCategory(category.slug)}
                >
                  {category.name}
                </Button>
              ))
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
