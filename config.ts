// config.ts

const isDev = process.env.NODE_ENV === 'development';

export const config = {
  apiBaseUrl: isDev ? 'http://localhost:8000' : 'http://43.153.212.196:8000',
  wsUrl: isDev ? 'ws://localhost:8000' : 'ws://43.153.212.196:8000',
};

