import React from 'react'
import './Banner.css'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import FAQ from './FAQ'
import GradientSection from './GradientSection'

//test the ssh
let bikes = require('../../images/bikes.jpg')

function Banner() {
    const [vehicles, setVehicles] = useState([])
    const url = 'http://localhost:5000/api'

    const getVehicle = async () => {
        try {
            const response = await axios.get(`${url}/getVehicle`)
            setVehicles(response.data.vehicles)
            console.log(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getVehicle()
    }, [])

    return (
        <div>
            <div className="container-fluid ">
                <div className="row align-items-center">
                    <div
                        className="bike-image"
                        style={{
                            backgroundImage: `url(${bikes})`,
                            maxWidth: '100%',
                            height: '95vh',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'top'
                        }}
                    ></div>
                    <div className="banner-text1">
                        <h1>Find Your Drive</h1>
                        <h5>Explore the world's largest vehicle sharing marketplace</h5>
                    </div>
                </div>
            </div>

            <div className="h-auto popular-categories h-auto h-52  w-2/3  mx-auto">
                <h2 className="text-2xl font-semibold text-left mt-16">
                    Browse by categories
                </h2>
                <div className="category-list flex justify-between mt-3">
                    <div className="h-44 w-1/5 shadow rounded-lg drop-shadow-sm">
                        <div
                            className="h-4/5"
                            style={{
                                backgroundImage: `url(https://images.unsplash.com/photo-1565701964127-a3f37fdbb46b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW90b3JiaWtlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60)`,
                                maxWidth: '100%',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'top'
                            }}
                        ></div>

                        <div className="h-1/5 flex items-center justify-center">
                            {' '}
                            <span className="text-lg font-semibold text-center">
                                Motorbikes
                            </span>
                        </div>
                    </div>

                    <div className="h-44 w-1/5 shadow rounded-lg drop-shadow-sm">
                        <div
                            className="h-4/5"
                            style={{
                                backgroundImage: `url(https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)`,
                                maxWidth: '100%',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'top'
                            }}
                        ></div>

                        <div className="h-1/5 flex items-center justify-center">
                            {' '}
                            <span className="text-lg font-semibold text-center">Cars</span>
                        </div>
                    </div>

                    <div className="h-44 w-1/5 shadow rounded-lg drop-shadow-sm">
                        <div
                            className="h-4/5"
                            style={{
                                backgroundImage: `url(https://i.imgur.com/XthjgWc.png)`,
                                maxWidth: '100%',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'top'
                            }}
                        ></div>

                        <div className="h-1/5 flex items-center justify-center">
                            {' '}
                            <span className="text-lg font-semibold text-center">EV</span>
                        </div>
                    </div>

                    <div className="h-44 w-1/5 shadow rounded-lg drop-shadow-sm">
                        <div
                            className="h-4/5"
                            style={{
                                backgroundImage: `url(https://images.unsplash.com/photo-1554223789-df81106a45ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNjb290ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60)`,
                                maxWidth: '100%',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'top'
                            }}
                        ></div>

                        <div className="h-1/5 flex items-center justify-center">
                            {' '}
                            <span className="text-lg font-semibold text-center">Scooter</span>
                        </div>
                    </div>
                </div>

                <div className="popular-categories mt-5 h-96 h-auto w-full  mx-auto ">
                    <h2 className="text-5xl text-center font-semibold ">
                        Top Rated Vehicles
                    </h2>
                    <div className=" grid gap-12 grid-cols-3 mt-20 mb-20">
                        {/* Vehicle list */}

                        {vehicles &&
                            vehicles.map((item: any, index: number) => {
                                return (
                                    <Link to={`vehicle/${item._id}`} key={index + 1}>
                                        <div key={index} className= 'App-link'>
                                            <div className="h-60  shadow rounded-lg drop-shadow-sm">
                                                <div
                                                    className="h-4/5"
                                                    style={{
                                                        backgroundImage: `url(${item.carImages[0].url})`,
                                                        maxWidth: '100%',
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'top'
                                                    }}
                                                ></div>

                                                <div className="h-1/5 flex items-center justify-between">
                                                    <div className="left-side">
                                                        <p className="text-lg font-semibold  px-2 text-left">{`${item.name} ${item.model}`}</p>
                                                    </div>

                                                    <div className="right-side">
                                                        <p className="text-lg font-semibold px-2 text-right">{`Rs ${item.price}/day`}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                    </div>
                </div>
            </div>
            <FAQ />
            <div className='relative h-auto'>
                <GradientSection/>
            </div>

        </div>
    )
}

export default Banner
