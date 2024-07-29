import "../styles/recipeBox.css";

export default function RecipeBox({ title, img, category, origin }) {
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
        <button>Instructions</button>
        <button>Ingridients</button>
      </div>
    </div>
  );
}
