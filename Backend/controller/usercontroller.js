const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { userName, firstName, lastName, email, password } = req.body;

  if (!userName || !firstName || !lastName || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "All fields are required" });
  }

  try {
    const [user] = await dbConnection.query(
      "SELECT userName, userId FROM users WHERE userName = ? OR email = ?",
      [userName, email]
    );

    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User already registered" });
    }

    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Password must be at least 8 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await dbConnection.query(
      "INSERT INTO users (userName, firstName, lastName, email, password) VALUES (?, ?, ?, ?, ?)",
      [userName, firstName, lastName, email, hashedPassword]
    );

    return res.status(StatusCodes.CREATED).json({ msg: "User registered" });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "all fields are required" });
  }
  try {
    const [user] = await dbConnection.query(
      "SELECT userName, userId, password FROM users WHERE email = ?",
      [email]
    );

    if (user.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);

    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid credentials" });
    }

    const userName = user[0].userName;
    const userId = user[0].userId;
    const token = jwt.sign({ userName, userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(StatusCodes.OK).json({ msg: "Login successful", token, userName, userId });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later" });
  }
};


async function checkUser(req, res) {
  // const userName = req.user.userName;
  // const userId = req.user.userId;
  const { userName, userId } = req.user;
  return res.status(StatusCodes.OK).json({ msg: "valid user", userName, userId });
}

module.exports = {
  register,
  login,
  checkUser,
};
