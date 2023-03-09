import React from 'react'
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import { ToastContainer, toast } from 'react-toastify'

// redux ------------------
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { proceedKycForm } from '../../features/kyc/kycSlice'

function EmailVerify() {
  // get user id from local storage
  const user: any = localStorage?.getItem('user')
    ? localStorage.getItem('user')
    : null
  const email = JSON.parse(user).email
  const id = JSON.parse(user).id
  const dispatchRedux = useAppDispatch()
  const url = 'http://localhost:5000/api'

  type loginType = {
    email: string
  }

  // verify email button click, send otp in email
  const sendEmail = async () => {
    try {
      const response = await axios.post(
        `${url}/sendEmailOTP`,
        { email: email, id: id },
        {
          withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        }
      )
      showMessage('OTP is sent on your email', 200)
      dispatchRedux(proceedKycForm())
    } catch (error: any) {
      showMessage(error.message, 400)
      console.log(error.message)
    }
  }

  const showMessage = (message: string, statusCode: number) => {
    if (statusCode == 201 || statusCode == 200) toast.success(message)
    else toast.error(message)
  }

  return (
    <div className="w-1/4 mx-auto mt-3 flex flex-col justify-center items-center">
      <img
        src="https://res.cloudinary.com/degtbdhfn/image/upload/v1677322210/sadhan_extra_images/email_deaf1e.png"
        height="200px"
        width="200px"
        alt="otp-image"
      />

      <div className="content w-full">
        <h2 className="text-xl font-semibold ">Verify Your Email</h2>

        <p className="text-sm mt-4">
          {' '}
          You need to verify the your email address to proceed KYC verification.
          Please verify your email by clicking the button below.
        </p>

        <button className="login-btn mt-4" onClick={sendEmail}>
          Verify
        </button>
      </div>
    </div>
  )
}

export default EmailVerify
