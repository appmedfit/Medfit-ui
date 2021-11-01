import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { history } from "./helpers/history";
import { PrivateRoute } from "./routing/PrivateRouter";
import HomePage from "./views/HomePage";
import Specialty from "./components/Specialty/Specialty";
import Header from "./components/Layout/Header";
import Footer from "./components/Footer/Footer";
import PatientPreviousBookingsPage from "./views/patient/PatientPreviousBookingsPage";
function App() {
  return (
    <Router history={history}>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/speciality/:specialityId" component={Specialty} />
        <Route
          path="/patient/previousbookings"
          component={PatientPreviousBookingsPage}
        />
      </Switch>
      <Footer />
    </Router>
  );
}
export default App;
