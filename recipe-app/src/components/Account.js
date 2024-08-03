import Navbar from "./Navbar";
import "../styles/account.css";
import { Link } from "react-router-dom";
// _________________________________________________________//
import { auth } from "../firebase-config";
import { pushStringToFirestore } from "../firestore";
import React, { useState } from "react";

export default function Account() {
  //_________________________________________________________
  const [stringData, setStringData] = useState("");

  const handleButtonClick = async () => {
    const user = auth.currentUser;
    if (user) {
      await pushStringToFirestore(user.uid, stringData);
    } else {
      console.error("No user is signed in");
    }
  };
  //_________________________________________________________
  const userName = localStorage.getItem("name");
  const profileImg = localStorage.getItem("profileImg");
  const userEmail = localStorage.getItem("email");

  return (
    <>
      <Navbar />
      <div className="account-box">
        <div className="account-heading">
          <p>{userName}'s Account</p>
          <Link to="/">
            {" "}
            <button
              onClick={() => {
                localStorage.clear();
              }}
            >
              Sign out
            </button>
          </Link>
        </div>
        <div className="line"></div>
        <div className="profile">
          <div className="img-profile">
            <img src={profileImg} alt="profilePic" className="profile-photo" />
            <p className="profile-tab-info">{userName}</p>
            <p className="profile-tab-email">{userEmail}</p>
          </div>
          <div className="favorite-recipe-box">
            <p className="favorite-heading">My favorite Recipes</p>
            <p className="favorite-heading-instructions">
              Manage your recipes in this dashboard. Lorem ipsum random text
              need more info
            </p>
            <input
              type="text"
              value={stringData}
              onChange={(e) => setStringData(e.target.value)}
              placeholder="Enter your string"
            />
            <button onClick={handleButtonClick}>
              Push String to Firestore
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
