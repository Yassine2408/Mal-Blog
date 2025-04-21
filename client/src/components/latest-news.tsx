import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { News } from '@shared/schema';
import { formatRelativeTime } from '@/lib/utils';
import { NewsSkeleton } from '@/components/loading-skeleton';

export default function LatestNews() {
  const { data: news, isLoading } = useQuery<News[]>({
    queryKey: ['/api/news'],
  });

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-almarai">آخر الأخبار المالية</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <NewsSkeleton />
        ) : news && news.length > 0 ? (
          <div className="space-y-4">
            {news.map((item) => (
              <div key={item.id} className="border-r-2 border-primary dark:border-secondary pr-3">
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {formatRelativeTime(item.publishedAt)}
                </span>
                <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-4 text-gray-500 dark:text-gray-400">
            لا توجد أخبار متاحة حالياً
          </p>
        )}
        
        <Link href="/news">
          <a className="text-primary dark:text-secondary hover:underline text-sm font-medium flex items-center justify-center mt-4">
            عرض جميع الأخبار
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </a>
        </Link>
      </CardContent>
    </Card>
  );
}
