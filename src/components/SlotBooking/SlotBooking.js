import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import medicon_login from "../../assets/medicon_login.png";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import getNextSevenDays from "../../helpers/GetNextSevenDays";
import createSlots from "../../helpers/createSlots";

import "./SlotBooking.css";
function SlotBooking({ toggleSlotBooking, handlBookingModalShowHide }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleModal = () => {
    handlBookingModalShowHide();
  };

  const handleBookSlot = (data) => {
    data.isSelected = !data.isSelected;
    let newslots = slots.map((slot) => {
      if (slot.value == data.value) slot = data;
      return slot;
    });
    setSlots(newslots);
  };
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = () => {
    console.log(slots.filter((slot) => slot.isSelected));
    setSlots(timeSlots);
  };

  const SlotBookingDateHeaders = getNextSevenDays();
  const [selectedDate, setSelectedDate] = useState(SlotBookingDateHeaders[0]);
  let { timeSlotHeaders, timeSlots } = createSlots();
  const [slots, setSlots] = useState(timeSlots);
  const changeDateHandler = (slotDate) => {
    console.log(slotDate, selectedDate);
    setSelectedDate(slotDate);
    console.log(slotDate, selectedDate);
  };
  //   console.log(getNextSevenDays());
  console.log(createSlots());

  // const slotSelectHandle = (slot) => {

  // }
  return (
    <>
      <>
        <Modal show={toggleSlotBooking} size="lg" dialogClassName="modal-70w">
          <Modal.Body>
            <div className="DialogTitleComp">
              <div className="Title">Choose Your Slot</div>
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
                      <div className="slot">
                        <>
                          <div className="time-range">{tsHeader}</div>

                          <div className="interval">
                            {slots.map(
                              (slot) =>
                                tsHeader == slot.slotHeader && (
                                  <button
                                    onClick={() => handleBookSlot(slot)}
                                    className={`time-slot ${
                                      slot.isSelected ? "selected" : ""
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
                  <div className="ActionContainer">
                    <button className="ContinueButton" onClick={handleSubmit}>
                      {" "}
                      Continue
                    </button>
                  </div>
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
