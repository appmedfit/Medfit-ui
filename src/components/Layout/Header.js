import { Fragment ,useState} from 'react';
import medIcon from '../../assets/medicon.jpg'
import medicon_login from '../../assets/medicon_login.png'
import {auth , provider,firebase}  from '../../services/firebase';
import classes from './Header.css';
import login from '../../assets/login.png'
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth.slice";
import {Login,SignOut} from "../../services/auth.service";
import { useHistory } from "react-router";
import { Link} from 'react-router-dom';
import { Button,Modal } from 'react-bootstrap'

import LoginForm from '../Login/Login'

const Header = (props) => {
  const {isAuthenticated} = useSelector((state)=>
                          ( sessionStorage.getItem('user')? JSON.parse(sessionStorage.getItem('user'))  :state.auth)
                        )
    const history=useHistory()
    const dispatch = useDispatch();
    const [toggleShow, setToggleShow]=useState(false)

    const handleModalShowHide=()=>{
      setToggleShow((i)=> !i)
    }
    const handleLogout=()=>{
      
        // Sign-out successful.
        dispatch(SignOut({  })).then((resp)=>{
          console.log(resp)
          sessionStorage.clear()
          history.push("/")
          dispatch(logout())
        }).catch((error) => {
        // An error happened.
      });
        
        
    }
    const handleLogin=()=>{
        
      dispatch(Login({
          "email":"kvenkatcharan1@gmail.com",
          "password":"Charan123"
      })).then(()=>{
          
      })
      
  }
  return (
          <>

            <nav className="navbar navbar-light bg_light">
          <Link to={`/`}>
            <a className="navbar-brand" >
              <img  src={medicon_login} width="35" height="35" className="d-inline-block align-top" alt=""/>
              <span className="brand">MEDFIT</span> 
            </a>
         </Link>  
            <p className="consult">Online Consultation</p>
          <div>

            <img className="login" src={login} alt='login' />  
            {
              isAuthenticated?
              <button className="btn btn-outline-primary" onClick={handleLogout}>Logout</button>:
              <button className="btn btn-outline-primary" onClick={handleModalShowHide}>Login</button>
            }
            
          </div>
          </nav>

            <LoginForm  toggleShow={toggleShow} handleModalShowHide={handleModalShowHide}  />


          </>
  );
};

export default Header;
