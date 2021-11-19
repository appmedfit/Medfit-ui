import "./Admin.css";
import { useHistory } from "react-router";

import reportIcon from "../../assets/reportv1.png";

import patientIcon from "../../assets/doctordesktop.png";
import { Fragment, useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/auth.slice";
import ViewUserPage from "./viewuser";
import {
  bookingDetails,
  getNextSevenDaysDoctorSlots,
} from "../../services/slots.service";
import { getDateTimestamp, getTimeDiff } from "../../helpers/helper";
import { getUsersWithCondition } from "../../services/auth.service";
import { getReports } from "../../services/reports.service";
const Doctor = () => {
  const dispatch = useDispatch();
  const [toggleViewUser, settoggleViewUser] = useState(false);
  const handleviewUserModalShowHide = () => {
    settoggleViewUser((i) => !i);
    if (toggleViewUser) getData();
  };

  const [editFee, setEditFee] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const history = useHistory();
  const { currentUser: userDoctor } = useSelector((state) =>
    sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : state.auth
  );

  const handleUserChange = (usr) => {
    setSelectedUser(usr);
    handleviewUserModalShowHide();
  };
  const [Sessions, setSessions] = useState({});
  const [users, setUsers] = useState({});
  const [upComingSessions, setUpComingSessions] = useState([]);
  const [reports, setReports] = useState([]);
  const [openSlots, setOpenSlots] = useState(0);
  const getDa = () => {
    dispatch(setLoading(true));
    dispatch(bookingDetails({ doctorId: userDoctor.id }))
      .then((res) => {
        let newData = res.reduce(
          (prev, curr) => {
            console.log(prev, curr);
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
        dispatch(setLoading(true));
        console.log(newData);
        console.log("up", upComingSessions);
      })
      .catch((err) => {
        console.log(err);
        dispatch(setLoading(true));
      });
    dispatch(setLoading(true));
    dispatch(getNextSevenDaysDoctorSlots({ doctorId: userDoctor.id }))
      .then((res) => {
        let count = res && res.length > 0 ? res.length + 1 : 0;

        setOpenSlots(168 - count);
        dispatch(setLoading(true));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setLoading(true));
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    dispatch(setLoading(true));
    dispatch(getUsersWithCondition({}))
      .then((res) => {
        let newdata = res.reduce(
          (prev, curr) => {
            if (curr.role == "user") {
              let users =
                prev["usersData"] && prev["usersData"].hasOwnProperty("users")
                  ? [...prev["usersData"]["users"]]
                  : [];
              users.push(curr);
              prev["usersData"]["usersCount"]++;
              prev["usersData"]["users"] = [...users];
              return prev;
            }
            if (curr.role == "doctor") {
              let doctors =
                prev["doctorsData"] &&
                prev["doctorsData"].hasOwnProperty("doctors")
                  ? [...prev["doctorsData"]["doctors"]]
                  : [];
              doctors.push(curr);
              prev["doctorsData"]["doctors"] = [...doctors];
              prev["doctorsData"]["doctorsCount"]++;
              if (curr.verificationStatus == "pending") {
                prev.doctorsData.pendingVerfDocCount++;
              }
              return prev;
            }
            if (curr.role == "admin") {
              return prev;
            }
          },
          {
            usersData: { users: [], usersCount: 0 },
            doctorsData: {
              doctors: [],
              pendingVerfDocCount: 0,
              doctorsCount: 0,
            },
          }
        );
        console.log(newdata);
        setUsers(newdata);
      })
      .catch(() => {
        dispatch(setLoading(false));
      });
    dispatch(getReports({ reportToAdmin: true, isAdminViewed: false }))
      .then((res) => {
        setReports(res);
        dispatch(setLoading(false));
      })
      .catch(() => {
        dispatch(setLoading(false));
      });
  };
  return (
    <>
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
                          className="single_quick_activity d-flex  pd-0"
                          onClick={() => {}}
                        >
                          <div className="icon">
                            <img src={patientIcon} alt="" />
                          </div>
                          <div className="count_content">
                            <h3>
                              <span className="counter">
                                {Sessions && Sessions.completedSessions} 10
                              </span>{" "}
                            </h3>
                            <p> Sessions Month to date</p>
                          </div>
                        </div>
                        <div className=" single_quick_activity d-flex  pd-0">
                          <div className="" style={{ padding: "0" }}>
                            <div className="box_header border_bottom_1px  ">
                              <div className="main-title">
                                <h3
                                  className="mb_25"
                                  style={{ fontSize: "30px" }}
                                >
                                  Top 3 Doctors{" "}
                                </h3>
                              </div>
                            </div>
                            <div className="Activity_timeline sessionsActivity">
                              <ul>
                                <li style={{ cursor: "pointer" }}>
                                  <div className="activity_bell"></div>
                                  <div className="activity_wrap">
                                    <h6> Dr. Charan</h6>
                                  </div>
                                </li>
                                <li style={{ cursor: "pointer" }}>
                                  <div className="activity_bell"></div>
                                  <div className="activity_wrap">
                                    <h6> Dr. Chandu</h6>
                                  </div>
                                </li>
                                <li style={{ cursor: "pointer" }}>
                                  <div className="activity_bell"></div>
                                  <div className="activity_wrap">
                                    <h6> Dr. Thimmaraju</h6>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="single_quick_activity d-flex pd-0">
                          <div className="" style={{ padding: "0" }}>
                            <div className="box_header border_bottom_1px  ">
                              <div className="main-title">
                                <h3
                                  className="mb_25"
                                  style={{ fontSize: "30px" }}
                                >
                                  Top 3 Specialities{" "}
                                </h3>
                              </div>
                            </div>
                            <div className="Activity_timeline sessionsActivity">
                              <ul>
                                <li style={{ cursor: "pointer" }}>
                                  <div className="activity_bell"></div>
                                  <div className="activity_wrap">
                                    <h6> Dermatology</h6>
                                  </div>
                                </li>
                                <li style={{ cursor: "pointer" }}>
                                  <div className="activity_bell"></div>
                                  <div className="activity_wrap">
                                    <h6> General physician</h6>
                                  </div>
                                </li>
                                <li style={{ cursor: "pointer" }}>
                                  <div className="activity_bell"></div>
                                  <div className="activity_wrap">
                                    <h6> ENT</h6>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div
                          className="single_quick_activity d-flex  pd-0"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            history.push("/reports");
                          }}
                        >
                          <div className="icon">
                            <img src={reportIcon} alt="" />
                          </div>
                          <div className="count_content">
                            <h3>
                              <span className="counter">
                                {reports && reports.length}
                              </span>{" "}
                            </h3>
                            <p>Reports </p>
                          </div>
                          {/* <div className="doc-landing-button">
                              <button className="btn  doc-btn ">
                                Mark Open Slots
                              </button>
                            </div> */}
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
                    <h3 className="mb_25">
                      Patients{" "}
                      {users && users.usersData && users.usersData.usersCount}
                    </h3>
                  </div>
                </div>
                <div className="Activity_timeline sessionsActivity">
                  <ul>
                    {users &&
                      users.usersData &&
                      users.usersData.users.map((user) => (
                        <li
                          key={user.id}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleUserChange(user)}
                        >
                          <div
                            className="activity_bell"
                            className={`activity_bell ${
                              user.verificationStatus != "verified" &&
                              "pending_verification"
                            } `}
                          ></div>
                          <div className="activity_wrap">
                            <h6>{user.name}</h6>
                            <p style={{ marginTop: "0px" }}>{user.email}</p>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-5">
              <div className="white_box card_height_100">
                <div className="box_header border_bottom_1px  ">
                  <div className="main-title">
                    <h3 className="mb_25">
                      Doctors{" "}
                      {users &&
                        users.doctorsData &&
                        users.doctorsData.doctorsCount}
                      <span>
                        {" "}
                        Verification Pending{"  "}
                        {users &&
                          users.doctorsData &&
                          users.doctorsData.pendingVerfDocCount}{" "}
                      </span>
                    </h3>
                  </div>
                </div>
                <div className="Activity_timeline sessionsActivity">
                  <ul>
                    {users &&
                      users.doctorsData &&
                      users.doctorsData.doctors.map((doc) => (
                        <li
                          key={doc.id}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleUserChange(doc)}
                        >
                          <div
                            className={`activity_bell ${
                              doc.verificationStatus != "verified" &&
                              "pending_verification"
                            } `}
                          ></div>
                          <div className="activity_wrap">
                            <h6>{doc.name}</h6>
                            <p style={{ marginTop: "0px" }}>{doc.email}</p>
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
      </div>

      <ViewUserPage
        toggleViewUser={toggleViewUser}
        handleviewUserModalShowHide={handleviewUserModalShowHide}
        user={selectedUser}
      />
    </>
  );
};

export default Doctor;
