import { useEffect, useState } from 'react';
import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/layout/layout';
import CategoryNav from '@/components/category-nav';
import ArticleCard from '@/components/article-card';
import { useCategory } from '@/lib/context';
import { ArticleWithRelations, Category } from '@shared/schema';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const { setActiveCategory } = useCategory();
  const [page, setPage] = useState(1);
  const pageSize = 9;

  // Set active category based on URL params
  useEffect(() => {
    if (params.slug) {
      setActiveCategory(params.slug);
    }
  }, [params.slug, setActiveCategory]);

  // Category data query
  const { data: category } = useQuery<Category>({
    queryKey: [`/api/categories/${params.slug === 'all' ? 'investing' : params.slug}`],
    enabled: params.slug !== 'all',
  });

  // Articles query
  const { data: articles, isLoading } = useQuery<ArticleWithRelations[]>({
    queryKey: [
      params.slug === 'all' 
        ? `/api/articles?limit=${pageSize * page}&offset=0` 
        : `/api/categories/${params.slug}/articles?limit=${pageSize * page}&offset=0`
    ],
  });

  // Total count for pagination
  const hasMore = articles ? articles.length >= pageSize * page : false;

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Layout>
      <CategoryNav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-almarai font-bold mb-4">
            {params.slug === 'all' ? 'جميع المقالات' : category?.name || 'تصنيف المقالات'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {params.slug === 'all' 
              ? 'تصفح جميع المقالات المتاحة في موقعنا حول التمويل الشخصي والتكنولوجيا المالية'
              : category?.description || 'مقالات متخصصة في هذا التصنيف'}
          </p>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-7 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 w-24 ml-2" />
                    </div>
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : articles && articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            
            {hasMore && (
              <div className="mt-12 text-center">
                <Button onClick={loadMore} variant="outline" size="lg">
                  تحميل المزيد من المقالات
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h3 className="text-lg font-medium mb-2">لا توجد مقالات في هذا التصنيف</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              يرجى العودة لاحقاً أو تصفح التصنيفات الأخرى
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
