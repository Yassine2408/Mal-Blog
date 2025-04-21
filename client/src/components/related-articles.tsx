import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import ArticleCard from '@/components/article-card';
import { ArticleWithRelations } from '@shared/schema';

interface RelatedArticlesProps {
  articleId: number;
  limit?: number;
}

export default function RelatedArticles({ articleId, limit = 3 }: RelatedArticlesProps) {
  const { data: relatedArticles, isLoading, isError } = useQuery<ArticleWithRelations[]>({
    queryKey: [`/api/articles/${articleId}/related?limit=${limit}`],
    select: (data) => {
      // Make sure all related articles have the required data
      return data.filter(article => 
        article && 
        article.author && 
        article.category && 
        article.author.fullName && 
        article.category.name
      );
    }
  });
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">مقالات ذات صلة</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array(limit).fill(0).map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-20 w-20 rounded-md" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ))}
          </div>
        ) : relatedArticles?.length ? (
          <div className="space-y-6">
            {relatedArticles.map(article => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                variant="compact" 
              />
            ))}
          </div>
        ) : (
          <p className="text-center py-4 text-gray-500 dark:text-gray-400">لا توجد مقالات ذات صلة حاليًا</p>
        )}
      </CardContent>
    </Card>
  );
}
