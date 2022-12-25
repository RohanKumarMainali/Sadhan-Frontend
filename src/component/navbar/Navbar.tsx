import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {useRef} from 'react';
import {Link} from 'react-router-dom'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,FormControl,
  FormLabel,
  Input,

} from '@chakra-ui/react'

import {FcGoogle} from 'react-icons/fc';
import {BsFacebook,BsTwitter} from 'react-icons/bs';
let logo = require('../../images/newLogo.png')


function Navbar({user}: any) {
    const search = useRef<HTMLInputElement>(null);
    const focusSearch = () =>{
        search.current?.focus();
    }
  const { isOpen: isSignupOpen , onOpen: onSignupOpen, onClose: onSignupClose } = useDisclosure()
  const { isOpen: isLoginOpen , onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const google = ()=>{
       window.open('http://localhost:5000/api/google','_self'); 
      }

  const logout = () => {
    window.open("http://localhost:5000/api/logout", "_self");
  };
      useEffect(()=>{console.log(user?.email)});


   return (
        <div>
            <nav className = 'main-navbar'>

     
     <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isLoginOpen}
        onClose={onLoginClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={10} className='login-body'>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input ref={initialRef} placeholder='Email' />
            </FormControl>

            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input placeholder='Password' />
            </FormControl>

            <button className='login-btn' >
              Login
            </button>
            <FormControl mt={6}>
              <button className='social-login-btn' onClick={google}>
                <FcGoogle className='social-logo'/> Continue with Google
              </button>
            </FormControl>

            <FormControl mt={3}>
              <button className='social-login-btn'>
                <BsFacebook color='3b5998' className =' social-logo'/> Continue with Facebook
              </button>
            </FormControl>

            <FormControl mt={3}>
              <button className='social-login-btn'>
                <BsTwitter color= '00acee'className='social-logo'/> Continue with Twitter
              </button>
            </FormControl>

          <div className='login-footer'>
          <p>Don't have an account?</p>
            <button onClick = {()=>{onLoginClose(); onSignupOpen();}} className='signup-btn'>
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
            <FormControl style={{width: '43%'}}>
              <FormLabel>First Name</FormLabel>
              <Input ref={initialRef} placeholder='First Name' />
            </FormControl>
            <FormControl style={{width: '43%'}}>
              <FormLabel>Last Name</FormLabel>
              <Input placeholder='Last Name' />
            </FormControl>
          </div>
          
            <FormControl mt={2}>
              <FormLabel>Email</FormLabel>
              <Input placeholder='Email' />
            </FormControl>
 
            <FormControl mt={2}>
              <FormLabel>Password</FormLabel>
              <Input placeholder='Password' />
            </FormControl>


            <button className='login-btn' >
              Signup
            </button>
            <FormControl mt={6}>
              <button className='social-login-btn'>
                <FcGoogle className='social-logo'/> Continue with Google
              </button>
            </FormControl>

            <FormControl mt={3}>
              <button className='social-login-btn'>
                <BsFacebook color='3b5998' className =' social-logo'/> Continue with Facebook
              </button>
            </FormControl>

            <FormControl mt={3}>
              <button className='social-login-btn'>
                <BsTwitter color= '00acee'className='social-logo'/> Continue with Twitter
              </button>
            </FormControl>

          <div className='login-footer'>
          <p>Already have an account?</p>
            <button className='signup-btn' onClick={()=>{onSignupClose(); onLoginOpen()}}>
              Login
            </button>
          </div>
 
         </ModalBody>

       </ModalContent>
      </Modal>   
 
            <div className="container">
                <div className="row">
                    <div className="col-md-3 navbar-logo">
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className="col-md-4">
                        <form action="" className='navbar-form'>
                            <input type="text" ref={search} onClick= {focusSearch} className = 'navbar-search-input' placeholder='Search Vehicle ...' required />
                            <i className="fa">
                                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                            </i>
                        </form>
                    </div>
                    <div className="col-md-5 nav-container">
                        <nav>
                            
                            <ul>
                               <button className='btn'>Rent Vehicle</button>
                               <button className='btn'>Become Host</button>
                               {user?.email_verified ? (<>

                               <li><img src={user.picture}  className='avatar' />
                                  <button className='btn btn-primary' onClick = {logout} >Logout</button>
                               </li>              
                               </>):
                               (<button className='btn btn-primary' onClick = {onLoginOpen}>Login</button>)
                               }
                            </ul> 
                        </nav>
                    </div>

                </div>
            </div>
            </nav>
        </div>

    )
}

export default Navbar
