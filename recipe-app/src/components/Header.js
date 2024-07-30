import "../styles/header.css";
import userIcon from "../images/user.png";
import plateimg from "../images/plateimg.png";
import { signInWithGoogle } from "../firebase-config";
import React, { useEffect, useState } from "react";

export default function Header() {
  // const userName = localStorage.getItem("name");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    console.log("myVariable has changed: " + userName);
  }, [userName]);
  return (
    <div className="header">
      <nav className="nav">
        <p>CookApp</p>
        <ul className="menu">
          <li className="menu-item">Home</li>
          <li className="menu-item">Recipes</li>
          <li className="menu-item">Your Recipes</li>
        </ul>
        <div className="user-data">
          <img
            src={userIcon}
            alt=""
            className="user-icon"
            onClick={() => {
              signInWithGoogle();
              setUserName(localStorage.getItem("name"));
            }}
          />
          {userName ? <p>{userName}</p> : null}
          {/* <button onClick={setUserName("")}>Log Out</button> */}
        </div>
      </nav>
      <div className="header-section">
        <div className="header-section-text">
          <h1>The Easiest Way To Find Your Favorite Meal</h1>
          <p>
            Discover over 1000+ recipes in your hand with the best recipe. Help
            you to find the easiest way to cook
          </p>
          <button className="explore-button">Explore Recipes</button>
        </div>

        <div className="header-section-img">
          <img src={plateimg} alt="" className="plateimg" />
        </div>
      </div>
    </div>
  );
}
