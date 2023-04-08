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

interface vehicleType {
  name: string
  insuranceImage: any
}

const AddCategory = () => {
  const [image, setImage] = useState('')
  const [userId, setUserId] = useState('')
  const url = 'http://localhost:5000/api'

  // to get userId who is posting vehicle
  const getUser = async () => {
    try {
      const response = await axios.get(`${url}/session`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      let details = response.data.payload
      console.log(details)
      setUserId(details.id)
    } catch (error: any) {
      console.log(error)
    }
  }

  const showMessage = (message: string, statusCode: number) => {
    if (statusCode == 201 || statusCode == 200) toast.success(message)
    else toast.error(message)
  }
  const addCategory = async (values: categoryType) => {
    var form: any = new FormData()
    form.append('name', values.name)
    form.append('image', values.insuranceImage)
    console.log(form)
    try {
      const response = await axios.post(`${url}/createCategory`, form)
      showMessage('Vehicle Posted Successfully! ', 200)
    } catch (error: any) {
      showMessage(error.message, 400)
    }
  }

  useEffect(() => {
    getUser()
  }, [])
  return (
    <div className=" w-full p-0 px-5 float-right h-screen ">
      <div className="dashboard-home bg-white main-profile w-full mx-auto  rounded shadow-xl">
        <div className="w-11/12 mx-auto">
          <h1 className="text-left text-2xl font-semibold p-2">Add Vehicle</h1>
        </div>
        <Formik
          initialValues={{
            name: '',
            insuranceImage: null
          }}
          onSubmit={(values, { resetForm }) => {
            //addVehicle(values)
            addCategory(values)
            resetForm({
              values: {
                name: '',
                insuranceImage: null
              }
            })
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
            <Form className=" flex flex-col gap-4 w-5/6 h-5/6 mx-auto mt-1 py-5">
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

                  {values.insuranceImage && (
                    <PreviewImage file={values.insuranceImage} />
                  )}
                </div>
              </div>

              <button
                className="w-1/4 float-left login-btn"
                type="submit"
                style={{ width: '20%' }}
              >
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

export default AddCategory
