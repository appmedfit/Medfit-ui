import { Fragment, useState, useRef, useEffect } from "react";
import medIcon from "../../assets/medicon.jpg";
import medicon_login from "../../assets/medicon_login.png";
import classes from "./Header.css";
import login from "../../assets/login.png";
import { useSelector, useDispatch } from "react-redux";
import { handleLoginModal, logout } from "../../store/auth.slice";
import { SignOut } from "../../services/auth.service";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import SignUpForm from "../SignUp/SignUp";
import LoginForm from "../Login/Login";

const Header = (props) => {
  const { isAuthenticated, currentUser } = useSelector((state) =>
    sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : state.auth
  );

  const { toggleLogin } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const [toggleSignup, setToggleSignup] = useState(false);

  const handleLoginModalShowHide = () => {
    console.log("clicked", toggleLogin);
    dispatch(handleLoginModal(!toggleLogin));
    console.log(toggleLogin);
  };

  const handleProfileClick = (event) => {};

  const handleSignupModalShowHide = () => {
    setToggleSignup((i) => !i);
  };

  const handleLogout = () => {
    console.log("log");
    dispatch(SignOut({}))
      .then((resp) => {
        // console.log(resp);
        sessionStorage.clear();
        history.push("/");
        dispatch(logout());
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      handleLogout();
    }
  }, [toggleLogin]);

  return (
    <>
      <nav className="navbar navbar-light bg_light">
        <Link to={`/`}>
          <span className="navbar-brand">
            <img
              src={medicon_login}
              width="35"
              height="35"
              className="d-inline-block align-top"
              alt=""
            />
            <span className="brand">MEDFIT</span>
          </span>
        </Link>
        <p className="consult">Online Consultation</p>
        <div>
          <div className="profile">
            {isAuthenticated ? (
              <div>
                {/* <img
                  className="login"
                  src={login}
                  onClick={handleProfileClick}
                  alt="login"
                /> */}

                <div>
                  {/* <Overlay
                      show={showPopup}
                      target={target}
                      placement="bottom-end"
                      container={ref}
                      containerPadding={10}
                    >
                      <Popover id="popover-contained">
                        <Popover.Header as="h3">
                          {currentUser.name}
                        </Popover.Header>
                        <Popover.Body>
                          <ul>
                            <Link to={`/previousbookings`}>
                              <li onClick={handleProfileClick}>
                                Previous Sessions
                              </li>
                            </Link>

                            <li onClick={handleLogout}>Logout</li>
                          </ul>
                        </Popover.Body>
                      </Popover>
                    </Overlay> */}
                  <div>
                    <div className="profile_info">
                      <img
                        src={login}
                        onClick={handleProfileClick}
                        style={{ maxWidth: "30px" }}
                        alt="#"
                      />
                      <div className="profile_info_iner">
                        {currentUser.role == "doctor" ? (
                          <>
                            {" "}
                            <p>{currentUser.degree} </p>
                            <h5>Dr. {currentUser.name}</h5>
                          </>
                        ) : (
                          <>
                            <h5> {currentUser.name}</h5>
                          </>
                        )}

                        <div className="profile_info_details">
                          <a
                            onClick={() => {
                              history.push("/");
                            }}
                          >
                            Dashboard <i className="ti-user"></i>
                          </a>

                          {currentUser.role !== "admin" && (
                            <>
                              {currentUser.role == "user" && (
                                <a
                                  onClick={() => {
                                    history.push("/profile");
                                  }}
                                >
                                  My Profile <i className="ti-user"></i>
                                </a>
                              )}
                              <a
                                onClick={() => {
                                  history.push("/previousbookings/all");
                                }}
                              >
                                Sessions <i className="ti-user"></i>
                              </a>
                              <a
                                onClick={() => {
                                  history.push("/prescriptions");
                                }}
                              >
                                Prescriptions <i className="ti-user"></i>
                              </a>
                            </>
                          )}
                          <a onClick={handleLogout}>
                            Log Out <i className="ti-shift-left"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button
                className="btn btn-outline-primary"
                onClick={handleLoginModalShowHide}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      <LoginForm
        toggleLogin={toggleLogin}
        handleLoginModalShowHide={handleLoginModalShowHide}
        handleSignupModalShowHide={handleSignupModalShowHide}
      />
      <SignUpForm
        toggleSignup={toggleSignup}
        handleLoginModalShowHide={handleLoginModalShowHide}
        handleSignupModalShowHide={handleSignupModalShowHide}
      />
    </>
  );
};

export default Header;
