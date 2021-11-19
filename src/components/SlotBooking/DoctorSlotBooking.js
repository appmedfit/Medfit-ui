import React, { useEffect, useReducer, useState } from "react";
import { Button, Modal, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import getNextSevenDays from "../../helpers/GetNextSevenDays";
import { createSlots, getDateTimestamp } from "../../helpers/helper";
import ModalLoadingPage from "../Loader/ModalLoader";
import "./SlotBooking.css";
import { addDoctorSlots, getDoctorSlots } from "../../services/slots.service";

function SlotBooking({ toggleSlotBooking, handlBookingModalShowHide }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showConfirmDialog, setshowConfirmDialog] = useState(true);
  const [availableSlotsData, setavailableSlotsData] = useState([]);
  const handleModal = () => {
    handlBookingModalShowHide();
  };

  const { currentUser: userDoctor } = useSelector((state) =>
    sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : state.auth
  );

  const handleBookSlot = (data) => {
    if (data.isEditable) {
      data.isSelected = !data.isSelected;
      let newslots = slots.map((slot) => {
        if (slot.value == data.value) slot = data;
        return slot;
      });
      setSlots(newslots);
    }
  };

  const handleCancel = () => {
    setshowConfirmDialog(true);
    setavailableSlotsData([]);
    getSlots({
      doctorId: userDoctor.id,
      fullDate: selectedDate.fullDate,
    });
  };
  const handleSubmit = () => {
    // console.log(selectedDate.fullDate);
    setLoading(true);

    //  console.log(availableSlotsData);
    dispatch(addDoctorSlots(availableSlotsData))
      .then(() => {
        setLoading(false);
        handleCancel();
      })
      .catch((err) => {
        setLoading(false);
      });
    setSlots(timeSlots);
  };

  const handleContinue = () => {
    let availSlotsData = slots
      .filter((slot) => slot.isSelected && slot.isEditable)
      .map((slot) => {
        return {
          ...slot,
          fullDate: selectedDate.fullDate,
          detailText: slot.detailText,
          doctorId: userDoctor.id,
          specialty: userDoctor.specialty,
          isBooked: false,
          isEditable: false,
          SlotDateTime: getDateTimestamp(
            selectedDate.fullDate + " " + slot.detailText
          ),
        };
      });
    if (availSlotsData.length > 0) {
      setavailableSlotsData(availSlotsData);
      setshowConfirmDialog(false);
    }
  };

  const getSlots = ({ doctorId, fullDate }) => {
    setLoading(true);
    dispatch(
      getDoctorSlots({
        doctorId,
        fullDate,
      })
    )
      .then((dbSlots) => {
        let newTimeSlots =
          dbSlots.length < 0
            ? timeSlots
            : timeSlots.map((slot) => {
                let newSLot = dbSlots.filter((dbSlot) => {
                  return dbSlot.value === slot.value;
                })[0];
                return newSLot
                  ? newSLot
                  : {
                      ...slot,
                      doctorId: userDoctor.id,
                      specialty: userDoctor.specialty,
                      fullDate: selectedDate.fullDate,
                      isBooked: false,
                      isEditable: true,
                    };
              });

        setSlots(newTimeSlots);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const changeDateHandler = (slotDate) => {
    setSelectedDate(slotDate);
    console.log("date changed", slotDate);
    getSlots({
      doctorId: userDoctor.id,
      fullDate: slotDate.fullDate,
    });
  };
  useEffect(() => {
    getSlots({ doctorId: userDoctor.id, fullDate: selectedDate.fullDate });
  }, [selectedDate]);

  const SlotBookingDateHeaders = getNextSevenDays();
  const [selectedDate, setSelectedDate] = useState(SlotBookingDateHeaders[0]);
  let { timeSlotHeaders, timeSlots } = createSlots();
  const [slots, setSlots] = useState(timeSlots);

  return (
    <>
      <>
        <Modal
          show={toggleSlotBooking}
          size="lg"
          dialogClassName="modal-70w"
          onShow={() => {
            setSelectedDate(SlotBookingDateHeaders[0]);
            getSlots({
              doctorId: userDoctor.id,
              fullDate: selectedDate.fullDate,
            });
          }}
        >
          {showConfirmDialog ? (
            <Modal.Body>
              <div className="DialogTitleComp">
                <div className="Title">Mark Your Available Slots</div>
                <span
                  className="float-right-slot-booking"
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
              </div>
              {loading ? (
                <div className="doc-loading">
                  <ModalLoadingPage />
                </div>
              ) : (
                <div className="dialogBody ">
                  <div className="StyleWrapper-StyleWrapper">
                    <section className="dates-available-widget">
                      <div className="date-selection">
                        <ul>
                          {SlotBookingDateHeaders.map((head, index) => (
                            <li
                              key={head.fullDate}
                              onClick={() => changeDateHandler(head)}
                            >
                              <div className="day">
                                <div
                                  className={`name ${
                                    selectedDate.dayName == head.dayName
                                      ? "selected"
                                      : ""
                                  }`}
                                >
                                  {head.dayName}
                                </div>
                                <div
                                  className={`date ${
                                    selectedDate.day == head.day
                                      ? "selected"
                                      : ""
                                  }`}
                                >
                                  <p> {head.day}</p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <section className="slot-selection ">
                        {timeSlotHeaders.map((tsHeader) => (
                          <div className="slot" key={tsHeader}>
                            <>
                              <div className="time-range">{tsHeader}</div>

                              <div className="interval">
                                {slots.map(
                                  (slot) =>
                                    tsHeader == slot.slotHeader && (
                                      <button
                                        key={slot.id}
                                        onClick={() => handleBookSlot(slot)}
                                        className={`time-slot ${
                                          slot.isSelected && !slot.isBooked
                                            ? "selected"
                                            : slot.isSelected && slot.isBooked
                                            ? "booked"
                                            : "available"
                                        }`}
                                      >
                                        <div className="time-slot-text">
                                          <div>{slot.value}</div>
                                        </div>
                                      </button>
                                    )
                                )}
                              </div>
                            </>
                          </div>
                        ))}
                      </section>
                      <div className="button-info-container">
                        <div className="button-info">
                          <button className="time-slot  available">
                            <div className="time-slot-text">
                              <div>09:00</div>
                            </div>
                          </button>{" "}
                          <span> Open Slot</span>
                        </div>
                        <div className="button-info">
                          <button className="time-slot  selected">
                            <div className="time-slot-text">
                              <div>09:00</div>
                            </div>
                          </button>{" "}
                          <span> Marked as Available</span>
                        </div>
                        <div className="button-info">
                          <button className="time-slot  booked">
                            <div className="time-slot-text">
                              <div>09:00</div>{" "}
                            </div>
                          </button>
                          <span> Slot booked by Patient</span>
                        </div>
                      </div>
                      <div className="SlotActionContainer">
                        <button
                          className="ContinueButton"
                          onClick={handleContinue}
                        >
                          {" "}
                          Continue
                        </button>
                      </div>
                    </section>
                  </div>
                </div>
              )}
            </Modal.Body>
          ) : (
            <Modal.Body style={{ minHeight: "300px" }}>
              <div className="DialogTitleComp">
                <div className="Title">Selected Slots</div>
              </div>
              <div className="dialogBody ">
                <div className="StyleWrapper-StyleWrapper">
                  <section className="">
                    <div className="selected_slots_widget">
                      <ListGroup as="ol" numbered>
                        {availableSlotsData &&
                          availableSlotsData.length > 0 &&
                          availableSlotsData.map((slot, index) => (
                            <ListGroup.Item
                              variant="light"
                              style={{ color: "black" }}
                              as="li"
                              key={slot.id}
                            >
                              {index + 1 + ".    "}
                              {slot.fullDate + " " + slot.detailText}
                            </ListGroup.Item>
                          ))}
                      </ListGroup>
                    </div>
                    <br />
                    <div className="SlotcnfirmActionContainer">
                      <button className="CnfirmButton" onClick={handleSubmit}>
                        {" "}
                        Confirm
                      </button>
                      <button className="CnfirmButton" onClick={handleCancel}>
                        {" "}
                        Cancel
                      </button>
                    </div>
                  </section>
                </div>
              </div>
            </Modal.Body>
          )}
        </Modal>
      </>
    </>
  );
}

export default SlotBooking;
