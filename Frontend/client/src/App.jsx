import React, { createContext, useEffect, useState } from "react";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { useNavigate, Route, Routes } from "react-router-dom";
import axios from "./axiosConfig";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Ask from "./Pages/Ask/Ask";
import AllQuestions from "./Components/AllQuestions/AllQuestions";
import SingleQuestion from "./Pages/SingleQuestion/SingleQuestion";
import AllAnswers from "./Components/AllAnswers/AllAnswers";
import SingleAnswer from "./Components/SingleAnswer/SingleAnswer";

export const AppState = createContext();

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(data);
    } catch (error) {
      console.log(error.response);
      navigate("/Login");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <Header />
      <AppState.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Ask" element={<Ask />} />
          <Route path="/questions/all-questions" element={<AllQuestions />} />
          <Route path="/questions/:questionId" element={<SingleQuestion />} />
          <Route path="/answers/all-answers" element={<AllAnswers />} />
          <Route path="/answers/singleAnswer" element={<SingleAnswer />} />
        </Routes>
      </AppState.Provider>
      <Footer />
    </>
  );
}

export default App;

//!===========================================================
// import React, {
//   createContext,
//   useEffect,
//   useState,
//   useCallback,
// } from "react";
// import Home from "./Pages/Home/Home";
// import Login from "./Pages/Login/Login";
// import Register from "./Pages/Register/Register";
// import { useNavigate, Route, Routes } from "react-router-dom";
// import axios from "./axiosConfig";
// import Header from "./Components/Header/Header";
// import Footer from "./Components/Footer/Footer";
// import Ask from "./Pages/Ask/Ask";
// import AllQuestions from "./Components/AllQuestions/AllQuestions";
// import SingleQuestion from "./Pages/SingleQuestion/SingleQuestion";
// import AllAnswers from "./Components/AllAnswers/AllAnswers";
// import SingleAnswer from "./Components/SingleAnswer/SingleAnswer";

// export const AppState = createContext();

// function App() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState([]);

//   const checkUser = useCallback(async () => {
//     try {
//       const { data } = await axios.get("/users/check", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (data) {
//         setUser(data); // User is registered and authenticated
//       } else {
//         navigate("/Register"); // User is not registered
//       }
//     } catch (error) {
//       console.log(error.response);
//       navigate("/Login"); // Handle the error by redirecting to Login
//     }
//   }, [navigate]);

//   useEffect(() => {
//     checkUser();
//   }, [checkUser]);

//   return (
//     <>
//       <Header />
//       <AppState.Provider value={{ user, setUser }}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/Login" element={<Login />} />
//           <Route path="/Register" element={<Register />} />
//           <Route path="/Ask" element={<Ask />} />
//           <Route path="/questions/all-questions" element={<AllQuestions />} />
//           <Route path="/questions/:questionId" element={<SingleQuestion />} />
//           <Route path="/answers/all-answers" element={<AllAnswers />} />
//           <Route path="/answers/singleAnswer" element={<SingleAnswer />} />
//         </Routes>
//       </AppState.Provider>
//       <Footer />
//     </>
//   );
// }

// export default App;
