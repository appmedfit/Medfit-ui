import React, { useState, useEffect } from "react";
import "./Checkout.css";
import doc from "../../assets//DocIcon.jpg";
import medicon_login from "../../assets/medicon_login.png";

import back_arrow from "../../assets/back_arrow.png";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Modal } from "react-bootstrap";
import { setLoading } from "../../store/auth.slice";
import {
  addDoctorSlots,
  bookSlot,
  getDoctorSlots,
  createRazorPayOrder,
} from "../../services/slots.service";
import constants from "../../helpers/constants";
function Checkout(props) {
  const { bookingInfo } = useSelector((state) => state.booking);

  console.log(bookingInfo);
  const dispatch = useDispatch();
  const history = useHistory();
  const [toggleSuccessModal, setToggleSuccessModal] = useState(false);
  //

  const handleSubmit = (razorpayInfo) => {
    dispatch(setLoading(true));
    let finalBookingData = { ...bookingInfo, paymentInfo: { ...razorpayInfo } };
    dispatch(bookSlot(finalBookingData))
      .then((res) => {
        console.log(res);
        dispatch(setLoading(false));
        setToggleSuccessModal(true);
        console.log("booking is done");
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    console.log({ consultancyFee: bookingInfo.consultancyFee });
    dispatch(
      createRazorPayOrder({ consultancyFee: bookingInfo.consultancyFee })
    ).then((data) => {
      console.log(data);
      const options = {
        key: "rzp_test_nm9mAxHElJ1Y8r",
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        name: "MedFIT",
        description: `${bookingInfo.slot.specialty} Online Consultation`,
        // description: "Thank you for nothing. Please give us some money",
        image: constants.appUrl + "logo.png",
        handler: function (response) {
          handleSubmit(response);
        },
        prefill: {
          name: bookingInfo.patientName,
          email: bookingInfo.patientEmail,
          phone_number: "",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    });

    // const data =

    //   await fetch("http://localhost:1337/razorpay", {
    //   method: "POST",
    // }).then((t) => t.json());

    // console.log("data", data);
  }
  return (
    <>
      {!toggleSuccessModal && (
        <div>
          {bookingInfo && bookingInfo.doctor && (
            <div className="page-container">
              <br />
              <div className="left-div">
                <div
                  className="go_back"
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  <img src={back_arrow} /> Go Back
                </div>
                <section className="checkout-summary">
                  <div className="header">
                    <b>Order Summary</b>
                  </div>
                  <div className="summary">
                    <div className="left">
                      <img className="img" src={doc} alt="spl_img" />
                    </div>
                    <div className="right">
                      <div className="title">
                        <div>
                          <div>Dr {bookingInfo.doctorName}</div>
                          <div className="sub-title">
                            {bookingInfo.doctor.degree}
                          </div>
                        </div>
                        <div className="pricing-component">
                          <div>₹ {bookingInfo.consultancyFee}.00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div className="right-div">
                <section className="widget">
                  <div className="icon">
                    <img
                      src="https://static.cure.fit/assets/images/person.svg"
                      className="css-1s4n3pk-Image e1bck8jo0"
                    />
                  </div>
                  <div className="css-1ne0vsu-Data e1bck8jo3">
                    <div className="css-2uoqjy-Title e1bck8jo1">
                      <b>For whom</b>
                    </div>
                    <div className="sub-title">{bookingInfo.patientName} </div>
                  </div>
                </section>
                <section className="css-r3hz89-WidgetSection e1bck8jo2">
                  <div className="icon">
                    <img
                      src="https://static.cure.fit/assets/images/checkout-date_time.svg"
                      className="css-1s4n3pk-Image e1bck8jo0"
                    />
                  </div>
                  <div className="css-1ne0vsu-Data e1bck8jo3">
                    <div className="css-2uoqjy-Title e1bck8jo1">
                      <b>{bookingInfo.slot.specialty} Online Consultation</b>
                    </div>
                    <div className="sub-title">
                      {bookingInfo.slot.fullDate} |{" "}
                      {bookingInfo.slot.detailText}{" "}
                    </div>
                  </div>
                </section>

                <div className="css-jemnnk-PaymentDetail egopomn1">
                  <div className="css-1f4cn3e-Details egopomn0">
                    <div>MRP</div>
                    <div>₹ {bookingInfo.consultancyFee}.00</div>
                  </div>
                  <div className="css-1f4cn3e-Details">
                    <div>Total Payable</div>
                    <div>₹ {bookingInfo.consultancyFee}.00</div>
                  </div>
                </div>
                <div className="css-13q0u04-ActionButtonContainer e2v20ln0">
                  <button
                    color="primary"
                    type="button"
                    className="css-1vndij4-Button e1op617e0"
                    onClick={displayRazorpay}
                  >
                    Proceed to pay
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <>
        <Modal
          show={toggleSuccessModal}
          style={{ marginTop: "112px", paddingTop: "20px" }}
        >
          <Modal.Body>
            <div className="success-modal-dialog success-modal-confirm">
              <div className="success-modal-content">
                <div className="success-modal-header">
                  <div className="icon-box">
                    <i className="material-icons">&#xE876;</i>
                  </div>
                  <h4 className="success-modal-title">Awesome!</h4>
                </div>
                <div className="success-modal-body">
                  <p className="text-center">
                    Your booking has been confirmed. Check your email for
                    details.
                  </p>
                </div>
                <div className="success-modal-footer">
                  <button
                    onClick={() => {
                      history.push("/");
                    }}
                    className="btn btn-success btn-block"
                    data-dismiss="modal"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </>
  );
}

export default Checkout;
