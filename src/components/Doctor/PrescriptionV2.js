import React, { useEffect, useState } from "react";
import sideArrowIcon from "../../assets/side-arrow.svg";
import patientsIcon from "../../assets/patients.png";
import PrescriptionIcon from "../../assets/prescriptionV2.png";
import { useDispatch, useSelector } from "react-redux";
import "./Prescription.css";
import { bookingDetails, updateBooking } from "../../services/slots.service";
import { setLoading } from "../../store/auth.slice";
import { getTimeDiff } from "../../helpers/helper";
import back_arrow from "../../assets/back_arrow.png";
import PageContainer from "../TextEditor/PageContainer";
import { setBookingInfo } from "../../store/booking.slice";
import { useHistory } from "react-router";
function PrescriptionNew() {
  const history = useHistory();

  const [prescriptionState, setPrescriptionState] = useState();
  const { currentUser: currentUser } = useSelector((state) =>
    sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : state.auth
  );
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const { bookingInfo: selectedBooking } = useSelector(
    (state) => state.booking
  );
  //   const [selectedBooking, setSelectedBooking] = useState();

  const handleSubmit = (editorState) => {
    console.log(editorState);
    let booking = { ...selectedBooking, prescribtion: editorState };
    dispatch(setLoading(true));
    dispatch(updateBooking(booking))
      .then((res) => {
        console.log(res);
        dispatch(setLoading(false));
        getData();
      })
      .catch((err) => {
        dispatch(setLoading(false));
        console.log(err);
      });
  };

  const handleChangeBooking = (rec) => {
    dispatch(setBookingInfo(rec));
    console.log("in pres", selectedBooking);
  };

  const getData = () => {
    dispatch(setLoading(true));
    let reqobj =
      currentUser && currentUser.role == "doctor"
        ? { doctorId: currentUser.id }
        : { patientId: currentUser.id };
    dispatch(bookingDetails(reqobj))
      .then((res) => {
        let data = res.filter((booking) => {
          let diff = getTimeDiff(booking.SlotDateTime, "today");
          return diff + 30 < 0;
        });
        setData(data);

        if (selectedBooking && selectedBooking.id) {
          let rec = res.filter((row) => {
            return row.id == selectedBooking.id;
          })[0];
          console.log("in, get", rec);
          dispatch(setBookingInfo(rec));
        } else {
          console.log(
            "in get dtae else",
            selectedBooking,
            selectedBooking.length
          );
        }
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
                    <span className="text"> Sessions</span>
                  </div>
                </div>
                <div className="patient_inner_container">
                  <div className="patient_TimeLine">
                    {data && data.length > 0 ? (
                      <ul>
                        {data.map((rec) => (
                          <li
                            className={`${
                              rec.id == selectedBooking.id && "pres_active"
                            }`}
                            key={rec.id}
                            onClick={() => handleChangeBooking(rec)}
                          >
                            <div className="activity_wrap">
                              <h6
                                className={`${
                                  rec.id == selectedBooking.id && "pres_active"
                                }`}
                              >
                                {rec.fullDate + " " + rec.detailText}
                              </h6>
                              <p
                                className={`${
                                  rec.id == selectedBooking.id && "pres_active"
                                }`}
                              >
                                {currentUser && currentUser.role == "doctor"
                                  ? rec.patientName
                                  : "DR. " + rec.doctorName}
                              </p>
                            </div>
                            <div
                              className={`activity_bell ${
                                rec.id == selectedBooking.id && "pres_selected"
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

                          <h2> Prescription Not Available</h2>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`col-lg-6 ${
                  selectedBooking && selectedBooking.id
                    ? ""
                    : "pres_sec_unselected"
                }`}
              >
                <div className="patient_arrow_container">
                  <div className="patient_arrow">
                    <span>
                      <img src={PrescriptionIcon} />
                    </span>
                    <span className="text"> Prescription</span>
                  </div>
                </div>
                <div className="patient_inner_container">
                  <div
                    className="white_box "
                    style={{ backgroundColor: "#e9ecef" }}
                  >
                    {" "}
                    {selectedBooking && selectedBooking.id && (
                      <>
                        {/* <div className="box_header border_bottom_1px  ">
                            <div className="main-title">
                              <h3 className="mb_25">Prescription</h3>
                            </div>
                          </div> */}
                        <div
                          className="Activity_timeline sessionsActivity"
                          style={{ height: "430px" }}
                        >
                          {/* <ReadOnlyEditor
                              value={selectedBooking.prescribtion}
                            /> */}
                          <PageContainer
                            handleSubmit={(editorState) =>
                              handleSubmit(editorState)
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default PrescriptionNew;
