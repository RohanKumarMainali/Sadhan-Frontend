import React from 'react'


let bikes = require('../../images/bikes.jpg');
let bike = require('../../images/bike.jpg');

function Banner() {
  return (
    <div>

        <div className="contain-fluid">
            <img src={bikes} alt="bike" />
        </div>

    </div>
  )
}

export default Banner