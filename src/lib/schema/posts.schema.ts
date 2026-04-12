import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { userTable } from "./user.schema";

export const postTable = pgTable(
  "posts",
  {
    id: t.uuid("id").defaultRandom().primaryKey(),
    authorId: t
      .uuid("author_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    title: t.varchar("title", { length: 255 }).notNull(),
    content: t.text("content").notNull(),
    createdAt: t
      .timestamp("created_at", { precision: 3, withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: t
      .timestamp("updated_at", { precision: 3, withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      authorIdIndex: t.index("post_author_id_idx").on(table.authorId),
      createdAtIndex: t.index("post_created_at_idx").on(table.createdAt),
    };
  },
);

// -------- TYPES --------
export type Post = typeof postTable.$inferSelect;
export type NewPost = typeof postTable.$inferInsert;

// -------- RELATIONS --------
export const postRelations = relations(postTable, ({ one }) => ({
  author: one(userTable, {
    fields: [postTable.authorId],
    references: [userTable.id],
  }),
}));
