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
  const [recipes, setRecipes] = useState([]);
  const [meals, setMeals] = useState([]);
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

  console.log(filteredRecipes.length);
  console.log(recipes);
  console.log(filteredRecipes);
  useEffect(() => {
    getMeals();
  }, [filteredRecipes.length]);

  //   useEffect(() => {
  //     fetch(`https://www.themealdb.com/api/json/v1/1/random.php
  // `)
  //       .then((res) => res.json())
  //       .then((json) => setMeals(json.meals[0]))
  //       .catch((error) => console.log(error));
  //   }, []);

  async function getMeals() {
    if (filteredRecipes.length == 0) {
      return;
    }

    let meals = [];

    for (const recipe of filteredRecipes) {
      const result = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.recipeID}`
      );
      const data = await result.json();

      meals = meals.concat(data.meals);
    }

    setMeals(meals);

    //   .then((res) => res.json())
    //   .then((json) => setMeals(json.meals[0]));
    // console.log(filteredRecipes[0].recipeID);
    // console.log("da");
    // console.log(meals);
  }
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
            {meals.map((meal) => {
              return <li key={meal.idMeal}>{meal.strMeal}</li>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
