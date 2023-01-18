import { DEVELOPMENT, PRODUCTION } from './common';

export const DOLJABEE_DOMAIN = {
  [DEVELOPMENT]: 'http://localhost:4000',
  [PRODUCTION]: 'https://doljabee.com',
}[process.env.NODE_ENV];
