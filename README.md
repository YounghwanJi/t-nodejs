# Init
- node v22.17.1
- node.js (js)
- npm
- 8082 port

# Installation ( Do not run these commands.)
``` bash
$ npm init -y
$ npm install express dotenv
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