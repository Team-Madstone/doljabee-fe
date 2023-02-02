import { DEVELOPMENT, PRODUCTION } from './common';

export const SERVER_DOMAIN = {
  [DEVELOPMENT]: 'http://localhost:4000',
  [PRODUCTION]: 'https://doljabee.com',
}[process.env.NODE_ENV];

export const CLIENT_DOMAIN = 'http://localhost:3000';
