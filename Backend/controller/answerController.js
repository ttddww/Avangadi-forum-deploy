const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function singleAnswer(req, res) {
  const { userId, questionId, answer } = req.body;

  // Log the request body to verify the data
  console.log("Request Body:", req.body);

  // Validate the request body
  if (!userId || !questionId || !answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "All fields are required" });
  }

  try {
    const [response] = await dbConnection.query(
      "INSERT INTO answers (userId, questionId, answer) VALUES (?, ?, ?)",
      [userId, questionId, answer]
    );

    console.log("Answer inserted:", response);

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Answer posted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later" });
  }
}

async function allAnswers(req, res) {
  try {
    const [answers] = await dbConnection.query(
      "SELECT a.answerId, u.username, a.answer FROM answers a JOIN users u ON a.userId = u.userId ORDER BY a.answerId ASC"
    );
    return res.status(StatusCodes.OK).json({ answers });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later" });
  }
}

async function checkUser(req, res) {
  const { username, userId } = req.user;
  res.status(StatusCodes.OK).json({ msg: "Valid user", username, userId });
}

module.exports = {
  singleAnswer,
  allAnswers,
  checkUser,
};
