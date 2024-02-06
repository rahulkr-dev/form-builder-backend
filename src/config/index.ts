import { config } from "dotenv";
config();

// In future you can write from where you want to get env variable
const { PORT, NODE_ENV } = process.env;

export const Config = {
  PORT,
  NODE_ENV,
};
