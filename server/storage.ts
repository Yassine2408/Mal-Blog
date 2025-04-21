import {
  users,
  User,
  InsertUser,
  categories,
  Category,
  InsertCategory,
  articles,
  Article,
  InsertArticle,
  comments,
  Comment,
  InsertComment,
  tools,
  Tool,
  InsertTool,
  newsletters,
  Newsletter,
  InsertNewsletter,
  news,
  News,
  InsertNews,
  ArticleWithRelations
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Articles
  getArticles(limit?: number, offset?: number): Promise<Article[]>;
  getArticleById(id: number): Promise<Article | undefined>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  getArticlesByCategory(categoryId: number, limit?: number, offset?: number): Promise<Article[]>;
  getArticlesByCategorySlug(slug: string, limit?: number, offset?: number): Promise<Article[]>;
  getFeaturedArticles(limit?: number): Promise<Article[]>;
  getPopularArticles(limit?: number): Promise<Article[]>;
  getRelatedArticles(articleId: number, limit?: number): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;
  incrementArticleViews(id: number): Promise<void>;
  searchArticles(query: string, limit?: number): Promise<Article[]>;
  getArticlesWithRelations(limit?: number, offset?: number): Promise<ArticleWithRelations[]>;
  getArticleWithRelations(slug: string): Promise<ArticleWithRelations | undefined>;
  
  // Comments
  getCommentsByArticle(articleId: number): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  
  // Tools
  getTools(): Promise<Tool[]>;
  getToolBySlug(slug: string): Promise<Tool | undefined>;
  createTool(tool: InsertTool): Promise<Tool>;
  
  // Newsletter
  subscribeToNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  unsubscribeFromNewsletter(email: string): Promise<boolean>;
  
  // News
  getLatestNews(limit?: number): Promise<News[]>;
  createNews(news: InsertNews): Promise<News>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private articles: Map<number, Article>;
  private comments: Map<number, Comment>;
  private tools: Map<number, Tool>;
  private newsletters: Map<number, Newsletter>;
  private news: Map<number, News>;
  
  private userIdCounter: number;
  private categoryIdCounter: number;
  private articleIdCounter: number;
  private commentIdCounter: number;
  private toolIdCounter: number;
  private newsletterIdCounter: number;
  private newsIdCounter: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.articles = new Map();
    this.comments = new Map();
    this.tools = new Map();
    this.newsletters = new Map();
    this.news = new Map();
    
    this.userIdCounter = 1;
    this.categoryIdCounter = 1;
    this.articleIdCounter = 1;
    this.commentIdCounter = 1;
    this.toolIdCounter = 1;
    this.newsletterIdCounter = 1;
    this.newsIdCounter = 1;
    
    // Initialize with seed data
    this.initializeData();
  }

  private initializeData() {
    // Create sample categories
    const categoryData: InsertCategory[] = [
      { name: "الاستثمار", slug: "investing", description: "نصائح وإرشادات للاستثمار في مختلف المجالات", icon: "chart-line" },
      { name: "التوفير", slug: "savings", description: "استراتيجيات للتوفير وإدارة المصاريف", icon: "piggy-bank" },
      { name: "التكنولوجيا المالية", slug: "fintech", description: "أحدث التطورات في مجال التكنولوجيا المالية", icon: "mobile-alt" },
      { name: "العملات الرقمية", slug: "crypto", description: "كل ما يتعلق بالعملات الرقمية والبلوكتشين", icon: "coins" },
      { name: "العقارات", slug: "realestate", description: "الاستثمار العقاري والتمويل العقاري", icon: "home" },
      { name: "التخطيط المالي", slug: "planning", description: "التخطيط المالي للمستقبل والتقاعد", icon: "map" }
    ];
    
    categoryData.forEach(category => this.createCategory(category));
    
    // Create sample user
    const adminUser: InsertUser = {
      username: "admin",
      password: "adminpassword", // In a real app this would be hashed
      email: "admin@maltak.com",
      fullName: "أحمد الشريف",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      role: "admin"
    };
    
    const user = this.createUser(adminUser);
    
    // Create sample articles
    const articleData: InsertArticle[] = [
      {
        title: "كيف تبدأ رحلة الاستثمار الخاصة بك في سوق الأسهم العربية",
        slug: "how-to-start-investing-in-arab-stock-markets",
        excerpt: "دليل شامل للمبتدئين لفهم أساسيات التداول، واختيار المنصات المناسبة، وبناء محفظة استثمارية متوازنة تناسب أهدافك المالية.",
        content: "## مقدمة في الاستثمار\n\nيعتبر الاستثمار في الأسهم من أكثر الطرق فعالية لتنمية الثروة على المدى الطويل. ولكن قبل أن تبدأ، يجب أن تفهم الأساسيات...",
        featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
        authorId: 1,
        categoryId: 1, // Investing
        readingTime: 12,
        views: 1500,
        isFeatured: true,
        publishedAt: new Date()
      },
      {
        title: "أفضل 5 تطبيقات للميزانية والادخار في 2023",
        slug: "best-5-budgeting-apps-2023",
        excerpt: "اكتشف أحدث التطبيقات التي تساعدك على تتبع مصاريفك وتحقيق أهدافك المالية بسهولة من هاتفك.",
        content: "## أهمية إدارة الميزانية الشخصية\n\nتعتبر إدارة الميزانية الشخصية الخطوة الأولى نحو الاستقرار المالي...",
        featuredImage: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80",
        authorId: 1,
        categoryId: 3, // Fintech
        readingTime: 5,
        views: 800,
        isFeatured: false,
        publishedAt: new Date()
      },
      {
        title: "دليل الصناديق الاستثمارية: كيف تختار الصندوق المناسب؟",
        slug: "investment-funds-guide",
        excerpt: "شرح مفصل لأنواع الصناديق الاستثمارية المتاحة في المنطقة العربية وكيفية اختيار ما يناسب أهدافك المالية.",
        content: "## أنواع الصناديق الاستثمارية\n\nتتنوع الصناديق الاستثمارية لتشمل صناديق الأسهم، وصناديق السندات، والصناديق المختلطة...",
        featuredImage: "https://images.unsplash.com/photo-1565514020179-026b92b2ed86?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80",
        authorId: 1,
        categoryId: 1, // Investing
        readingTime: 8,
        views: 650,
        isFeatured: false,
        publishedAt: new Date()
      },
      {
        title: "مستقبل العملات الرقمية في العالم العربي",
        slug: "future-of-cryptocurrencies-in-arab-world",
        excerpt: "نظرة على تطور البلوكتشين والعملات الرقمية في الدول العربية والفرص المتاحة للمستثمرين.",
        content: "## تطور العملات الرقمية\n\nشهدت السنوات الأخيرة تطوراً ملحوظاً في تقنية البلوكتشين والعملات الرقمية في المنطقة العربية...",
        featuredImage: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80",
        authorId: 1,
        categoryId: 4, // Crypto
        readingTime: 10,
        views: 1200,
        isFeatured: false,
        publishedAt: new Date()
      },
      {
        title: "خطة مالية لتحقيق الاستقلال المالي قبل سن الأربعين",
        slug: "financial-plan-for-independence-before-40",
        excerpt: "استراتيجيات عملية للاستثمار والادخار تمكنك من تحقيق الحرية المالية مبكراً.",
        content: "## ما هو الاستقلال المالي؟\n\nالاستقلال المالي هو الوصول إلى مرحلة لا تحتاج فيها إلى العمل للحصول على المال...",
        featuredImage: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
        authorId: 1,
        categoryId: 6, // Planning
        readingTime: 12,
        views: 15200,
        isFeatured: false,
        publishedAt: new Date()
      },
      {
        title: "دليل المبتدئين الشامل للاستثمار في العملات الرقمية",
        slug: "complete-beginners-guide-to-cryptocurrency-investment",
        excerpt: "كل ما تحتاج معرفته لبدء الاستثمار في البيتكوين والعملات الرقمية الأخرى بأمان.",
        content: "## مقدمة إلى العملات الرقمية\n\nالعملات الرقمية هي أصول رقمية مصممة للعمل كوسيلة للتبادل باستخدام التشفير...",
        featuredImage: "https://images.unsplash.com/photo-1607270788732-55d57ac2f424?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
        authorId: 1,
        categoryId: 4, // Crypto
        readingTime: 18,
        views: 12750,
        isFeatured: false,
        publishedAt: new Date()
      }
    ];
    
    articleData.forEach(article => this.createArticle(article));
    
    // Create sample tools
    const toolData: InsertTool[] = [
      {
        name: "حاسبة القروض",
        slug: "loan-calculator",
        description: "حساب الأقساط الشهرية وإجمالي الفوائد على القروض الشخصية والعقارية.",
        icon: "calculator",
        type: "calculator"
      },
      {
        name: "حاسبة التوفير",
        slug: "savings-calculator",
        description: "تخطيط أهداف التوفير وحساب المبلغ المطلوب توفيره شهرياً لتحقيق هدفك.",
        icon: "piggy-bank",
        type: "calculator"
      },
      {
        name: "مخطط الميزانية",
        slug: "budget-planner",
        description: "إنشاء ميزانية شهرية متوازنة تساعدك على تنظيم مصاريفك وتحقيق أهدافك المالية.",
        icon: "chart-pie",
        type: "planner"
      }
    ];
    
    toolData.forEach(tool => this.createTool(tool));
    
    // Create sample news
    const newsData: InsertNews[] = [
      {
        title: "البنك المركزي يخفض أسعار الفائدة بنسبة 0.25%",
        source: "وكالة الأنباء الاقتصادية",
        content: "أعلن البنك المركزي اليوم عن خفض سعر الفائدة الرئيسي بنسبة 0.25% في خطوة تهدف إلى تحفيز النمو الاقتصادي."
      },
      {
        title: "ارتفاع مؤشر سوق الأسهم بنسبة 1.2% في ختام التعاملات",
        source: "بورصة الأوراق المالية",
        content: "ارتفع المؤشر العام للسوق بنسبة 1.2% في ختام جلسة اليوم، مدفوعاً بأداء قوي لقطاعي البنوك والاتصالات."
      },
      {
        title: "إطلاق صندوق استثماري جديد بقيمة 500 مليون ريال",
        source: "شركة الاستثمارات المالية",
        content: "أعلنت شركة الاستثمارات المالية عن إطلاق صندوق استثماري جديد يستهدف قطاع التكنولوجيا برأس مال قدره 500 مليون ريال."
      }
    ];
    
    newsData.forEach(newsItem => this.createNews(newsItem));
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }
  
  async createUser(user: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const newUser: User = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }
  
  // Categories
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(category => category.slug === slug);
  }
  
  async createCategory(category: InsertCategory): Promise<Category> {
    const id = this.categoryIdCounter++;
    const newCategory: Category = { ...category, id };
    this.categories.set(id, newCategory);
    return newCategory;
  }
  
  // Articles
  async getArticles(limit = 10, offset = 0): Promise<Article[]> {
    const articles = Array.from(this.articles.values())
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    return articles.slice(offset, offset + limit);
  }
  
  async getArticleById(id: number): Promise<Article | undefined> {
    return this.articles.get(id);
  }
  
  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return Array.from(this.articles.values()).find(article => article.slug === slug);
  }
  
  async getArticlesByCategory(categoryId: number, limit = 10, offset = 0): Promise<Article[]> {
    const articles = Array.from(this.articles.values())
      .filter(article => article.categoryId === categoryId)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    return articles.slice(offset, offset + limit);
  }
  
  async getArticlesByCategorySlug(slug: string, limit = 10, offset = 0): Promise<Article[]> {
    const category = await this.getCategoryBySlug(slug);
    if (!category) return [];
    
    return this.getArticlesByCategory(category.id, limit, offset);
  }
  
  async getFeaturedArticles(limit = 5): Promise<Article[]> {
    const articles = Array.from(this.articles.values())
      .filter(article => article.isFeatured)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    return articles.slice(0, limit);
  }
  
  async getPopularArticles(limit = 5): Promise<Article[]> {
    const articles = Array.from(this.articles.values())
      .sort((a, b) => b.views - a.views);
    
    return articles.slice(0, limit);
  }
  
  async getRelatedArticles(articleId: number, limit = 3): Promise<Article[]> {
    const article = await this.getArticleById(articleId);
    if (!article) return [];
    
    const relatedArticles = Array.from(this.articles.values())
      .filter(a => a.id !== articleId && a.categoryId === article.categoryId)
      .sort((a, b) => b.views - a.views);
    
    return relatedArticles.slice(0, limit);
  }
  
  async createArticle(article: InsertArticle): Promise<Article> {
    const id = this.articleIdCounter++;
    const now = new Date();
    const newArticle: Article = { 
      ...article, 
      id, 
      views: 0,
      publishedAt: article.publishedAt || now
    };
    
    this.articles.set(id, newArticle);
    return newArticle;
  }
  
  async incrementArticleViews(id: number): Promise<void> {
    const article = await this.getArticleById(id);
    if (article) {
      article.views += 1;
      this.articles.set(id, article);
    }
  }
  
  async searchArticles(query: string, limit = 10): Promise<Article[]> {
    const lowerQuery = query.toLowerCase();
    
    const articles = Array.from(this.articles.values())
      .filter(article => 
        article.title.toLowerCase().includes(lowerQuery) || 
        article.excerpt.toLowerCase().includes(lowerQuery) ||
        article.content.toLowerCase().includes(lowerQuery)
      )
      .sort((a, b) => b.views - a.views);
    
    return articles.slice(0, limit);
  }
  
  async getArticlesWithRelations(limit = 10, offset = 0): Promise<ArticleWithRelations[]> {
    const articles = await this.getArticles(limit, offset);
    
    return Promise.all(articles.map(async article => {
      const author = await this.getUser(article.authorId);
      const category = await this.getCategory(article.categoryId);
      
      if (!author || !category) {
        throw new Error(`Could not find author or category for article ${article.id}`);
      }
      
      return {
        ...article,
        author,
        category
      };
    }));
  }
  
  async getArticleWithRelations(slug: string): Promise<ArticleWithRelations | undefined> {
    const article = await this.getArticleBySlug(slug);
    if (!article) return undefined;
    
    const author = await this.getUser(article.authorId);
    const category = await this.getCategory(article.categoryId);
    
    if (!author || !category) {
      throw new Error(`Could not find author or category for article ${article.id}`);
    }
    
    return {
      ...article,
      author,
      category
    };
  }
  
  // Comments
  async getCommentsByArticle(articleId: number): Promise<Comment[]> {
    return Array.from(this.comments.values())
      .filter(comment => comment.articleId === articleId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  
  async createComment(comment: InsertComment): Promise<Comment> {
    const id = this.commentIdCounter++;
    const now = new Date();
    const newComment: Comment = { ...comment, id, createdAt: now };
    this.comments.set(id, newComment);
    return newComment;
  }
  
  // Tools
  async getTools(): Promise<Tool[]> {
    return Array.from(this.tools.values());
  }
  
  async getToolBySlug(slug: string): Promise<Tool | undefined> {
    return Array.from(this.tools.values()).find(tool => tool.slug === slug);
  }
  
  async createTool(tool: InsertTool): Promise<Tool> {
    const id = this.toolIdCounter++;
    const newTool: Tool = { ...tool, id };
    this.tools.set(id, newTool);
    return newTool;
  }
  
  // Newsletter
  async subscribeToNewsletter(newsletter: InsertNewsletter): Promise<Newsletter> {
    // Check if email already exists
    const existingNewsletter = Array.from(this.newsletters.values()).find(n => n.email === newsletter.email);
    
    if (existingNewsletter) {
      if (!existingNewsletter.isActive) {
        existingNewsletter.isActive = true;
        this.newsletters.set(existingNewsletter.id, existingNewsletter);
      }
      return existingNewsletter;
    }
    
    const id = this.newsletterIdCounter++;
    const now = new Date();
    const newNewsletter: Newsletter = { 
      ...newsletter, 
      id, 
      isActive: true,
      createdAt: now 
    };
    
    this.newsletters.set(id, newNewsletter);
    return newNewsletter;
  }
  
  async unsubscribeFromNewsletter(email: string): Promise<boolean> {
    const newsletter = Array.from(this.newsletters.values()).find(n => n.email === email);
    
    if (!newsletter) return false;
    
    newsletter.isActive = false;
    this.newsletters.set(newsletter.id, newsletter);
    return true;
  }
  
  // News
  async getLatestNews(limit = 3): Promise<News[]> {
    const newsList = Array.from(this.news.values())
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    return newsList.slice(0, limit);
  }
  
  async createNews(news: InsertNews): Promise<News> {
    const id = this.newsIdCounter++;
    const now = new Date();
    const newNews: News = { ...news, id, publishedAt: now };
    this.news.set(id, newNews);
    return newNews;
  }
}

export const storage = new MemStorage();
