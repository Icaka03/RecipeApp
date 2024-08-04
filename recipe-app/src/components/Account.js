import Navbar from "./Navbar";
import "../styles/account.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

export default function Account() {
  const userName = localStorage.getItem("name");
  const profileImg = localStorage.getItem("profileImg");
  const userEmail = localStorage.getItem("email");
  const no = true;
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "RecipesID"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(data);
    };

    fetchData();
    console.log(recipes);
  }, []);

  const filteredRecipes = recipes.filter((recipe) => recipe.user === userName);
  console.log("username e " + userName);
  console.log("recipe usera e " + recipes.user);
  console.log(recipes.recipeID);
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
            {no ? (
              <p>
                {filteredRecipes.map((recipe) => (
                  <li key={recipe.id}>{recipe.recipeID}</li>
                ))}
              </p>
            ) : (
              <p>no recipes</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
