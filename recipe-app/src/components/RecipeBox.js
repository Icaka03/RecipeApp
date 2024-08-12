import "../styles/recipeBox.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import React, { useState } from "react";
import favoritePassive from "../images/favpassive.png";
import favoriteActive from "../images/favactive.png";

export default function RecipeBox({
  title,
  img,
  category,
  origin,
  instructionSetter,
  ingridientsSetter,
  id,
}) {
  //__________________________________________________
  const [recipeName, setRecipeName] = useState("");
  const [active, setActive] = useState(true);
  const handleSubmit = async (e) => {
    setActive(!active);
    e.preventDefault();
    try {
      await addDoc(collection(db, "RecipesID"), {
        recipeID: recipeName,
        user: localStorage.getItem("name"),
      });
      setRecipeName(""); // Reset the input field
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  //__________________________________________________
  return (
    <div className="recipe-box">
      <div className="img-box">
        <img src={img} alt="" className="img-size" />
      </div>
      <div className="heading">
        <div>
          <h2 className="width">{title}</h2>
        </div>
        <div>
          <p className="recipe-category">{category}</p>
        </div>
      </div>
      <div className="recipe-origin">
        <p>From: {origin}</p>
      </div>
      <div className="recipe-box-buttons">
        <button onClick={instructionSetter}>Instructions</button>
        <button onClick={ingridientsSetter}>Ingridients</button>
      </div>
      <form onSubmit={handleSubmit}>
        <button className="form-button-recipe-box">
          <img
            src={active ? favoritePassive : favoriteActive}
            onClick={() => {
              setRecipeName(id);
            }}
            alt="favPassive"
            className="favorite-icon-popular recipe-box-icon"
          />
        </button>
      </form>
    </div>
  );
}
