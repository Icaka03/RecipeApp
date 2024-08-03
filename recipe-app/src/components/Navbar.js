import { Link } from "react-router-dom";
import userIcon from "../images/user.png";
import { signInWithGoogle } from "../firebase-config";
import React, { useEffect, useState } from "react";
import "../styles/header.css";

export default function Navbar() {
  const [userName, setUserName] = useState("");
  const isLogged = localStorage.getItem("isAnonymous");
  const profileImg = localStorage.getItem("profileImg");
  useEffect(() => {
    setUserName(localStorage.getItem("name"));
    console.log(userName);
  }, [userName]);

  const handleClick = async () => {
    await signInWithGoogle();
    setUserName(localStorage.getItem("name"));
    console.log(userName);
    console.log("tova e storage = " + localStorage.getItem("name"));
  };
  return (
    <nav className="nav">
      <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
        <p>CookApp</p>
      </Link>
      <ul className="menu">
        <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
          <li className="menu-item">Home</li>
        </Link>

        <li className="menu-item">Recipes</li>
        <li className="menu-item">Your Recipes</li>
      </ul>
      <div className="user-data">
        {isLogged ? (
          <Link to="/account">
            <img
              src={profileImg}
              alt=""
              className="user-icon-logged"
              onClick={() => {
                setUserName(localStorage.getItem("name"));
              }}
            />
          </Link>
        ) : (
          <img
            src={userIcon}
            alt=""
            className="user-icon"
            onClick={handleClick}
          />
        )}

        {isLogged ? (
          <Link to="/account" style={{ textDecoration: "none", color: "#fff" }}>
            <p>{userName}</p>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
