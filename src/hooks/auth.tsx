import React from 'react';
import { useEffect, useState } from 'react';

import {useAppDispatch, useAppSelector} from '../app/hooks'
import {loginAuth} from '../features/login/loginSlice'

export function useAuth() {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const login = useAppSelector((state)=>state.login.loggedIn)
    const dispatchRedux = useAppDispatch();

    function finalLogin(){ dispatchRedux(loginAuth());}
    useEffect(() => {

        const user = localStorage.getItem('user');

 
        if (user) {
            try {
                setUser(JSON.parse(user));
                setIsAuthenticated(true);
            } catch (error) {
                setUser(null)
            }
        }
        else {
            setUser(null)
            setIsAuthenticated(false)
        }

    }, [])
    return { user, isAuthenticated }
}
