import React from "react";
import { Router, Route ,Switch} from 'react-router-dom';

import { history } from './helpers/history';
import { PrivateRoute } from './routing/PrivateRouter';
import  HomePage  from './views/HomePage';
import  LoginPage from './views/LoginPage';
import Specialty from "./components/Specialty/Specialty";

import Header from './components/Layout/Header';
import Footer from './components/Footer/Footer'
function App() {
  return (
    <div className="App">
     
       <Router history={history}>
          <div>
          <Route path="/login" component={LoginPage} />
          <Header />
              <Route exact path="/" component={HomePage} />
              
              <Route path="/specialty" component={Specialty} />
            <Footer/>
          </div>
       </Router>
      
    </div>
  );
}
export default App;
