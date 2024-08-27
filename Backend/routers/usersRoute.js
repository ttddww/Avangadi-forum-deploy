const express = require("express");
const router = express.Router();

const auth  = require("../auth/auth");
const { register, login, checkUser } = require("../controller/usercontroller");
// register user
router.post("/Register", register);
// login user
router.post("/Login", login);

// check user
router.get("/check",auth, checkUser);

module.exports = router;
