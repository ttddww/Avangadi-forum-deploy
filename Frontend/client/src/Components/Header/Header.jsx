import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./header.css";

function Header() { 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check for existing token in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setIsLoggedIn(!!storedToken); // Set login state based on token existence
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsLoggedIn(false); // Update login state
    navigate("/login"); // Redirect to login page
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
                  LOG OUT
                </button>
              ) : (
                <Link to="/login" className="link">
                  <button className="btnh">LOG IN</button>
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
//!===============================================
// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import "./header.css";

// function Header() {
//    const [isLoggedIn, setIsLoggedIn] = useState(false);
//    const location = useLocation();
//    useEffect(() => {
//      // Update isSignedIn based on the current path
//      setIsLoggedIn(
//        location.pathname !== "/login" &&
//          location.pathname !== "/Register" &&
//          location.pathname !== "/"
//      );
//    }, [location.pathname]);

//    function handleLogout() {
//      setIsLoggedIn(false);
//    }

//   return (
//     <section>
//       <div className="header-container">
//         <div>
//           <Link to="/">
//             <img
//               src="https://forum.ibrodev.com/assets/evangadi-logo-5fea54cc.png"
//               alt="evangadi logo"
//             />
//           </Link>
//         </div>
//         <div>
//           <ul className="list-container">
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/how-it-works">How it works</Link>
//             </li>
//             <li>
//               {isLoggedIn ? (
//                 <button className="hbuton" onClick={handleLogout}>
//                   Log In
//                 </button>
//               ) : (
//                 <Link to={"/login"} className="link">
//               <button className="btnh">LOG IN</button>
//             </Link>
//                 // <button className="hbuton" onClick={handleLogin}>
//                 //   Login
//                 // </button>
//               )}
//             </li>
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Header;
