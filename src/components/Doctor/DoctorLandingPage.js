import "./Doctor.css";
import doc1 from "../../assets/doc1.jpg";
import { Fragment, useState } from "react";
import Prescription from "./Prescription";
import DoctorSlotBooking from "../SlotBooking/DoctorSlotBooking";
import { useDispatch, useSelector } from "react-redux";
const Doctor = () => {
  const [togglePresc, settogglePresc] = useState(false);
  const [toggleSlotBooking, setToggleSlotBooking] = useState(false);
  const handlePresbModalShowHide = () => {
    settogglePresc((i) => !i);
  };

  const handlBookingModalShowHide = () => {
    setToggleSlotBooking((i) => !i);
  };

  const { currentUser: userDoctor } = useSelector((state) =>
    sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : state.auth
  );

  return (
    <>
      <div className="container doc-container ">
        <div className="row">
          <div className="col-sm-12">
            <div className="card doc-landing-card">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-4">
                    <img
                      className="doc_profile_image1"
                      src={doc1}
                      alt="spl_img"
                    />
                  </div>
                  <div className="col-sm-8">
                    <h5 className="card-title">
                      Dr. {userDoctor.name}{" "}
                      <span className="fee">
                        {" "}
                        ₹ {userDoctor.consultancyFee}{" "}
                      </span>
                    </h5>
                    <p className="card-text">
                      {userDoctor.experience} | {userDoctor.degree}
                    </p>
                    <p className="card-text">
                      <span>
                        <svg
                          width="12px"
                          height="18px"
                          viewBox="0 0 12 18"
                          version="1.1"
                        >
                          <g
                            id="Assets"
                            stroke="black"
                            strokeWidth="1"
                            fill="none"
                            fillRule="evenodd"
                            transform="translate(-352.000000, -1707.000000)"
                          >
                            <g
                              id="Location"
                              transform="translate(343.000000, 1701.000000)"
                            >
                              <rect
                                id="Rectangle-13"
                                x="0"
                                y="0"
                                width="30"
                                height="30"
                              ></rect>
                              <g
                                id="location-copy"
                                transform="translate(9.000000, 6.000000)"
                              >
                                <g id="thin-0535_navigation_location_drop_pin_map">
                                  <g id="Group">
                                    <path
                                      d="M5.80881319,16.0576267 C5.89739601,15.920012 5.98905078,15.7767237 6.0834142,15.6282044 C6.75815568,14.5662232 7.43284776,13.4558008 8.06173321,12.3529305 C8.39793411,11.7633382 8.71223224,11.1909832 9.00058047,10.6409138 C10.1885002,8.37477117 10.8676966,6.60820266 10.8676966,5.67282259 C10.8676966,2.95804699 8.60673105,0.75 5.80888773,0.75 C3.01102631,0.75 0.75,2.9580649 0.75,5.67282259 C0.75,6.60820473 1.42918739,8.37477379 2.61709161,10.6409175 C2.90543595,11.1909869 3.21972983,11.763342 3.55592619,12.3529343 C4.18480313,13.4558046 4.85948607,14.5662271 5.53421841,15.6282083 C5.62857967,15.7767262 5.72023235,15.9200131 5.80881319,16.0576267 Z"
                                      id="Shape"
                                      stroke="black"
                                      strokeWidth="1.5"
                                    ></path>
                                    <circle
                                      id="Oval"
                                      fill="black"
                                      cx="6"
                                      cy="6"
                                      r="2"
                                    ></circle>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </span>
                      {userDoctor.location}
                    </p>
                    <div className="doc-landing-button">
                      <button
                        className="btn  doc-btn "
                        onClick={handlePresbModalShowHide}
                      >
                        Write Prescription
                      </button>
                      <button
                        className="btn  doc-btn "
                        onClick={handlBookingModalShowHide}
                      >
                        Mark available slots
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Prescription
        togglePresc={togglePresc}
        handlePresbModalShowHide={handlePresbModalShowHide}
        doctor={userDoctor}
      />
      <DoctorSlotBooking
        handlBookingModalShowHide={handlBookingModalShowHide}
        toggleSlotBooking={toggleSlotBooking}
      />
    </>
  );
};

export default Doctor;
