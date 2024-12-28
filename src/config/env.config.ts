import * as process from 'node:process';

export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  port: +process.env.PORT,
  defaultLimit: +process.env.DEFAULT_LIMIT,
});