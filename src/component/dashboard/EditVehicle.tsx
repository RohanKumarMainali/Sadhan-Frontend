import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import moment from 'moment'
import { Formik, Form, Field } from 'formik'
import { useParams } from 'react-router-dom'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import PreviewImage from './PreviewImage'
import '../../index.css'

interface image {
  public_id: string | null
  url: string | null
}

interface vehicleType {
  name: string
  model: string
  price: number
  milage: number
  seat: number
  location: string
  description: string
  vehicleNumber: string
  carImages: any
  bluebookImage: any
  insuranceImage: any
}

const EditVehicle = () => {
  const [id, setId] = useState(useParams().id)
  const [image, setImage] = useState('')
  const [vehicle, setVehicle] = useState([])
  const url = 'http://localhost:5000/api'

  const showMessage = (message: string, statusCode: number) => {
    if (statusCode == 201 || statusCode == 200) toast.success(message)
    else toast.error(message)
  }

  const getVehicle = async () => {
    try {
      const response = await axios.get(`${url}/getVehicle/${id}`)
      setVehicle(response.data.data)
      console.log(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const editVehicle = async (values: vehicleType) => {
    var form: any = new FormData()
    form.append('name', values.name)
    form.append('model', values.model)
    form.append('price', values.price)
    form.append('milage', values.milage)
    form.append('seat', values.seat)
    form.append('location', values.location)
    form.append('description', values.description)
    form.append('vehicleNumber', values.vehicleNumber)
    if (values.carImages) form.append('carImages', values.carImages)
    if (values.bluebookImage) form.append('bluebookImage', values.bluebookImage)
    if (values.insuranceImage)
      form.append('insuranceImage', values.insuranceImage)
    console.log(form)
    try {
      const response = await axios.put(`${url}/updateVehicle/${id}`, form)
      showMessage('Vehicle Updated Successfully! ', 200)
    } catch (error: any) {
      showMessage(error.message, 400)
    }
  }

  useEffect(() => {
    getVehicle()
  }, [])

  return (
    <div className="w-full float-right h-screen bg-red bg-slate-100 p-5">
      <div className="dashboard-home bg-white main-profile w-full mt-14 mx-auto  rounded shadow-xl">
        <div className="w-11/12 mx-auto">
          <h1 className="text-left text-2xl font-semibold p-2">Edit Vehicle</h1>
        </div>
        {vehicle.map((item: any) => {
          return (
            <>
              <Formik
                initialValues={{
                  name: item.name,
                  model: item.model,
                  price: item.price,
                  milage: item.milage,
                  seat: item.seat,
                  location: item.location,
                  description: item.description,
                  vehicleNumber: item.vehicleNumber,
                  carImages: null,
                  bluebookImage: null,
                  insuranceImage: null
                }}
                onSubmit={(values, { resetForm }) => {
                  //addVehicle(values)
                  editVehicle(values)
                }}
              >
                {({
                  errors,
                  touched,
                  isValidating,
                  resetForm,
                  values,
                  setFieldValue
                }) => (
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
                          name="carImages"
                          onChange={(e: any) => {
                            setFieldValue('carImages', e.target.files[0])
                          }}
                        />
                        {values.carImages == null && item.carImages[0].url && (
                          <img
                            src={item?.carImages[0]?.url}
                            width="200px"
                            height="200px"
                          ></img>
                        )}
                        {values.carImages && (
                          <PreviewImage file={values.carImages} />
                        )}
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
                          onChange={(e: any) => {
                            setFieldValue('insuranceImage', e.target.files[0])
                          }}
                        />

                        {values.insuranceImage == null &&
                          item.insuranceImage.url && (
                            <img
                              src={item?.insuranceImage?.url}
                              width="200px"
                              height="200px"
                            ></img>
                          )}

                        {values.insuranceImage && (
                          <PreviewImage file={values.insuranceImage} />
                        )}
                      </div>

                      <div className="flex flex-col w-2/5">
                        <label className="text-left">Bluebook Image</label>
                        <input
                          type="file"
                          className="w-full border border-gray-300 h-8  focus:outline-indigo-400"
                          placeholder="bluebookImage"
                          name="bluebookImage"
                          onChange={(e: any) => {
                            setFieldValue('bluebookImage', e.target.files[0])
                          }}
                        />

                        {values.bluebookImage == null &&
                          item.bluebookImage.url && (
                            <img
                              src={item?.bluebookImage?.url}
                              width="200px"
                              height="200px"
                            ></img>
                          )}
                        {values.bluebookImage && (
                          <PreviewImage file={values.bluebookImage} />
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between w-full h-auto">
                      <CKEditor
                        editor={ClassicEditor}
                        data={values.description}
                        onReady={(editor: any) => {
                          // You can store the "editor" and use when it is needed.
                        }}
                        onChange={(event: any, editor: any) => {
                          const data = editor.getData()
                          setFieldValue('description', data)
                        }}
                      />
                    </div>
                    <button
                      className="login-btn"
                      type="submit"
                      style={{ width: '20%' }}
                    >
                      Update
                    </button>
                  </Form>
                )}
              </Formik>
            </>
          )
        })}
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

export default EditVehicle
