import React from 'react'
import axios from 'axios'
import { Formik, Form, Field } from 'formik';
import { ToastContainer, toast } from 'react-toastify';

function EmailVerify() {

    const url = 'http://localhost:5000/api'
    type loginType = {
        email: string
        }
    const sendEmail = async (formik: loginType) => {
        try {
            console.log('button clicked')
            const payload = { email: formik.email}
            const response = await axios.post(`${url}/user/forgotPassword`, payload, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'
                }
            });

            console.log(JSON.stringify(response.data.message))

            showMessage(response.data.message, 200);
            formik.email = ''
        } catch (error: any) {
            let status = error.response.status;
        }
    }
    function validateEmail(value: string) {
        let errors;
        if (!value) {
            errors = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            errors = 'Invalid email address';
        }
        return errors;
    }
    
    const showMessage = (message: string, statusCode: number) => {
        if (statusCode == 201 || statusCode == 200) toast.success(message)
        else toast.error(message)
    }




  return (

        <div className= 'w-1/4 mx-auto mt-3 flex flex-col justify-center items-center'>
          <img
          src="https://res.cloudinary.com/degtbdhfn/image/upload/v1677322210/sadhan_extra_images/email_deaf1e.png"
           height="200px"
           width="200px"
            /> 
                                              
          <div className= 'content w-full'> 
                     <h2 className='text-xl font-semibold '>Verify Your Email</h2>

                    <p className='text-sm mt-4'> You need to verify the your email address to proceed KYC verification. Please verify your email by clicking the button below.</p>
  
                        <button className="login-btn mt-4" type="submit">
                             Verify 
                        </button>          
          </div>
            </div>

  )
}

export default EmailVerify;
