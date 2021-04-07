import "./style.css";

function Button({ onClick, disabled, children }) {
    return (
        <div className="button" onClick={onClick} data-disabled={disabled}>
            {children}
        </div>
    );
}

export default Button;