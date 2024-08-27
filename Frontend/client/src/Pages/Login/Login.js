import React, { useState } from 'react'
import axios from '../../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import About from '../../Components/About/About';
import './Login.css'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    const formData = {
      email,
      password,
    };
    console.log("Form Data:", formData);
    // You can also send formData to a server here
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const {data} = await axios.post("/users/Login", formData);
      alert("Login successful");
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.message);
    }
  };
 
  return (
    <section className='log'>
      <div className="login">
        <div className="formm inp">
          <div className="join">
            <h1>Login to your account</h1>
            <br />
            <p>
              Don’t have an account?{" "}
              <Link to={"/Register"} style={{ color: "orange" }}>
                Create a new account
              </Link>
            </p>
            <br />
          </div>
          <form onSubmit={handleSubmit}>
            <br />
            <input
              id="email"
              type="email"
              placeholder="  Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <br />
            <input
              id="password"
              type="password"
              placeholder="  Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <p style={{ color: "orange" }}>Forgot password?</p>
            <br />
            <br />
            <br />
            <button className="agree" type="submit">
              Login
            </button>
          </form>
          <br />
          <br />
        </div>
        <div className="aboutt">
          <About />
        </div>
      </div>
    </section>
  );
}

export default Login;