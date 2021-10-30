import { Fragment ,useState} from 'react';
import medIcon from '../../assets/medicon.jpg'
import medicon_login from '../../assets/medicon_login.png'
import classes from './Header.css';
import login from '../../assets/login.png'
import { useSelector ,useDispatch} from 'react-redux';
import { logout } from "../../store/auth.slice";
import {SignOut} from "../../services/auth.service";
import { useHistory } from "react-router";
import { Link} from 'react-router-dom';
import  SignUpForm from '../SignUp/SignUp'
import LoginForm from '../Login/Login'

const Header = (props) => {
  const {isAuthenticated} = useSelector((state)=>
                          ( sessionStorage.getItem('user')? JSON.parse(sessionStorage.getItem('user'))  :state.auth)
                        )
    const history=useHistory()
    const dispatch = useDispatch();
    const [toggleLogin, setToggleLogin]=useState(false)
    const [toggleSignup, setToggleSignup]=useState(false)

    const handleLoginModalShowHide=()=>{
      setToggleLogin((i)=> !i)
    }

    const handleSignupModalShowHide=()=>{
      setToggleSignup((i)=> !i)
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
              <button className="btn btn-outline-primary" onClick={handleLoginModalShowHide}>Login</button>
            }
            
          </div>
          </nav>

            <LoginForm  toggleLogin={toggleLogin} handleLoginModalShowHide={handleLoginModalShowHide} handleSignupModalShowHide={handleSignupModalShowHide}  />
            <SignUpForm toggleSignup={toggleSignup} handleLoginModalShowHide={handleLoginModalShowHide}  handleSignupModalShowHide={handleSignupModalShowHide} />

          </>
  );
};

export default Header;
