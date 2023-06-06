FROM node:18

WORKDIR /usr/server

COPY package.json .
COPY package-lock.json .

ENV DATABASE_URL=postgresql://user:password@host:port/sys-affichage?schema=public

COPY prisma /usr/server/prisma

RUN npx prisma generate

RUN npm ci

COPY . .

RUN npm run build

CMD ["sh", "-c", "npx prisma db push && npm run start"]
