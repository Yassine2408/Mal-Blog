import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Skeleton } from '@/components/ui/skeleton';
import { ArticleWithRelations } from '@shared/schema';

export default function TrendingTopics() {
  const { data: trendingArticles, isLoading } = useQuery<ArticleWithRelations[]>({
    queryKey: ['/api/articles/popular?limit=3'],
    select: (data) => {
      // Filter out articles with missing required properties
      return data?.filter(article => 
        article && 
        article.category && 
        article.category.name
      ) || [];
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <div className="flex items-start">
              <Skeleton className="h-20 w-20 rounded-lg ml-4" />
              <div className="flex-1">
                <Skeleton className="h-6 w-24 mb-2" />
                <Skeleton className="h-6 w-full mb-1" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!trendingArticles || trendingArticles.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center">
        <p className="text-gray-500 dark:text-gray-400">لا توجد موضوعات رائجة حالياً</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {trendingArticles.map((article) => (
        <div key={article.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-start">
            <img 
              src={article.featuredImage || "https://placehold.co/120x120/0C6E5D/FFF?text=مالتك"} 
              alt={article.title} 
              className="w-20 h-20 rounded-lg object-cover ml-4 flex-shrink-0" 
            />
            <div>
              <span className="text-xs font-medium text-primary dark:text-secondary bg-primary bg-opacity-10 dark:bg-opacity-20 px-2 py-1 rounded-full">
                {article.category.name}
              </span>
              <h3 className="font-almarai font-bold text-lg mt-2 mb-1">{article.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                {article.excerpt}
              </p>
              <Link href={`/article/${article.slug}`} className="text-primary dark:text-secondary text-sm hover:underline">
                اقرأ المزيد
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
