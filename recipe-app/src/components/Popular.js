import "../styles/popular.css";
import React, { useState, useEffect } from "react";
import getIngridients from "../utilities/getIngridients";
export default function Popular() {
  const [meal, setMeal] = useState(null);
  const [instructionPopup, setInstructionPopup] = useState(false);
  const [ingredientsPopup, setIngredientsPopup] = useState(false);
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

  // function getIngridients(meal) {
  //   const ingridients = [];
  //   for (let i = 1; meal[getOrderedKey("strIngredient", i)]; i++) {
  //     ingridients.push(meal[getOrderedKey("strIngredient", i)]);
  //   }
  //   return ingridients;
  // }

  // function getOrderedKey(key, index) {
  //   return `${key}${index}`;
  // }
  return (
    <div className="popular-section">
      {instructionPopup ? (
        <div className="popup">
          <div className="popup-flex">
            <h1 className="popup-heading">
              Instructions for<br></br> {meal.strMeal.toUpperCase()}:
            </h1>
            <button
              className="close-popup"
              onClick={() => {
                setInstructionPopup(false);
              }}
            >
              X
            </button>
          </div>
          <div className="popup-text">
            <p>{meal.strInstructions}</p>
          </div>
        </div>
      ) : null}
      {ingredientsPopup ? (
        <div className="popup">
          <div className="popup-flex">
            <h1 className="popup-heading">
              Ingredients for<br></br> {meal.strMeal.toUpperCase()}:
            </h1>
            <button
              className="close-popup"
              onClick={() => {
                setIngredientsPopup(false);
              }}
            >
              X
            </button>
          </div>
          <div className="popup-text">
            {getIngridients(meal).map((ingridient) => {
              return <p>{ingridient}</p>;
            })}
          </div>
        </div>
      ) : null}
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
            <div className="recipe-info">
              <div className="recipe-border">
                <p className="recipe-category">Category: {meal.strCategory}</p>
                <p className="recipe-heading">{meal.strMeal.toUpperCase()}</p>
                <div className="recipe-line"></div>
                <div className="recipe-description">{meal.strInstructions}</div>
                <div className="recipe-buttons">
                  <button>Watch It</button>
                  <button
                    onClick={() => {
                      setInstructionPopup(true);
                    }}
                  >
                    Instructions
                  </button>
                  <button
                    onClick={() => {
                      setIngredientsPopup(true);
                    }}
                  >
                    ingredients
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
