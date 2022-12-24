import React, { useEffect } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {useRef} from 'react';
import {Link} from 'react-router-dom'

let logo = require('../../images/newLogo.png')


function Navbar() {
   
    const search = useRef<HTMLInputElement>(null);
    const focusSearch = () =>{
        search.current?.focus();
    }
  
    
    return (
        <div>
            <nav className = 'main-navbar'>

            <div className="container">
                <div className="row">
                    <div className="col-md-3 navbar-logo">
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className="col-md-4">
                        <form action="" className='navbar-form'>
                            <input type="text" ref={search} onClick= {focusSearch} className = 'navbar-search-input' placeholder='Search Vehicle ...' required />
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
                               <Link to = '/login'>
                               <button className='btn btn-primary'>Login</button>
                               </Link> 
                            </ul> 
                        </nav>
                    </div>

                </div>
            </div>
            </nav>
        </div>

    )
}

export default Navbar
