import React, { useState } from "react";
import axios from '../../axiosConfig'
import {Link, useNavigate} from 'react-router-dom'
import About from "../../Components/About/About";
import "./Register.css";
function Register() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    const formData = {
      username,
      firstname,
      lastname,
      email,
      password,
    };
    console.log("Form Data:", formData);
    // You can also send formData to a server here
    if (!username || !firstname || !lastname || !email || !password){
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("/users/Register", formData);
      console.log('Response', response);
      alert('Registration successful');
      navigate('/login');
    } catch (error) {
      alert('Registration failed');
      console.log(error.message);
    }
  };

  return (
    <section className='reg'>
      <div className="form">
        <div className="formm">
          <div className="join">
            <h2>Join the network</h2>
            <p>
            Already have an account? {" "}
              <Link to={"/Login"} style={{ color: "orange" }}>
                Sign in
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <br />
            <div>
              <input
                id="username"
                type="text"
                placeholder="  Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <br />
            <div className="finput">
              <div>
                <input
                  id="firstname"
                  type="text"
                  placeholder="  First Name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="lastname"
                  type="text"
                  placeholder="  Last Name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>
            <br />
            <div>
              <input
                id="email"
                type="email"
                placeholder="  Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br />
            <div>
              <input
                id="password"
                type="password"
                placeholder="  Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br />
            <p>
              I agree to the{" "}
              <span style={{ color: "orange" }}>privacy policy</span> and{" "}
              <span style={{ color: "orange" }}>terms of service.</span>
            </p>
            <br />
            <button className="agree" type="submit">
              Agree and Join
            </button>
          </form>
          <div className="account">
            <Link to={"/Login"} style={{ color: "orange" }}>
              Already have an account?
            </Link>
          </div>
        </div>
        <div className="aboutt">
          <About />
        </div>
      </div>
    </section>
  );
}

export default Register;
