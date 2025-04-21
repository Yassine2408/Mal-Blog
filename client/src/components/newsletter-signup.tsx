import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const newsletterSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صالح'),
  name: z.string().optional(),
  consent: z.boolean().refine(val => val === true, {
    message: 'يجب الموافقة على استلام الرسائل الإخبارية',
  }),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

export default function NewsletterSignup() {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
      name: '',
      consent: false,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: Omit<NewsletterForm, 'consent'>) => {
      const res = await apiRequest('POST', '/api/newsletter/subscribe', data);
      return res.json();
    },
    onSuccess: () => {
      form.reset();
      setIsSuccess(true);
      toast({
        title: "تم الاشتراك بنجاح",
        description: "شكراً لك! تم تسجيل اشتراكك في النشرة البريدية.",
      });
    },
    onError: (error) => {
      toast({
        title: "خطأ في الاشتراك",
        description: error.message || "حدث خطأ أثناء محاولة الاشتراك. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: NewsletterForm) {
    const { consent, ...newsletterData } = data;
    mutate(newsletterData);
  }

  return (
    <div className="bg-primary dark:bg-primary-dark text-white p-8 rounded-2xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-primary-light opacity-20"></div>
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary-light opacity-20"></div>
      
      <h2 className="text-xl font-almarai font-bold mb-2 relative z-10">اشترك في النشرة البريدية</h2>
      <p className="text-white/80 text-sm mb-6 relative z-10">
        احصل على أحدث النصائح المالية وفرص الاستثمار مباشرة إلى بريدك الإلكتروني.
      </p>
      
      {isSuccess ? (
        <div className="bg-white/10 p-4 rounded-lg text-center relative z-10">
          <p className="font-medium mb-2">تم الاشتراك بنجاح!</p>
          <p className="text-sm">شكراً لاشتراكك في النشرة البريدية. ستصلك قريباً آخر النصائح والمقالات المالية.</p>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="relative z-10">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-sm font-medium text-white/80">البريد الإلكتروني</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="أدخل بريدك الإلكتروني"
                      className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 text-white placeholder-white/60 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem className="mb-6 flex items-start space-x-2 space-x-reverse">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="h-4 w-4 text-accent bg-transparent border-white/30"
                    />
                  </FormControl>
                  <FormLabel className="text-sm text-white/80 mt-0">
                    أوافق على استلام الرسائل الإخبارية والعروض
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-white text-primary hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary rounded-lg px-4 py-3 font-medium"
            >
              {isPending ? "جاري الاشتراك..." : "اشترك الآن"}
            </Button>
          </form>
        </Form>
      )}
      
      <p className="text-xs text-white/70 mt-4 text-center relative z-10">
        يمكنك إلغاء الاشتراك في أي وقت. نحترم خصوصيتك.
      </p>
    </div>
  );
}
