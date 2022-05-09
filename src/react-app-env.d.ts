/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    MOVIE_URL: string
    API_KEY: string
  }
}