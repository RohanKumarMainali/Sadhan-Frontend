import axios from 'axios'
import React from 'react'
import { Formik, Form, Field } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import {useParams} from 'react-router-dom'
import {auth} from '../../Firebase'
import { signInWithPhoneNumber, RecaptchaVerifier} from 'firebase/auth'


// redux ------------------
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {proceedKycForm} from '../../features/kyc/kycSlice'

interface phoneType{
        otp : any
    }


 const EnterOTP = () => {

     const url = 'http://localhost:5000/api'
    // get user id from local storage
    const user:any = localStorage?.getItem('user') ? localStorage.getItem('user') : null;
    const userId = JSON.parse(user).id;
    console.log(user)
    console.log(userId)

    // verify phone number 
    const verifyPhoneNumber = async () =>{
        try {
        const response = await axios.post(`${url}/verifyPhoneNumber`, {id: userId})
        console.log(response)    
        } catch (error: any) {
          console.log(error.message)    
        }
    }

    // redux

    const dispatchRedux = useAppDispatch();

    const verifyOTP =(formik: phoneType)=>{
        let otp = formik.otp;
        let recaptchaVerifier = window.recaptchaVerifier;
        window.confirmationResult.confirm(otp)
        .then(async(res :any) => {
                console.log(res)
               verifyPhoneNumber(); 
               dispatchRedux(proceedKycForm()) 
            })
        .catch((error : any) => {
            console.log(error)
            })

        } 


    return (
        <div>
          <div className = ' mt-10'>
            <Formik
                initialValues={{
                    otp: ''
                }}
                onSubmit={values => {verifyOTP(values)}}
            >
                {({ errors, touched, isValidating }) => (
                    <Form className='w-1/4 mx-auto mt-3 flex flex-col justify-center items-center'>
                    <h2 className='text-xl font-semibold '>Verify it's you</h2>
                      <img src = 'https://img.freepik.com/free-vector/enter-otp-concept-illustration_114360-7897.jpg' / >

                    <h4 className='text-xl font-semibold '>Enter a verification code</h4>
                    <p className='text-sm '> A 6 digit OTP verification code was sent on your phone number</p>
                        <Field type='text ' className="mt-3 w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400" placeholder='Phone Number' name='otp'  />
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

