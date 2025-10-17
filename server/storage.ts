import {
  users,
  chatMessages,
  zodiacCompatibility,
  type User,
  type UpsertUser,
  type ChatMessage,
  type InsertChatMessage,
  type ZodiacCompatibility,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserProfile(id: string, data: Partial<User>): Promise<User | undefined>;
  
  // Chat operations
  getChatHistory(userId: string, limit?: number): Promise<ChatMessage[]>;
  saveChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  // Zodiac operations
  getZodiacCompatibility(sign: string): Promise<ZodiacCompatibility | undefined>;
  getAllZodiacCompatibility(): Promise<ZodiacCompatibility[]>;
  initializeZodiacData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserProfile(id: string, data: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async getChatHistory(userId: string, limit: number = 50): Promise<ChatMessage[]> {
    return await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.userId, userId))
      .orderBy(desc(chatMessages.timestamp))
      .limit(limit);
  }

  async saveChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const [savedMessage] = await db
      .insert(chatMessages)
      .values(message)
      .returning();
    return savedMessage;
  }

  async getZodiacCompatibility(sign: string): Promise<ZodiacCompatibility | undefined> {
    const [compatibility] = await db
      .select()
      .from(zodiacCompatibility)
      .where(eq(zodiacCompatibility.sign, sign));
    return compatibility;
  }

  async getAllZodiacCompatibility(): Promise<ZodiacCompatibility[]> {
    return await db.select().from(zodiacCompatibility);
  }

  async initializeZodiacData(): Promise<void> {
    const zodiacData = [
      { sign: "Aries", element: "Fire", compatibleSigns: ["Leo", "Sagittarius", "Gemini", "Aquarius"], description: "Bold, ambitious, and confident" },
      { sign: "Taurus", element: "Earth", compatibleSigns: ["Virgo", "Capricorn", "Cancer", "Pisces"], description: "Reliable, patient, and devoted" },
      { sign: "Gemini", element: "Air", compatibleSigns: ["Libra", "Aquarius", "Aries", "Leo"], description: "Curious, adaptable, and expressive" },
      { sign: "Cancer", element: "Water", compatibleSigns: ["Scorpio", "Pisces", "Taurus", "Virgo"], description: "Intuitive, emotional, and protective" },
      { sign: "Leo", element: "Fire", compatibleSigns: ["Aries", "Sagittarius", "Gemini", "Libra"], description: "Confident, generous, and dramatic" },
      { sign: "Virgo", element: "Earth", compatibleSigns: ["Taurus", "Capricorn", "Cancer", "Scorpio"], description: "Practical, analytical, and kind" },
      { sign: "Libra", element: "Air", compatibleSigns: ["Gemini", "Aquarius", "Leo", "Sagittarius"], description: "Diplomatic, fair-minded, and social" },
      { sign: "Scorpio", element: "Water", compatibleSigns: ["Cancer", "Pisces", "Virgo", "Capricorn"], description: "Passionate, resourceful, and brave" },
      { sign: "Sagittarius", element: "Fire", compatibleSigns: ["Aries", "Leo", "Libra", "Aquarius"], description: "Optimistic, adventurous, and honest" },
      { sign: "Capricorn", element: "Earth", compatibleSigns: ["Taurus", "Virgo", "Scorpio", "Pisces"], description: "Disciplined, responsible, and ambitious" },
      { sign: "Aquarius", element: "Air", compatibleSigns: ["Gemini", "Libra", "Aries", "Sagittarius"], description: "Progressive, independent, and humanitarian" },
      { sign: "Pisces", element: "Water", compatibleSigns: ["Cancer", "Scorpio", "Taurus", "Capricorn"], description: "Compassionate, artistic, and intuitive" },
    ];

    for (const data of zodiacData) {
      await db
        .insert(zodiacCompatibility)
        .values(data)
        .onConflictDoNothing();
    }
  }
}

export const storage = new DatabaseStorage();
