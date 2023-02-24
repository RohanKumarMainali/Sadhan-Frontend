import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { auth } from '../../Firebase'
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'
import EnterOTP from './EnterOTP'
import { Steps } from 'rsuite'
import './steps.css'


// redux ------------------
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {proceedKycForm} from '../../features/kyc/kycSlice'

interface phoneType {
    phoneNumber: any
}
const PhoneNumber = () => {
    
    // redux 
    const count = useAppSelector((state)=>state.kyc.kycFormStage)
    const dispatchRedux = useAppDispatch();

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(
            'captcha',
            {
                size: 'invisible',
                callback: (response: any) => { }
            },
            auth
        )
    }
    const [verify, setVerify] = useState(false)
    const sendOTP = (formik: phoneType) => {
        const phoneNumber = formik.phoneNumber
        generateRecaptcha()
        let recaptchaVerifier = window.recaptchaVerifier

        dispatchRedux(proceedKycForm()) 
       
       };

       return (

        <div>
            <div>
                        <div className=" w-[calc(100%-14rem)]  float-right h-screen bg-red bg-slate-100">
                            <div
                                className="dashboard-home flex bg-white main-profile w-4/5 mt-14 mx-auto  rounded shadow-xl"
                                style={{ height: '90vh' }}
                            >
                                <div className=" w-full">
                                    <Steps current={0} className="w-2/3 mx-auto mt-5 p-0">
                                        <Steps.Item title="Verify Number" />
                                        <Steps.Item title="Verify Email" />
                                        <Steps.Item title="KYC Form" />
                                        <Steps.Item title="Confirm Details" />
                                    </Steps>
                                    { count == 1 ? <EnterOTP/> : 
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
                                                <img
                                                    src="https://cdni.iconscout.com/illustration/premium/thumb/otp-verification-5152137-4309037.png"
                                                    height="400px"
                                                    width="400px"
                                                />
                                                <h2 className="text-3xl font-semibold ">
                                                    Verify Phone Number
                                                </h2>
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

                                    }
                                </div>
                            </div>
                        </div>
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

            <div id="captcha"></div>
        </div>
    )
}

export default PhoneNumber
