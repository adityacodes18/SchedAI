const express = require("express");
const router = express.Router();

const {
  createTask , 
  getTasks
} = require("../controllers/taskController");
router.get("/", getTasks);
router.post("/", createTask);

module.exports = router;