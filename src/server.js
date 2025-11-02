// env는 env.js에서만 load.
const env = require("./config/env");
const express = require("express");
const routes = require("./routes");

const app = express();
const PORT = env.port || 3000;

// middlewares
app.use(express.json());

// routers
app.use("/", routes);

// run server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
