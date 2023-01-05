import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import LoginModal from '../modal/LoginModal'
import {CgProfile} from 'react-icons/cg'
let logo = require('../../images/newLogo.png')

function Navbar({ user }: any) {
    const search = useRef<HTMLInputElement>(null);
    const [statusCode, setStatusCode] = useState(0);
    const [showLogin, setShowLogin] = useState(false);

   const url = 'http://localhost:5000/api';

    const storeAuthentication = (user: any) => {
        localStorage.setItem("user", JSON.stringify(user));
    };
    const getUser = async () => {
        try {
            const response = await axios.get(`${url}/session`, {
                headers: {
                    'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            console.log('res ' + JSON.stringify(response.data))

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

    const logout = async() => {
        
        const response = await axios.get(`${url}/logout`,{
               withCredentials: true})
        localStorage.clear()
        //console.log(response)
        //window.open("http://localhost:5000/api/logout", "_self");
    };
    useEffect(() => {
        getUser();
    }, []);


    return (
        <div>
            <nav className='main-navbar'>

                <div className="container">
                    <div className="row">
                        <div className="col-md-3 navbar-logo">
                            <img src={logo} alt="Logo" />
                        </div>
                        <div className="col-md-4">
                            <form action="" className='navbar-form'>
                                <input type="text" ref={search} onClick={focusSearch} className='navbar-search-input' placeholder='Search Vehicle ...' required />
                                <i className="fa">
                                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                                </i>
                            </form>
                        </div>
                       <div className="col-md-5 nav-container">
                            <nav>
                                <ul>
                                    <button className='btn'>Rent Vehicle</button>
                                    <button className='btn'>Become Host</button>
                                    {(user?.email_verified || user?.firstName) ? (<>

                                        <li className='login-list'>
                                        <CgProfile/>
                                            {user.firstName}
                                            <button className='btn btn-primary' onClick={logout} >Logout</button>
                                        </li>
                                    </>) :
                                        (<button className='btn btn-primary' onClick = {()=> setShowLogin(true)} >Login</button>)
                                    }
                                </ul>
                            </nav>
                        
                        <LoginModal show = {showLogin} close ={()=>setShowLogin(!showLogin)}/>
                        </div>

                    </div>
                </div>
            </nav>
        </div>

    )
}

export default Navbar
