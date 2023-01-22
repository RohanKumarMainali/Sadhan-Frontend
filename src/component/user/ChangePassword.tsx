import React from 'react'
import axios from 'axios'
import { Formik, Form, Field } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import {useParams} from 'react-router-dom'


 const ChangePassword = (props: {}) => {
    
    function validateNewPassword(value: string) {
        let errors;
        if (!value) {
            errors = 'Required';
        } else if (value.length<8) {
            errors = 'Password must be greater than 8 characters';
        }
        return errors;
    }


    function validateOldPassword(value: string) {
        let errors;
        if (!value) {
            errors = 'Required';
        } else if (value.length<8) {
            errors = 'Password must be greater than 8 characters';
        }
    }
    function validateConfirmPassword(value: string) {
        let errors;
        if (!value) {
            errors = 'Required';
        } else if (value.length<8) {
            errors = 'Password must be greater than 8 characters';
        }
    }
 
    return (
<>
            <h1 className = 'text-2xl font-bold mx-auto mt-5'>Change Password</h1>
            <Formik
                initialValues={{
                    oldPassword:"",
                    newPassword: "",
                    confirmPassword: ""
                }}

                onSubmit={values => { console.log('submit') }}

            >
                {({ errors, touched, isValidating }) => (
                    <Form className='w-1/4 mx-auto mt-3'>
                        <Field type='password' className="w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400" placeholder='Old Password' name='oldPassword' validate={validateOldPassword} />
                        {errors.newPassword && touched.newPassword && <div className='text-xs text-red-700 mt-1'>{errors.newPassword}</div>}
                        <Field type='password' className="w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400" placeholder='New Password' name='newPassword' validate={validateNewPassword} />
                        {errors.newPassword && touched.newPassword && <div className='text-xs text-red-700 mt-1'>{errors.newPassword}</div>}
                        <Field type='password' className="w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400" placeholder='Confirm Password' name='confirmPassword' validate={validateConfirmPassword} />
                        {errors.confirmPassword && touched.confirmPassword && <div className='text-xs text-red-700 mt-1'>{errors.confirmPassword}</div>}


                        <button className='login-btn' type='submit' >
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>

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

            
            </>

    )
}

export default ChangePassword;
