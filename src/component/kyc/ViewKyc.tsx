import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { formType } from './KYCForm'


// redux ------------------
// redux ------------------
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { backKycForm } from '../../features/kyc/kycSlice'

function ViewKyc() {
  // get user id from local storage
  const user: any = localStorage?.getItem('user')
    ? localStorage.getItem('user')
    : null
  const id = JSON.parse(user).id
  const url = 'http://localhost:5000/api'
  const [kycFormData, setKyc] = useState([])
  const [kycImage, setKycImage] = useState([])
  const reduxDispatch = useAppDispatch();

  const getUser = async () => {
    try {
      const response = await axios.get(`${url}/getUser/${id}`)
      console.log(response.data.data.kyc)
      let arr: any = []
      arr.push(response.data.data.kyc.kycFormData)
      setKycImage(response.data.data.kyc)
      setKyc(arr)
    } catch (error: any) {
      console.log(error)
    }
  }
  const goBack = ()=>{
        reduxDispatch(backKycForm()) 
      }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="details w-3/4 mx-auto">
      <h2 className="mt-4">Please check and confirm your information</h2>
      <div className="main flex justify-between">
        {kycFormData.map((item: any) => {
          return (
            <>
              <div className="sub-details p-4 mt-5 flex float-left bg-blue-50 w-2/5 space-x-24 justify-center ">
                <div className="left-info w-full">
                  <div className="basic-info  flex">
                    <div className="verify-left w-1/2">
                      <p className="text-left text-sm">Full Name: </p>
                      <p className="text-left text-sm">Date Of Birth: </p>
                      <p className="text-left text-sm">Province: </p>
                      <p className="text-left text-sm">District: </p>
                      <p className="text-left text-sm">Municipality: </p>
                      <p className="text-left text-sm">Ward Number: </p>
                      <p className="text-left text-sm">Citizenship Number: </p>
                      <p className="text-left text-sm">
                        Citizenship Issued BY:{' '}
                      </p>
                      <p className="text-left text-sm">
                        Citizenship Issued Date:{' '}
                      </p>
                      <p className="text-left text-sm">
                        Driving License Number:{' '}
                      </p>
                      <p className="text-left text-sm">License Issued Date: </p>
                      <p className="text-left text-sm">License Expiry Date: </p>
                      <p className="text-left text-sm">License Issued By: </p>
                    </div>
                    <div className="verify-right w-1/2">
                      <p className="text-right text-sm ">{`${item.firstName} ${item.middleName} ${item.lastName}`}</p>
                      <p className="text-right text-sm ">
                        {' '}
                        {item.dateOfBirth}{' '}
                      </p>
                      <p className="text-right text-sm ">{item.province} </p>
                      <p className="text-right text-sm ">{item.district}</p>
                      <p className="text-right text-sm ">{item.municipality}</p>
                      <p className="text-right text-sm ">{item.wardNumber}</p>
                      <p className="text-right text-sm ">
                        {item.citizenshipNumber}
                      </p>
                      <p className="text-right text-sm ">
                        {item.citizenshipIssuedBy}
                      </p>
                      <p className="text-right text-sm ">
                        {item.citizenshipIssuedDate}
                      </p>
                      <p className="text-right text-sm ">
                        {item.drivingLicenseNumber}
                      </p>
                      <p className="text-right text-sm ">
                        {item.drivingLicenseIssuedDate}
                      </p>
                      <p className="text-right text-sm ">
                        {item.drivingLicenseExpireDate}
                      </p>
                      <p className="text-right text-sm ">
                        {item.drivingLicenseIssuedBy}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        })}
        <div className="mt-5 bg-slate-50 float-right w-3/5 p-4">
          <div className="text-sm">
            <h6 className="text-danger text-left align-left ">
              <p>
                अनलाइन आवेदन फाराम भर्ने लगायत अन्य सम्बन्धित विषय सम्बन्धी
                निर्देशनहरु
              </p>
              <p>Instructions for filling online application form and others</p>
            </h6>
            <ol>
              <li>
                <p className="text-left">
                  {' '}
                  नयाँ सवारी चालक अनुमतिपत्र तथा वर्ग थपका लागि यातायात व्यवस्था
                  कार्यालय / यातायात व्यवस्था सेवा कार्यालयले विवरण रुजु एवंम्
                  निवेदकको बायोमेट्रिक लिने कार्यहरु सार्वजनिक बिदा बाहेक
                  हप्ताको प्रत्येक आइतबार, सोमबार, दर्ता गरी कार्यालय भिजिट डेट
                  लिन सकिनेछ । तर प्रत्येक १६ औं दिनका लागि
                </p>
                <p className="text-left">
                  Transport Management Offices / Transport Management Service
                  Offices verify application details and take biometric of an
                  applicant on every 4 days of a week (Sunday, Monday, Tuesday
                  and Wednesday except public holiday) for New Driving License
                  and Category Add. For this, an applicant has to register an
                  online application against the office within each 16 days if
                  quota of license category for the office is
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <button className="float-left mt-4 back-button" style = {{width: '10%'}} onClick={goBack}> Back</button>
      <button className="mr-5 float-left confirmKycButton mt-4" style = {{width: '15%'}}>Confirm</button>
    </div>
  )
}

export default ViewKyc
