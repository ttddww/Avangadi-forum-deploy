import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import "./SingleAnswer.css";
import { AppState } from "../../App"; // Import the AppState context

function SingleAnswer() {
  const { questionId } = useParams();
  // const navigate = useNavigate();
  const { user } = useContext(AppState); // Access the user object from context
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/answers/singleAnswer", {
        userId: user.userId, // Use the userId from the context
        answer,
        questionId,
      });
      console.log("Answer submitted:", response.data);
      setAnswer(""); // Reset the answer field after submission

      // Navigate to the AllAnswers page after submission
      // navigate(`/answers/all-answers`);
    } catch (error) {
      setError("Error submitting answer.");
      console.error("Error submitting answer:", error);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="sform">
        <form onSubmit={handleAnswerSubmit}>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your Answer..."
          />
          <br />
          <br />
          <button className="butt" type="submit">
            Post Answer
          </button>
        </form>
        <br />
      </div>
    </div>
  );
}

export default SingleAnswer;
