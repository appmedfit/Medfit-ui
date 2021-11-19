import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import loaderIcon from "../../assets/Hourglass.gif";
import "./Loader.css";

function LoadingPage(props) {
  const dispatch = useDispatch();

  let history = useHistory();
  const { loading } = useSelector((state) => state.auth);
  return (
    <>
      {loading && (
        <div className="loader center ">
          <img src={loaderIcon} />
        </div>
      )}
      <div className="appBody">{props.children}</div>{" "}
    </>
  );
}

export default LoadingPage;
