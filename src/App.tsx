import React, { useState, useEffect ,createContext, useReducer} from 'react';
import './App.css';
import { Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Navbar from './component/navbar/Navbar'
import Dashboard from './component/Dashboard'
import axios from 'axios'
import { useAuth } from './hooks/auth'
import {initialState, reducer} from './reducer/UseReducer'


interface userInfo {
    name: string,
    isLoggedIn: boolean,
}

const ProtectedRoute = ({ redirect, children }: any) => {
    if (redirect) return <Navigate to="/" replace />
    return children
}

type initialStateType = {
       login: boolean 
    }
     
export const UserContext = createContext<{
    state: boolean;
    dispatch: React.Dispatch<any>;
}>({
    state:initialState, 
    dispatch: ()=>false
    });
const App = () => {

    const [state,dispatch] = useReducer(reducer, initialState);
    const [googleUser, setGoogleUser ] = useState();
    const userData = useAuth().user;
    const { user,isAuthenticated } = useAuth();
    const getUsers = () => {
        fetch("http://localhost:5000/api/login/success", {
            method: "GET",
            credentials: "include",
        },
        )
            .then((response) => {
                if (response.status === 200){
                    
                    return response.json()};
                    throw new Error("authentication has been failed!");
            })
            .then((resObject) => {
                
                    setGoogleUser(resObject.user)
                localStorage.setItem('user',JSON.stringify(resObject.user))
                
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
       getUsers();
    },[] );

    return (
    <UserContext.Provider value = {{state,dispatch}}>
        <div className="App">

             <Navbar user={googleUser}/>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/dashboard' element={
                        <ProtectedRoute redirect={!isAuthenticated}>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                </Routes>
            </Router>
        </div>

    </UserContext.Provider>
    );
}

export default App;
