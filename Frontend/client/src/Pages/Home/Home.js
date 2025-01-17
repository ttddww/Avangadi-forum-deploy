import React, { useContext } from 'react'
import { AppState } from '../../App'
import './Home.css'
import AllQuestions from '../../Components/AllQuestions/AllQuestions';
import { Link } from 'react-router-dom';

function Home() {
  const {user} = useContext(AppState);
  const {title} = useContext(AppState);
  return (
    <section>
      <div className="home">
        <div className="ask">
          <div>
            <Link to={"/Ask"}>
              <button>Ask Question</button>
            </Link>
          </div>
          <h1>
            Welcome: <span style={{ color: "red" }}>{user.username}</span>
          </h1>
        </div>
        <div className="put">
          <h1 style={{ color: "black" }}>Questions</h1>
          <input type="text" placeholder="Search Questions" />
        </div>
        <div>
          <div>{title}</div>
          <AllQuestions/>
        </div>
      </div>
    </section>
  );
}

export default Home