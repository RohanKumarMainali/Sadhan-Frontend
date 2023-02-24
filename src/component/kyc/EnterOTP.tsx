import axios from 'axios'
import React from 'react'
import { Formik, Form, Field } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import {useParams} from 'react-router-dom'
import {auth} from '../../Firebase'
import { signInWithPhoneNumber, RecaptchaVerifier} from 'firebase/auth'

interface phoneType{
        phoneNumber : any
    }


 const EnterOTP = () => {

   const verify = (formik: phoneType)=>{

       }

    return (
        <div>
          <div className = ' mt-10'>
            <Formik
                initialValues={{
                    phoneNumber: ''
                }}
                onSubmit={values => {verify(values)}}
            >
                {({ errors, touched, isValidating }) => (
                    <Form className='w-1/4 mx-auto mt-3 flex flex-col justify-center items-center'>
                    <h2 className='text-xl font-semibold '>Verify it's you</h2>
                      <img src = 'https://img.freepik.com/free-vector/enter-otp-concept-illustration_114360-7897.jpg' / >

                    <h4 className='text-xl font-semibold '>Enter a verification code</h4>
                    <p className='text-sm '> A 6 digit OTP verification code was sent on your phone number</p>
                        <Field type='text ' className="mt-3 w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400" placeholder='Phone Number' name='phoneNumber'  />
                        <button className='login-btn' type='submit' >
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
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

           <div id='captcha'></div>
  </div>
  )
 
}

export default EnterOTP

