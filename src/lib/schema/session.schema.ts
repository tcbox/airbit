import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { userTable } from "./user.schema";

export const sessionTable = pgTable(
  "session",
  {
    id: t.text("id").primaryKey(),
    userId: t
      .uuid("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    token: t.varchar("token", { length: 255 }).notNull().unique(),
    userAgent: t.text("user_agent"),
    ipAddress: t.text("ip_address"),
    createdAt: t
      .timestamp("created_at", { precision: 3, withTimezone: true })
      .notNull()
      .defaultNow(),
    expiresAt: t
      .timestamp("expires_at", { precision: 3, withTimezone: true })
      .notNull(),
    updatedAt: t
      .timestamp("updated_at", { precision: 3, withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => {
    return {
      // id field is already Primary Key, so DB auto-indexes it. No need for idIndex.
      
      userIdIndex: t.index("session_user_id_idx").on(table.userId),
    };
  },
);

// -------- TYPES --------
export type Session = typeof sessionTable.$inferSelect;
export type NewSession = typeof sessionTable.$inferInsert;

// -------- RELATIONS --------
export const sessionRelations = relations(sessionTable, ({ one }) => ({
  user: one(userTable, {
    fields: [sessionTable.userId], // Ikkada unna userId tho
    references: [userTable.id],    // User table lo unna id ni match chestham
  }),
}));
