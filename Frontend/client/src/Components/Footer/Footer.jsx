import React from 'react'
import './Footer.css'
import { PiFacebookLogoBold } from "react-icons/pi";
import { PiInstagramLogo } from "react-icons/pi";
import { RiYoutubeLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <section className="footer-container">
      <div className="footer">
        <div>
          <img
            src="https://forum.ibrodev.com/assets/evangadi-logo-footer-f73bca57.png"
            alt="evangadi logo"
          />
          <div className="icon">
            <Link to="https://www.facebook.com/evangaditech/">
              <PiFacebookLogoBold style={{ fontSize: "45px" }} />
            </Link>
            <Link to="https://www.instagram.com/evangaditech/?hl=en">
              <PiInstagramLogo style={{ fontSize: "45px" }} />
            </Link>
            <Link to="https://www.youtube.com/evangaditech">
              <RiYoutubeLine style={{ fontSize: "45px" }} />
            </Link>
          </div>
        </div>
        <div className="link">
          <h1>Useful Link</h1>
          <Link to="">How it works</Link>
          <Link to="">Terms of Service</Link>
          <Link to="">Privacy Policy</Link>
        </div>
        <div className="link">
          <h1>Contact Info</h1>
          <p>Evangadi Networks</p>
          <p>support@evangadi.com</p>
          <p>+1-202-386-2702</p>
        </div>
      </div>
    </section>
  );
}

export default Footer