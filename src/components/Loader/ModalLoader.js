import React from "react";
import loaderIcon from "../../assets/Hourglass.gif";
import "./Loader.css";
function ModalLoadingPage() {
  return (
    <div className="modal-loader  modal-center">
      <img src={loaderIcon} />
    </div>
  );
}

export default ModalLoadingPage;
