import "../styles/searchRecipe.css";
import React, { useState, useEffect } from "react";

export default function SearchRecipe() {
  const [meal, setMeal] = useState(null);
  const [search, setSearch] = useState("");
  const searchMeal = (evt) => {
    if (evt.key === "Enter") {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then((res) => res.json())
        .then((json) => setMeal(json.meals[0]))
        .catch((error) => console.log(error));
    }
  };
  // useEffect(() => {
  //   fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
  //     .then((res) => res.json())
  //     .then((json) => setMeal(json.meals[0]))
  //     .catch((error) => console.log(error));
  // }, []);
  useEffect(() => {
    console.log(meal);
  }, [meal]);
  return (
    <div className="input-box">
      <input
        className="input-recipe"
        placeholder="Search Recipe Here"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        onKeyPress={searchMeal}
      />
      <button>Search</button>
      {meal.strMealThumb}
    </div>
  );
}
