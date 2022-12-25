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
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
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
