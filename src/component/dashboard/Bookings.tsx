import React from 'react'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import moment from 'moment'
import { Formik, Form, Field } from 'formik'
import { useParams } from 'react-router-dom'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import PreviewImage from './PreviewImage'

function Bookings() {
    const url = 'http://localhost:5000/api'
    const [userId, setUserId] = useState('')
    const [bookings, setBookings] = useState([])

    // to get userId who is posting vehicle
    const getUser = async () => {
        try {
            const response = await axios.get(`${url}/session`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            let details = response.data.payload
            console.log(details)
            setUserId(details.id)
            getBookings(details.id)
        } catch (error: any) {
            console.log(error)
        }
    }

    const getBookings = async (userId: string) => {
        try {
            const response = await axios.get(`${url}/booking?userId=${userId}`)
            setBookings(response.data.bookings)
            console.log('booking data ' + response.data.bookings)
        } catch (err) {
            console.log(err)
        }
    }

    const getVehicle = async () => {

    }


    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className=" w-full p-5 float-right h-screen bg-red bg-slate-100">
            <div
                className="dashboard-home bg-white main-profile w-full mt-14 mx-auto  rounded shadow-xl"
                style={{ height: '90vh' }}
            >
                <div className="w-11/12 mx-auto">
                    <h1 className="text-left text-2xl font-semibold p-2">
                        Vehicle Bookings
                    </h1>

                    {bookings.map((booking: any, index: number) => {
                        return (
                            <div key={index} className="single-booking bg-blue-500 text-white shadow-xl rounded flex justify-center p-5 mt-3 ">
                                <div className=''>
                                    <span>Vehicle Id: </span>{booking.vehicleId}
                                    <span className='ml-5'>From : </span>{moment(booking.startDate).format('MMMM Do YYYY')}
                                    <span className='ml-5'>  To : </span>{moment(booking.endDate).format('MMMM Do YYYY')}
                                    <span className='ml-5'>  Status: </span>{booking.status}
                                    <span className='ml-5'>  Amount: </span>{booking.amount}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Bookings
