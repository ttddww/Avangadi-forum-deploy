import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import classes from "./SingleQuestion.module.css";
import axiosBase from './../../axiosConfig';
import AllAnswers from "../../Components/AllAnswers/AllAnswers";
import { AppState } from "../../App";

function SingleQuestion() {
  const { qId } = useParams(); // ✅ get id from URL
  const [question, setQuestion] = useState(null); // ✅ object, not array
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const { user } = React.useContext(AppState); // Access the user object from context
  const token = localStorage.getItem("token");

  // ✅ Fetch question detail
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axiosBase.get(
          `/questions/${qId}`
        );
        console.log(res);
        
        setQuestion(res.data);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    
    fetchQuestion();
  }, [qId]);

   // ✅ Submit new answer
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosBase.post(
        `/answers/createAnswer`,
        {
          userId: user.userId,
          questionId: qId,
          answer,
        },
        {
          headers: { Authorization: `Bearer ` + token },
        }
      );

      setAnswer(""); // clear input
      alert("Answer posted successfully");

      // refresh answers
      const res = await axiosBase.get(`/answers/answer/${qId}`);
      setAnswers(res.data);
    } catch (error) {
      console.error("Error posting answer:", error);
    }
  };


return (
  <section className={classes.container}>
    <div className={classes.questionBox}>
      <h2 className={classes.questionTitle}>Question</h2>
      {question ? (
        <div>
          <h3 className={classes.questionSubtitle}>{question.title}</h3>
          <p className={classes.questionDescription}>{question.description}</p>
        </div>
      ) : (
        <p>Loading question...</p>
      )}
    </div>

    <div className={classes.answersContainer}>
      <h2 className={classes.answersHeading}>Answers From The Community</h2>
      <AllAnswers />
    </div>

    <div>
      <div className={classes.ask}>
        <h2 className={classes.askTitle}>Answer The Top Question</h2>
        <Link className={classes.askLink} to={`/`}>
          Go To Questions Page
        </Link>
      </div>
      <div className={classes.answer_form}>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Your Answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
          <button type="submit">Post Your Answer</button>
        </form>
      </div>
    </div>
  </section>
);
}
export default SingleQuestion;
