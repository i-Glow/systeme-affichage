## Systeme affichage

## Pre-requisits

[PostgreSQL](https://www.postgresql.org/) - [Nodejs](https://nodejs.org/en/)

### Install dependencies

_server dependencies_

```bash
  cd server
  npm install
```

```bash
  npm install -g prisma
```

Migrate the database

```bash
  npx prisma migrate dev
```

_client dependencies_

```bash
  cd client
  npm install
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

```bash
  npx prisma migrate deploy
```
