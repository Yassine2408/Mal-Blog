import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CheckCircle, 
  Landmark, 
  TrendingUp, 
  Lightbulb, 
  Users 
} from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-almarai font-bold mb-4">عن مدونة <span className="text-primary dark:text-secondary">مال</span><span className="text-accent">تك</span></h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          منصة تعليمية متخصصة في مجال التمويل الشخصي والتكنولوجيا المالية تهدف إلى تمكين القراء العرب من اتخاذ قرارات مالية أفضل
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-almarai font-bold mb-6 text-primary dark:text-secondary">
            مهمتنا
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            نسعى في مالتك إلى تبسيط المفاهيم المالية وتقديمها بطريقة سهلة ومفهومة للقارئ العربي. نؤمن بأن الثقافة المالية حق للجميع، ونعمل على توفير محتوى عربي عالي الجودة في مجال التمويل الشخصي والتكنولوجيا المالية.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            نهدف إلى مساعدة قرائنا على فهم أساسيات الإدارة المالية، وتعلم استراتيجيات الاستثمار المختلفة، ومواكبة أحدث التطورات في عالم التكنولوجيا المالية، مما يمكنهم من بناء مستقبل مالي أفضل لأنفسهم ولعائلاتهم.
          </p>
        </div>
        
        <div className="bg-primary/5 dark:bg-primary-dark/10 rounded-2xl p-8">
          <h2 className="text-2xl font-almarai font-bold mb-6">
            قيمنا
          </h2>
          <ul className="space-y-4">
            <li className="flex">
              <CheckCircle className="h-6 w-6 text-primary dark:text-secondary flex-shrink-0 ml-3 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-1">الموثوقية</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  نلتزم بتقديم معلومات دقيقة وموثوقة، ونستشهد بمصادر موثوقة في جميع محتوياتنا.
                </p>
              </div>
            </li>
            <li className="flex">
              <CheckCircle className="h-6 w-6 text-primary dark:text-secondary flex-shrink-0 ml-3 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-1">البساطة</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  نقدم المعلومات المالية بطريقة سهلة ومفهومة للجميع، بعيداً عن التعقيد والمصطلحات الصعبة.
                </p>
              </div>
            </li>
            <li className="flex">
              <CheckCircle className="h-6 w-6 text-primary dark:text-secondary flex-shrink-0 ml-3 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-1">الشمولية</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  نغطي مختلف جوانب التمويل الشخصي والتكنولوجيا المالية لتلبية احتياجات جميع القراء.
                </p>
              </div>
            </li>
            <li className="flex">
              <CheckCircle className="h-6 w-6 text-primary dark:text-secondary flex-shrink-0 ml-3 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-1">الاستقلالية</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  نقدم محتوى مستقل وغير متحيز، مع الإفصاح عن أي تعاون تجاري بشفافية تامة.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-2xl font-almarai font-bold mb-8 text-center">
          ماذا نقدم
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="bg-primary/10 dark:bg-primary-dark/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Landmark className="h-6 w-6 text-primary dark:text-secondary" />
              </div>
              <h3 className="font-almarai font-bold text-lg mb-2">
                التمويل الشخصي
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                نصائح وإرشادات حول الميزانية والادخار وإدارة الديون والتخطيط المالي.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="bg-accent/10 dark:bg-accent/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-almarai font-bold text-lg mb-2">
                الاستثمار
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                استراتيجيات وأدوات للاستثمار في الأسهم والعقارات والأصول الرقمية وغيرها.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="bg-secondary/10 dark:bg-secondary/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-secondary dark:text-secondary" />
              </div>
              <h3 className="font-almarai font-bold text-lg mb-2">
                التكنولوجيا المالية
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                آخر تطورات التكنولوجيا المالية وكيفية الاستفادة منها في حياتك المالية.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="bg-primary/10 dark:bg-primary-dark/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary dark:text-secondary" />
              </div>
              <h3 className="font-almarai font-bold text-lg mb-2">
                مجتمع مالي
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                منصة للتفاعل وتبادل الخبرات والآراء حول مختلف القضايا المالية.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-2xl font-almarai font-bold mb-8 text-center">
          فريق العمل
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" alt="أحمد الشريف" />
              <AvatarFallback>أش</AvatarFallback>
            </Avatar>
            <h3 className="font-almarai font-bold text-lg mb-1">أحمد الشريف</h3>
            <p className="text-primary dark:text-secondary font-medium mb-2">مؤسس ومدير الموقع</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              خبير مالي مع أكثر من 10 سنوات من الخبرة في مجال الاستثمار والتخطيط المالي
            </p>
          </div>
          
          <div className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src="https://randomuser.me/api/portraits/women/1.jpg" alt="سارة العمري" />
              <AvatarFallback>سع</AvatarFallback>
            </Avatar>
            <h3 className="font-almarai font-bold text-lg mb-1">سارة العمري</h3>
            <p className="text-primary dark:text-secondary font-medium mb-2">محررة ومحللة مالية</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              متخصصة في التكنولوجيا المالية وتطبيقات الذكاء الاصطناعي في المجال المالي
            </p>
          </div>
          
          <div className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src="https://randomuser.me/api/portraits/men/2.jpg" alt="محمد القحطاني" />
              <AvatarFallback>مق</AvatarFallback>
            </Avatar>
            <h3 className="font-almarai font-bold text-lg mb-1">محمد القحطاني</h3>
            <p className="text-primary dark:text-secondary font-medium mb-2">محلل استثمارات</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              متخصص في أسواق المال والاستثمارات البديلة والعملات الرقمية
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-almarai font-bold mb-4">
          انضم إلى مجتمع مالتك
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
          اشترك في نشرتنا البريدية للحصول على أحدث المقالات والنصائح المالية، وتابعنا على منصات التواصل الاجتماعي للبقاء على اطلاع دائم بكل جديد.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#" className="bg-[#1DA1F2] text-white px-5 py-2 rounded-lg flex items-center hover:bg-[#1DA1F2]/90 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
            تويتر
          </a>
          <a href="#" className="bg-[#4267B2] text-white px-5 py-2 rounded-lg flex items-center hover:bg-[#4267B2]/90 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
            </svg>
            فيسبوك
          </a>
          <a href="#" className="bg-gradient-to-r from-[#405DE6] via-[#E1306C] to-[#FFDC80] text-white px-5 py-2 rounded-lg flex items-center hover:opacity-90 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            انستغرام
          </a>
        </div>
      </div>
    </div>
  );
}