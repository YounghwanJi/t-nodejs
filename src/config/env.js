// src/config/env.js
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV || "local"}`
});

module.exports = {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT || 3000,
};
