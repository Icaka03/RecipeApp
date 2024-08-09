import "../styles/popular.css";
import React, { useState, useEffect } from "react";
import getIngridients from "../utilities/getIngridients";
import Popup from "./Popup";
import YouTubeVideoPopup from "./YouTubeVideoPopup";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import YouTube from "react-youtube";
export default function Popular() {
  const [meal, setMeal] = useState(null);
  const [instructionPopup, setInstructionPopup] = useState(false);
  const [ingredientsPopup, setIngredientsPopup] = useState(false);
  const [youtubeVideo, setYoutubeVideo] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState("");

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
  //Add yo firestore database
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

  //Add yo firestore database />

  // Youtube Video
  const videoOptions = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = (event) => {
    event.target.pauseVideo();
  };

  const handleYouTubeVideo = () => {
    setYoutubeVideo(true);
    setYoutubeLink(meal.strYoutube.split("v=")[1].split("&")[0]);
  };
  // Youtube Video />
  return (
    <div className="popular-section">
      {/* Popup for Instruction */}
      {instructionPopup ? (
        <Popup
          title={`Instructions for  ${meal.strMeal.toUpperCase()}`}
          closeCallback={() => {
            setInstructionPopup(false);
          }}
        >
          <p>{meal.strInstructions}</p>
        </Popup>
      ) : null}
      {/* Popup for Ingridients */}
      {ingredientsPopup ? (
        <Popup
          title={`Ingridients for  ${meal.strMeal.toUpperCase()}`}
          closeCallback={() => {
            setIngredientsPopup(false);
          }}
        >
          <div className="popup-text">
            {getIngridients(meal).map((ingridient) => {
              return <p>{ingridient}</p>;
            })}
          </div>
        </Popup>
      ) : null}
      {/* Popup for YouTube Video */}
      {youtubeVideo ? (
        <YouTubeVideoPopup
          title={`How to make a  ${meal.strMeal.toUpperCase()}`}
          closeCallback={() => {
            setYoutubeVideo(false);
          }}
        >
          <div className="popup-video-popular">
            <YouTube
              videoId={youtubeLink}
              opts={videoOptions}
              onReady={onReady}
            />
          </div>
        </YouTubeVideoPopup>
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
                  <button onClick={handleYouTubeVideo}>Watch It</button>
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
      <div>
        <form onSubmit={handleSubmit}>
          <button
            onClick={() => {
              setRecipeName(meal.idMeal);
            }}
          >
            Set recipe Id
          </button>
        </form>
      </div>
    </div>
  );
}
