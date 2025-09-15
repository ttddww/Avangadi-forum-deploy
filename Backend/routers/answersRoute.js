const express = require("express");
const router = express.Router();

const auth = require("../auth/auth");
const {
  createAnswer,
  singleQuestionAnswers,
  allAnswers,
  // checkUser,
} = require("../controller/answerController");

router.post("/createAnswer", auth, createAnswer);
router.get("/answer/:questionId", singleQuestionAnswers);
router.get("/allAnswers", allAnswers);

// // check user
// router.get("/check", auth, checkUser);

module.exports = router;
