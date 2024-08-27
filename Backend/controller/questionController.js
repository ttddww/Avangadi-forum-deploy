const dbConnection = require("../db/dbConfig");
const { v4: uuidv4 } = require("uuid");
const { StatusCodes } = require("http-status-codes");

async function askQuestion(req, res) {
  const { userId, title, description, tag } = req.body;

  // Validate the request body
  if (!userId || !title || !description || !tag) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "All fields are required" });
  }

  const questionId = uuidv4(); // Generate a unique ID for the question

  try {
    // Insert the question into the database
    const [response] = await dbConnection.query(
      "INSERT INTO questions (questionId, userId, title, description, tag) VALUES (?, ?, ?, ?, ?)",
      [questionId, userId, title, description, tag]
    );

    console.log("Question inserted:", response);

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Question asked successfully", questionId });
  } catch (error) {
    console.error("Error inserting question:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later" });
  }
};


const getAllQuestions = async (req, res) => {
  try {
    const [questions] = await dbConnection.query(
      "SELECT q.title, q.description, q.questionId, u.username FROM questions q JOIN users u ON q.userId = u.userId ORDER BY q.Id DESC"
    );
    return res.status(StatusCodes.OK).json({ questions });
  } catch (error) {
    console.error("Error fetching questions:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Failed to fetch questions, try again later" });
  }
};

const singleQuestion = async (req, res) => {
  const { questionId } = req.params;
  console.log("Received questionId:", questionId);

  try {
    const [question] = await dbConnection.query(
      "SELECT q.title, q.description, q.tag FROM questions q WHERE q.questionId = ?",
      [questionId]
    );

    if (!question || question.length === 0) {
      return res.status(404).json({ message: "No question found with that ID" });
    } else {
      return res.status(200).json(question[0]);
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

async function checkUser(req, res) {
  const { username, userId } = req.user;
  res.status(StatusCodes.OK).json({ msg: "Valid user", username, userId });
}

module.exports = { askQuestion, getAllQuestions, singleQuestion, checkUser };
