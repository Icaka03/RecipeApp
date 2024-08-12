import { Link } from "react-router-dom";
import userIcon from "../images/user.png";
import burgerMenu from "../images/burger-bar.png";
import { signInWithGoogle } from "../firebase-config";
import React, { useEffect, useState } from "react";
import "../styles/header.css";

export default function Navbar() {
  const [userName, setUserName] = useState("");
  const isLogged = localStorage.getItem("name");
  const profileImg = localStorage.getItem("profileImg");
  const [isMobile, setIsMobile] = useState(false);
  const [burgerMenuClicked, setBurgerMenuClicked] = useState(false);
  const handleResize = () => {
    if (window.innerWidth < 700) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    console.log(window.innerWidth);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      {burgerMenuClicked ? (
        <>
          <div className="burger-menu-sidebar"></div>
          <div className="burger-menu-content">
            <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
              <span className="burger-menu-links">Home</span>
            </Link>
            <span className="burger-menu-links">Recipes</span>
            {isLogged ? (
              <Link
                to="/account"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <span className="burger-menu-links">Your Recipes</span>
              </Link>
            ) : (
              <span
                className="burger-menu-links"
                onClick={() => alert("You need to be logged in First")}
              >
                Your Recipes
              </span>
            )}
          </div>
        </>
      ) : null}
      {isMobile ? (
        <img
          src={burgerMenu}
          alt="burger-menu"
          className={
            burgerMenuClicked ? "burger-menu-icon-active" : "burger-menu-icon"
          }
          onClick={() => setBurgerMenuClicked(!burgerMenuClicked)}
        />
      ) : (
        <>
          <div>
            <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
              <p>CookApp</p>
            </Link>
          </div>
          <ul className="menu">
            <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
              <li className="menu-item">Home</li>
            </Link>

            <li className="menu-item">Recipes</li>
            {isLogged ? (
              <Link
                to="/account"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <li className="menu-item">Your Recipes</li>
              </Link>
            ) : (
              <li
                className="menu-item"
                onClick={() => alert("You need to be logged in First")}
              >
                Your Recipes
              </li>
            )}
          </ul>
        </>
      )}

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
