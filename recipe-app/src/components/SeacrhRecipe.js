import "../styles/searchRecipe.css";
import "../styles/popular.css";
import React, { useState } from "react";

export default function SearchRecipe() {
  const [search, setSearch] = useState("");
  const [meal, setMeal] = useState("");
  const handleClick = (evt) => {
    if (evt.key === "Enter") {
      searchMeal();
    }
  };

  const searchMeal = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      .then((res) => res.json([0]))
      .then((json) => setMeal(json.meals));
    console.log(meal);
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
      {meal ? (
        <div className="search-recipe-box">
          <div
            className="random-box"
            style={{ backgroundImage: `url(${meal[0].strMealThumb})` }}
          >
            <div className="recipe-info">
              <div className="recipe-border">
                <p className="recipe-category">
                  Category: {meal[0].strCategory}
                </p>
                <p className="recipe-heading">
                  {meal[0].strMeal.toUpperCase()}
                </p>
                <div className="recipe-line"></div>
                <div className="recipe-description">
                  {meal[0].strInstructions}
                </div>
                <div className="recipe-buttons">
                  <button>Watch It</button>
                  <button>Instructions</button>
                  <button>ingredients</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
