import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import axios from "../../axiosConfig";
import "./AllAnswers.css"; // Assuming you have a CSS file for styling
import { AppState } from "../../App";

function AllAnswers() {
  const { questionId } = useParams();
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(null);
  const {user} = React.useContext(AppState);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(`/answers/allAnswers`);
        console.log(response.data.allAnswers);

        setAnswers(response.data.allAnswers);
      } catch (error) {
        setError("Error fetching answers.");
        console.error(error);
      }
    };

    fetchAnswers();
  }, [questionId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="allconta">
      {answers.length === 0 ? (
        <div>No answers yet.</div>
      ) : (
        <ul>
          {answers.map((a) => (
            <Link to={`answers/answer/${a.questionId}`} key={a.answerId}>
              <div className="allan">
                <div>
                  <IoPersonCircleOutline size={60} />
                  <span>{user.userName}</span>
                </div>
                <h3>{a.answer}</h3>
              </div>
              <hr />
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AllAnswers;
