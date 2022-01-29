import "./style.css";

function Button({ onClick, disabled, children, className = "" }) {
  return (
    <div
      className={`button ${className}`}
      onClick={onClick}
      data-disabled={disabled}
    >
      {children}
    </div>
  );
}

export default Button;
