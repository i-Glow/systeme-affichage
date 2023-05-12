## Systeme affichage

## Pre-requisits

[PostgreSQL](https://www.postgresql.org/) - [Nodejs](https://nodejs.org/en/)

### Update environment variables according to .env.example

### Install dependencies

_server dependencies_

```bash
  cd server
  npm install
```

Generate Prisma Client

```bash
  npx prisma generate
```

Migrate the database

```bash
  npx prisma migrate dev
```

_client dependencies_

```bash
  cd client
  npm install
  npm i serve
```

# Start apps

```bash
  npm run dev
```

# Build the apps

_client_

```bash
  npm run build
```

_server_

```bash
  npm run build
```

# Run the build

_client_

```bash
  npm start
```

_server_

```bash
  npm start
```

_production database_

deployment

```bash
  npx prisma db push
```

migrations

```bash
  npx prisma migrate deploy
```

## Or using Docker compose

```bash
  docker-compose build
  docker-compose up
```
