import dotenv from "dotenv";
dotenv.config(); // root env (recommended)

import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

export default prisma;
