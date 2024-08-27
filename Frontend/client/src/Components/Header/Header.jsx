import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";


function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const navigate = useNavigate();

  // Check for existing token in localStorage (optional)
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setIsLoggedIn(!!storedToken); // Set login state based on token existence
  }, []);

  // Handle login (use Login component)
  const handleLogin = () => {
    navigate("/"); // Navigate to Login component
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsLoggedIn(false); // Update login state
    navigate("/login"); // Redirect to homepage
  };

  return (
    <section>
      <div className="header-container">
        <div>
          <Link to="/">
            <img
              src="https://forum.ibrodev.com/assets/evangadi-logo-5fea54cc.png"
              alt="evangadi logo"
            />
          </Link>
        </div>
        <div>
          <ul className="list-container">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/how-it-works">How it works</Link>
            </li>
            <li>
              {isLoggedIn ? (
                <button className="hbuton" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <Link to={"/login"} className="link">
                  <button className="hbuton" onClick={handleLogin}>
                    Login
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Header;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./header.css";

// function Header() {
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     // Check if a token exists in localStorage
// //     const token = localStorage.getItem("token");
// //     setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
// //   }, []);

// //   const handleAuthButtonClick = () => {
// //     if (isLoggedIn) {
// //       // Log out
// //       localStorage.removeItem("token");
// //       setIsLoggedIn(false);
// //       navigate("/login");
// //     } else {
// //       // Navigate to login page
// //       navigate("/login");
// //     }
// //   };

// //   useEffect(() => {
// //     if (!isLoggedIn) {
// //       navigate("/login");
// //     }
// //   }, [isLoggedIn, navigate]);

//   return (
//     <section>
//       <div className="header-container">
//         <div>
//           <Link to="#">
//             <img
//               src="https://forum.ibrodev.com/assets/evangadi-logo-5fea54cc.png"
//               alt="evangadi logo"
//             />
//           </Link>
//         </div>
//         <div>
//           <ul className="list-container">
//             <li>
//               <Link to="#">Home</Link>
//             </li>
//             <li>
//               <Link to="/how-it-works">How it works</Link>
//             </li>
//             <li>
//               <button
//             //   onClick={handleAuthButtonClick}
//               >
//                 {/* {isLoggedIn ? "Logout" : "Login"} */}Login
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Header;
