import React, { useState, useEffect } from "react";
import "./Checkout.css";
import doc from "../../assets//DocIcon.jpg";

function Checkout(props) {
  return (
    <div className="page-container">
      <div className="left-div">
        <section className="checkout-summary">
          <div className="header"><b>Order Summary</b></div>
          <div className="summary">
            <div className="left">
              <img className="img" src={doc} alt="spl_img" />
            </div>
            <div className="right">
              <div className="title">
                <div>
                  <div> yani yepuri</div>
                  <div class="sub-title">
                    MBBS, DDVL, FRGUHS in Aesthetic Medicine
                  </div>
                </div>
                <div class="pricing-component">
                  <div>₹500</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="right-div">
        <section className="widget">
          <div class="icon">
            <img
              src="https://static.cure.fit/assets/images/person.svg"
              class="css-1s4n3pk-Image e1bck8jo0"
            />
          </div>
          <div class="css-1ne0vsu-Data e1bck8jo3">
            <div class="css-2uoqjy-Title e1bck8jo1"><b>For whom</b></div>
            <div class="sub-title">Patient1 | 26 yrs</div>
          </div>
          </section>
          <section class="css-r3hz89-WidgetSection e1bck8jo2">
            <div class="icon">
              <img
                src="https://static.cure.fit/assets/images/checkout-date_time.svg"
                class="css-1s4n3pk-Image e1bck8jo0"
              />
            </div>
            <div class="css-1ne0vsu-Data e1bck8jo3">
              <div class="css-2uoqjy-Title e1bck8jo1">
               <b> Sexologist Online Consultation</b>
              </div>
              <div class="sub-title">6th Nov | 09:45 am</div>
            </div>
          </section>
      
        <div class="css-jemnnk-PaymentDetail egopomn1">
          <div class="css-1f4cn3e-Details egopomn0">
            <div>MRP</div>
            <div>₹ 600.00</div>
          </div>
          <div class="css-1f4cn3e-Details">
            <div>Total Payable</div>
            <div>₹ 600.00</div>
          </div>
        </div>
        <div class="css-13q0u04-ActionButtonContainer e2v20ln0">
          <button
            color="primary"
            type="button"
            class="css-1vndij4-Button e1op617e0"
          >
            Proceed to pay
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
