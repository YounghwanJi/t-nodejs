# Init
- node v22.17.1
- node.js (js)
- npm
- 8082 port

# Setup
## PostgreSQL
### install by docker container
``` bash
$ docker run --name my-postgres \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  -d postgres:16
 
 # or use /docs/progresql/docker-compose.yml
 $ docker-compose up -d # run
 $ docker compose down # stop
 $ docker-compose down -v # stop and remove data
 
 # connect to container
 $ docker exec -it my-postgres psql -U myuser -d mydb
 # connect to db directly
 $ psql -h localhost -p 5432 -U myuser -d mydb
 
```
### setup user table
```sql
CREATE TABLE users (
   id BIGSERIAL PRIMARY KEY,
   email VARCHAR(50) NOT NULL UNIQUE,
   password VARCHAR(50) NOT NULL,
   name VARCHAR(50) NOT NULL,
   phone_number VARCHAR(20) NOT NULL,
   status VARCHAR(20) NOT NULL,
   created_at TIMESTAMP NOT NULL,
   updated_at TIMESTAMP NOT NULL
);

-- 이메일 검색 성능 향상을 위한 인덱스 (UNIQUE 제약조건으로 자동 생성되지만 명시적 표현)
-- CREATE INDEX idx_users_email ON users(email);

-- status로 검색이 많다면 인덱스 추가
-- CREATE INDEX idx_users_status ON users(status);

-- 생성일자로 정렬/검색이 많다면 인덱스 추가
-- CREATE INDEX idx_users_created_at ON users(created_at);
```

# Installation ( Do not run these commands.)
``` bash
$ npm init -y
$ npm install express dotenv pg

# pg: for postgreSQL
```

# .env.local
``` bash
NODE_ENV=local
PORT=8082

LOG_LEVEL=debug
```

# Run
``` bash
$ node src/server.js

# ${ENV}: local, dev, qa, stg, prd

# Unix
$ NODE_ENV=${ENV} node src/server.js

# Unix, Windows 
$ npm run start:${ENV}

```

# Checkpoint
```bash
$ tasklist | findstr node
$ netstat -ano | findstr LISTENING | findstr :3000
$ taskkill /PID ${PID} /F
```