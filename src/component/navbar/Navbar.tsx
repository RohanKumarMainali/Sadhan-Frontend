import React from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

let logo = require('../../images/sadhanLogo.png')


function Navbar() {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-3 navbar-logo">
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className="col-md-6">
                        <form action="" className='navbar-form'>
                            <input type="text" className = 'navbar-search-input' required />
                            <i className="fa">
                                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                            </i>
                        </form>
                    </div>
                    <div className="col-md-3">
                        <nav>
                            nav
                        </nav>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Navbar