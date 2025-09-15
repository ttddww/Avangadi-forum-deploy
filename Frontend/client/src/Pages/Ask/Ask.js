import React, { useContext, useState } from "react";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import "./Ask.css";
import { AppState } from "../../App";

function Ask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
//   const userId = userId;
  const navigate = useNavigate();
  const { user } = useContext(AppState);
//   console.log(user);
  const userId = user.userId;

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (!userId || !title || !description || !tag) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "/questions/ask",
        { userId, title, description, tag },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      alert("Question posted successfully");
      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.msg || "An error occurred");
      console.log(error.message);
    }
  }; 

  return (
    <section>
      <div className="askk">
        <div className="steps">
          <h1>Steps to write a good question:</h1>
          <ul>
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe your question in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>
        <div>
          <div className="goto">
            <h1>Ask a public question</h1>
            <Link to={"/"}>
              <p>Go to Question page</p>
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <span>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </span>
            <br />
            <span>
              <textarea
                placeholder="Question Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </span>
            <br />
            <span>
              <input
                type="text"
                placeholder="Tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                required
              />
            </span>
            <br />
            <div className="post">
              <button type="submit" className="buttonn">
                Post Your Question
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Ask;

