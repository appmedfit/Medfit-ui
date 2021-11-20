import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import medicon_login from "../../assets/medicon_login.png";
import { useDispatch, useSelector } from "react-redux";
import { bookingDetails, updateBooking } from "../../services/slots.service";
import ModalLoadingPage from "../Loader/ModalLoader";
import { addReports } from "../../services/reports.service";
import LoadingPage from "../Loader/ModalLoader";

function Comment({ toggleComment, handleCommModalShowHide, comment }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleModal = () => {
    handleCommModalShowHide();
  };

  const { currentUser } = useSelector((state) =>
    sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : state.auth
  );
  const handleOnShow = () => {
    setCommentData(comment);
  };

  const handleSubmit = () => {
    console.log(commentData);
    setLoading(true);
    dispatch(addReports(commentData))
      .then((res) => {
        console.log(res);
        setLoading(false);
        handleModal();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const handleChangeComment = (e) => {
    let { name, value } = e.target;
    setCommentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeCheckbox = (e) => {
    let { name, value } = e.target;
    value = value == "false" ? true : false;
    setCommentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [commentData, setCommentData] = useState(comment);
  return (
    <>
      <>
        <Modal
          show={toggleComment}
          onShow={handleOnShow}
          dialogClassName="modal-70w"
        >
          <Modal.Body>
            <span
              className="float-right"
              style={{ cursor: "pointer" }}
              onClick={handleModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
              >
                <path
                  fill="#aeaeae"
                  fillRule="evenodd"
                  d="M10.047.335L6 4.386 1.953.335a1.145 1.145 0 0 0-1.618 0 1.14 1.14 0 0 0 0 1.613L4.382 6 .335 10.052a1.14 1.14 0 0 0 0 1.613 1.145 1.145 0 0 0 1.618 0L6 7.614l4.047 4.051c.446.447 1.17.447 1.618 0a1.14 1.14 0 0 0 0-1.613L7.618 6l4.047-4.052a1.14 1.14 0 0 0 0-1.613 1.145 1.145 0 0 0-1.618 0z"
                />
              </svg>
            </span>

            <div className="login_conatiner" style={{ minHeight: "480px" }}>
              <img
                src={medicon_login}
                width="127"
                height="112"
                className="loginicon"
                alt=""
              />

              <>
                <h3 className="loginicon">Comment</h3>
                {loading ? (
                  <LoadingPage />
                ) : (
                  <div>
                    <div className="InputContainer">
                      <div
                        style={{
                          marginLeft: "3px",
                          width: "312px",
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        Session Details:{"  "}
                        <h6 style={{ textTransform: "capitalize" }}>
                          {currentUser.role == "user" && "Dr."}{" "}
                          {commentData.toName},
                        </h6>
                        <h6> {commentData.sessionDate}</h6>
                      </div>
                    </div>
                    <div className="InputContainer">
                      <textarea
                        name="comment"
                        type="textarea"
                        rows="10"
                        cols="33"
                        placeholder="Enter Comment"
                        className="textarea"
                        value={commentData.comment}
                        onChange={handleChangeComment}
                      />
                    </div>
                    <div className="form-check" style={{ marginLeft: "24px" }}>
                      <input
                        type="checkbox"
                        className="form-check-input reportToAdminCheckbbox"
                        id="exampleCheck1"
                        name="reportToAdmin"
                        onClick={handleChangeCheckbox}
                        value={commentData.reportToAdmin}
                        checked={commentData.reportToAdmin}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck1"
                        style={{ marginLeft: "9px" }}
                      >
                        Report to admin
                      </label>
                    </div>
                    <div className="">
                      <button
                        className="btn  prescription-btn"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </>
  );
}

export default Comment;
