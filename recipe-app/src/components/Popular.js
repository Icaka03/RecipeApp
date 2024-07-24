import "../styles/popular.css";
import React, { useState, useEffect } from "react";
import { signInWithGoogle } from "../firebase-config";

export default function Popular() {
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php
`)
      .then((res) => res.json())
      .then((json) => setMeal(json.meals[0]))
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    console.log(meal);
  }, [meal]);
  return (
    <div className="popular-section">
      <div className="wrapper">
        <div>
          <h1 className="popular-heading">Random Recipe Of The Day</h1>
        </div>
      </div>
      <div>
        {meal ? (
          <div
            className="random-box"
            style={{ backgroundImage: `url(${meal.strMealThumb})` }}
          >
            <label>Instruction: </label>
            <p>{meal.strInstructions}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
