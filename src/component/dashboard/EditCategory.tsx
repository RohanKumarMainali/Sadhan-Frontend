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

interface categoryType {
  name: string
  image: any
}

const EditCategory = () => {
  const [image, setImage] = useState('')
  const [userId, setUserId] = useState('')
  const [categories, setCategories] = useState([])
  const [selectedOption, setSelectedOption] = useState('')
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
    form.append('image', values.image)
    if (selectedOption ){
      form.append('parentId', selectedOption)
    }
    try {
      const response = await axios.post(`${url}/createCategory`, form)
      showMessage('Category Posted Successfully! ', 200)
    } catch (error: any) {
      showMessage(error.message, 400)
    }
  }

  const getCategories = async () => {
    try {
      const response = await axios.get(`${url}/getCategory`)
      setCategories(response.data.response)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value)
  }

  useEffect(() => {
    getUser()
    getCategories()
  }, [])
  return (
    <div className=" w-full p-0 px-5 float-right h-screen ">
      <div className="dashboard-home bg-white main-profile w-full mx-auto  rounded shadow-xl">
        <div className="w-11/12 mx-auto">
          <h1 className="text-left text-2xl font-semibold p-2">Add Category</h1>
        </div>
        <Formik
          initialValues={{
            name: '',
            image: null
          }}
          onSubmit={(values, { resetForm }) => {
            //addVehicle(values)
            addCategory(values)
            resetForm({
              values: {
                name: '',
                image: null
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
                <div className="flex flex-col w-2/5">
                  <label className="text-left">Parent Category</label>

                  <select value={selectedOption} onChange={handleSelectChange}>
                    <option value="" disabled selected>
                      Select
                    </option>
                    {categories.map((item: any) => {
                      return (
                        <option key={item.id} value={item._id}>
                          {item.name}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex flex-col w-2/5">
                  <label className="text-left">Category Image</label>
                  <input
                    type="file"
                    className="w-full border border-gray-300 h-8  focus:outline-indigo-400"
                    placeholder="image"
                    name="image"
                    onChange={(e: any) => {
                      setFieldValue('image', e.target.files[0])
                    }}
                  />

                  {values.image && <PreviewImage file={values.image} />}
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

export default EditCategory
