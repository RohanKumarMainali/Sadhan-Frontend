
import React, { useState, useEffect, useContext } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button, FormControl,
    FormLabel,
    Input,

} from '@chakra-ui/react'

import AlertPop from './Alert'
import axios from 'axios'
import { FcGoogle } from 'react-icons/fc';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFacebook, BsTwitter } from 'react-icons/bs';
import {UserContext} from '../../App'
let logo = require('../../images/newLogo.png')

interface Props {
    show: boolean,
    close: () => void
}

export const LoginModal = ({ show, close }: Props) => {

    const {state,dispatch} = useContext(UserContext)
    const initialValue = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        signupEmail: "",
        signupPassword: "",
    }

    const [values, setValues] = useState(initialValue);
    const [statusCode, setStatusCode] = useState(0);

    const url = 'http://localhost:5000/api';

    const storeAuthentication = (user: any) => {
        localStorage.setItem("user", JSON.stringify(user));
    };
    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        // name-> e.target.name
        // value-> e.target.value
        const { name, value } = e.currentTarget;

        setValues({
            ...values,
            [name]: value
        })
    }
    const { isOpen: isSignupOpen, onOpen: onSignupOpen, onClose: onSignupClose } = useDisclosure()
    const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const login = async () => {
        try {
            const payload = { email: values.email, password: values.password }
            const response = await axios.post(`${url}/user/login`, payload, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'
                }
            });
            if (response.status == 200) {
                storeAuthentication(response.data);
                setStatusCode(200);
                onLoginClose();
                dispatch({type: "USER", payload:true})
//                window.location.replace(`http://localhost:3000`)
            }

            console.log(JSON.stringify(response.data.message))
        } catch (error: any) {
            let status = error.response.status;
            if (status == 401) setStatusCode(401);
        }
    }

    const showMessage = (message: string, statusCode: number) => {
        if (statusCode == 201 || statusCode == 200) toast.success(message)
        else toast.error(message)
    }

    const signup = async () => {
        try {

            const payload = { firstName: values.firstName, lastName: values.lastName, email: values.signupEmail, password: values.signupPassword }
            const response = await axios.post(`${url}/user/signup`,
                payload,
                {
                    headers: {
                        'Access-Control-Allow-Origin': "*", 'Content-Type': 'application/json'
                    }
                }
            )
            console.log(response)
            onSignupClose();
            showMessage(response.data.message, 201);
        } catch (error: any) {

            let status = error.response.status
            if (status == 409) {
                console.log(error.message)
                showMessage(error.response.data, status);
            }

            onSignupClose();
        }
    }

    const google = () => {
        window.open('http://localhost:5000/api/google', '_self');
    }

    const logout = () => {
        window.open("http://localhost:5000/api/logout", "_self");
    };

    useEffect(()=>{console.log(state)})

    return (
        <div>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={show}
                onClose={close}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Login</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={10} className='login-body'>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input name='email' value={values.email} onChange={handleInputChange} ref={initialRef} placeholder='Email' />
                        </FormControl>

                        <FormControl mt={6}>
                            <FormLabel>Password</FormLabel>
                            <Input name='password' type='password' value={values.password} onChange={handleInputChange} placeholder='Password' />
                        </FormControl>

                        <button className='login-btn' onClick={login}>
                            Login
                        </button>
                        {statusCode == 401 ? <div>
                            <AlertPop statusCode={401} message='Incorrect username or password ' />
                        </div> : <></>}
                        <FormControl mt={6}>
                            <button className='social-login-btn' onClick={google}>
                                <FcGoogle className='social-logo' /> Continue with Google
                            </button>
                        </FormControl>

                        <FormControl mt={3}>
                            <button className='social-login-btn'>
                                <BsFacebook color='3b5998' className=' social-logo' /> Continue with Facebook
                            </button>
                        </FormControl>

                        <FormControl mt={3}>
                            <button className='social-login-btn'>
                                <BsTwitter color='00acee' className='social-logo' /> Continue with Twitter
                            </button>
                        </FormControl>

                        <div className='login-footer'>
                            <p>Don't have an account?</p>
                            <button onClick={() => { close(); onSignupOpen(); }} className='signup-btn'>
                                Sign up
                            </button>
                        </div>

                    </ModalBody>

                </ModalContent>
            </Modal>


            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isSignupOpen}
                onClose={onSignupClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Let's Get Started</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={10} className='signup-body'>
                        <div className='signup-name'>
                            <FormControl style={{ width: '43%' }}>
                                <FormLabel>First Name</FormLabel>
                                <Input name='firstName' value={values.firstName} onChange={handleInputChange} ref={initialRef} placeholder='First Name' />
                            </FormControl>
                            <FormControl style={{ width: '43%' }}>
                                <FormLabel>Last Name</FormLabel>
                                <Input name='lastName' value={values.lastName} onChange={handleInputChange} placeholder='Last Name' />
                            </FormControl>
                        </div>

                        <FormControl mt={2}>
                            <FormLabel>Email</FormLabel>
                            <Input name='signupEmail' value={values.signupEmail} onChange={handleInputChange} placeholder='Email' />
                        </FormControl>

                        <FormControl mt={2}>
                            <FormLabel>Password</FormLabel>
                            <Input name='signupPassword' value={values.signupPassword} onChange={handleInputChange} placeholder='Password' />
                        </FormControl>


                        <button className='login-btn' onClick={signup}>
                            Signup
                        </button>
                        <FormControl mt={6}>
                            <button className='social-login-btn'>
                                <FcGoogle className='social-logo' /> Continue with Google
                            </button>
                        </FormControl>

                        <FormControl mt={3}>
                            <button className='social-login-btn'>
                                <BsFacebook color='3b5998' className=' social-logo' /> Continue with Facebook
                            </button>
                        </FormControl>

                        <FormControl mt={3}>
                            <button className='social-login-btn'>
                                <BsTwitter color='00acee' className='social-logo' /> Continue with Twitter
                            </button>
                        </FormControl>

                        <div className='login-footer'>
                            <p>Already have an account?</p>
                            <button className='signup-btn' onClick={() => { onSignupClose(); close(); }}>
                                Login
                            </button>
                        </div>

                    </ModalBody>

                </ModalContent>
            </Modal>

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

export default LoginModal
