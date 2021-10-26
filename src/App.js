import React from "react";
import { Router, Route } from 'react-router-dom';

import { history } from './helpers/history';
import { PrivateRoute } from './routing/PrivateRouter';
import  HomePage  from './views/HomePage';
import  LoginPage from './views/LoginPage';
import "./styles.css";
function App() {
  return (
    <div className="App">
       <Router history={history}>
          <div>
              <PrivateRoute exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
          </div>
       </Router>
    </div>
  );
}
export default App;
