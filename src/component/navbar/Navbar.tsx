import React, { useEffect } from 'react';
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

function Navbar() {
   
    const search = useRef<HTMLInputElement>(null);
    const focusSearch = () =>{
        search.current?.focus();
    }
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

   return (
        <div>
            <nav className = 'main-navbar'>

     
     <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={10}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input ref={initialRef} placeholder='Email' />
            </FormControl>

            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input placeholder='Password' />
            </FormControl>

            <button className='login-btn' >
              Save
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

         </ModalBody>

          <ModalFooter className='login-footer'>
          <p>Don't have an account?</p>
            <Button colorScheme='blue' mr={3}>
              Sign up
            </Button>
          </ModalFooter>
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
                               <button className='btn btn-primary' onClick = {onOpen}>Login</button>
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
