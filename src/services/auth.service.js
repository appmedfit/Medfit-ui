import axiosClient  from "../helpers/AxiosHelper"
import constants  from "../helpers/constants"
import { login } from "../store/auth.slice"

export const Login=(data)=> async(dispatch)=> {
  console.log(data)
    return axiosClient({
        method:'POST',
        url:constants.signIn,
        data:data,
        responseType:'json'
    }).then((resp)=>{
        sessionStorage.setItem('user',JSON.stringify({currentUser:resp.user,isAuthenticated:true}))
     
        dispatch(login(resp.user))
       
    }).catch((error)=>{
        console.log(error)
    })

}

export const SignUp=(data)=> async(dispatch)=> {
    console.log(data)
      return axiosClient({
          method:'POST',
          url:constants.signUp,
          data:data,
          responseType:'json'
      }).then((resp)=>{
          console.log(resp)
      }).catch((error)=>{
          console.log(error)
      })
  
  }