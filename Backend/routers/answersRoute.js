const express = require("express");
const router = express.Router();

const auth = require("../auth/auth");
const {
  singleAnswer,
  allAnswers,
  checkUser,
} = require("../controller/answerController");

router.post("/singleAnswer", singleAnswer);
router.get("/all-answers", allAnswers);

// check user
router.get("/check", auth, checkUser);

module.exports = router;
