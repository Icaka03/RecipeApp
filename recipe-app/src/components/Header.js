import "../styles/header.css";
import plateimg from "../images/plateimg.png";

import Navbar from "./Navbar";
export default function Header() {
  return (
    <div className="header">
      <Navbar />

      <div className="header-section">
        <div className="header-section-text">
          <h1>The Easiest Way To Find Your Favorite Meal</h1>
          <p>
            Discover over 1000+ recipes in your hand with the best recipe. Help
            you to find the easiest way to cook
          </p>
          <button className="explore-button">Explore Recipes</button>
        </div>

        <div className="header-section-img">
          <img src={plateimg} alt="" className="plateimg" />
        </div>
      </div>
    </div>
  );
}
