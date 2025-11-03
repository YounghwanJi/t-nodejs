const express = require("express");
const router = express.Router();
const rootController = require("../controllers/rootController");

router.get("/health", rootController.getHealthcheck);
router.get("/info", rootController.getInfo);

module.exports = router;
