import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  date,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table with zodiac information
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  birthdate: date("birthdate"),
  zodiacSign: varchar("zodiac_sign", { length: 20 }),
  bio: text("bio"),
  isVerified: boolean("is_verified").default(false),
  generatedAvatarUrl: varchar("generated_avatar_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const upsertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Chat messages table
export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  message: text("message").notNull(),
  sender: varchar("sender", { length: 10 }).notNull(), // 'user' or 'ai'
  timestamp: timestamp("timestamp").defaultNow(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  timestamp: true,
});

// Zodiac compatibility data
export const zodiacCompatibility = pgTable("zodiac_compatibility", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sign: varchar("sign", { length: 20 }).notNull().unique(),
  compatibleSigns: text("compatible_signs").array().notNull(),
  element: varchar("element", { length: 10 }).notNull(),
  description: text("description"),
});

export type ZodiacCompatibility = typeof zodiacCompatibility.$inferSelect;
app.use('/assets', express.static(path.join(__dirname, 'attached_assets')));
// Gate video chat by zodiac compatibility
app.post('/api/check-compatibility', async (req, res) => {
  const { userSign, partnerSign } = req.body;
  const match = await db.query.zodiacCompatibility.findFirst({
    where: (z) => z.sign === userSign,
  });

  if (!match || !match.compatibleSigns.includes(partnerSign)) {
    return res.status(403).json({ message: "Incompatible signs" });
  }

  res.json({ compatible: true });
});

// Serve zodiac-based avatar from attached_assets
app.get('/api/avatar/:sign', (req, res) => {
  const filePath = path.join(__dirname, 'attached_assets', `${req.params.sign}-avatar.png`);
  res.sendFile(filePath);
});

// Log chat messages to PostgreSQL
app.post('/api/chat', async (req, res) => {
  const { userId, message, sender } = req.body;

  await db.insert(chatMessages).values({
    userId,
    message,
    sender,
  });

  res.json({ status: "saved" });
});
