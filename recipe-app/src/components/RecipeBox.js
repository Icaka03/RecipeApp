import "../styles/recipeBox.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import React, { useState } from "react";

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

  const handleSubmit = async (e) => {
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
        <form onSubmit={handleSubmit}>
          <button
            onClick={() => {
              setRecipeName(id);
            }}
          >
            Id
          </button>
        </form>
      </div>
    </div>
  );
}
