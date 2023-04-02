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

  const getVehicle = async () => {}

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className=" w-full p-0 px-5 float-right h-screen ">
      <div
        className="dashboard-home bg-white main-profile w-full mx-auto  rounded shadow-xl"
        style={{ height: '90vh' }}
      >
        <div className="mx-auto w-full px-5">
          <h1 className="text-left text-xl font-semibold p-2">
            Vehicle Bookings
          </h1>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Vehicle Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Start Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    End Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking: any, index: number) => {
                  return (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={index}
                    >
                      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple Macbook
                      </th>
                      <td className="px-6 py-4">
                        {moment(booking.startdate).format('MMMM DD, YYYY')}
                      </td>
                      <td className="px-6 py-4">
                        {moment(booking.endDate).format('MMMM DD, YYYY')}
                      </td>
                      <td className="px-6 py-4 App-completed">
                        {booking.status}
                      </td>

                      <td className="px-6 py-4">Rs {' ' + booking.amount}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bookings
