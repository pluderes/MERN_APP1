import loading from "./loading.gif";
import "./style.css";

function Load() {
  return (
    <div className="parent">
      <img src={loading} />
    </div>
  );
}

export default Load;
