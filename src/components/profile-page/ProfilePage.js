import "./ProfilePage.css";
import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { setLoading } from "../../store/auth.slice";
import back_arrow from "../../assets/back_arrow.png";
import {
  getUsersWithCondition,
  Login as loginService,
  updateUser,
} from "../../services/auth.service";
import profileIcon from "../../assets/profilev2.jpg";
import { login as loginAction } from "../../store/auth.slice";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
const ProfilePage = (props) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) =>
    props.currentUser
      ? props
      : sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : state.auth
  );

  const history = useHistory();
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    dispatch(setLoading(true));
    dispatch(getUsersWithCondition({ id: currentUser.id }))
      .then((resp) => {
        console.log("res", resp);
        let user = { ...state, ...resp[0] };
        console.log(user);
        setState(user);
        setoriginalstate(user);
        dispatch(setLoading(false));
      })
      .catch(() => {
        dispatch(setLoading(false));
      });
  };
  const [state, setState] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
    dob: "",
    workEmail: "",
  });
  const [originalstate, setoriginalstate] = useState({
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
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDiscard = () => {
    setState(originalstate);
  };

  const handleSubmit = () => {
    dispatch(setLoading(true));
    dispatch(updateUser(state))
      .then(() => {
        dispatch(setLoading(false));
        getData();
      })
      .catch(() => {
        dispatch(setLoading(false));
      });
  };
  return (
    <>
      <div style={{ marginTop: "20px", minHeight: "72vh" }}>
        <div className="container">
          <div
            className="prev_book_go_back"
            onClick={() => {
              history.goBack();
            }}
          >
            <img src={back_arrow} /> Go Back
          </div>
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
                <p className="css-1los70s-MePageComponentText eh1nvsm1"></p>
              </div>
            </div>
            <div className="form-container">
              <form className="profile-form">
                <div className="column-one">
                  <div className="input-field-container">
                    <label className="input-field-label">NAME</label>
                    <div className="input-container">
                      <input
                        className="input-field "
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        value={state.name}
                        onChange={handleChange}
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
                          {/* <input
                          name="gender"
                          type="text"
                          className="css-smjxh6-OptionFieldInput e18xo1oi5"
                          value={state.gender}
                          onChange={handleChange}
                        /> */}
                          <select
                            name="gender"
                            value={state.gender}
                            className="genderSelectInput"
                            onChange={handleChange}
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="input-field-container">
                    <label className="input-field-label">EMAIL</label>
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
                </div>
                <div className="column-two">
                  <div className="input-field-container">
                    <label className="input-field-label">PHONE NUMBER</label>
                    <div className="input-container">
                      <input
                        className="input-field "
                        name="phone"
                        type="tel"
                        placeholder="Add phone number"
                        value={state.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="date-field-container">
                    <label className="date-field-label">Date Of Birth</label>
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
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="input-field-container">
                    <label className="input-field-label">WORK EMAIL</label>
                    <div className="input-container">
                      <input
                        className="input-field"
                        placeholder="Add Work Email"
                        value={state.workEmail}
                        name="workEmail"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </form>
              <div className="form-buttons">
                <button className="save-button" onClick={handleDiscard}>
                  DISCARD
                </button>
                <button className="save-button" onClick={handleSubmit}>
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
