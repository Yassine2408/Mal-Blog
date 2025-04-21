import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Calculator, PiggyBank, ChartPie } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Tool } from '@shared/schema';

interface ToolCardProps {
  tool: Tool;
}

function ToolCard({ tool }: ToolCardProps) {
  const getIcon = () => {
    switch (tool.icon) {
      case 'calculator':
        return <Calculator className="text-xl" />;
      case 'piggy-bank':
        return <PiggyBank className="text-xl" />;
      case 'chart-pie':
        return <ChartPie className="text-xl" />;
      default:
        return <Calculator className="text-xl" />;
    }
  };

  const getIconBgColor = () => {
    switch (tool.icon) {
      case 'calculator':
        return 'bg-primary bg-opacity-10 dark:bg-opacity-20 text-primary dark:text-secondary';
      case 'piggy-bank':
        return 'bg-accent bg-opacity-10 dark:bg-opacity-20 text-accent';
      case 'chart-pie':
        return 'bg-secondary bg-opacity-10 dark:bg-opacity-20 text-secondary dark:text-secondary';
      default:
        return 'bg-primary bg-opacity-10 dark:bg-opacity-20 text-primary dark:text-secondary';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
      <div className="flex items-center mb-4">
        <span className={`p-3 rounded-full mr-4 ${getIconBgColor()}`}>
          {getIcon()}
        </span>
        <h3 className="font-almarai font-bold text-lg">{tool.name}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{tool.description}</p>
      <Link href={`/tools/${tool.slug}`} className="text-primary dark:text-secondary hover:underline text-sm font-medium flex items-center">
        استخدم الحاسبة
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </Link>
    </div>
  );
}

interface FinancialToolsProps {
  limit?: number;
  showHeading?: boolean;
  showViewAll?: boolean;
  className?: string;
}

export default function FinancialTools({ 
  limit = 3, 
  showHeading = true,
  showViewAll = true,
  className = "mb-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8"
}: FinancialToolsProps) {
  const { data: tools, isLoading } = useQuery<Tool[]>({
    queryKey: ['/api/tools'],
  });

  const displayTools = tools?.slice(0, limit);

  return (
    <section className={className}>
      {showHeading && (
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-almarai font-bold text-gray-900 dark:text-white">الحاسبات المالية</h2>
          {showViewAll && (
            <Link href="/tools" className="text-primary dark:text-secondary hover:underline flex items-center">
              عرض جميع الأدوات
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array(limit).fill(0).map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Skeleton className="h-12 w-12 rounded-full mr-4" />
                <Skeleton className="h-6 w-32" />
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <Skeleton className="h-4 w-28" />
            </div>
          ))
        ) : displayTools?.length ? (
          displayTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))
        ) : (
          <div className="col-span-3 text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">لا توجد أدوات متاحة حالياً</p>
          </div>
        )}
      </div>
    </section>
  );
}
