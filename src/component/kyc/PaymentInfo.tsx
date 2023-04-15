import React from 'react'

import axios from 'axios'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

import OtpInput from 'otp-input-react'

// redux ------------------
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { proceedKycForm } from '../../features/kyc/kycSlice'

import { Formik, Form, Field } from 'formik'
const khaltiImg = require('../../images/logo1.png')

function PaymentInfo() {
  const dispatchRedux = useAppDispatch()

  const sendOTP = (formik: any) => {
    const phoneNumber = formik.phoneNumber
    dispatchRedux(proceedKycForm())
  }

  return (
    <div>
      <Formik
        initialValues={{
          phoneNumber: ''
        }}
        onSubmit={values => {
          sendOTP(values)
        }}
      >
        {({ errors, touched, isValidating }) => (
          <Form className="w-1/4 mx-auto mt-3 flex flex-col justify-center items-center">

            <h2 className="text-3xl font-semibold ">Provide your Khalti Information </h2>
            <img
              src={khaltiImg}
              height="400px"
              width="400px"
            />

            <Field
              type="text "
              className="mt-3 w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
              placeholder="User Name"
              name="userName"
            />
            <Field
              type="text "
              className="mt-3 w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
              placeholder="Email"
              name="Email"
            />
            <Field
              type="text "
              className="mt-3 w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
              placeholder="Phone Number"
              name="phoneNumber"
            />

            <button className="login-btn" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default PaymentInfo
