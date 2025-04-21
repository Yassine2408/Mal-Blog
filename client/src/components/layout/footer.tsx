import { Link } from 'wouter';
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo & About */}
          <div className="space-y-4">
            <Link href="/" className="text-white font-almarai font-bold text-2xl">
              مال<span className="text-accent">تك</span>
            </Link>
            <p className="text-gray-400 text-sm">
              منصة متخصصة في التمويل الشخصي والتكنولوجيا المالية توفر محتوى تعليمي وأدوات مالية لمساعدتك في تحقيق أهدافك المالية.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-almarai font-bold text-lg mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  الصفحة الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/category/all" className="text-gray-400 hover:text-white transition-colors">
                  المقالات
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-gray-400 hover:text-white transition-colors">
                  الحاسبات المالية
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-white transition-colors">
                  الأخبار المالية
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  عن المدونة
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-almarai font-bold text-lg mb-4">التصنيفات</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/planning" className="text-gray-400 hover:text-white transition-colors">
                  التخطيط المالي
                </Link>
              </li>
              <li>
                <Link href="/category/investing" className="text-gray-400 hover:text-white transition-colors">
                  الاستثمار
                </Link>
              </li>
              <li>
                <Link href="/category/savings" className="text-gray-400 hover:text-white transition-colors">
                  التوفير
                </Link>
              </li>
              <li>
                <Link href="/category/fintech" className="text-gray-400 hover:text-white transition-colors">
                  التكنولوجيا المالية
                </Link>
              </li>
              <li>
                <Link href="/category/crypto" className="text-gray-400 hover:text-white transition-colors">
                  العملات الرقمية
                </Link>
              </li>
              <li>
                <Link href="/category/realestate" className="text-gray-400 hover:text-white transition-colors">
                  العقارات
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-almarai font-bold text-lg mb-4">تواصل معنا</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-accent mt-1 ml-2" />
                <span className="text-gray-400">info@maltak.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-accent mt-1 ml-2" />
                <span className="text-gray-400">+966 12 345 6789</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-accent mt-1 ml-2" />
                <span className="text-gray-400">الرياض، المملكة العربية السعودية</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} مالتك - جميع الحقوق محفوظة</p>
          <div className="flex justify-center mt-4 space-x-6 space-x-reverse">
            <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a>
            <a href="#" className="hover:text-white transition-colors">إخلاء المسؤولية</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
