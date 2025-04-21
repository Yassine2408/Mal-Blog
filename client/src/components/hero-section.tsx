import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatRelativeTime } from '@/lib/utils';
import { ArticleWithRelations } from '@shared/schema';
import { ChartLine, Coins, BanknoteIcon } from 'lucide-react';

export default function HeroSection() {
  const { data: featuredArticle, isLoading } = useQuery<ArticleWithRelations[]>({
    queryKey: ['/api/articles/featured?limit=1'],
    select: data => data?.[0],
  });

  return (
    <section className="relative bg-gradient-to-l from-primary to-primary-dark text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3 space-y-6">
              <Skeleton className="h-8 w-32 bg-white/20" />
              <Skeleton className="h-12 w-full bg-white/20" />
              <Skeleton className="h-12 w-3/4 bg-white/20" />
              <Skeleton className="h-24 w-full bg-white/20" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full bg-white/20" />
                <div>
                  <Skeleton className="h-5 w-32 bg-white/20" />
                  <Skeleton className="h-4 w-48 mt-2 bg-white/20" />
                </div>
              </div>
              <Skeleton className="h-12 w-36 bg-white/20" />
            </div>
            <div className="lg:col-span-2">
              <Skeleton className="h-64 w-full rounded-xl bg-white/20" />
            </div>
          </div>
        ) : featuredArticle ? (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3 space-y-6">
              <span className="inline-block bg-accent text-white px-3 py-1 rounded-lg text-sm font-bold">
                {featuredArticle.category.name}
              </span>
              <h1 className="text-3xl md:text-4xl font-almarai font-bold leading-tight">
                {featuredArticle.title}
              </h1>
              <p className="text-lg text-white/80 leading-relaxed">
                {featuredArticle.excerpt}
              </p>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-white">
                  <AvatarImage src={featuredArticle.author.avatar} alt={featuredArticle.author.fullName} />
                  <AvatarFallback className="bg-primary-light text-white">
                    {featuredArticle.author.fullName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{featuredArticle.author.fullName}</p>
                  <p className="text-sm text-white/80">
                    <span>{formatRelativeTime(featuredArticle.publishedAt)}</span> · 
                    <span> وقت القراءة: {featuredArticle.readingTime} دقيقة</span>
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <Link href={`/article/${featuredArticle.slug}`}>
                  <Button 
                    size="lg" 
                    className="bg-accent hover:bg-accent/90 text-white"
                  >
                    قراءة المقال
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-2 relative">
              <div className="rounded-xl overflow-hidden shadow-xl transform lg:-translate-y-4 lg:translate-x-4">
                <img 
                  src={featuredArticle.featuredImage || "https://placehold.co/800x500/0C6E5D/FFF?text=مالتك"} 
                  alt={featuredArticle.title} 
                  className="w-full h-64 md:h-80 object-cover" 
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">لا توجد مقالات مميزة حالياً</h2>
            <p className="mb-6">تفقد المقالات الأخرى من خلال الضغط على الزر أدناه</p>
            <Link href="/category/all">
              <Button className="bg-accent hover:bg-accent/90 text-white">
                تصفح المقالات
              </Button>
            </Link>
          </div>
        )}
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-hidden opacity-10 z-0">
        <ChartLine className="text-9xl absolute top-1/4 left-1/4" />
        <Coins className="text-9xl absolute bottom-1/4 right-1/4" />
        <BanknoteIcon className="text-9xl absolute top-1/4 right-1/3" />
      </div>
    </section>
  );
}
