import React from 'react'
import './Banner.css'
import Navbar from '../navbar/Navbar';

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

//test the ssh
let bikes = require('../../images/bikes.jpg');
let bike = require('../../images/bike.jpg');
let yellowBike = require('../../images/yellowBike.png');

function Banner() {


  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

    return (
        <div>
     
<Button onClick={onOpen}>Open Modal</Button>
      <Button ml={4} ref={finalRef}>
        I'll receive focus on close
      </Button>
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
            <div className="container-fluid ">
                    <div className="row align-items-center"  >
                            <div className="bike-image"
                                style={{
                                    backgroundImage: `url(${bikes})`,
                                    maxWidth: '100%',
                                    height: '100vh',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'top',

                                }}     >
                                    
                        </div>
                            <div className='banner-text1'>
                                <h1>Find Your Drive</h1>
                                <h5>Explore the world's largest vehicle sharing marketplace</h5>
                            </div>




                    {/* </div> */}

                </div>

            </div>

        </div>
    )
}

export default Banner
