import Navbar from "./Navbar";
import "../styles/account.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";

import favorite from "../images/favactive.png";
import unFavorite from "../images/favpassive.png";
export default function Account() {
  const userName = localStorage.getItem("name");
  const profileImg = localStorage.getItem("profileImg");
  const userEmail = localStorage.getItem("email");
  const [recipes, setRecipes] = useState([]);
  const [meals, setMeals] = useState([]);
  const [active, setActive] = useState(true);
  // const [recipeName, setRecipeName] = useState("");
  // const [instructionPopup, setInstructionPopup] = useState(false);
  // const [ingredientsPopup, setIngredientsPopup] = useState(false);
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
      data.meals[0].filteredId = recipe.id;

      meals = meals.concat(data.meals);
    }

    setMeals(meals);
  }

  const deleteDocument = async (id) => {
    try {
      // Reference to the specific document you want to delete
      console.log(id);
      const docRef = doc(db, "RecipesID", id);

      // Delete the document
      await deleteDoc(docRef);

      // setMeals(() => {
      //   return meals.filter((meal) => meal.filteredId !== id);
      // });
      setActive(!active);
      console.log("Document deleted successfully");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const addRecipeToDb = async (id) => {
    try {
      await addDoc(collection(db, "RecipesID"), {
        recipeID: id,
        user: localStorage.getItem("name"),
      });

      setActive(!active);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleFavorite = async (meal) => {
    active ? deleteDocument(meal.filteredId) : addRecipeToDb(meal.idMeal);
  };
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
            {meals?.map((meal) => {
              return (
                <div key={meal.idMeal} className="favorite-holder">
                  <div className="favorite-recipe-box-map">
                    <div className="favorite-recipe-img-box">
                      <img
                        src={meal.strMealThumb}
                        alt="favorite-img"
                        className="favorite-img"
                      />
                    </div>
                    <div className="favorite-recipe-text">
                      <p className="favorite-category">{meal.strCategory}</p>
                      <p className="favorite-title">{meal.strMeal}</p>
                      <div className="button-holder">
                        <div className="account-buttons">
                          <button>ingredients</button>
                          <button>Instruction</button>
                          <button>Clip</button>
                        </div>
                      </div>
                      <img
                        src={active ? favorite : unFavorite}
                        className="trash-bin-icon"
                        onClick={() => handleFavorite(meal)}
                        alt="favorite-img"
                      />
                    </div>
                  </div>
                  <div className="line"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
