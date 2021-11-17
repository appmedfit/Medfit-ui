import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import medicon_login from "../../assets/medicon_login.png";
import { useDispatch } from "react-redux";

import { bookingDetails, updateBooking } from "../../services/slots.service";
import LoadingPage from "../Loader/Loader";
import { getTimeDiff } from "../../helpers/helper";

function ViewUserPage({ toggleViewUser, handleviewUserModalShowHide, user }) {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const handleModal = () => {
    handleviewUserModalShowHide();
  };

  const handleSubmit = () => {
    setLoading(true);
  };

  const handleChangePrescribtion = (e) => {};

  const handleOnShow = () => {};

  const [data, setData] = useState([]);

  const getData = () => {
    setLoading(true);
  };

  return (
    <>
      <>
        <Modal
          show={toggleViewUser}
          onShow={handleOnShow}
          size="xl"
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

            <div className="login_conatiner">
              <img
                src={medicon_login}
                width="127"
                height="112"
                className="loginicon"
                alt=""
              />

              <>
                <h3 className="loginicon"> </h3>
                {loading ? (
                  <div className="loading">
                    <LoadingPage />
                  </div>
                ) : (
                  <div>
                    <div>
                      {" "}
                      <p>{user.name}</p>
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

export default ViewUserPage;
