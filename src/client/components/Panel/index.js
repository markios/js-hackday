import "./style.css";

function Panel({ title="", children }) {
    return (
        <div className="panel">
            {title && <div className="panel-title">{title}</div>}
            {children}
        </div>
    );
}

export default Panel;