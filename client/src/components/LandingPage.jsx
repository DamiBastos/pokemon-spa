import React from "react";
import { Link } from "react-router-dom";
import Style from "../styles/Landing.css";

export default function LandingPage() {
  return (
    <div className="landing-conteiner">
      <div className="landing-logo"></div>
      <div>
        <Link to="./home">
          <button className="landing-button">
            <div className="logo-button"></div>
          </button>
        </Link>
      </div>
    </div>
  );
}
