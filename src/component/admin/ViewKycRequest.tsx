import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export interface UserDataProps {
  userData: {
    citizenshipImageFront: {
      url: string
    }
    citizenshipImageBack: {
      url: string
    }
    drivingLicenseImage: {
      url: string
    }

    kycFormData: {
      firstName: string
      middleName: string
      lastName: string
      dateOfBirth: string
      province: string
      district: string
      municipality: string
      wardNumber: string
      citizenshipNumber: string
      citizenshipIssuedBy: string
      citizenshipIssuedDate: string
      drivingLicenseNumber: string
      drivingLicenseExpireDate: string
      drivingLicenseIssuedDate: string
      drivingLicenseIssuedBy: string
      id: string
    }
  }
}

const KycUserRequest: React.FC<UserDataProps> = ({ userData }) => {
  const { citizenshipImageFront, citizenshipImageBack, drivingLicenseImage } =
    userData
  const {
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    district,
    province,
    municipality,
    wardNumber,
    citizenshipNumber,
    citizenshipIssuedDate,
    citizenshipIssuedBy,
    drivingLicenseNumber,
    drivingLicenseIssuedDate,
    drivingLicenseIssuedBy,
    drivingLicenseExpireDate,
    id
  } = userData.kycFormData

  const url = 'http://localhost:5000/api'
  const navigate = useNavigate()

  const approveKyc = async () => {
    try {
      const response = await axios.post(
        `${url}/verifyKyc`,
        { id: id },
        {
          withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        }
      )
      toast.success('User verified successfully')

      // navigate to dashboard
    } catch (error: any) {
      showMessage(error.message, 400)
    }
  }

  const showMessage = async (message: string, statusCode: number) => {
    if (statusCode == 201 || statusCode == 200) await toast.success(message)
    else await toast.error(message)
  }

  return (
    <>
      <div className="main flex justify-between ">
        <div className="sub-details p-4 mt-5 flex float-left bg-blue-50 w-2/6 space-x-24 justify-center ">
          <div className="left-info w-full">
            <div className="basic-info  flex">
              <div className="verify-left w-1/2">
                <p className="text-left text-sm">Full Name: </p>
                <p className="text-left text-sm">Date Of Birth: </p>
                <p className="text-left text-sm">Province: </p>
                <p className="text-left text-sm">District: </p>
                <p className="text-left text-sm">Municipality: </p>
                <p className="text-left text-sm">Ward Number: </p>
              </div>
              <div className="verify-right w-1/2">
                <p className="text-right text-sm ">
                  {firstName + ' ' + middleName + ' ' + lastName}
                </p>
                <p className="text-right text-sm "> {dateOfBirth} </p>
                <p className="text-right text-sm ">{province} </p>
                <p className="text-right text-sm ">{district}</p>
                <p className="text-right text-sm ">{municipality}</p>
                <p className="text-right text-sm ">{wardNumber}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 mt-5  bg-blue-50 w-2/6 space-x-24 justify-center ">
          <div className="citizenship-details ">
            <div className="left-info w-full">
              <div className="basic-info  flex">
                <div className="verify-left w-1/2">
                  <p className="text-left text-sm">citizenship number: </p>
                  <p className="text-left text-sm">citizenship issue date:</p>
                  <p className="text-left text-sm">citizenship issused by: </p>
                </div>
                <div className="verify-right w-1/2">
                  <p className="text-right text-sm ">{citizenshipNumber}</p>
                  <p className="text-right text-sm ">
                    {' '}
                    {citizenshipIssuedDate}{' '}
                  </p>
                  <p className="text-right text-sm ">{citizenshipIssuedBy} </p>
                </div>
              </div>
            </div>
          </div>

          <div className="float-left m-0">
            <img alt="Citizenship Front" src={citizenshipImageFront.url}></img>
            <img alt="Citizenship Back" src={citizenshipImageBack.url}></img>
          </div>
        </div>

        <div className="p-4 mt-5  bg-blue-50 w-2/6 space-x-24 justify-center ">
          <div className="citizenship-details ">
            <div className="left-info w-full">
              <div className="basic-info  flex">
                <div className="verify-left w-1/2">
                  <p className="text-left text-sm">Driving License Number: </p>
                  <p className="text-left text-sm">License issused by: </p>
                  <p className="text-left text-sm">License issue date:</p>
                  <p className="text-left text-sm">License Expire date:</p>
                </div>
                <div className="verify-right w-1/2">
                  <p className="text-right text-sm ">{drivingLicenseNumber}</p>
                  <p className="text-right text-sm ">
                    {' '}
                    {drivingLicenseIssuedBy}{' '}
                  </p>
                  <p className="text-right text-sm ">
                    {drivingLicenseIssuedDate}{' '}
                  </p>
                  <p className="text-right text-sm ">
                    {drivingLicenseExpireDate}{' '}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="float-left m-0">
            <img alt="License Image" src={drivingLicenseImage.url}></img>
          </div>
        </div>
      </div>

      <button
        className="mr-5 bg-danger float-left confirmKycButton mt-4"
        style={{ width: '15%' }}
      >
        Reject
      </button>
      <button
        className="mr-5 float-left confirmKycButton mt-4"
        style={{ width: '15%' }}
        onClick={approveKyc}
      >
        Approve
      </button>
    </>
  )
}

export default KycUserRequest
