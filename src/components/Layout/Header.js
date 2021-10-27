import { Fragment } from 'react';
import medIcon from '../../assets/medicon.jpg'
import classes from './Header.css';
import login from '../../assets/login.png'
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth.slice";
import {Login} from "../../services/auth.service";
import { useHistory } from "react-router";
import { Link} from 'react-router-dom';
const Header = (props) => {
  const {isAuthenticated} = useSelector((state)=>
  ( sessionStorage.getItem('user')? JSON.parse(sessionStorage.getItem('user'))  :state.auth)
)
    const history=useHistory()
    const dispatch = useDispatch();
    const handleLogout=()=>{
        
        dispatch(logout({
        }))
        sessionStorage.clear()
        history.push("/")
    }
    const handleLogin=()=>{
        
      dispatch(Login({
          "email":"kvenkatcharan1@gmail.com",
          "password":"Charan123"
      })).then(()=>{
          
      })
      
  }
  return (
  // <div>
     
  //     <header className={classes.header}>
  //     <img src={medIcon} alt='MedIcon' />
  //       <h1 style={{color: "black"}}>MEDFIT</h1>
  //       <p className={classes.consult}>Online Consult</p>
  //       <img className={classes.login} src={login} alt='login' />  
    
  //     </header>
     
  //     </div>className="navbar navbar-light" style="background-color: #e3f2fd;"
  <nav className="navbar navbar-light bg_light">
      <Link to={`/`}>
  <a className="navbar-brand" >
    <img  src={medIcon} width="35" height="35" className="d-inline-block align-top" alt=""/>
    <span className="brand">MEDFIT</span> 
  </a>
  </Link>  
  <p className="consult">Online Consultation</p>
 <div>

  <img className="login" src={login} alt='login' />  
  {
     isAuthenticated?
     <button className="btn btn-outline-primary" onClick={handleLogout}>Logout</button>:
     <button className="btn btn-outline-primary" onClick={handleLogin}>Login</button>
  }
  
</div>
</nav>
  );
};

export default Header;
