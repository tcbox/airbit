import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const userTable = pgTable(
  "users",
  {
    id: t.uuid("id").defaultRandom().primaryKey(),
    serialNumber: t.serial("serial_number"),
    name: t.varchar("name", { length: 150 }),
    email: t.varchar("email", { length: 255 }).notNull().unique(),
    verifiedEmail: t.varchar("verified_email", { length: 255 }).notNull(),
    firstName: t.varchar("first_name", { length: 150 }),
    lastName: t.varchar("last_name", { length: 150 }),
    password: t.text("password"),
    createdAt: t
      .timestamp("created_at", { precision: 3, withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: t
      .timestamp("updated_at", { precision: 3, withTimezone: true })
      .defaultNow()
      .notNull(),
    deletedAt: t.timestamp("deleted_at", { precision: 3, withTimezone: true }),
  },
  (table) => {
    return {
      nameIndex: t.index("users_name_idx").on(table.name),
      deletedAtIndex: t.index("user_deleted_at_idx").on(table.deletedAt),
      serialNumberIndex: t.index("user_serial_no_idx").on(table.serialNumber),
    };
  },
);

// Infer typing directly from Drizzle schema
export type User = typeof userTable.$inferSelect; // Query  type
export type NewUser = typeof userTable.$inferInsert; // Database  type
