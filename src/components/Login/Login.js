import React, {useState} from 'react';
import { Button,Modal } from 'react-bootstrap'
import {Login as loginService,SignUp as signUpService} from "../../services/auth.service";
import medicon_login from '../../assets/medicon_login.png'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { login as loginAction} from "../../store/auth.slice"
import {auth , provider,firebase}  from '../../services/firebase';
import  '../Layout/Header.css';
function LoginForm({toggleShow,handleModalShowHide}) {
    const history=useHistory()
    const dispatch = useDispatch();
    const handleModal=()=>{
        handleModalShowHide()
        setIsSignIn(true)
    }

    const [isSignin , setIsSignIn]=useState(true)

    const handleLogin=()=>{
        dispatch(loginService(state))
        .then((resp)=>{
            sessionStorage.setItem('user',JSON.stringify({currentUser:resp.user,isAuthenticated:true}))
            dispatch(loginAction(resp.user))
            handleModal()
        }).catch((error)=>{
            console.log(error)
        })
    }
    const handleGoogle =()=>{
        auth.signInWithPopup(provider).then((result)=>{
            var credential = result.credential;
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            firebase.auth().currentUser.getIdToken(true).then(function(token) {
                const id=user.uid
                 user=mapUser(user)
                //{token:idToken,id:id}
                let newUser={user:{...newUser,token}}
                sessionStorage.setItem('user',JSON.stringify({currentUser:newUser , isAuthenticated:true}))
                dispatch(loginAction(newUser))
                handleContinueModalHide()
              }).catch(function(error) {
                // Handle error
                console.log(error)
              });
        })
        .catch((err)=>{
            console.log(err)
        });
       
    }
    const mapUser=(user)=> {
        const customClaims = (user.customClaims || { role: '' }) 
        const role = customClaims.role ? customClaims.role : 'user'
        return {
            id: user.uid,
            email: user.email || '',
            name: user.name || '',
            role:user.role||'user',
        }
    }

    const handleSubmit=()=>{
        console.log(isSignin)
        if(isSignin){
               handleLogin();
        }
        if(!isSignin){
            dispatch(signUpService(state))
            .then((resp)=>{
                    if(resp=="successfully signed up"){
                        handleLogin();
                    }
                 
            }).catch((error)=>{
                if(error.data=="The email address is already in use by another account."){
                    handleLogin();
                }
                console.log(error)
            })

        }
        setState({
            email : "",
            password : "",
            role:"",
            name:""
        })
      
    }

    const [state , setState] = useState({
        email : "",
        password : "",
        role:"", name:""
    })
    const [toggleShowGoogle, setToggleShowGoogle]=useState(false)

    const handleContinueModalShowHide=()=>{
        setToggleShowGoogle((i)=> !i)
        handleModalShowHide()
    }

    const handleContinueEmailModalShowHide=()=>{
        setToggleShowGoogle((i)=> !i)
        handleModalShowHide()
        setIsSignIn(false)

    }

    const handleContinueModalHide=()=>{
        setToggleShowGoogle((i)=> !i)
      
    }


    const handleChange = (e) => {

        const {name , value} = e.target  
        console.log(name,value) 
        setState(prevState => ({
            ...prevState,
            [name] : value
        }))
    }
  
   

  return(
         <>
            <>
             <Modal show={toggleShow}>
                  
                    <Modal.Body>
                    <span className="float-right" style={{cursor:'pointer'}} onClick={ handleModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                        <path fill="#aeaeae" fillRule="evenodd" d="M10.047.335L6 4.386 1.953.335a1.145 1.145 0 0 0-1.618 0 1.14 1.14 0 0 0 0 1.613L4.382 6 .335 10.052a1.14 1.14 0 0 0 0 1.613 1.145 1.145 0 0 0 1.618 0L6 7.614l4.047 4.051c.446.447 1.17.447 1.618 0a1.14 1.14 0 0 0 0-1.613L7.618 6l4.047-4.052a1.14 1.14 0 0 0 0-1.613 1.145 1.145 0 0 0-1.618 0z"/>
                    </svg>
                    </span>
                    <div className="login_conatiner">
                    <img  src={medicon_login} width="127" height="112" className="loginicon" alt=""/>
                    <h3 className="loginicon">MEDFIT</h3>
                    <div>
                      <div className="InputContainer">
                      <input name="email" type="text" placeholder="Enter your mail" className="emailInput"
                          value={state.email}
                          onChange={handleChange}
                      />
                      </div>
                      <div className="InputContainer">   
                      <input name="password" type="password" placeholder="Enter your Password" className="emailInput"
                          value={state.password}
                          onChange={handleChange}
                      />
                       
                      </div>
                      { !isSignin &&
                            <div className="radioInputContainer"> 
                      
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="user" name="role" value="user" className="custom-control-input" onChange={handleChange}
                                        checked={state.role==='user'}
                                        />
                                        <label className="custom-control-label" htmlFor="user">User</label>
                                        </div>
                                        <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="doctor" value="doctor" name="role" className="custom-control-input" onChange={handleChange}
                                        checked={state.role==='doctor'}
                                        />
                                        <label className="custom-control-label" htmlFor="doctor">Doctor</label>
                                        </div>
                             </div>
                      }
                    
                      <div className="ActionContainer">
                        <button className="ContinueButton"  onClick={handleSubmit}> Continue</button>
                      </div>

                      <div className="Tnc">
                        <div className="TncText">
                          By Continuing you agree to the 
                          <a href="" target="_blank" rel="noreferrer" className="TncAnchor">
                            Terms of Services</a> and 
                            <a href="" target="_blank" rel="noreferrer" className="TncAnchor">Privacy policy</a>.
                            </div>
                            
                       </div>

                       <div className="ActionContainerOtherMethods" onClick={handleContinueModalShowHide}>
                           <div className="ContinueButtonWhite">Continue with  
                              <div className="SocialMediaEmailsContainer ">
                                  <img src="https://static.cure.fit/assets/images/google-logo.svg" className="SocialMediaIcon "/>
                                  <img src="https://static.cure.fit/assets/images/email.png" className="SocialMediaIcon "/>
                              </div>
                           </div>
                        </div>
                      <br/>
                    </div>

                   
                   </div>
                   
                    </Modal.Body>
            </Modal>
            </>
            <>
            <Modal show={toggleShowGoogle}>
                  
            <Modal.Body>
                <span className="float-right" style={{cursor:'pointer'}} onClick={handleContinueModalHide }>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                    <path fill="#aeaeae" fillRule="evenodd" d="M10.047.335L6 4.386 1.953.335a1.145 1.145 0 0 0-1.618 0 1.14 1.14 0 0 0 0 1.613L4.382 6 .335 10.052a1.14 1.14 0 0 0 0 1.613 1.145 1.145 0 0 0 1.618 0L6 7.614l4.047 4.051c.446.447 1.17.447 1.618 0a1.14 1.14 0 0 0 0-1.613L7.618 6l4.047-4.052a1.14 1.14 0 0 0 0-1.613 1.145 1.145 0 0 0-1.618 0z"/>
                </svg>
                </span>
                  <div className="login_conatiner">
                    <img  src={medicon_login} width="127" height="112" className="loginicon" alt=""/>
                    <h3 className="loginicon">MEDFIT</h3>
                    <br/>
                    <br/>
                    <div> 
                        <div className="channels">
                            <div className="AuthButtonContainer">
                                <button type="button" className="signIntile-buttonContainer-googleLogin" onClick={handleGoogle}>
                                    <div className="socialAuthContainer">
                                        <div className="singleTile">
                                            <img src="https://static.cure.fit/assets/images/google-new.svg" alt="Google logo" className="logoIcon"/>
                                                <span className="btnText">Sign in with Google</span>
                                       </div>
                                    </div>
                                 </button>
                             </div>
                            <br/>
                            <div className="AuthButtonContainer" onClick={handleContinueEmailModalShowHide}>
                                <button type="button" className="emailLogin-signIntile-emailLine">
                                    <div className="socialAuthContainer">
                                        <div className="css-1ljhhni-singleTile">
                                            <img src="https://static.cure.fit/assets/images/mail-new.svg" alt="Sign in with Email" className="logoIcon"/>
                                                <span className="BtnText">Sign in with email</span>
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <br/>
                            <br/>
                        </div>    
                     </div>
                 </div>
                 
                  </Modal.Body>
            </Modal>
            </>
         </>
     
    )
}

export default LoginForm