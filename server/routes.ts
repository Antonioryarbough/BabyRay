import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { calculateZodiacSign, getCompatibleSigns } from "./zodiacUtils";
import { z } from "zod";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function registerRoutes(app: Express): Promise<Server> {
  await setupAuth(app);

  // Initialize zodiac compatibility data
  await storage.initializeZodiacData();

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Update user profile with birthdate and zodiac
  app.post('/api/user/profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      const profileSchema = z.object({
        birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD"),
        bio: z.string().max(500).optional(),
      });

      const validation = profileSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validation.error.errors 
        });
      }

      const { birthdate, bio } = validation.data;

      const zodiacSign = calculateZodiacSign(birthdate);
      
      const updatedUser = await storage.updateUserProfile(userId, {
        birthdate,
        zodiacSign,
        bio,
        isVerified: true,
      });

      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // Get compatible signs for user
  app.get('/api/zodiac/compatible', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);

      if (!user?.zodiacSign) {
        return res.status(400).json({ message: "User zodiac sign not set" });
      }

      const compatibility = await storage.getZodiacCompatibility(user.zodiacSign);
      res.json({
        sign: user.zodiacSign,
        compatibleSigns: compatibility?.compatibleSigns || getCompatibleSigns(user.zodiacSign),
        element: compatibility?.element,
      });
    } catch (error) {
      console.error("Error fetching compatibility:", error);
      res.status(500).json({ message: "Failed to fetch compatibility" });
    }
  });

  // Get all zodiac data
  app.get('/api/zodiac/all', isAuthenticated, async (req, res) => {
    try {
      const allZodiac = await storage.getAllZodiacCompatibility();
      res.json(allZodiac);
    } catch (error) {
      console.error("Error fetching zodiac data:", error);
      res.status(500).json({ message: "Failed to fetch zodiac data" });
    }
  });

  // AI Chat endpoint
  app.post('/api/chat', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      const chatSchema = z.object({
        message: z.string().min(1).max(1000),
      });

      const validation = chatSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validation.error.errors 
        });
      }

      const { message } = validation.data;

      const user = await storage.getUser(userId);
      
      // Save user message
      await storage.saveChatMessage({
        userId,
        message,
        sender: 'user',
      });

      // Get zodiac context
      const zodiacContext = user?.zodiacSign 
        ? `The user is a ${user.zodiacSign}. ${user.zodiacSign} traits and compatibility should inform your responses.`
        : "";

      // Generate AI response
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an AI zodiac advisor for the AI ANTONIOS INTELLIGENCE record label estate. ${zodiacContext} Provide insightful, mystical guidance about zodiac compatibility, personality traits, and cosmic connections. Be warm, supportive, and spiritual in your responses.`,
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.8,
        max_tokens: 500,
      });

      const aiResponse = completion.choices[0].message.content || "I sense cosmic energies at work. Please ask again.";

      // Save AI response
      await storage.saveChatMessage({
        userId,
        message: aiResponse,
        sender: 'ai',
      });

      res.json({ response: aiResponse });
    } catch (error) {
      console.error("Error in chat:", error);
      res.status(500).json({ message: "Failed to process chat message" });
    }
  });

  // Get chat history
  app.get('/api/chat/history', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const history = await storage.getChatHistory(userId);
      res.json(history.reverse()); // Return in chronological order
    } catch (error) {
      console.error("Error fetching chat history:", error);
      res.status(500).json({ message: "Failed to fetch chat history" });
    }
  });

  // Generate AI avatar
  app.post('/api/avatar/generate', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);

      if (!user?.zodiacSign) {
        return res.status(400).json({ message: "Zodiac sign required for avatar generation" });
      }

      const zodiacTraits: Record<string, string> = {
        Aries: "bold warrior with fiery energy and ram symbolism",
        Taurus: "grounded earth spirit with bull strength and natural beauty",
        Gemini: "dual-natured intellectual with air element and twin symbolism",
        Cancer: "nurturing water being with crab protection and lunar glow",
        Leo: "regal lion presence with sun radiance and golden majesty",
        Virgo: "pure earth maiden with analytical grace and natural wisdom",
        Libra: "balanced air spirit with scales harmony and elegant beauty",
        Scorpio: "mysterious water phoenix with scorpion power and transformation",
        Sagittarius: "adventurous fire archer with centaur wisdom and freedom",
        Capricorn: "ambitious earth goat with mountain strength and determination",
        Aquarius: "innovative air bearer with water symbolism and cosmic vision",
        Pisces: "mystical water fish with dreamy intuition and spiritual depth",
      };

      const prompt = `Ethereal mystical portrait of a ${zodiacTraits[user.zodiacSign]}, cosmic aesthetic with constellation patterns, iridescent colors, dark golden ambient lighting, professional digital art, otherworldly beauty, celestial theme`;

      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
      });

      if (!response.data || response.data.length === 0) {
        return res.status(500).json({ message: "Failed to generate avatar image" });
      }

      const avatarUrl = response.data[0].url;

      if (!avatarUrl) {
        return res.status(500).json({ message: "Avatar URL not provided" });
      }

      // Update user with generated avatar
      await storage.updateUserProfile(userId, {
        generatedAvatarUrl: avatarUrl,
      });

      res.json({ avatarUrl });
    } catch (error) {
      console.error("Error generating avatar:", error);
      res.status(500).json({ message: "Failed to generate avatar" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
