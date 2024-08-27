import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import axios from "../../axiosConfig";
import "./AllAnswers.css"; // Assuming you have a CSS file for styling

function AllAnswers() {
  const { questionId } = useParams();
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(`/answers/all-answers`);
        console.log(response);
        
        setAnswers(response.data.answers);
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
      {answers.length > 0 ? (
          <ul>
            {answers.map((a) => (
              <li key={a.answerId}>
                <div className="allan">
                  <div>
                    <IoPersonCircleOutline size={60} />
                    <p>{a.username}</p>
                  </div>
                  <h3>{a.answer}</h3>
                </div>
                <hr />
              </li>
            ))}
          </ul>
      ) : (
        <div>No answers yet.</div>
      )}
    </div>
  );
}

export default AllAnswers;
