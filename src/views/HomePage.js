import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/auth.slice";
import { useHistory } from "react-router";
import {getStudents} from '../services/user.service'
function HomePage() {
    const history=useHistory()
    const dispatch = useDispatch();
    const handleLogout=()=>{
        
        dispatch(logout({
           
        }))
        sessionStorage.clear()
        history.push("/login")
    }
    const handleGetStudents=()=>{
        dispatch(getStudents({
           
        }))
    }
  return (

    <div className="App">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-7">
          <div className="card1">
            <div className="card-body1">

              <h3>Home Page</h3>
              <button className="btn btn-primary" onClick={handleLogout}> Logout</button>
              <br/>
              <br/>
              <button className="btn btn-primary" onClick={handleGetStudents}> get Students</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
export default HomePage;
