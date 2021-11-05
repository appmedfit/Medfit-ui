import React from "react";
import loaderIcon from "../../assets/Hourglass.gif";
import "./Loader.css";
function LoadingPage() {
  return (
    <div className="loader center">
      <img src={loaderIcon} />
    </div>
  );
}

export default LoadingPage;
