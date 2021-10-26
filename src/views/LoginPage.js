import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Login from "../services/auth.service";
import { useHistory } from "react-router";
const LoginPage = () =>{
    const history=useHistory()
    const dispatch = useDispatch();
    const handleLogin=()=>{
        
        dispatch(Login({
            "email":"kvenkatcharan1@gmail.com",
            "password":"Charan123"
        })).then(()=>{
            history.push("/")
        })
        
    }

  return (
    <div className="App">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-7">
            <div className="card1">
              <div className="card-body1">

                <h3>Login Page</h3>
                <button className="btn btn-primary" onClick={handleLogin}> Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;

