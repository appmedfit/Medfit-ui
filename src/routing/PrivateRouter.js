import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
export const PrivateRoute = ({ component: Component, ...rest }) => {
    const {isAuthenticated} = useSelector((state)=>
        ( sessionStorage.getItem('user')? JSON.parse(sessionStorage.getItem('user'))  :state.auth)
    )
    
    return (
        <Route {...rest} render={props => (
            isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/'}} />
        )} />
    )
    }