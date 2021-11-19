import React, { useEffect, useState } from "react";
import sideArrowIcon from "../../assets/side-arrow.svg";
import patientsIcon from "../../assets/patients.png";
import PrescriptionIcon from "../../assets/prescriptionV2.png";
import { useDispatch, useSelector } from "react-redux";

import { setLoading } from "../../store/auth.slice";
import { getTimeDiff } from "../../helpers/helper";
import back_arrow from "../../assets/back_arrow.png";
import ViewUserPage from "./viewuser";
import { useHistory } from "react-router";
import { getReports, updateReports } from "../../services/reports.service";
function ReportPage() {
  const history = useHistory();

  const [reportsData, setreportsData] = useState([]);
  const [selectedReport, setselectedReport] = useState([]);
  const [toggleViewUser, settoggleViewUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const handleviewUserModalShowHide = () => {
    settoggleViewUser((i) => !i);
    if (toggleViewUser) getData();
  };
  const { currentUser: currentUser } = useSelector((state) =>
    sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : state.auth
  );
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(setLoading(true));
    dispatch(updateReports({ ...selectedReport, isAdminViewed: true }))
      .then((res) => {
        dispatch(setLoading(false));
        getData();
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };
  const handleDisableUser = () => {
    dispatch(setLoading(true));
    dispatch(updateReports({ ...selectedReport, isAdminViewed: true })).then(
      (res) => {
        dispatch(setLoading(false));
        handleviewUserModalShowHide();
      }
    );
  };
  const handleChangeReport = (report) => {
    setselectedReport(report);
    setSelectedUser({ id: report.toId });
  };
  const getData = () => {
    dispatch(setLoading(true));
    dispatch(getReports({ reportToAdmin: true, isAdminViewed: false }))
      .then((res) => {
        setreportsData(res);
        setSelectedUser({});
        setselectedReport({});
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <>
        <div
          style={{
            minHeight: "75vh",
            marginTop: "30px",
          }}
        >
          <div className="container-fluid">
            <div
              className="prev_book_go_back"
              onClick={() => {
                history.goBack();
              }}
            >
              <img src={back_arrow} /> Go Back
            </div>
            <div
              className="row justify-content-md-center"
              style={{ marginTop: "26px" }}
            >
              <div className="col-lg-4">
                <div className="patient_arrow_container">
                  <div className="patient_arrow">
                    <span>
                      <img src={patientsIcon} />
                    </span>
                    <span className="text"> Reports</span>
                  </div>
                </div>
                <div className="patient_inner_container">
                  <div className="patient_TimeLine">
                    {reportsData && reportsData.length > 0 ? (
                      <ul>
                        {reportsData &&
                          reportsData.map((rec) => (
                            <li
                              className={`${
                                rec.id == selectedReport.id && "pres_active"
                              }`}
                              key={rec.id}
                              onClick={() => handleChangeReport(rec)}
                            >
                              <div className="activity_wrap">
                                <h6
                                  className={`${
                                    rec.id == selectedReport.id && "pres_active"
                                  }`}
                                >
                                  {rec.sessionDate}
                                </h6>
                                <p
                                  className={`${
                                    rec.id == selectedReport.id && "pres_active"
                                  }`}
                                >
                                  to {rec.toName}
                                </p>
                                <p
                                  className={`${
                                    rec.id == selectedReport.id && "pres_active"
                                  }`}
                                >
                                  From {rec.fromName}
                                </p>
                              </div>
                              <div
                                className={`activity_bell ${
                                  rec.id == selectedReport.id && "pres_selected"
                                }`}
                              >
                                <img src={sideArrowIcon} />
                              </div>
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <div className="norecords">
                        <div className="col">
                          <br />

                          <h2> Reports Not Available</h2>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`col-lg-6 ${
                  selectedReport && selectedReport.id
                    ? ""
                    : "pres_sec_unselected"
                }`}
              >
                <div className="patient_arrow_container">
                  <div className="patient_arrow">
                    <span>
                      <img src={PrescriptionIcon} />
                    </span>
                    <span className="text"> Comment</span>
                  </div>
                </div>
                <div className="patient_inner_container">
                  <div
                    className="white_box "
                    style={{ backgroundColor: "#e9ecef" }}
                  >
                    {" "}
                    {selectedReport && selectedReport.id && (
                      <>
                        <div
                          className="Activity_timeline sessionsActivity"
                          style={{ height: "430px" }}
                        >
                          <div className="InputContainer">
                            <textarea
                              name="comment"
                              type="textarea"
                              rows="10"
                              cols="73"
                              placeholder="Enter Comment"
                              className="commenttextarea"
                              value={selectedReport.comment}
                              onChange={() => {}}
                              readOnly
                            />
                          </div>
                          <div className="report-button-container">
                            <div className="report-button">
                              <button
                                className="btn Button-Prescription "
                                style={{ marginLeft: "65px", width: "90%" }}
                                onClick={handleSubmit}
                              >
                                Mark as read
                              </button>
                            </div>
                            <div classNamereport-button>
                              <button
                                className="btn Button-Prescription "
                                style={{ marginLeft: "65px", width: "90%" }}
                                onClick={handleDisableUser}
                              >
                                Disable
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
          <ViewUserPage
            toggleViewUser={toggleViewUser}
            handleviewUserModalShowHide={handleviewUserModalShowHide}
            user={selectedUser}
          />
        </div>
      </>
    </>
  );
}

export default ReportPage;
