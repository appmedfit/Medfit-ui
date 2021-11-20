import "./Doctor.css";
import doc1 from "../../assets/DocIconV2.png";
import { useHistory } from "react-router";
import edit_pencilIcon from "../../assets/edit_pencil.png";
import submitIcon from "../../assets/submit.png";
import bookedslotIcon from "../../assets/bookedslot.png";
import pharma from "../../assets/pharma.svg";
import man from "../../assets/man.svg";
import cap from "../../assets/cap.svg";
import PrescriptionIcon from "../../assets/prescriptionV2.png";
import openbookingslotIcon from "../../assets/bookingslot.png";
import patientIcon from "../../assets/doctordesktop.png";
import { Fragment, useState, useEffect } from "react";
import Prescription from "./Prescription";
import DoctorSlotBooking from "../SlotBooking/DoctorSlotBooking";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/auth.slice";
import { login as loginAction } from "../../store/auth.slice";
import {
  bookingDetails,
  getNextSevenDaysDoctorSlots,
} from "../../services/slots.service";
import { getDateTimestamp, getTimeDiff } from "../../helpers/helper";
import { updateConsultancyFee, updateUser } from "../../services/auth.service";
const Doctor = () => {
  const dispatch = useDispatch();
  const [togglePresc, settogglePresc] = useState(false);
  const [toggleSlotBooking, setToggleSlotBooking] = useState(false);
  const handlePresbModalShowHide = () => {
    settogglePresc((i) => !i);
  };

  const handlBookingModalShowHide = () => {
    setToggleSlotBooking((i) => !i);
  };

  const [editFee, setEditFee] = useState(false);
  const history = useHistory();
  const { currentUser: userDoctor } = useSelector((state) =>
    sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : state.auth
  );
  const [fee, setfee] = useState(userDoctor.consultancyFee);

  const [Sessions, setSessions] = useState({});
  const [upComingSessions, setUpComingSessions] = useState([]);
  const [openSlots, setOpenSlots] = useState(0);
  const getData = () => {
    dispatch(setLoading(true));
    dispatch(bookingDetails({ doctorId: userDoctor.id }))
      .then((res) => {
        let newData = res.reduce(
          (prev, curr) => {
            let timeDiff =
              getTimeDiff(getDateTimestamp(curr.SlotDateTime)) + 20;

            if (timeDiff < 0) {
              prev["completedSessions"]++;
              if (timeDiff < 0 && curr.prescribtion == "") {
                prev["pendingPrescription"]++;

                return prev;
              }

              return prev;
            }
            if (timeDiff > 0) {
              prev["upcomingSessions"]++;
              return prev;
            }
          },
          { completedSessions: 0, upcomingSessions: 0, pendingPrescription: 0 }
        );
        let upcomSess = res.filter((sess) => {
          return getTimeDiff(getDateTimestamp(sess.SlotDateTime)) + 20 > 0;
        });
        setSessions(newData);
        setUpComingSessions(upcomSess.slice(0, 3));
        dispatch(setLoading(false));
        console.log(newData);
        console.log("up", upComingSessions);
      })
      .catch((err) => {
        console.log(err);
        dispatch(setLoading(false));
      });
    dispatch(setLoading(true));
    dispatch(getNextSevenDaysDoctorSlots({ doctorId: userDoctor.id }))
      .then((res) => {
        let count = res && res.length > 0 ? res.length + 1 : 0;

        setOpenSlots(168 - count);
        dispatch(setLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setLoading(false));
      });
  };

  const handlefeeChange = () => {
    let newData = userDoctor;
    newData.consultancyFee = fee;
    console.log(newData);
    dispatch(
      updateConsultancyFee({ consultancyFee: fee, id: newData.id })
    ).then(() => {
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          currentUser: newData,
          isAuthenticated: true,
        })
      );
      dispatch(loginAction(newData));
      setEditFee(false);
    });
  };

  useEffect(() => {
    if (!togglePresc && !toggleSlotBooking) {
      console.log(!togglePresc && !toggleSlotBooking);
      getData();
    }
  }, [toggleSlotBooking, togglePresc]);

  return (
    <>
      {userDoctor.verificationStatus == "pending" ||
      userDoctor.verificationStatus == "disabled" ? (
        <div>
          <div
            className="container quickActivityContainer"
            style={{ backgroundColor: "white" }}
          >
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="single_element" style={{ marginTop: "30px" }}>
                  <div className="quick_activity">
                    <div className="row">
                      <div className="col-12">
                        <h3 style={{ color: "tomato" }}>
                          You will be able to take appointments once admin
                          verifies your account
                        </h3>
                        {/* <div
                            className="single_quick_activity d-flex"
                            onClick={() => {
                              history.push("/previousbookings/upcoming");
                            }}
                          >
                            <div className="icon">
                              <img src={bookedslotIcon} alt="" />
                            </div>
                            <div className="count_content">
                              <h3>
                                <span className="counter">
                                  {Sessions && Sessions.upcomingSessions}
                                </span>{" "}
                              </h3>
                              <p>Upcoming Appointments</p>
                            </div>
                          </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "#dee2e6",
            minHeight: "75vh",
            marginTop: "-30px",
          }}
        >
          <div className="container-fluid quickActivityContainer">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="single_element" style={{ marginTop: "30px" }}>
                  <div className="quick_activity">
                    <div className="row">
                      <div className="col-12">
                        <div className="quick_activity_wrap">
                          <div
                            className="single_quick_activity d-flex"
                            onClick={() => {
                              history.push("/previousbookings/completed");
                            }}
                          >
                            <div className="icon">
                              <img src={patientIcon} alt="" />
                            </div>
                            <div className="count_content">
                              <h3>
                                <span className="counter">
                                  {Sessions && Sessions.completedSessions}
                                </span>{" "}
                              </h3>
                              <p>Completed Sessions</p>
                            </div>
                          </div>
                          <div
                            className="single_quick_activity d-flex"
                            onClick={() => history.push("/prescriptions")}
                          >
                            <div className="icon">
                              <img src={PrescriptionIcon} alt="" />
                            </div>
                            <div className="count_content">
                              <h3>
                                <span className="counter">
                                  {Sessions && Sessions.pendingPrescription}
                                </span>{" "}
                              </h3>
                              <p>Prescriptions Pending</p>
                            </div>
                            <div className="doc-landing-button">
                              <button className="btn  doc-btn">
                                Write Prescription
                              </button>
                            </div>
                          </div>

                          <div
                            className="single_quick_activity d-flex"
                            onClick={() => {
                              history.push("/previousbookings/upcoming");
                            }}
                          >
                            <div className="icon">
                              <img src={bookedslotIcon} alt="" />
                            </div>
                            <div className="count_content">
                              <h3>
                                <span className="counter">
                                  {Sessions && Sessions.upcomingSessions}
                                </span>{" "}
                              </h3>
                              <p>Upcoming Appointments</p>
                            </div>
                          </div>
                          <div
                            className="single_quick_activity d-flex"
                            onClick={handlBookingModalShowHide}
                          >
                            <div className="icon">
                              <img src={openbookingslotIcon} alt="" />
                            </div>
                            <div className="count_content">
                              <h3>
                                <span className="counter">{openSlots}</span>{" "}
                              </h3>
                              <p>Open Slots</p>
                            </div>
                            <div className="doc-landing-button">
                              <button className="btn  doc-btn ">
                                Mark Open Slots
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-5">
                <div className="white_box card_height_100">
                  <div className="box_header border_bottom_1px  ">
                    <div className="main-title">
                      <h3 className="mb_25">Profile</h3>
                    </div>
                  </div>
                  <div className="Activity_timeline sessionsActivity">
                    <div className="container  ">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="row">
                            <div className="col-sm-4">
                              <img
                                className="doc_landing_profile_image"
                                src={doc1}
                                alt="spl_img"
                              />
                            </div>
                            <div className="col-sm-8">
                              <h5 className="card-title">
                                Dr. {userDoctor.name}{" "}
                                {editFee ? (
                                  <span className="fee">
                                    {" "}
                                    <input
                                      className="docFeeInput"
                                      type="number"
                                      name="fee"
                                      value={fee}
                                      onChange={(e) => {
                                        setfee(e.target.value);
                                      }}
                                    />
                                    {"  ₹  "}
                                    <span onClick={handlefeeChange}>
                                      <img
                                        src={submitIcon}
                                        style={{
                                          width: "30px",
                                        }}
                                      />
                                    </span>
                                  </span>
                                ) : (
                                  <span
                                    className="fee"
                                    onClick={() => {
                                      setEditFee(true);
                                    }}
                                  >
                                    {" "}
                                    ₹ {userDoctor.consultancyFee}{" "}
                                    <span>
                                      <img
                                        src={edit_pencilIcon}
                                        style={{
                                          width: "16px",
                                        }}
                                      />
                                    </span>
                                  </span>
                                )}
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-5">
                <div className="white_box card_height_100">
                  <div className="box_header border_bottom_1px  ">
                    <div className="main-title">
                      <h3 className="mb_25">Upcoming Appointments</h3>
                    </div>
                  </div>
                  <div className="Activity_timeline sessionsActivity">
                    <ul>
                      {upComingSessions &&
                        upComingSessions.map((sess) => (
                          <li key={sess.id}>
                            <div className="activity_bell"></div>
                            <div className="activity_wrap">
                              <h6>
                                {sess.fullDate + "  " + sess.detailText}{" "}
                                <div className="">
                                  <a
                                    href={sess.zoomUrl}
                                    target="_blank"
                                    className="btn  join-btn "
                                  >
                                    join
                                  </a>
                                </div>
                              </h6>
                              <p>{sess.patientName}</p>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <br />
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
        </div>
      )}
    </>
  );
};

export default Doctor;
