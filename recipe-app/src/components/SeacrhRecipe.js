import "../styles/searchRecipe.css";
import "../styles/popular.css";
import RecipeBox from "./RecipeBox";
import React, { useState } from "react";

export default function SearchRecipe() {
  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState([]);
  const handleClick = (evt) => {
    if (evt.key === "Enter") {
      searchMeal();
    }
  };

  const searchMeal = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      .then((res) => res.json([0]))
      .then((json) => setMeals(json.meals));
    console.log(meals);
    console.log(search);
  };
  return (
    <div className="input-box">
      <input
        className="input-recipe"
        placeholder="Start Searching For..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        onKeyPress={handleClick}
      />
      <button onClick={searchMeal}>Search</button>
      <div className="recipe-wrapper">
        {meals?.map((meal) => {
          return (
            <RecipeBox
              title={meal.strMeal.toUpperCase()}
              img={meal.strMealThumb}
              category={meal.strCategory}
              origin={meal.strArea}
            >
              {}
            </RecipeBox>
          );
        })}
      </div>
    </div>
  );
}
