import { Pool } from "pg";

import { drizzle } from "drizzle-orm/node-postgres";
import { Env } from "../zodEnv/envType";

const pool = new Pool({
  connectionString: Env.DATABASE_URL,
});
const db = drizzle({ client: pool });

export default db;

