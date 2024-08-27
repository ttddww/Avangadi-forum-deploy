const express = require("express");
const router = express.Router();

const auth = require("../auth/auth");
const {
  askQuestion,
  getAllQuestions,
  singleQuestion,
  checkUser,
} = require("../controller/questionController");

// ask questions
router.post("/ask", askQuestion);
router.get("/all-questions", getAllQuestions);
router.get("/:questionId", singleQuestion);

// check user
router.get("/check", auth, checkUser);

module.exports = router;
