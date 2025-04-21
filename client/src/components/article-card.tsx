import { Link } from 'wouter';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn, formatRelativeTime } from '@/lib/utils';
import { ArticleWithRelations } from '@shared/schema';

interface ArticleCardProps {
  article: ArticleWithRelations;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

export default function ArticleCard({ 
  article, 
  variant = 'default',
  className 
}: ArticleCardProps) {
  // Safety check to ensure all required properties exist
  if (!article || !article.author || !article.category) {
    return null;
  }
  if (variant === 'featured') {
    return (
      <Card className={cn("overflow-hidden article-card border-0", className)}>
        <div className="relative">
          <img 
            src={article.featuredImage || "https://placehold.co/800x500/0C6E5D/FFF?text=مالتك"} 
            alt={article.title} 
            className="w-full h-64 object-cover"
          />
          <Badge 
            className="absolute top-4 right-4 bg-accent hover:bg-accent text-white" 
            variant="secondary"
          >
            {article.category.name}
          </Badge>
        </div>
        <CardContent className="p-6">
          <Link href={`/article/${article.slug}`} className="block">
            <h3 className="font-almarai font-bold text-2xl mb-2 text-gray-900 dark:text-white hover:text-primary dark:hover:text-secondary transition-colors">
              {article.title}
            </h3>
          </Link>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 ml-2">
                <AvatarImage src={article.author.avatar} alt={article.author.fullName} />
                <AvatarFallback>{article.author.fullName.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {article.author.fullName}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>{formatRelativeTime(article.publishedAt)}</span>
              <span>•</span>
              <span>{article.readingTime} دقائق للقراءة</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <article className={cn("flex items-start space-x-reverse space-x-4 article-card", className)}>
        <img 
          src={article.featuredImage || "https://placehold.co/120x120/0C6E5D/FFF?text=مالتك"} 
          alt={article.title} 
          className="w-24 h-24 rounded-lg object-cover flex-shrink-0" 
        />
        <div>
          <Badge 
            className="mb-2 bg-primary/10 text-primary dark:bg-opacity-20 dark:text-secondary" 
            variant="outline"
          >
            {article.category.name}
          </Badge>
          <Link href={`/article/${article.slug}`}>
            <a className="block">
              <h3 className="font-almarai font-bold text-lg line-clamp-2 mb-1 hover:text-primary dark:hover:text-secondary transition-colors">
                {article.title}
              </h3>
            </a>
          </Link>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 line-clamp-2">
            {article.excerpt}
          </p>
          <Link href={`/article/${article.slug}`}>
            <a className="text-primary dark:text-secondary text-sm hover:underline">
              اقرأ المزيد
            </a>
          </Link>
        </div>
      </article>
    );
  }

  // Default card
  return (
    <Card className={cn("overflow-hidden article-card border-0 shadow-md", className)}>
      <div className="relative">
        <img 
          src={article.featuredImage || "https://placehold.co/500x300/0C6E5D/FFF?text=مالتك"} 
          alt={article.title} 
          className="w-full h-48 object-cover"
        />
        <Badge 
          className="absolute top-4 right-4" 
          variant="secondary"
        >
          {article.category.name}
        </Badge>
      </div>
      <CardContent className="p-6">
        <Link href={`/article/${article.slug}`}>
          <a className="block">
            <h3 className="font-almarai font-bold text-xl mb-2 text-gray-900 dark:text-white hover:text-primary dark:hover:text-secondary transition-colors line-clamp-2">
              {article.title}
            </h3>
          </a>
        </Link>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 ml-2">
              <AvatarImage src={article.author.avatar} alt={article.author.fullName} />
              <AvatarFallback>{article.author.fullName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {article.author.fullName}
            </span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {article.readingTime} دقائق للقراءة
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
