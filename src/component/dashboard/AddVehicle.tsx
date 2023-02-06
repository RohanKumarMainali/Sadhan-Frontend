import axios from 'axios'
import { useEffect, useState,useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import moment from 'moment'
import { Formik, Form, Field } from 'formik'
import { useParams } from 'react-router-dom'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import PreviewImage from './PreviewImage'
import '../../index.css'

interface vehicleType {
   name: string, 
   model: string,
   price: number,         
   milage: number,
   seat: number,
   location: string,
   description: string,
   vehicleNumber: string,
   images: any,
   bluebookImage: any,
   insuranceImage: any,

   }

 const AddVehicle = () => {

    const [image, setImage] = useState('');
    const url = 'http://localhost:5000/api'

    const showMessage = (message: string, statusCode: number) => {
      if (statusCode == 201 || statusCode == 200) toast.success(message)
      else toast.error(message)
      }    
     const addVehicle = async(values : vehicleType)=>{
                  
            var form : any= new FormData();
            form.append("name", values.name)
            form.append("model", values.model)
            form.append("price", JSON.stringify(values.price))
            form.append("milage", JSON.stringify(values.milage))
            form.append("seat",  JSON.stringify(values.seat))
            form.append("location", values.location)
            form.append("description", values.description)
            form.append("vehicleNumber", values.vehicleNumber)
            form.append("images", values.images)
            form.append("bluebookImage", values.bluebookImage)
            form.append("insuranceImage", values.insuranceImage)
            console.log(form)
            try {
             
              const response = await axios.post(`${url}/postVehicle`, form)
              showMessage("Vehicle Posted Successfully! ", 200);   
            } catch (error : any) {
              showMessage(error.message, 400);    
            }
    }
    return (
        
        <div className=" w-[calc(100%-14rem)]  h-auto float-right h-screen bg-red bg-slate-100">
            <div className="dashboard-home bg-white main-profile w-4/5 mt-14 mx-auto  rounded shadow-xl" >

                <div className='w-11/12 mx-auto'>

                    <h1 className='text-left text-2xl font-semibold p-2'>Add Vehicle</h1>
                </div>
                  <Formik
                    initialValues={{
                      name: '',
                      model: '',
                      price: 0,
                      milage: 0,
                      seat: 0,
                      location: '',
                      description:'',
                      vehicleNumber: '',
                      images: null,
                      bluebookImage: null,
                      insuranceImage: null,
                    }}
                    onSubmit={(values, { resetForm }) => {
                      //addVehicle(values)
                      addVehicle(values)
                      resetForm({
                        values: {
                    name: '',
                      model: '',
                      price: 0,
                      milage: 0,
                      seat: 0,
                      location: '',
                      description:'',
                      vehicleNumber: '',
                      images: null,
                      bluebookImage: null,
                      insuranceImage: null,
                        }
                      })
                    }}
                  >
                    {({ errors, touched, isValidating, resetForm, values, setFieldValue }) => (
                      <Form className=" flex flex-col gap-4 w-5/6 h-5/6 mx-auto mt-3 py-5">
                        <div className="flex justify-between">
                          <div className="flex flex-col w-2/5">
                            <label className="text-left">Name</label>
                            <Field
                              type="text"
                              className="w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
                              placeholder="Name "
                              name="name"
                             // validate={validateOldPassword}
                            />
                            {/*                             {errors.newPassword && touched.newPassword && (
                              <div className="text-left text-xs text-red-700 mt-1">
                                {errors.newPassword}
                              </div>
                            )}
                             */}

                          </div>
                          <div className="flex flex-col w-1/4">
                            <label className="text-left">Model</label>
                            <Field
                              type="text"
                              className="w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
                              placeholder="Model"
                              name="model"
                            />

                          </div>

                          <div className="flex flex-col w-1/4">
                            <label className="text-left">Price</label>
                            <Field
                              type="number"
                              className="w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
                              placeholder="price"
                              name="price"
                            />
                         </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex flex-col w-2/5">
                            <label className="text-left">Location</label>
                            <Field
                              type="text"
                              className="w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
                              placeholder="Seat"
                              name="location"
                            />
                         </div>
                          <div className="flex flex-col w-1/4">
                            <label className="text-left">Milage</label>
                            <Field
                              type="number"
                              className="w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
                              placeholder="Milage"
                              name="milage"
                            />
                         </div>

                          <div className="flex flex-col w-1/4">
                            <label className="text-left">Seat</label>
                            <Field
                              type="number"
                              className="w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
                              placeholder="seat"
                              name="seat"
                            />
                         </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex flex-col w-2/5">
                            <label className="text-left">Vehicle Number</label>
                            <Field
                              type="text"
                              className="w-full border border-gray-300 h-8 p-2 focus:outline-indigo-400"
                              placeholder="vehicleNumber"
                              name="vehicleNumber"
                            />
                         </div>
                        </div>

                        <div className="flex justify-between">
                          <div className="flex flex-col w-2/5">
                            <label className="text-left">Vehicle Image</label>
                            <input
                              type="file"
                              
                              className="w-full border border-gray-300 h-8  focus:outline-indigo-400"
                              name="images"
                              onChange = {(e:any)=>{
                                  setFieldValue("images",e.target.files[0])
                                  }
                                  } 
                            />
                            {values.images && <PreviewImage file={values.images}/> }

                         </div>
                        </div>

                        <div className="flex justify-between">
                          <div className="flex flex-col w-2/5">
                            <label className="text-left">Insurance Image</label>
                            <input
                              type="file"
                              className="w-full border border-gray-300 h-8  focus:outline-indigo-400"
                              placeholder="insuranceImage"
                              name="insuranceImage"
                              onChange = {(e:any)=>{setFieldValue("insuranceImage",e.target.files[0])}} 
                            />

                            {values.insuranceImage && <PreviewImage file={values.insuranceImage}/> }
                         </div>

                          <div className="flex flex-col w-2/5">
                            <label className="text-left">Bluebook Image</label>
                            < input
                              type="file"
                              className="w-full border border-gray-300 h-8  focus:outline-indigo-400"
                              placeholder="bluebookImage"
                              name="bluebookImage"
                              onChange = {(e:any)=>{setFieldValue("bluebookImage",e.target.files[0])}} 
                            />

                            {values.bluebookImage && <PreviewImage file={values.bluebookImage}/> }
                         </div>
                        </div>

                        <div className="flex justify-between w-full" style={{height: '265px'}}>
                          <CKEditor 
                            editor={ClassicEditor}

                            data="<p>Hello from CKEditor 5!</p>"
                            onReady={(editor: any) => {
                              // You can store the "editor" and use when it is needed.
                              console.log('Editor is ready to use!', editor)
                            }}
                            onChange={(event: any, editor: any) => {
                              const data = editor.getData()
                              setFieldValue("description", data);
                            }}
                          />
                        </div>
                        <button className="login-btn" type="submit">
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
         </div>
        </div>
    )
}

export default AddVehicle;

