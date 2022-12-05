import React from 'react';
import './Navbar.css';
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
                        <form action="">
                            <input type="search" required />
                            <i className="fa fa-search"></i>
                            <a href="hello" id="clear-btn">Clear</a>
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