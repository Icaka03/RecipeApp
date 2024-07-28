export default function Popup({ title, children, closeCallback }) {
  return (
    <div className="popup">
      <div className="popup-flex">
        <h1 className="popup-heading">{title}</h1>
        <button className="close-popup" onClick={closeCallback}>
          &times;
        </button>
      </div>
      <div className="popup-text">{children}</div>
    </div>
  );
}
