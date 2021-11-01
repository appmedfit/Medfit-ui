import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { history } from "./helpers/history";
import { PrivateRoute } from "./routing/PrivateRouter";
import HomePage from "./views/HomePage";
import Specialty from "./components/Specialty/Specialty";
import Header from "./components/Layout/Header";
import Footer from "./components/Footer/Footer";
import PatientPreviousBookingsPage from "./components/PreviousBookings/PatientPreviousBookingsPage";
import DoctorPreviousBookingsPage from "./components/PreviousBookings/DoctorPreviousBookingsPage";
import DoctorLandingPage from "./components/Doctor/DoctorLandingPage";
import { useSelector, useDispatch } from "react-redux";
function App() {
  const { isAuthenticated, currentUser } = useSelector((state) =>
    sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : state.auth
  );
  return (
    <Router history={history}>
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          component={
            currentUser && currentUser.role == "doctor"
              ? DoctorLandingPage
              : HomePage
          }
        />
        {/* <PrivateRoute exact path="/" component={HomePage} /> */}
        <Route path="/speciality/:specialityId" component={Specialty} />
        <Route
          path="/previousbookings"
          component={
            currentUser && currentUser.role == "doctor"
              ? DoctorPreviousBookingsPage
              : PatientPreviousBookingsPage
          }
        />
      </Switch>
      <Footer />
    </Router>
  );
}
export default App;
