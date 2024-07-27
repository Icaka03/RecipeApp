import "../styles/searchRecipe.css";
import React, { useState } from "react";

export default function SearchRecipe() {
  const [search, setSearch] = useState("");
  const [meal, setMeal] = useState("");
  const [updated, setUpdated] = useState(search);
  const searchMeal = (evt) => {
    if (evt.key === "Enter" || handleClick) {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then((res) => res.json([0]))
        .then((json) => setMeal(json.meals));
      console.log(meal);
      console.log(search);
    }
  };

  const handleClick = () => {
    setUpdated(search);
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
        placeholder="Search Recipe Here"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        onKeyPress={searchMeal}
      />
      <button onClick={handleClick}>Search</button>
    </div>
  );
}
