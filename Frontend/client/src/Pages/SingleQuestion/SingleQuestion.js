import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";
import axios from "../../axiosConfig";
import "./SingleQuestion.css";
import AllAnswers from "../../Components/AllAnswers/AllAnswers";
import SingleAnswer from "../../Components/SingleAnswer/SingleAnswer";

function SingleQuestion() {
  const { questionId } = useParams(); // Get questionId from URL params
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`/questions/${questionId}`);
        console.log(response.data);
        setQuestion(response.data);
      } catch (error) {
        console.error("Error fetching question:", error);
        setError("Error fetching question.");
      }
    };

    fetchQuestion();
  }, [questionId]); // The useEffect will run when questionId changes

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section>
      <div className="singleqe">
        <div>
          <h2>Question</h2>
          {question ? (
            <div className="qtqd">
              <div className="qdisp">
                <span style={{ paddingTop: "15px" }}>
                  <FaArrowAltCircleRight size={40} color="blue" />
                </span>
                <div className="qtitle">{question.title}</div>
              </div>
              <div className="qdesc">{question.description}</div>
            </div>
          ) : (
            <div>Loading question...</div>
          )}
          <br />
          <hr />
          <h1>Answer From The Community</h1>
          <hr />
          <br />
          <AllAnswers/>
          <br />
          <SingleAnswer/>
        </div>
      </div>
    </section>
  );
}

export default SingleQuestion;



// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { FaArrowAltCircleRight } from "react-icons/fa";
// // import { AppState } from "../../App";
// import axios from "../../axiosConfig";
// import './SingleQuestion.css'

// function SingleQuestion() {
//     const { questionId } = useParams();// Get qId from URL params
//   //   const { user } = useContext(AppState);
//   console.log("questionId:", questionId);
//   const [question, setQuestion] = useState(null);
//   const [error, setError] = useState(null);
//   const [answer, setAnswer] = useState("");

//  useEffect(() => {
//    const fetchQuestion = async () => {
//      try {
//        const data = await axios.get(
//          `/questions/${questionId}`
//          // , { params: { Id } }
//        );
//        console.log(data);

//        setQuestion(data.data);
//      } catch (error) {
//        console.error("Error fetching question:", error);
//      }
//    };

//    fetchQuestion();
//  }, [questionId]); // The useEffect will run when qId changes

//   if (error) {
//     return <div>{error}</div>;
//   }

//   // const handleAnswerChange = (e) => {
//   //   setAnswer(e.target.value);
//   // };

//   const handleAnswerSubmit = async (e) => {
//     e.preventDefault();

//     // // Handle form submission
//     // const formData = {
//     //   answer,
//     //   password,
//     // };
//     // console.log("Form Data:", formData);
//     // // You can also send formData to a server here
//     // if (!email || !password) {
//     //   alert("Please fill in all fields");
//     //   return;
//     // }

//     try {
//       const response = await axios.post("/answers/singleAnswer", {
//         answer,
//       });
//       console.log("Answer submitted:", response.data);
//       // Optionally reset the answer or update the UI
//       setAnswer("");
//     } catch (error) {
//       setError("Error fetching answer.");
//       console.error("Error submitting answer:", error);
//     }
//   };

//   return (
//     <section>
//       <div class="singleqe">
//         <div>
//           <h2>Question</h2>
//           {question ? (
//             <div class="qtqd">
//               <div class="qdisp">
//                 <span style={{ paddingTop: "15px" }}>
//                   <FaArrowAltCircleRight size={40} color="blue" />
//                 </span>
//                 <div class="qtitle">{question.title}</div>
//               </div>
//               <div class="qdesc">{question.description}</div>
//             </div>
//           ) : (
//             <div>Loading question...</div>
//           )}
//           <br />
//           <hr />
//           <h1>Answer From The Community</h1>
//           <hr />
//           <br />
//           <div class="sform">
//             <form onSubmit={handleAnswerSubmit}>
//               <textarea
//                 value={answer}
//                 onChange={(e) => setAnswer(e.target.value)}
//                 placeholder="  Your Answer..."
//               />
//               <br />
//               <br />
//               <button class="butt" type="submit">
//                 Post Answer
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default SingleQuestion;
