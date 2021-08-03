### Youtube Music fullstack clone with Chromecasting to your TV!

## Tech stack
  - Backend
    - **Node.js + TypeScript + Express**
    - **Postgres + Typeorm + Redis**
    - **Apollo + Type-Graphql + DataLoader**

  - Frontend
    - **Next.js + TypeScript** (React-based framework)
    - **Chakra-ui** (Component library with Styled-System under the hood)
    - **Apollo-client** (Making graphql requests to server + normalized caching)
    - **Graphql-codegen** (Generating TypeScript types from schema + custom react hooks)

## Build Backend

-   `cd ./server && yarn`
-   `yarn build` to compile typescript to ./dist folder
-   create your own .env file from .env.example & enter your credentials
-   docker-compose up (to startup redis and postgres inside docker containers)
-   `yarn start` will start the server

## Build Frontend

-   `cd ./web && yarn`
-   `yarn build`
-    create .env.local from .env.example.local
-   `yarn start` will start next.js server
