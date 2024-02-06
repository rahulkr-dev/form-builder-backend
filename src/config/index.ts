import { config } from "dotenv";
// import path from "path"
config();

// In future you can write from where you want to get env variable
const { PORT, NODE_ENV, DB_URL } = process.env;

export const Config = {
  PORT,
  NODE_ENV,
  DB_URL,
};
