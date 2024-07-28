import "../styles/searchRecipe.css";
import React, { useState } from "react";

export default function SearchRecipe() {
  const [search, setSearch] = useState("");
  const [meal, setMeal] = useState("");
  const searchMeal = (evt) => {
    if (evt.key === "Enter") {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then((res) => res.json([0]))
        .then((json) => setMeal(json.meals));
      console.log(meal);
      console.log(search);
    }
  };

  const handleClick = () => {
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
        onKeyPress={searchMeal}
      />
      <button onClick={handleClick}>Search</button>
      {meal ? (
        <div className="search-recipe-box">
          <div
            className="search-recipe-img"
            style={{ backgroundImage: `url(${meal[0].strMealThumb})` }}
          ></div>
          <div className="search-recipe-heading">
            <p className="search-text-heading">{meal[0].strMeal}</p>
          </div>
          <div></div>
        </div>
      ) : null}
    </div>
  );
}
