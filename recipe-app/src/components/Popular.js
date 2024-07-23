import "../styles/popular.css";
import React, { useState, useEffect } from "react";
import { signInWithGoogle } from "../firebase-config";

export default function Popular() {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php
`)
      .then((res) => res.json())
      .then((json) => setMeals(json.meals))
      .catch((error) => console.log(error));
  }, []);
  console.log(meals);
  return (
    <div className="popular-section">
      <div className="wrapper">
        <div>
          <h1 className="popular-heading">Popular Recipes Of The Week</h1>
          <p className="heading-description">
            Our most popular recipes of this week
          </p>
        </div>
        <div>
          <p className="see-all">See all</p>
        </div>
      </div>
      {meals.map((meal) => {
        return (
          <div>
            <p>{meal.strMeal}</p>
            <p>{meal.strMeal}</p>
          </div>
        );
      })}
      <button onClick={signInWithGoogle}>Sign in with google</button>
    </div>
  );
}
