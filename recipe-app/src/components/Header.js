import "../styles/header.css";
import userIcon from "../images/user.png";
import plateimg from "../images/plateimg.png";
export default function Header() {
  return (
    <div className="header">
      <nav className="nav">
        <p>CookApp</p>
        <ul className="menu">
          <li className="menu-item">Home</li>
          <li className="menu-item">Recipes</li>
          <li className="menu-item">Your Recipes</li>
        </ul>
        <img src={userIcon} alt="" className="user-icon" />
      </nav>
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
