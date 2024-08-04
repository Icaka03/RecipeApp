import "../styles/searchRecipe.css";
import "../styles/popular.css";
import loupe from "../images/loupe.png";
import RecipeBox from "./RecipeBox";
import Popup from "./Popup";
import getIngridients from "../utilities/getIngridients";
import React, { useState } from "react";

export default function SearchRecipe() {
  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState([]);
  const [ingridienMeal, setIngridientMeal] = useState(null);
  const [instructionPopup, setInstructionPopup] = useState(false);
  const [ingredientsPopup, setIngredientsPopup] = useState(false);
  const [mealInstruction, setMealInstruction] = useState("");
  const [mealTitle, setMealTitle] = useState("");
  const [instructionId, setInstructionId] = useState("");
  const handleClick = (evt) => {
    if (evt.key === "Enter") {
      searchMeal();
      idMeal();
    }
  };

  const searchMeal = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      .then((res) => res.json([0]))
      .then((json) => setMeals(json.meals));
    console.log(meals);
    console.log(search);
  };

  const idMeal = () => {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${instructionId}`
    )
      .then((res) => res.json([0]))
      .then((json) => setIngridientMeal(json.meals));
    console.log(instructionId);
    console.log(ingridienMeal);
  };

  return (
    <div className="input-box">
      {instructionPopup ? (
        <Popup
          title={`Instructions for  ${mealTitle.toUpperCase()}`}
          closeCallback={() => {
            setInstructionPopup(false);
          }}
        >
          <p>{mealInstruction}</p>
        </Popup>
      ) : null}
      {ingredientsPopup ? (
        <Popup
          title={`Ingridients for  ${mealTitle.toUpperCase()}`}
          closeCallback={() => {
            setIngredientsPopup(false);
          }}
        >
          <div className="popup-text">
            {ingridienMeal
              ? getIngridients(ingridienMeal[0]).map((ingridient) => {
                  return <p>{ingridient}</p>;
                })
              : null}
          </div>
        </Popup>
      ) : null}
      <h1 className="input-title">Search Recipe By It's Name </h1>
      <div className="input-holder">
        <input
          className="input-recipe"
          placeholder="Start Searching For..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onKeyPress={handleClick}
        />
        <img
          src={loupe}
          alt="loupe"
          className="loupe-icon"
          onClick={searchMeal}
        />
      </div>

      <div className="recipe-wrapper">
        {meals?.map((meal) => {
          return (
            <RecipeBox
              title={meal.strMeal.toUpperCase()}
              img={meal.strMealThumb}
              category={meal.strCategory}
              origin={meal.strArea}
              id={meal.idMeal}
              instructionSetter={() => {
                setMealInstruction(meal.strInstructions);
                setMealTitle(meal.strMeal);
                setInstructionPopup(true);
              }}
              ingridientsSetter={() => {
                setMealTitle(meal.strMeal);
                setIngredientsPopup(true);
                setInstructionId(meal.idMeal);
                idMeal();
              }}
            >
              {}
            </RecipeBox>
          );
        })}
      </div>
    </div>
  );
}
