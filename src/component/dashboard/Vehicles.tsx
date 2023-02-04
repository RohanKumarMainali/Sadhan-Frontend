import React from 'react'
import axios from 'axios'
import { useEffect, useState,useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import {Link} from 'react-router-dom'
import moment from 'moment'
import { Formik, Form, Field } from 'formik'
import { useParams } from 'react-router-dom'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import PreviewImage from './PreviewImage'

interface passwordType {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
interface userType {
  id: string
}
function Vehicles() {
  const url = 'http://localhost:5000/api'
  const [vehicles, setVehicles] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [addVehicleModal, setAddVehicleModal] = useState(false)
  const [userId, setUserId] = useState(0)
  const [request, setRequest] = useState(false)
  const fileRef = useRef(null)

  const getUsers = async () => {
    try {
      const response = await axios.get(`${url}/getVehicle`)
      setVehicles(response.data.vehicles)
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteUser = (id: number) => {
    setShowModal(true)
    setUserId(id)
  }

  const confirmDelete = async () => {
    setShowModal(false)
    try {
      const response = await axios.delete(`${url}/deleteVehicle/${userId}`)
      console.log(response)
      showMessage(response.data.message, 200)
      if (request) {
        setRequest(false)
      } else {
        setRequest(true)
      }
    } catch (error) {
      showMessage("Couldn't Delete User", 400)
    }
  }

  const showMessage = (message: string, statusCode: number) => {
    if (statusCode == 201 || statusCode == 200) toast.success(message)
    else toast.error(message)
  }

  {
    /* add vehicle */
  }
  const addVehicle = async (formik: passwordType) => {
    const url = 'http://localhost:5000/api'
  }


  useEffect(() => {
    getUsers()
  }, [request])

  return (
    <div className=" w-[calc(100%-14rem)]  float-right h-screen bg-red bg-slate-100">
      <div
        className="dashboard-home bg-white main-profile w-4/5 mt-14 mx-auto  rounded shadow-xl"
        style={{ height: '90vh' }}
      >
        <div className="w-11/12 mx-auto">
          <h1 className="text-left text-2xl font-semibold p-2">
            Manage Vehicles
          </h1>
        </div>
        <table className="table-auto mt-3 w-11/12 mx-auto rounded-xl shadow-xl bg-slate-100 border-collapse border border border-slate-400">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle: any, index: number) => {
              return (
                <>
                  <tr
                    key={index}
                    className={index % 2 == 0 ? 'bg-slate-50' : 'bg-slate-100'}
                  >
                    <td className="border border-slate-300 " width="5%">
                      {index + 1}
                    </td>
                    <td className="border border-slate-300 px-3 text-left">
                      {vehicle.name}
                    </td>
                    <td className="border border-slate-300  text-left px-3">
                      {'Rs ' + vehicle.price + '/day'}
                    </td>
                    <td className="border border-slate-300  ">
                      {moment.utc(vehicle.createdOn).format('MM/DD/YYYY')}
                    </td>
                    <td className="border border-slate-300">unverified</td>
                    <td className="border border-slate-300 align-left ">
                      <button className="border bg-green-500 text-white text-sm px-4 mt-1 py-2 mb-2 rounded :hover-bg-green-700">
                        Edit
                      </button>
                      <button
                        className="border ml-2 bg-red-600 text-white text-sm px-4 mt-1 mb-2 py-2 rounded :hover-bg-green-700"
                        onClick={() => deleteUser(vehicle._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>
        <Link to = '/dashboard/addVehicle'>
           <button
             className="border py-2 px-1 text-white rounded bg-indigo-500 text-xs font-medium"
           >
              Add vehicle
            </button>
        </Link>
        {showModal ? (
          <div
            id="popup-modal"
            tabIndex={-1}
            className="fixed top-0 left-0 right-0 z-50  flex justify-center items-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
          >
            <div className="relative w-full h-full max-w-md md:h-auto">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-hide="popup-modal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-6 text-center">
                  <svg
                    aria-hidden="true"
                    className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this user?
                  </h3>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    onClick={confirmDelete}
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    data-modal-hide="popup-modal"
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

                <div></div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default Vehicles
