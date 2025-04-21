import { Skeleton } from "@/components/ui/skeleton";

interface ArticleSkeletonProps {
  variant?: "default" | "featured" | "compact";
}

export function ArticleSkeleton({ variant = "default" }: ArticleSkeletonProps) {
  if (variant === "featured") {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <Skeleton className="w-full h-64" />
        <div className="p-6 space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="mr-3 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex items-start space-x-reverse space-x-4">
        <Skeleton className="w-24 h-24 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    );
  }

  // Default skeleton
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <Skeleton className="w-full h-48" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-24 mr-2" />
          </div>
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}

interface CategorySkeletonProps {
  count?: number;
}

export function CategorySkeleton({ count = 5 }: CategorySkeletonProps) {
  return (
    <div className="flex space-x-8 space-x-reverse overflow-x-auto py-4">
      {Array(count).fill(0).map((_, i) => (
        <Skeleton key={i} className="h-6 w-24" />
      ))}
    </div>
  );
}

interface ToolsSkeletonProps {
  count?: number;
}

export function ToolsSkeleton({ count = 3 }: ToolsSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Skeleton className="h-12 w-12 rounded-full mr-4" />
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-4" />
          <Skeleton className="h-4 w-28" />
        </div>
      ))}
    </div>
  );
}

interface NewsSkeletonProps {
  count?: number;
}

export function NewsSkeleton({ count = 3 }: NewsSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className="border-r-2 border-gray-300 dark:border-gray-700 pr-3">
          <Skeleton className="h-3 w-16 mb-1" />
          <Skeleton className="h-5 w-full" />
        </div>
      ))}
    </div>
  );
}

export default {
  ArticleSkeleton,
  CategorySkeleton,
  ToolsSkeleton,
  NewsSkeleton
};
