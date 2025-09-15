import React, { useEffect, useState } from "react";
import axios from "../../axiosConfig";
// import { AppState } from "../../App";
import { Link } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdDoubleArrow } from "react-icons/md";
import "./AllQuestions.css";

function AllQuestions() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("/questions/all-questions");
        console.log(response);
        setQuestions(response.data.questions); // Assuming response.data contains a 'questions' array
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <section>
      {questions.map((q) => (
        <Link key={q.questionId} to={`/questions/${q.questionId}`}>
          <div className="all">
            <hr />
            <div className="allq">
              <div>
                <IoPersonCircleOutline size={100} />
                <p style={{marginLeft:'20px'}}>{q.username}</p>
              </div>
              <h3>{q.title}</h3>
              <MdDoubleArrow size={50} />
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}

export default AllQuestions;