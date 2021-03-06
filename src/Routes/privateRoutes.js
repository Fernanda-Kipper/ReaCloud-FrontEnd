import React, {useContext}  from 'react'
import {Redirect, Route} from 'react-router-dom'
import { UserContext } from '../Context/UserContext'

export const PrivateRoute = ({component: Component, ...rest})=>{
    const { value } = useContext(UserContext);

    return (
        <Route
        {...rest}
        render={props=> 
            value ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                    pathname: '/entrar',
                    state: {from: props.location}
                }} />
            )
        }
        />
    )
    };