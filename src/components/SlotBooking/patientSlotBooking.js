import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import getNextSevenDays from "../../helpers/GetNextSevenDays";
import { createSlots, getTimeDiff } from "../../helpers/helper";
import { setBookingInfo } from "../../store/booking.slice";

import LoadingPage from "../Loader/ModalLoader";
import "./SlotBooking.css";
import {
  addDoctorSlots,
  bookSlot,
  getDoctorSlots,
} from "../../services/slots.service";
import { handleLoginModal } from "../../store/auth.slice";

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
      setLoading(true);
      if (!patient) {
        dispatch(handleLoginModal(true));
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
        patientEmail: patient.email,
        doctor: doctor,
      };
      dispatch(setBookingInfo(bookingInfo));
      history.push("/checkout");
    }
  };

  const getSlots = ({ doctorId, fullDate, isBooked }) => {
    console.log("*");
    setLoading(true);
    dispatch(
      getDoctorSlots({
        doctorId,
        fullDate,
        isBooked,
      })
    )
      .then((dbSlots) => {
        setLoading(false);
        let newSlots = dbSlots.filter((slot) => {
          return getTimeDiff(slot.fullDate + " " + slot.detailText) > 0;
        });
        console.log(newSlots);
        newSlots = newSlots.sort((slot1, slot2) =>
          getTimeDiff(
            slot1.fullDate + " " + slot1.detailText,
            slot2.fullDate + " " + slot2.detailText
          )
        );
        console.log(newSlots);
        setSlots(newSlots);
        let timeSlotHeadersnew = timeSlotHeadersOld.map((slotHeader) => {
          return {
            slotHeader: slotHeader,
            isAvailable: newSlots.some((slot) => slotHeader == slot.slotHeader),
          };
        });
        setTimeSlotHeaders(timeSlotHeadersnew);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
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
  let { timeSlotHeaders: timeSlotHeadersOld } = createSlots();
  const [timeSlotHeaders, setTimeSlotHeaders] = useState(timeSlotHeadersOld);
  const [slots, setSlots] = useState();
  const [loading, setLoading] = useState(false);
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
                    {loading ? (
                      <LoadingPage />
                    ) : timeSlotHeaders && slots && slots.length > 0 ? (
                      timeSlotHeaders.map(
                        (tsHeader) =>
                          tsHeader.isAvailable && (
                            <div className="slot" key={tsHeader.slotHeader}>
                              <>
                                <div className="time-range">
                                  {tsHeader.slotHeader}
                                </div>

                                <div className="interval">
                                  {slots &&
                                    slots.length > 0 &&
                                    slots.map(
                                      (slot) =>
                                        tsHeader.slotHeader ==
                                          slot.slotHeader && (
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
                          )
                      )
                    ) : (
                      <div className="norecords">
                        <div className="col">
                          <br />

                          <h2> Slots Not Available</h2>
                        </div>
                      </div>
                    )}
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
