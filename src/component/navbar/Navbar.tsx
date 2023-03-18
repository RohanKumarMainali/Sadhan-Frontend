import React, { useEffect, useState, useContext } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import LoginModal from '../modal/LoginModal'
import { CgProfile } from 'react-icons/cg'
import { UserContext } from '../../App'


import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {logoutAuth,getUserThunk} from '../../features/login/loginSlice'


let logo = require('../../images/newLogo.png')

function Navbar({ user }: any) {


    const { state, dispatch } = useContext(UserContext)
    const search = useRef<HTMLInputElement>(null);
    const [showLogin, setShowLogin] = useState(false);


    const loginDetail = useAppSelector((state)=>state.login.loggedIn)
    const dispatchRedux = useAppDispatch();

    function changeLoginState(){ dispatchRedux(logoutAuth());}
    
    const url = 'http://localhost:5000/api';
    const getUser = async () => {
        try {
            const response = await axios.get(`${url}/session`, {
                headers: {
                    'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json',
                },
                withCredentials: true
            });
        } catch (error: any) {
            console.log('status ' + error.response.status)
        }
    }

    const focusSearch = () => {
        search.current?.focus();
    }

    const google = () => {
        window.open('http://localhost:5000/api/google', '_self');
    }
    const logoutGoogle = () => {
        window.open("http://localhost:5000/api/logout", "_self");
        localStorage.clear();
    };

    const logout = async () => {
        const response = await axios.get(`${url}/user/logout`, {
            withCredentials: true
        })
        localStorage.clear()
        dispatch({ type: "USER", payload: false })
        changeLoginState();

    };
    useEffect(() => {
        getUser();
        dispatchRedux(getUserThunk())
    });


    return (
        <div>
            <nav className='main-navbar'>

                <div className="container">
                    <div className="row">
                        <div className="col-md-3 navbar-logo">
                        <Link to ='/'>
                            <img src={logo} alt="Logo" />
                            </Link>
                        </div>
                        <div className="col-md-3">
                            <form action="" className='navbar-form'>
                                <input type="text" ref={search} onClick={focusSearch} className='navbar-search-input' placeholder='Search Vehicle ...' required />
                                <i className="fa">
                                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                                </i>
                            </form>
                        </div>
                        <div className="col-md-6 nav-container">
                            <nav>
                                <ul>
                                    <button className='btn'>Rent Vehicle</button>

                                    <button className='btn'>Become Host</button>

                                    {(state && !user?.email_verfied) ?
                                        
                                         <><Link to ='/dashboard'><button className='btn'>Dashboard</button></Link>
                                        <li className='login-list'>

                                            <button className='btn btn-primary' onClick={logout} >Logout</button>
                                        </li></> : (user) ? <li className='login-list'>
                                            <button className='btn btn-primary' onClick={logoutGoogle} >Logout</button>
                                        </li> :


                                            (<button className='btn btn-primary' onClick={() => setShowLogin(true)} >Login</button>)}
                                </ul>
                            </nav>
                            <LoginModal show={showLogin} close={() => setShowLogin(!showLogin)} />
                        </div>

                    </div>
                </div>
            </nav>
        </div>

    )
}

export default Navbar
