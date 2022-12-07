import React from 'react'
import './Banner.css'

let bikes = require('../../images/bikes.jpg');
let bike = require('../../images/bike.jpg');
let yellowBike = require('../../images/yellowBike.png');

function Banner() {
    return (
        <div>

            <div className="container-fluid ">
                {/* <div className="banner-img"
                    style={{
                        background: 'linear-gradient(0deg,transparent 345px, #fff 0 0 ) bottom right',
                        width: '100%',
                        height: ' 700px',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        // backgroundPosition: 'center'
                    }}
                > */}
                    <div className="row align-items-center"  >
                        <div className="col-md-5" >
                            <div className="banner-text">
                                <h3>
                                    High Service<br></br>
                                    for every<br></br>
                                    customer
                                </h3>
                            </div>
                        </div>
                        <div className="col-md-7 p-0 banner-img" >
                            <div className="bike-image"

                                style={{
                                    backgroundImage: `url(${bikes})`,
                                    maxWidth: '100%',
                                    height: '600px',
                                    
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'top',

                                }}     >
                                    
                            </div>
                        </div>



                    {/* </div> */}

                </div>

            </div>

        </div>
    )
}

export default Banner