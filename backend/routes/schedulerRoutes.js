const express = require("express");
const router = express.Router();

const {
  generateSchedule
} = require("../controllers/schedulerController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/generate", authMiddleware, generateSchedule);

module.exports = router;