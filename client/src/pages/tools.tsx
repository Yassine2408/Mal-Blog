import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, RouteComponentProps } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Calculator, PiggyBank, ChartPie, ArrowRight } from 'lucide-react';
import { Tool } from '@shared/schema';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export interface ToolsPageProps {
  toolSlug?: string;
}

// Loan Calculator Component
function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(5);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    // Calculate loan payment
    const calculateLoan = () => {
      const principal = loanAmount;
      const monthlyRate = interestRate / 100 / 12;
      const numberOfPayments = loanTerm * 12;
      
      if (monthlyRate === 0) {
        setMonthlyPayment(principal / numberOfPayments);
        setTotalInterest(0);
        setTotalPayment(principal);
      } else {
        const x = Math.pow(1 + monthlyRate, numberOfPayments);
        const monthly = (principal * x * monthlyRate) / (x - 1);
        
        setMonthlyPayment(monthly);
        setTotalInterest((monthly * numberOfPayments) - principal);
        setTotalPayment(monthly * numberOfPayments);
      }
    };

    calculateLoan();
  }, [loanAmount, interestRate, loanTerm]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-almarai">حاسبة القروض</CardTitle>
        <CardDescription>
          حساب الأقساط الشهرية وإجمالي الفوائد على القروض الشخصية والعقارية
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium">مبلغ القرض</label>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Input
              type="number"
              min="1000"
              max="10000000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm font-medium">ريال</span>
          </div>
          <Slider
            value={[loanAmount]}
            min={1000}
            max={1000000}
            step={1000}
            onValueChange={(value) => setLoanAmount(value[0])}
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">معدل الفائدة السنوي</label>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Input
              type="number"
              min="0"
              max="30"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm font-medium">%</span>
          </div>
          <Slider
            value={[interestRate]}
            min={0}
            max={30}
            step={0.1}
            onValueChange={(value) => setInterestRate(value[0])}
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">مدة القرض (بالسنوات)</label>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Input
              type="number"
              min="1"
              max="30"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm font-medium">سنة</span>
          </div>
          <Slider
            value={[loanTerm]}
            min={1}
            max={30}
            step={1}
            onValueChange={(value) => setLoanTerm(value[0])}
          />
        </div>

        <div className="pt-4 space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">القسط الشهري</h3>
            <p className="text-2xl font-bold text-primary dark:text-secondary">
              {monthlyPayment.toLocaleString('ar-SA', { maximumFractionDigits: 2 })} ريال
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">إجمالي الفوائد</h3>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {totalInterest.toLocaleString('ar-SA', { maximumFractionDigits: 2 })} ريال
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">إجمالي المدفوعات</h3>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {totalPayment.toLocaleString('ar-SA', { maximumFractionDigits: 2 })} ريال
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Savings Calculator Component
function SavingsCalculator() {
  const [initialAmount, setInitialAmount] = useState(5000);
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [interestRate, setInterestRate] = useState(3);
  const [years, setYears] = useState(10);
  const [futureValue, setFutureValue] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    // Calculate future value
    const calculateSavings = () => {
      const monthlyRate = interestRate / 100 / 12;
      const numPayments = years * 12;
      
      // Future value calculation
      let fv = initialAmount * Math.pow(1 + monthlyRate, numPayments);
      fv += monthlyContribution * ((Math.pow(1 + monthlyRate, numPayments) - 1) / monthlyRate);
      
      // Total contributions
      const totalContrib = initialAmount + (monthlyContribution * numPayments);
      
      setFutureValue(fv);
      setTotalContributions(totalContrib);
      setTotalInterest(fv - totalContrib);
    };

    calculateSavings();
  }, [initialAmount, monthlyContribution, interestRate, years]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-almarai">حاسبة التوفير</CardTitle>
        <CardDescription>
          تخطيط أهداف التوفير وحساب المبلغ المطلوب توفيره شهرياً لتحقيق هدفك
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium">المبلغ الأولي</label>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Input
              type="number"
              min="0"
              max="1000000"
              value={initialAmount}
              onChange={(e) => setInitialAmount(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm font-medium">ريال</span>
          </div>
          <Slider
            value={[initialAmount]}
            min={0}
            max={100000}
            step={1000}
            onValueChange={(value) => setInitialAmount(value[0])}
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">المساهمة الشهرية</label>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Input
              type="number"
              min="0"
              max="100000"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm font-medium">ريال</span>
          </div>
          <Slider
            value={[monthlyContribution]}
            min={0}
            max={10000}
            step={100}
            onValueChange={(value) => setMonthlyContribution(value[0])}
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">معدل العائد السنوي</label>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Input
              type="number"
              min="0"
              max="20"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm font-medium">%</span>
          </div>
          <Slider
            value={[interestRate]}
            min={0}
            max={20}
            step={0.1}
            onValueChange={(value) => setInterestRate(value[0])}
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">عدد السنوات</label>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Input
              type="number"
              min="1"
              max="50"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm font-medium">سنة</span>
          </div>
          <Slider
            value={[years]}
            min={1}
            max={50}
            step={1}
            onValueChange={(value) => setYears(value[0])}
          />
        </div>

        <div className="pt-4 space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">القيمة المستقبلية</h3>
            <p className="text-2xl font-bold text-primary dark:text-secondary">
              {futureValue.toLocaleString('ar-SA', { maximumFractionDigits: 2 })} ريال
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">إجمالي المساهمات</h3>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {totalContributions.toLocaleString('ar-SA', { maximumFractionDigits: 2 })} ريال
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">إجمالي العوائد</h3>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {totalInterest.toLocaleString('ar-SA', { maximumFractionDigits: 2 })} ريال
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Budget Planner Component
function BudgetPlanner() {
  const [income, setIncome] = useState(10000);
  const [expenses, setExpenses] = useState({
    housing: 3000,
    food: 2000,
    transport: 1000,
    utilities: 500,
    entertainment: 500,
    savings: 1000,
    other: 500
  });
  
  const totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0);
  const balance = income - totalExpenses;
  
  const handleExpenseChange = (category: string, value: number) => {
    setExpenses(prev => ({
      ...prev,
      [category]: value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-almarai">مخطط الميزانية</CardTitle>
        <CardDescription>
          إنشاء ميزانية شهرية متوازنة تساعدك على تنظيم مصاريفك وتحقيق أهدافك المالية
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium">الدخل الشهري</label>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Input
              type="number"
              min="0"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm font-medium">ريال</span>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-3">المصاريف الشهرية</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm">السكن</label>
                <span className="text-xs text-gray-500">
                  {((expenses.housing / income) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse">
                <Input
                  type="number"
                  min="0"
                  value={expenses.housing}
                  onChange={(e) => handleExpenseChange('housing', Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-medium">ريال</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm">الطعام</label>
                <span className="text-xs text-gray-500">
                  {((expenses.food / income) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse">
                <Input
                  type="number"
                  min="0"
                  value={expenses.food}
                  onChange={(e) => handleExpenseChange('food', Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-medium">ريال</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm">المواصلات</label>
                <span className="text-xs text-gray-500">
                  {((expenses.transport / income) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse">
                <Input
                  type="number"
                  min="0"
                  value={expenses.transport}
                  onChange={(e) => handleExpenseChange('transport', Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-medium">ريال</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm">المرافق والفواتير</label>
                <span className="text-xs text-gray-500">
                  {((expenses.utilities / income) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse">
                <Input
                  type="number"
                  min="0"
                  value={expenses.utilities}
                  onChange={(e) => handleExpenseChange('utilities', Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-medium">ريال</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm">الترفيه</label>
                <span className="text-xs text-gray-500">
                  {((expenses.entertainment / income) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse">
                <Input
                  type="number"
                  min="0"
                  value={expenses.entertainment}
                  onChange={(e) => handleExpenseChange('entertainment', Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-medium">ريال</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm">التوفير والاستثمار</label>
                <span className="text-xs text-gray-500">
                  {((expenses.savings / income) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse">
                <Input
                  type="number"
                  min="0"
                  value={expenses.savings}
                  onChange={(e) => handleExpenseChange('savings', Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-medium">ريال</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm">مصاريف أخرى</label>
                <span className="text-xs text-gray-500">
                  {((expenses.other / income) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse">
                <Input
                  type="number"
                  min="0"
                  value={expenses.other}
                  onChange={(e) => handleExpenseChange('other', Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-medium">ريال</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-4 space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">الرصيد المتبقي</h3>
            <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {balance.toLocaleString('ar-SA', { maximumFractionDigits: 2 })} ريال
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">إجمالي المصاريف</h3>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {totalExpenses.toLocaleString('ar-SA', { maximumFractionDigits: 2 })} ريال
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">نسبة المصاريف من الدخل</h3>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {((totalExpenses / income) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// We'll modify the ToolsPage component to make it compatible with both direct props and 
// Wouter route parameters
export default function ToolsPage(props: ToolsPageProps | RouteComponentProps<{ slug?: string }>) {
  // Extract toolSlug whether it comes directly or from route params
  const toolSlug = 'params' in props ? props.params.slug : props.toolSlug;
  const { data: tools, isLoading } = useQuery<Tool[]>({
    queryKey: ['/api/tools'],
  });

  // Set default tab based on toolSlug prop
  const getDefaultTab = () => {
    if (!toolSlug) return 'loan-calculator';
    
    switch (toolSlug) {
      case 'loan-calculator':
        return 'loan-calculator';
      case 'savings-calculator':
        return 'savings-calculator';
      case 'budget-planner':
        return 'budget-planner';
      default:
        return 'loan-calculator';
    }
  };

  return (
    <div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-almarai font-bold mb-4">
            الحاسبات المالية
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            أدوات مجانية لمساعدتك في اتخاذ قرارات مالية أفضل وتخطيط مستقبلك المالي
          </p>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-8">
            <Skeleton className="h-[500px] w-full rounded-xl" />
          </div>
        ) : tools && tools.length > 0 ? (
          <Tabs defaultValue={getDefaultTab()} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="loan-calculator" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">حاسبة القروض</span>
              </TabsTrigger>
              <TabsTrigger value="savings-calculator" className="flex items-center gap-2">
                <PiggyBank className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">حاسبة التوفير</span>
              </TabsTrigger>
              <TabsTrigger value="budget-planner" className="flex items-center gap-2">
                <ChartPie className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">مخطط الميزانية</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="loan-calculator">
              <LoanCalculator />
            </TabsContent>
            <TabsContent value="savings-calculator">
              <SavingsCalculator />
            </TabsContent>
            <TabsContent value="budget-planner">
              <BudgetPlanner />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h3 className="text-lg font-medium mb-2">الأدوات غير متوفرة حالياً</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              يرجى المحاولة مرة أخرى لاحقاً
            </p>
          </div>
        )}

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-almarai font-bold mb-4">نصائح مالية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Link href="/category/investing">
              <a className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg mb-2">استراتيجيات الاستثمار</h3>
                  <p className="text-gray-600 dark:text-gray-300">اكتشف أفضل الاستراتيجيات لبناء محفظة استثمارية متوازنة</p>
                </div>
                <ArrowRight className="h-5 w-5 text-primary dark:text-secondary rtl:rotate-180" />
              </a>
            </Link>
            <Link href="/category/savings">
              <a className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg mb-2">طرق التوفير الفعالة</h3>
                  <p className="text-gray-600 dark:text-gray-300">أساليب عملية لتوفير المال وبناء عادات مالية سليمة</p>
                </div>
                <ArrowRight className="h-5 w-5 text-primary dark:text-secondary rtl:rotate-180" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}