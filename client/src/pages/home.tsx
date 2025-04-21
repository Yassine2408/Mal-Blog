import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import HeroSection from '@/components/hero-section';
import CategoryNav from '@/components/category-nav';
import ArticleCard from '@/components/article-card';
import TrendingTopics from '@/components/trending-topics';
import NewsletterSignup from '@/components/newsletter-signup';
import FinancialTools from '@/components/financial-tools';
import LatestNews from '@/components/latest-news';
import { useCategory } from '@/lib/context';
import { ArticleWithRelations } from '@shared/schema';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'wouter';

export default function Home() {
  const { activeCategory, setActiveCategory } = useCategory();
  
  // Reset category to 'all' when landing on home page
  useEffect(() => {
    setActiveCategory('all');
  }, [setActiveCategory]);

  // Latest articles query
  const { data: latestArticles, isLoading: isLoadingLatest } = useQuery<ArticleWithRelations[]>({
    queryKey: ['/api/articles?limit=3'],
    select: (data) => {
      // Filter out articles with missing required properties
      return data?.filter(article => 
        article && 
        article.category && 
        article.category.name
      ) || [];
    }
  });
  
  // Popular articles query
  const { data: popularArticles, isLoading: isLoadingPopular } = useQuery<ArticleWithRelations[]>({
    queryKey: ['/api/articles/popular?limit=2'],
    select: (data) => {
      // Filter out articles with missing required properties
      return data?.filter(article => 
        article && 
        article.category && 
        article.category.name
      ) || [];
    }
  });

  return (
    <div>
      <HeroSection />
      <CategoryNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Latest Articles Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-almarai font-bold text-dark-darker dark:text-white">أحدث المقالات</h2>
            <Link href="/category/all">
              <a className="text-primary dark:text-secondary hover:underline flex items-center">
                عرض المزيد
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </a>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoadingLatest ? (
              Array(3).fill(0).map((_, i) => (
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
              ))
            ) : latestArticles && latestArticles.length > 0 ? (
              latestArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))
            ) : (
              <div className="lg:col-span-3 text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                <p className="text-gray-500 dark:text-gray-400">لا توجد مقالات متاحة حالياً</p>
              </div>
            )}
          </div>
        </section>

        {/* Financial Tools Section */}
        <FinancialTools />

        {/* Trending Topics & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          {/* Trending Topics */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-almarai font-bold text-dark-darker dark:text-white">موضوعات رائجة</h2>
            </div>
            <TrendingTopics />
          </div>

          {/* Newsletter Subscription & Latest News */}
          <div className="lg:col-span-1 space-y-8">
            <NewsletterSignup />
            <LatestNews />
          </div>
        </div>

        {/* Popular Articles */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-almarai font-bold text-dark-darker dark:text-white">الأكثر قراءة</h2>
            <Link href="/category/all">
              <a className="text-primary dark:text-secondary hover:underline flex items-center">
                عرض المزيد
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </a>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isLoadingPopular ? (
              Array(2).fill(0).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row">
                  <Skeleton className="w-full md:w-40 h-48 md:h-auto" />
                  <div className="p-6 flex-1 space-y-4">
                    <Skeleton className="h-5 w-24 mb-2" />
                    <Skeleton className="h-7 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>
              ))
            ) : popularArticles && popularArticles.length > 0 ? (
              popularArticles.map(article => (
                <article key={article.id} className="article-card bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row">
                  <img 
                    src={article.featuredImage || "https://placehold.co/300x300/0C6E5D/FFF?text=مالتك"} 
                    alt={article.title} 
                    className="w-full md:w-40 h-48 md:h-auto object-cover" 
                  />
                  <div className="p-6 flex-1">
                    <span className="inline-block bg-primary text-white text-xs font-bold px-2 py-1 rounded-md mb-2">
                      {article.category.name}
                    </span>
                    <Link href={`/article/${article.slug}`}>
                      <a className="block">
                        <h3 className="font-almarai font-bold text-xl mb-2 text-dark-darker dark:text-white hover:text-primary dark:hover:text-secondary transition-colors">
                          {article.title}
                        </h3>
                      </a>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-primary dark:text-secondary">
                        {article.views !== undefined && article.views !== null ? article.views : 0} قراءة
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {article.readingTime !== undefined && article.readingTime !== null ? article.readingTime : 5} دقيقة للقراءة
                      </span>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="md:col-span-2 text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                <p className="text-gray-500 dark:text-gray-400">لا توجد مقالات شائعة متاحة حالياً</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}