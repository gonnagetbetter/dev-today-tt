import { config as envConfig } from 'dotenv';

envConfig();

if (!process.env.DB_PORT) {
  throw new Error('DB_PORT is not defined');
}

export const config = {
  naggerBaseUrl: process.env.NAGGER_BASE_URL,
  countriesNowBaseUrl: process.env.COUNTRIES_NOW_BASE_URL,
  dbHost: process.env.DB_HOST,
  dbPort: parseInt(process.env.DB_PORT),
  dbUsername: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_DATABASE,
  port: process.env.PORT,
};
