import React from 'react'
import axios from 'axios'
import NewTable from '../component/table/NewTable'
import Table from '../component/table/Table'
import data from './data.json'
import makeData from '../component/table/makeData'
import {useEffect, useMemo , useState} from 'react'
import {StatusPill} from '../component/table/Status'
import {ActionButtons} from '../component/table/Button'

function Dashboard() {
  const url = 'http://localhost:5000/api'
  const [user, setUser] = useState({})
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState()
  const [role, setRole] = useState()

  const getTokenFromCookies = async () => {
    const response = await axios.get(`${url}/token`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    let accessToken = ''
    let refreshToken = ''
    if (response) {
      accessToken = response.data.accessToken
      refreshToken = response.data.refreshToken
    }
    return { accessToken, refreshToken }
  }

  const renewToken = async () => {
    try {
      const { refreshToken } = await getTokenFromCookies()

      if (refreshToken !== '') {
        const response = await axios.post(`${url}/renewToken`, {
          refreshToken: refreshToken
        })
        const details = response.data.payload
        localStorage.setItem('user', JSON.stringify(response.data.payload))
        setUser(details)
        setUserName(details.firstName + ' ' + details.lastName)
        setEmail(details.email)
        setRole(details.role)
      }
    } catch (error) {
      console.log(error)
    }
  }

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
      setUser(details)
      setUserName(details.firstName + ' ' + details.lastName)
      setEmail(details.email)
      setRole(details.role)
    } catch (error: any) {
      console.log('status code' + JSON.stringify(error.response))
      localStorage.clear()
      if (error.response.data == 'jwt expired') {
        console.log('jwt expired')
        renewToken()
      }
    }
  }

  const columns = useMemo(
    () => [
      
      {
        Header: 'Name',
        Footer: 'Name',
        accessor: 'name',
        sticky: 'left',
      },

      {
        Header: 'Model ',
        Footer: 'Model',
        accessor: 'model',
      },
      {
        Header: 'Price ',
        Footer: 'Price',
        accessor: 'price',
        sticky: 'left'
      },

      {
        Header: 'Mileage',
        Footer: 'Mileage',
        accessor: 'milage'
      },
      
      {
        Header: 'Status',
        Footer: 'Status',
        accessor: 'status',
        Cell: StatusPill,
      },

      {
        Header: 'Action',
        Footer: 'Action',
        accessor: '_id',
        Cell: ActionButtons,
      },
    ],

    []
  )


  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response: any = await axios(`${url}/getVehicle`).catch((err) => console.log(err));
    setData(response.data.vehicles);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
      {email ? (
        <>
          <div className="float-right p-0 px-5 w-full h-screen ">
            <div className="dashboard-home main-profile mx-auto ">
              <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
                <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                  <div className="text-sm font-medium text-gray-500 truncate">
                    Total users
                  </div>
                  <div className="mt-1 text-3xl font-semibold text-gray-900">
                    12,00
                  </div>
                </div>
                <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                  <div className="text-sm font-medium text-gray-500 truncate">
                    Total Profit
                  </div>
                  <div className="mt-1 text-3xl font-semibold text-gray-900">
                    $ 450k
                  </div>
                </div>
                <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                  <div className="text-sm font-medium text-gray-500 truncate">
                    Total Orders
                  </div>
                  <div className="mt-1 text-3xl font-semibold text-gray-900">
                    20k
                  </div>
                </div>
              </div>
            </div>

            <div className='user-table '><Table column={columns} mockData={data} /></div>
          </div>
        </>
      ) : null}
    </>
  )
}

export default Dashboard
