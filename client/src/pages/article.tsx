import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link, useLocation } from 'wouter';
import { Share2, Facebook, Twitter, Linkedin, Clock, Eye, Calendar } from 'lucide-react';
import Layout from '@/components/layout/layout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import CommentSection from '@/components/comment-section';
import RelatedArticles from '@/components/related-articles';
import { ArticleWithRelations } from '@shared/schema';
import { formatDate } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export default function Article() {
  const params = useParams<{ slug: string }>();
  const [location] = useLocation();
  
  const { data: article, isLoading, isError } = useQuery<ArticleWithRelations>({
    queryKey: [`/api/articles/${params.slug}`],
  });

  useEffect(() => {
    // Scroll to top when article loads
    window.scrollTo(0, 0);
  }, [params.slug]);

  if (isError) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">خطأ في تحميل المقال</h1>
          <p className="mb-6">لم نتمكن من العثور على المقال المطلوب، يرجى المحاولة مرة أخرى لاحقاً</p>
          <Link href="/">
            <Button>العودة للصفحة الرئيسية</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-8">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {!isLoading && article ? (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/category/${article.category.slug}`}>{article.category.name}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={location} isCurrentPage>{article.title}</BreadcrumbLink>
              </BreadcrumbItem>
            </>
          ) : (
            <BreadcrumbItem>
              <Skeleton className="h-5 w-32" />
            </BreadcrumbItem>
          )}
        </Breadcrumb>

        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-12">
          {isLoading ? (
            <>
              <Skeleton className="w-full h-72 sm:h-96" />
              <div className="p-6 sm:p-8">
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-6 w-1/2 mb-8" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-3/4 mb-8" />
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div>
                      <Skeleton className="h-5 w-32 mb-1" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <div className="flex space-x-4 space-x-reverse">
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </div>
                </div>
                
                <Skeleton className="h-96 w-full" />
              </div>
            </>
          ) : article ? (
            <>
              <div className="relative">
                <img 
                  src={article.featuredImage || "https://placehold.co/1200x600/0C6E5D/FFF?text=مالتك"} 
                  alt={article.title} 
                  className="w-full h-72 sm:h-96 object-cover" 
                />
                <Badge 
                  className="absolute top-4 right-4 text-sm px-3 py-1" 
                  variant="secondary"
                >
                  {article.category.name}
                </Badge>
              </div>
              
              <div className="p-6 sm:p-8">
                <h1 className="text-3xl sm:text-4xl font-almarai font-bold mb-4 text-gray-900 dark:text-white">
                  {article.title}
                </h1>
                
                <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-8 gap-y-2">
                  <div className="flex items-center ml-6">
                    <Calendar className="h-4 w-4 ml-1" />
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <div className="flex items-center ml-6">
                    <Clock className="h-4 w-4 ml-1" />
                    <span>{article.readingTime} دقيقة للقراءة</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 ml-1" />
                    <span>{article.views} مشاهدة</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={article.author.avatar} alt={article.author.fullName} />
                      <AvatarFallback>{article.author.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{article.author.fullName}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">كاتب في مالتك</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 space-x-reverse">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Share2 className="h-5 w-5" />
                          <span className="sr-only">مشاركة</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <a 
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <Facebook className="h-4 w-4 ml-2" />
                            <span>فيسبوك</span>
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a 
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <Twitter className="h-4 w-4 ml-2" />
                            <span>تويتر</span>
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a 
                            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(article.title)}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <Linkedin className="h-4 w-4 ml-2" />
                            <span>لينكد إن</span>
                          </a>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <div className="prose dark:prose-invert prose-lg max-w-none mb-8 rtl leading-relaxed">
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: article.content
                        .replace(/\n/g, '<br />')
                        .replace(/##\s(.*)/g, '<h2>$1</h2>')
                        .replace(/###\s(.*)/g, '<h3>$1</h3>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    }} 
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200">
                    {article.category.name}
                  </Badge>
                  <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200">
                    التمويل الشخصي
                  </Badge>
                  <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200">
                    نصائح مالية
                  </Badge>
                </div>
              </div>
            </>
          ) : null}
        </article>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {!isLoading && article && (
              <CommentSection articleId={article.id} className="mb-8" />
            )}
          </div>
          
          <div className="lg:col-span-1 space-y-8">
            {!isLoading && article && (
              <RelatedArticles articleId={article.id} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
