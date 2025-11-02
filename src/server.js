require("dotenv").config();
const express = require("express");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());

// routers
app.use("/", routes);

// run server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
