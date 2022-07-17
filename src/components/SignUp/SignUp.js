import React, { useState } from "react";
import { Modal, Row, Col, Container, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { SignUp as signUpService } from "../../services/auth.service";
import medicon_login from "../../assets/medicon_login.png";
import "../Header/Header.css";
import useForm from "../../shared/useForm";
import validate from "../../shared/SignupFormValidationRules";

function SignUpForm({
  toggleSignup,
  handleSignupModalShowHide,
  handleLoginModalShowHide,
}) {
  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");
  const [err, seterr] = useState("");
  const [loading, setLoading] = useState(false);
  const SpecialtyData = [
    { value: "Dermatology", option: "Dermatology" },
    { value: "GeneralPhysician", option: "General Physician" },
    { value: "ENT", option: "ENT" },
    { value: "Ortho", option: "Orthopaedic" },
    { value: "Paediatric", option: "Paediatric" },
    { value: "Sexology", option: "Sexology" },
    { value: "Urology", option: "Urology" },
    { value: "PhysioTheraphy", option: "Physio Theraphy" },
    { value: "Dental", option: "Dental" },
    { value: "Ophthal", option: "Opthalmology" },
  ];
  const { values, errors, handleChange, handleSubmit } = useForm(
    handleSignup,
    validate
  );

  const resetForm = () => {
    if (values)
      Object.keys(values).forEach((key) => {
        handleChange({ target: { value: "", name: key } });
      });
    setMsg("");
    seterr("");
  };

  const handleModal = () => {
    resetForm();
    handleSignupModalShowHide();
  };

  function handleSignup() {
    setMsg("");
    seterr("");
    setLoading(true);
    dispatch(signUpService(values))
      .then((resp) => {
        // console.log(resp);
        setMsg(resp.data);
        setLoading(false);
        handleModal();
        handleLoginModalShowHide();
      })
      .catch((error) => {
        setLoading(false);
        seterr(error.data);
      });
  }

  return (
    <>
      <>
        <Modal show={toggleSignup} size="lg" dialogClassName="modal-70w">
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
              <h3 className="loginicon">MEDFIT</h3>
              <form
                className="needs-validation"
                noValidate
                onSubmit={handleSubmit}
              >
                <Container>
                  <Row>
                    <Col xs={3} lg={3}></Col>
                    <Col xs={9} lg={9}>
                      <div className="radioInputContainer">
                        <br />
                        <div className="custom-control custom-radio custom-control-inline">
                          <input
                            type="radio"
                            id="user"
                            name="role"
                            value="user"
                            className="custom-control-input"
                            onChange={handleChange}
                            checked={values.role === "user"}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="user"
                          >
                            User
                          </label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                          <input
                            type="radio"
                            id="doctor"
                            value="doctor"
                            name="role"
                            className="custom-control-input"
                            onChange={handleChange}
                            checked={values.role === "doctor"}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="doctor"
                          >
                            Doctor
                          </label>
                        </div>
                      </div>
                    </Col>
                    <Col xs={6} lg={6}>
                      <div className="InputContainer">
                        <input
                          name="name"
                          type="text"
                          placeholder="Enter Your Name"
                          className="emailInput"
                          value={values.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="invalid-feedback">
                        {errors.name && (
                          <p className="help is-danger">{errors.name}</p>
                        )}
                      </div>
                    </Col>
                    <Col xs={6} lg={6}>
                      <div className="InputContainer">
                        <input
                          name="email"
                          type="text"
                          placeholder="Enter Your Mail"
                          className="emailInput"
                          value={values.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="invalid-feedback">
                        {errors.email && (
                          <p className="help is-danger">{errors.email}</p>
                        )}
                      </div>
                    </Col>
                    {values.role === "doctor" && (
                      <>
                        <Col xs={6} lg={6}>
                          <div className="InputContainer">
                            <input
                              name="degree"
                              type="text"
                              placeholder="Enter Your Degree"
                              className="emailInput"
                              value={values.degree}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="invalid-feedback">
                            {errors.degree && (
                              <p className="help is-danger">{errors.degree}</p>
                            )}
                          </div>
                        </Col>

                        <Col xs={6} lg={6}>
                          <div className="InputContainer">
                            <input
                              name="experience"
                              type="text"
                              placeholder="Enter Your Experience"
                              className="emailInput"
                              value={values.experience}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="invalid-feedback">
                            {errors.experience && (
                              <p className="help is-danger">
                                {errors.experience}
                              </p>
                            )}
                          </div>
                        </Col>
                        <Col xs={6} lg={6}>
                          <div className="InputContainer">
                            <select
                              name="specialty"
                              value={values.specialty}
                              className="emailInput"
                              onChange={handleChange}
                            >
                              <option value="">Select specialty</option>
                              {SpecialtyData.map((spl) => (
                                <option value={spl.value}>{spl.option}</option>
                              ))}
                            </select>
                          </div>
                          <div className="invalid-feedback">
                            {errors.specialty && (
                              <p className="help is-danger">
                                {errors.specialty}
                              </p>
                            )}
                          </div>
                        </Col>

                        <Col xs={6} lg={6}>
                          <div className="InputContainer">
                            <input
                              name="location"
                              type="text"
                              placeholder="Enter Your location"
                              className="emailInput"
                              value={values.location}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="invalid-feedback">
                            {errors.location && (
                              <p className="help is-danger">
                                {errors.location}
                              </p>
                            )}
                          </div>
                        </Col>
                        <Col xs={6} lg={6}>
                          <div className="InputContainer">
                            <input
                              name="registrationNumber"
                              type="text"
                              placeholder="Your Registration No"
                              className="emailInput"
                              value={values.registrationNumber}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="invalid-feedback">
                            {errors.registrationNumber && (
                              <p className="help is-danger">
                                {errors.registrationNumber}
                              </p>
                            )}
                          </div>
                        </Col>
                        <Col xs={6} lg={6}>
                          <div className="InputContainer">
                            <input
                              name="consultancyFee"
                              type="text"
                              placeholder="Your Consultancy Fee"
                              className="emailInput"
                              value={values.consultancyFee}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="invalid-feedback">
                            {errors.consultancyFee && (
                              <p className="help is-danger">
                                {errors.consultancyFee}
                              </p>
                            )}
                          </div>
                        </Col>
                      </>
                    )}
                    <Col xs={6} lg={6}>
                      <div className="InputContainer">
                        <input
                          name="password"
                          type="password"
                          placeholder="Enter Your Password"
                          className="emailInput"
                          value={values.password}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="invalid-feedback">
                        {errors.password && (
                          <p className="help is-danger">{errors.password}</p>
                        )}
                      </div>
                    </Col>
                    <Col xs={6} lg={6}>
                      <div className="InputContainer">
                        <input
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm Your Password"
                          className="emailInput"
                          value={values.confirmPassword}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="invalid-feedback">
                        {errors.confirmPassword && (
                          <p className="help is-danger">
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Container>
                <div className="invalid-feedback">
                  {err && <p className="help is-danger">{err}</p>}
                </div>
                <div className="valid-feedback">
                  {msg && <p className="help is-success">{msg}</p>}
                </div>

                <div className="signUpContainer">
                  <div className="ActionContainer">
                    <button className="ContinueButton" type="submit">
                      {" "}
                      Sign Up{" "}
                      {loading ? (
                        <Spinner animation="border" role="status" />
                      ) : (
                        ""
                      )}
                    </button>
                  </div>

                  <div className="Tnc">
                    <div className="TncText">
                      By Continuing you agree to the
                      <a
                        href=""
                        target="_blank"
                        rel="noreferrer"
                        className="TncAnchor"
                      >
                        Terms of Services
                      </a>{" "}
                      and
                      <a
                        href=""
                        target="_blank"
                        rel="noreferrer"
                        className="TncAnchor"
                      >
                        Privacy policy
                      </a>
                      .
                    </div>
                  </div>
                  <br />
                  <div
                    className="ActionContainerOtherMethods"
                    onClick={() => {
                      handleSignupModalShowHide();
                      handleLoginModalShowHide();
                      setMsg("");
                      seterr("");
                    }}
                  >
                    <div className="ContinueButtonBlue">
                      Login
                      <div className="SocialMediaEmailsContainer "></div>
                    </div>
                  </div>
                  <br />
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </>
      <></>
    </>
  );
}

export default SignUpForm;
