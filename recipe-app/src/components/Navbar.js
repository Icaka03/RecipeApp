import { Link } from "react-router-dom";
import userIcon from "../images/user.png";
import { signInWithGoogle } from "../firebase-config";
import React, { useEffect, useState } from "react";
import "../styles/header.css";

export default function Navbar() {
  const [userName, setUserName] = useState("");
  const isLogged = localStorage.getItem("isAnonymous");
  useEffect(() => {
    setUserName(localStorage.getItem("name"));
    console.log(userName);
  }, [userName]);

  return (
    <nav className="nav">
      <p>CookApp</p>

      <ul className="menu">
        <Link to="/">
          <li className="menu-item">Home</li>
        </Link>

        <li className="menu-item">Recipes</li>
        <li className="menu-item">Your Recipes</li>
      </ul>
      <div className="user-data">
        <Link to="/account">
          <img
            src={userIcon}
            alt=""
            className="user-icon"
            onClick={() => {
              signInWithGoogle();
              setUserName(localStorage.getItem("name"));
              console.log(userName);
            }}
          />
        </Link>
        {isLogged ? <p>{userName}</p> : null}
        <button
          onClick={() => {
            setUserName("");
            localStorage.clear();
            console.log(userName);
          }}
        >
          Log Out
        </button>
      </div>
    </nav>
  );
}
