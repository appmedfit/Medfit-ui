import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/auth.slice";
import { useHistory } from "react-router";
import {getStudents} from '../services/user.service'

import { Fragment } from 'react';
import Header from '../components/Layout/Header';
import { Switch, Route, Router } from 'react-router-dom';
import Home from '../components/Home/Home';
import Specialty from '../components/Specialty/Specialty';
import Footer from '../components/Footer/Footer'


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

    <div>
            <Home />
     </div> 

             
       
  );
}
export default HomePage;
