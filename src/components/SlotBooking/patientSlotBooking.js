import React, { useEffect, useReducer, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import getNextSevenDays from "../../helpers/GetNextSevenDays";
import { createSlots, isTimeCompleted } from "../../helpers/createSlots";

import "./SlotBooking.css";
import {
  addDoctorSlots,
  bookSlot,
  getDoctorSlots,
} from "../../services/slots.service";

function SlotBooking({ toggleSlotBooking, handlBookingModalShowHide, doctor }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleModal = () => {
    handlBookingModalShowHide();
  };
  const { currentUser: patient } = useSelector((state) =>
    sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : state.auth
  );
  const handleBookSlot = (slot) => {
    if (!slot.isBooked) {
      if (patient.length == 0) {
        alert("login");
        return;
      }
      slot.isBooked = !slot.isBooked;
      let bookingInfo = {
        slot: { ...slot },
        patientId: patient.id,
        consultancyFee: doctor.consultancyFee,
        prescribtion: "",
        patientName: patient.name,
        doctorName: doctor.name,
      };
      // console.log(bookingInfo);
      dispatch(bookSlot(bookingInfo)).then((res) => {
        //     console.log(res);
        getSlots({
          doctorId: doctor.id,
          fullDate: selectedDate.fullDate,
          isBooked: false,
        });
        handleModal();
        console.log("booking is done");
      });
    }
  };

  const getSlots = ({ doctorId, fullDate, isBooked }) => {
    dispatch(
      getDoctorSlots({
        doctorId,
        fullDate,
        isBooked,
      })
    ).then((dbSlots) => {
      setSlots(dbSlots);
    });
  };

  const changeDateHandler = (slotDate) => {
    setSelectedDate(slotDate);
    // console.log("date changed", slotDate);
    getSlots({
      doctorId: doctor.id,
      fullDate: slotDate.fullDate,
      isBooked: false,
    });
  };
  useEffect(() => {
    if (doctor)
      getSlots({
        doctorId: doctor.id,
        fullDate: selectedDate.fullDate,
        isBooked: false,
      });
  }, [doctor]);

  const SlotBookingDateHeaders = getNextSevenDays();
  const [selectedDate, setSelectedDate] = useState(SlotBookingDateHeaders[0]);
  let { timeSlotHeaders, timeSlots } = createSlots();
  const [slots, setSlots] = useState();

  return (
    <>
      <>
        <Modal
          show={toggleSlotBooking}
          size="lg"
          dialogClassName="modal-70w"
          onShow={() =>
            getSlots({
              doctorId: doctor.id,
              fullDate: selectedDate.fullDate,
              isBooked: false,
            })
          }
        >
          <Modal.Body>
            <div className="DialogTitleComp">
              <div className="Title">Choose Your Slot</div>
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
                                selectedDate.day == head.day ? "selected" : ""
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
                            {slots &&
                              slots.map(
                                (slot) =>
                                  tsHeader == slot.slotHeader &&
                                  isTimeCompleted(
                                    slot.fullDate + " " + slot.detailText
                                  ) > 0 && (
                                    <button
                                      key={slot.id}
                                      onClick={() => handleBookSlot(slot)}
                                      className={`time-slot ${
                                        slot.isSelected ? "" : ""
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
                </section>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </>
  );
}

export default SlotBooking;
