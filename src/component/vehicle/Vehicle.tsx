import React from 'react'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import KhaltiCheckout from 'khalti-checkout-web'
const parser = require('html-react-parser')

const Vehicle = () => {
  const [id, setId] = useState(useParams().id)
  const [vehicle, setVehicle] = useState([])
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [days, setDays] = useState<Date>(new Date())
  const url = 'http://localhost:5000/api'

  const getVehicle = async () => {
    try {
      const response = await axios.get(`${url}/getVehicle/${id}`)
      setVehicle(response.data.data)
      console.log(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const dayDifference = (startDate: Date, endDate: Date): number => {
    const oneDay = 24 * 60 * 60 * 1000 // hours * minutes * seconds * miliseconds
    const diff = Math.round(
      Math.abs((startDate.getTime() - endDate.getTime()) / oneDay)
    )
    return diff
  }
  const correctTimezone = (e: any): Date => {
    const dateValue = new Date(e.target.value)
    const timezoneOffset = dateValue.getTimezoneOffset() * 60 * 1000 // convert minutes into miliseconds
    const newDate = new Date(dateValue.getTime() - timezoneOffset)
    return newDate
  }

  // khalti configuration
  let config = {
    // replace this key with yours
    publicKey: 'test_public_key_707fd3948d384680ac905e50372648f5',
    productIdentity: '1234567890',
    productName: 'Drogon',
    productUrl: 'http://gameofthrones.com/buy/Dragons',
    eventHandler: {
      onSuccess(payload: any) {
        // hit merchant api for initiating verfication
        console.log(payload)

        let data = {
          token: payload.token,
          amount: payload.amount
        }

        // verifying the request
        const response = axios
          .get(
            `http://localhost:5000/api/khalti/verify/${payload.token}/${payload.amount}`
          )
          .then(response => {
            console.log(response)
          })
      },
      // onError handler is optional
      onError(error: any) {
        // handle errors
        console.log(error)
      },
      onClose() {
        console.log('widget is closing')
      }
    },
    paymentPreference: [
      'KHALTI',
      'EBANKING',
      'MOBILE_BANKING',
      'CONNECT_IPS',
      'SCT'
    ]
  }

  let khalti = new KhaltiCheckout(config)
  const showCheckout = () => {
    khalti.show({ amount: 1000 })
  }

  useEffect(() => {
    getVehicle()
  }, [])

  return (
    <div className="container-fluid">
      {vehicle.map((item: any, index: number) => {
        return (
          <>
            <div className=" bg-white w-9/12 mx-auto mt-4 flex flex-col h-auto">
              <div className="header float-left">
                <h1 className="text-2xl text-left p-2 font-semibold">
                  {item.name + ' ' + item.model}
                </h1>
              </div>

              <div className="body h-4/5 flex justify-between">
                <div
                  className="image w-8/12 h-3/4 bg-green-200 rounded-sm drop-shadow-sm bg-rounded"
                  style={{
                    backgroundImage: `url(${item.carImages[0].url})`,
                    maxWidth: '100%',
                    height: '60vh',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'top'
                  }}
                ></div>
                <div className="booking w-3/12 h-3/4 rounded-xl bg-white drop-shadow-lg py-4">
                  <div className="content date ">
                    <h1 className="text-xl font-semibold py-2">Duration</h1>
                    <div className="date-container flex flex-col gap-y-4 mt-2">
                      <div className="date-input flex justify-between w-2/3 mx-auto">
                        <label className="texl-sm">Start Date</label>
                        <input
                          name="startDate"
                          type="date"
                          value={startDate.toISOString().substr(0, 10)}
                          className="bg-white-100 rounded-sm shadow"
                          onChange={(e: any) => {
                            const newDate = correctTimezone(e)
                            setStartDate(newDate)
                          }}
                        ></input>
                      </div>

                      <div className="date-input flex justify-between w-2/3 mx-auto">
                        <label className="texl-sm">End Date</label>
                        <input
                          name="endDate"
                          type="date"
                          value={endDate.toISOString().substr(0, 10)}
                          className="bg-white-100 rounded-sm shadow"
                          onChange={(e: any) => {
                            const newDate = correctTimezone(e)
                            setEndDate(newDate)
                          }}
                        ></input>
                      </div>
                      <div className="total flex w-2/3 gap-y-4 mx-auto justify-between align-left">
                        <label className="text-left text-lg font-semibold">
                          Price
                        </label>
                        <label className="text-lg font-semibold">
                          {' '}
                          Rs {item.price + '/day'}
                        </label>
                      </div>

                      <div className="total flex w-2/3 gap-y-4 mx-auto justify-between align-left">
                        <label className="text-left text-lg font-semibold">
                          Time
                        </label>
                        <label className="text-lg font-semibold">
                          {dayDifference(startDate, endDate)} Days
                        </label>
                      </div>

                      <div className="total flex w-2/3 gap-y-4 mx-auto justify-between align-left">
                        <label className="text-left text-lg font-semibold">
                          Total
                        </label>
                        <label className="text-lg font-semibold">
                          Rs {dayDifference(startDate, endDate) * item.price}
                        </label>
                      </div>

                      <button
                        onClick={showCheckout}
                        className="w-2/3 bg-indigo-500 text-white mx-auto py-2 px-1 shadow-sm rounded-sm text-xl font-semibold"
                      >
                        Book Now!{' '}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" bg-white w-7/12 h-auto ">
                <div className="general-info w-3/4 flex justify-between py-2">
                  <div className="flex flex-col text-left">
                    <h3 className=" text-xl font-semibold">Milage</h3>
                    <p className=" text-sm ">{item.milage}</p>
                  </div>
                  <div className="flex flex-col text-left">
                    <h3 className=" text-xl font-semibold">Price</h3>
                    <p className=" text-sm ">{'Rs ' + item.price + '/day'}</p>
                  </div>

                  <div className="flex flex-col text-left">
                    <h3 className=" text-xl font-semibold">Location</h3>
                    <p className=" text-sm ">{item.location}</p>
                  </div>

                  <div className="flex flex-col text-left">
                    <h3 className=" text-xl font-semibold">Vehicle Number</h3>
                    <p className=" text-sm ">{item.vehicleNumber}</p>
                  </div>
                </div>
                <div className="description">
                  <h2 className="text-xl py-4 text-left">Description</h2>
                  <p className="text-left">{parser(item.description)}</p>
                </div>
              </div>
            </div>
          </>
        )
      })}
    </div>
  )
}

export default Vehicle
