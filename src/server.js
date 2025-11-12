// env는 env.js에서만 load.
const env = require("./config/env");

const express = require("express");
const db = require('./infrastructure/db/connections');

const rootRoutes = require("./interfaces/routes/rootRoutes");
const userRoutes = require("./interfaces/routes/userRoutes");

console.log("🔧 Initializing server...");
console.log("📝 Environment:", env.nodeEnv);
console.log("🔌 Port:", env.port);

const app = express();
const PORT = env.port || 8082;

/* middlewares */
// To parse JSON request body.
app.use(express.json());

// routers
app.use("/", rootRoutes);
app.use("/api/v1/users", userRoutes);

// run server
const server = app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`🎯 Process ID: ${process.pid}`);
});

server.on('error', (err) => {
    console.error('❌ Server error:', err);
    process.exit(1);
});

process.on('SIGTERM', () => {
    console.log('📴 SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('👋 Server closed');
        process.exit(0);
    });
});
