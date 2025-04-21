import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertNewsletterSchema, 
  insertCommentSchema 
} from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // API routes prefix
  app.use("/api", (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
  });

  // Get all categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Get articles with pagination
  app.get("/api/articles", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      
      const articles = await storage.getArticlesWithRelations(limit, offset);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });

  // Get article by slug
  app.get("/api/articles/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const article = await storage.getArticleWithRelations(slug);
      
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      // Increment views count
      await storage.incrementArticleViews(article.id);
      
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });

  // Get articles by category slug
  app.get("/api/categories/:slug/articles", async (req, res) => {
    try {
      const { slug } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      
      const articles = await storage.getArticlesByCategorySlug(slug, limit, offset);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category articles" });
    }
  });

  // Get featured articles
  app.get("/api/articles/featured", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
      const articles = await storage.getFeaturedArticles(limit);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured articles" });
    }
  });

  // Get popular articles
  app.get("/api/articles/popular", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
      const articles = await storage.getPopularArticles(limit);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch popular articles" });
    }
  });

  // Get related articles
  app.get("/api/articles/:id/related", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 3;
      
      const relatedArticles = await storage.getRelatedArticles(id, limit);
      res.json(relatedArticles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch related articles" });
    }
  });

  // Search articles
  app.get("/api/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const articles = await storage.searchArticles(query, limit);
      
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to search articles" });
    }
  });

  // Get comments for an article
  app.get("/api/articles/:id/comments", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const comments = await storage.getCommentsByArticle(id);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });

  // Create a comment
  app.post("/api/articles/:id/comments", async (req, res) => {
    try {
      const articleId = parseInt(req.params.id);
      
      const validatedData = insertCommentSchema.parse({
        ...req.body,
        articleId
      });
      
      const comment = await storage.createComment(validatedData);
      res.status(201).json(comment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Failed to create comment" });
    }
  });

  // Get all tools
  app.get("/api/tools", async (req, res) => {
    try {
      const tools = await storage.getTools();
      res.json(tools);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tools" });
    }
  });

  // Get tool by slug
  app.get("/api/tools/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const tool = await storage.getToolBySlug(slug);
      
      if (!tool) {
        return res.status(404).json({ message: "Tool not found" });
      }
      
      res.json(tool);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tool" });
    }
  });

  // Subscribe to newsletter
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      const newsletter = await storage.subscribeToNewsletter(validatedData);
      res.status(201).json({ success: true, message: "Successfully subscribed to newsletter" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  // Unsubscribe from newsletter
  app.post("/api/newsletter/unsubscribe", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      
      const success = await storage.unsubscribeFromNewsletter(email);
      
      if (!success) {
        return res.status(404).json({ message: "Email not found in newsletter list" });
      }
      
      res.json({ success: true, message: "Successfully unsubscribed from newsletter" });
    } catch (error) {
      res.status(500).json({ message: "Failed to unsubscribe from newsletter" });
    }
  });

  // Get latest news
  app.get("/api/news", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 3;
      const news = await storage.getLatestNews(limit);
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  return httpServer;
}
