import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import profileIcon from "../../assets/profilev2.jpg";
import { setLoading } from "../../store/auth.slice";
import { useEffect } from "react";
import { getUsersWithCondition, updateUser } from "../../services/auth.service";
function ViewUserPage({ toggleViewUser, handleviewUserModalShowHide, user }) {
  const dispatch = useDispatch();
  const handleModal = () => {
    handleviewUserModalShowHide();
  };
  const getData = () => {
    dispatch(setLoading(true));
    dispatch(getUsersWithCondition({ id: user.id }))
      .then((resp) => {
        console.log("res", resp);
        let user = { ...state, ...resp[0] };
        console.log(user);
        setState(user);
        dispatch(setLoading(false));
      })
      .catch(() => {
        dispatch(setLoading(false));
      });
  };
  const handleSubmit = (e) => {
    dispatch(setLoading(true));
    const { name } = e.target;
    console.log(name);
    setState((prevState) => ({
      ...prevState,
      verificationStatus: name,
    }));
    console.log({ ...state, verificationStatus: name });
    dispatch(updateUser({ ...state, verificationStatus: name }))
      .then(() => {
        dispatch(setLoading(false));
        getData();
      })
      .catch(() => {
        dispatch(setLoading(false));
      });
  };

  const handleChangePrescribtion = (e) => {};
  const [state, setState] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
    dob: "",
    workEmail: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    //    setState((prevState) => ({
    //      ...prevState,
    //      [name]: value,
    //    }));
  };
  useEffect(() => {
    setState({ ...state, ...user });
  }, [user]);
  const handleOnShow = () => {
    getData();
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
              <>
                <h3 className="loginicon"> </h3>

                <div>
                  <div className="">
                    <>
                      <div style={{ marginTop: "20px", minHeight: "72vh" }}>
                        <div className="container">
                          <div className="row justify-content-center">
                            <div className="col-lg-10">
                              <div className="profileFormOpenStyles">
                                <center>
                                  <button className="profile-image-container">
                                    <img
                                      className="profile-image"
                                      src={profileIcon}
                                      alt="profile image"
                                    />
                                  </button>
                                </center>
                                <div className="profile-header">
                                  <div className="css-hc2239-MePageComponentHeader eh1nvsm0">
                                    <p
                                      className="css-1los70s-MePageComponentText eh1nvsm1"
                                      style={{
                                        textTransform: "capitalize",
                                        marginLeft: "83px",
                                      }}
                                    >
                                      {state.role} Account Status :{" "}
                                      <span>{state.verificationStatus} </span>
                                    </p>
                                  </div>
                                </div>
                                <div className="form-container">
                                  <form
                                    className="profile-form"
                                    style={{
                                      height: "300px",
                                      overflowY: "scroll",
                                    }}
                                  >
                                    <div className="column-one">
                                      <div className="input-field-container">
                                        <label className="input-field-label">
                                          NAME
                                        </label>
                                        <div className="input-container">
                                          <input
                                            className="input-field "
                                            name="name"
                                            type="text"
                                            placeholder="Enter your name"
                                            value={state.name}
                                            onChange={handleChange}
                                            readOnly
                                          />
                                        </div>
                                      </div>
                                      <div className="css-1dqol5x-OptionFieldContainerDiv e18xo1oi0">
                                        <div className="css-1yd8oxf-OptionFieldSubContainerDiv e18xo1oi1">
                                          <label className="css-vwizs1-OptionFieldLabel e18xo1oi2">
                                            GENDER
                                          </label>
                                          <div className="css-uig1zj-OptionFieldDiv e18xo1oi3">
                                            <div className="css-xkegi7-OptionFieldInputDiv e18xo1oi4">
                                              <select
                                                name="gender"
                                                value={state.gender}
                                                className="genderSelectInput"
                                                onChange={handleChange}
                                                readOnly
                                              >
                                                <option value="">
                                                  Select Gender
                                                </option>
                                                <option value="male">
                                                  Male
                                                </option>
                                                <option value="female">
                                                  Female
                                                </option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="input-field-container">
                                        <label className="input-field-label">
                                          EMAIL
                                        </label>
                                        <div className="input-container">
                                          <input
                                            className="input-field "
                                            name="email"
                                            type="email"
                                            placeholder="All primary Email"
                                            value={state.email}
                                            readOnly
                                            onChange={handleChange}
                                          />
                                        </div>
                                      </div>
                                      {state.role && state.role == "doctor" && (
                                        <>
                                          <div className="input-field-container">
                                            <label className="input-field-label">
                                              DEGREE
                                            </label>

                                            <div className="input-container">
                                              <input
                                                className="input-field "
                                                name="name"
                                                type="text"
                                                placeholder="Enter your name"
                                                value={state.name}
                                                onChange={handleChange}
                                                readOnly
                                              />
                                            </div>
                                          </div>
                                          <div className="input-field-container">
                                            <label className="input-field-label">
                                              EXPERIENCE
                                            </label>
                                            <div className="input-container">
                                              <input
                                                className="input-field "
                                                name="name"
                                                type="text"
                                                placeholder="Enter your name"
                                                value={state.name}
                                                onChange={handleChange}
                                                readOnly
                                              />
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                    <div className="column-two">
                                      <div className="input-field-container">
                                        <label className="input-field-label">
                                          PHONE NUMBER
                                        </label>
                                        <div className="input-container">
                                          <input
                                            className="input-field "
                                            name="phone"
                                            type="tel"
                                            placeholder="Add phone number"
                                            value={state.phone}
                                            onChange={handleChange}
                                            readOnly
                                          />
                                        </div>
                                      </div>
                                      <div className="date-field-container">
                                        <label className="date-field-label">
                                          Date Of Birth
                                        </label>
                                        <div className="date-picker-container">
                                          <div>
                                            <div className="react-datepicker-wrapper">
                                              <div className="react-datepicker__input-container">
                                                <input
                                                  type="text"
                                                  placeholder="MM/DD/YYYY"
                                                  className=""
                                                  name="dob"
                                                  value={state.dob}
                                                  onChange={handleChange}
                                                  readOnly
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="input-field-container">
                                        <label className="input-field-label">
                                          WORK EMAIL
                                        </label>
                                        <div className="input-container">
                                          <input
                                            className="input-field"
                                            placeholder="Add Work Email"
                                            value={state.workEmail}
                                            name="workEmail"
                                            onChange={handleChange}
                                            readOnly
                                          />
                                        </div>
                                      </div>
                                      {state.role && state.role == "doctor" && (
                                        <>
                                          <div className="input-field-container">
                                            <label className="input-field-label">
                                              SPECIALTY
                                            </label>
                                            <div className="input-container">
                                              <input
                                                className="input-field "
                                                name="name"
                                                type="text"
                                                placeholder="Enter your name"
                                                value={state.name}
                                                onChange={handleChange}
                                                readOnly
                                              />
                                            </div>
                                          </div>
                                          <div className="input-field-container">
                                            <label className="input-field-label">
                                              LOCATION
                                            </label>
                                            <div className="input-container">
                                              <input
                                                className="input-field "
                                                name="name"
                                                type="text"
                                                placeholder="Enter your name"
                                                value={state.name}
                                                onChange={handleChange}
                                                readOnly
                                              />
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </form>
                                  <br />
                                  <div className=" ml-5">
                                    {state.verificationStatus == "verified" ? (
                                      <button
                                        className="btn join-btn"
                                        onClick={handleSubmit}
                                        name="disabled"
                                        style={{
                                          marginTop: "20px",
                                          marginLeft: "33%",
                                          width: "200px",
                                        }}
                                      >
                                        Disable
                                      </button>
                                    ) : (
                                      <div>
                                        <button
                                          className="brn join-btn"
                                          name="verified"
                                          onClick={handleSubmit}
                                          style={{
                                            marginTop: "20px",
                                            marginLeft: "33%",
                                            width: "200px",
                                          }}
                                        >
                                          Enable
                                        </button>{" "}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  </div>
                </div>
              </>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </>
  );
}

export default ViewUserPage;
