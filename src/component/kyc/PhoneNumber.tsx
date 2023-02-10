import React from 'react'
import axios from 'axios'
import { Formik, Form, Field } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import {useParams} from 'react-router-dom'
import {auth} from '../../Firebase'
import { signInWithPhoneNumber, RecaptchaVerifier} from 'firebase/auth'

interface phoneType{
        phoneNumber : any
    }
const PhoneNumber = () => {
    
    const generateRecaptcha = () =>{
            window.recaptchaVerifier = new RecaptchaVerifier('captcha',{
                'size': 'invisible',
                'callback': (response: any)=>{

                    }
                },auth)
        }
    const sendOTP = (formik: phoneType)=>{

        const phoneNumber = formik.phoneNumber;
        generateRecaptcha();
        let recaptchaVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
         .then((confirmResult: any)=>{
             window.confirmationResult = confirmResult;
             let code = prompt('enter the otp');
             if(code == null) return;
             
             confirmResult.confirm(code).then(function(result: any){
                    console.log('user ' + result.user);
                 })


                // SMS sent. Prompt user to enter code
                // user in with confirmationResult.confirm(code).
             })
         .catch((error: any)=>{
                console.log('error '+error)
             })
            
        }

    return (
        <div>
          <div className = ' mt-10'>
            <Formik
                initialValues={{
                    phoneNumber: ''
                }}

                onSubmit={values => {sendOTP(values)}}

            >
                {({ errors, touched, isValidating }) => (
                    <Form className='w-1/4 mx-auto mt-3'>
                        <Field type='text' className="w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400" placeholder='Phone Number' name='phoneNumber'  />


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
 
export default PhoneNumber
