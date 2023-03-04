
import React from 'react'
import {useEffect,useState} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';


// redux ------------------
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {proceedKycForm} from '../../features/kyc/kycSlice'


function ViewKyc() {

    // get user id from local storage
    const user:any = localStorage?.getItem('user') ? localStorage.getItem('user') : null;
    const id = JSON.parse(user).id
    const dispatchRedux = useAppDispatch();
    const url = 'http://localhost:5000/api'
    const [kycFormData, setKyc] = useState();

    const getUser = async ()=> {
            try {
               const response = await axios.get(`${url}/getUser/${id}`) 
               const kycForm = await response.data.data.kyc.kycFormData
               setKyc(kycForm)
               console.log(response)
            } catch (error: any) {
               console.log(error) 
            }
        }
    useEffect(() => {
     getUser();
    }, [])

  return (
                            <div className='details w-3/4 mx-auto'>
                                <div className='sub-details flex float-left  space-x-24 justify-center '>
                                  <div className= 'left-info'>
                                    <div className='basic-info flex p-3 '>
                                       <div className= 'verify-left '>

                                        <p className='text-left text-lg'>Full Name: </p>
                                        <p className='text-left text-lg'>Role: </p>
                                        <p className='text-left text-lg'>User verification: </p>
                                        <p className='text-left text-lg'>Approve to drive ?</p>
                                        <p className='text-left text-lg'>Email address </p>
                                        <p className='text-left text-lg'>Phone number</p>

                                        </div>
                                       <div className= 'verify-right '>
                                        <p className='text-right text-lg '>{kycFormData?.firstName + ' ' + kycFormData?.middleName + ' '+ kycFormData?.lastName }</p>
                                        <p className='text-right text-lg '> role </p>
                                        <p className='text-right text-lg text-red-400'>Pending </p>

                                        <p className='text-right text-lg text-indigo-500'>Verify license</p>
                                        <p className='text-right text-lg text-indigo-500'>Verify Email address </p>
                                        <p className='text-right text-indigo-500 '>Verify Number</p>

                                        </div>

                                            
                                    </div>

                                </div>


                             </div>
                        </div>
                             
  )
}

export default ViewKyc
