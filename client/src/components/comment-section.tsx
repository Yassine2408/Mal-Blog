import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { formatRelativeTime } from '@/lib/utils';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Comment, User } from '@shared/schema';

interface CommentWithAuthor extends Comment {
  author: User;
}

const commentSchema = z.object({
  content: z.string().min(3, {
    message: "التعليق يجب أن يحتوي على 3 أحرف على الأقل"
  }),
  authorId: z.number(),
  articleId: z.number(),
});

type CommentFormValues = z.infer<typeof commentSchema>;

interface CommentSectionProps {
  articleId: number;
  className?: string;
}

export default function CommentSection({ articleId, className }: CommentSectionProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  
  // In a real app, this would come from auth state
  const currentUser: User = {
    id: 1,
    username: "admin",
    password: "", // don't expose this in frontend
    email: "admin@maltak.com",
    fullName: "أحمد الشريف",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    role: "admin"
  };

  const { data: comments, isLoading } = useQuery<CommentWithAuthor[]>({
    queryKey: [`/api/articles/${articleId}/comments`],
  });

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: '',
      authorId: currentUser.id,
      articleId,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CommentFormValues) => {
      const response = await apiRequest('POST', `/api/articles/${articleId}/comments`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "تم إضافة التعليق",
        description: "تم نشر تعليقك بنجاح!",
      });
      form.reset();
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: [`/api/articles/${articleId}/comments`] });
    },
    onError: (error) => {
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء نشر التعليق. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: CommentFormValues) {
    mutate(data);
  }

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">التعليقات ({comments?.length || 0})</CardTitle>
          <CardDescription>شارك رأيك أو اسأل سؤالاً حول هذا المقال</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => setShowForm(!showForm)} 
            variant="outline" 
            className="mb-6"
          >
            {showForm ? "إلغاء" : "إضافة تعليق"}
          </Button>
          
          {showForm && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-8">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>التعليق</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="اكتب تعليقك هنا..." 
                          className="min-h-32"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "جاري النشر..." : "نشر التعليق"}
                  </Button>
                </div>
              </form>
            </Form>
          )}
          
          {isLoading ? (
            <p className="text-center py-4 text-gray-500 dark:text-gray-400">جاري تحميل التعليقات...</p>
          ) : comments?.length === 0 ? (
            <p className="text-center py-4 text-gray-500 dark:text-gray-400">لا توجد تعليقات بعد. كن أول من يعلق!</p>
          ) : (
            <div className="space-y-6">
              {comments?.map((comment) => (
                <div key={comment.id}>
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <Avatar>
                      <AvatarImage src={comment.author.avatar} alt={comment.author.fullName} />
                      <AvatarFallback>{comment.author.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{comment.author.fullName}</h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {formatRelativeTime(comment.createdAt)}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-700 dark:text-gray-300">{comment.content}</p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
