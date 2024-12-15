import { Pool } from "pg";

const pool = new Pool({
  max: 20, // maximum number of clients
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export { pool };
