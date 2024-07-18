import "../styles/header.css";

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
      </nav>
      <div className="header-section">
        <div className="header-section-text">
          <h1>The Easiest Way To Find Your Favorite Meal</h1>
          <p>
            Discover over 1000+ recipes in your hand with the best recipe. Help
            you to find the easiest way to cook
          </p>
          <button>Explore Recipes</button>
        </div>

        <div className="header-section-img"></div>
      </div>
    </div>
  );
}
