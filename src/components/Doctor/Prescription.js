import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import medicon_login from "../../assets/medicon_login.png";
import { useDispatch } from "react-redux";
import "./Prescription.css";
import { bookingDetails, updateBooking } from "../../services/slots.service";
import { setLoading } from "../../store/auth.slice";
import { getTimeDiff } from "../../helpers/helper";

function Prescription({ togglePresc, handlePresbModalShowHide, doctor }) {
  const dispatch = useDispatch();
  const handleModal = () => {
    handlePresbModalShowHide();
  };

  const handleSubmit = () => {
    dispatch(setLoading(true));
    dispatch(updateBooking(selectedBooking))
      .then((res) => {
        console.log(res);
        dispatch(setLoading(false));
        handleModal();
      })
      .catch((err) => {
        dispatch(setLoading(false));
        console.log(err);
      });
  };

  const handleChangeBooking = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (value != "") {
      let rec = data.filter((ele) => ele.id == value)[0];
      setSelectedBooking(rec);
    } else {
      setSelectedBooking({});
    }
  };

  const handleChangePrescribtion = (e) => {
    const { name, value } = e.target;
    setSelectedBooking((rec) => {
      return {
        ...rec,
        prescribtion: value,
        status: "completed",
        prescriptionStatus: "completed",
      };
    });
    console.log(selectedBooking);
  };

  const handleOnShow = () => {
    getData();
    setData([]);
    setSelectedBooking({ prescribtion: "" });
    console.log(data);
  };

  const [data, setData] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState({});

  const getData = () => {
    dispatch(setLoading(true));
    dispatch(bookingDetails({ doctorId: doctor.id, prescribtion: "" }))
      .then((res) => {
        let data = res.filter((booking) => {
          let diff = getTimeDiff(booking.SlotDateTime, "today");
          return diff + 30 < 0;
        });
        setData(data);
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  return (
    <>
      <>
        <Modal
          show={togglePresc}
          onShow={handleOnShow}
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
                <h3 className="loginicon">Prescription</h3>

                <div>
                  <div className="InputContainer">
                    <select
                      name="bookingid"
                      className="SelectInput"
                      onChange={handleChangeBooking}
                    >
                      <option value="">Select Slot</option>

                      {data &&
                        data.length > 0 &&
                        data.map((row) => (
                          <option value={row.id}>
                            {row.patientName +
                              " - " +
                              row.fullDate +
                              " " +
                              row.detailText}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="InputContainer">
                    <textarea
                      name="prescribtion"
                      type="textarea"
                      rows="10"
                      cols="33"
                      placeholder="Enter Prescription"
                      className="textarea"
                      value={selectedBooking.prescribtion}
                      onChange={handleChangePrescribtion}
                    />
                  </div>
                  <div className="">
                    <button
                      className="btn  prescription-btn"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>

                    {/* <div className="ActionButtonContainer-Prescription">
                    <button
                      color="primary"
                      type="button"
                      className="Button-Prescription"
                    >
                      Proceed to pay
                    </button>
                  </div> */}
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

export default Prescription;
