import React, { useState, useEffect, createContext, useReducer } from 'react'
import './App.css'
import './index.css'
import {
  Navigate,
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import Home from './component/Home'
import Navbar from './component/navbar/Navbar'
import Dashboard from './component/Dashboard'
import SignInSide from './component/admin/SignInSide'
import KycRequest from './component/admin/KycRequest'
import AllKycRequest from './component/admin/AllKycRequest'
import Sidebar from './component/dashboard/Sidebar'
import Profile from './component/dashboard/Profile'
import Vehicles from './component/dashboard/Vehicles'
import ForgotPasswordEmail from './component/user/ForgotPasswordEmail'
import ForgotPassword from './component/user/ForgotPassword'
import ChangePassword from './component/user/ChangePassword'
import Users from './component/admin/Users'
import AddVehicle from './component/dashboard/AddVehicle'
import EditVehicle from './component/dashboard/EditVehicle'
import Vehicle from './component/vehicle/Vehicle'
import Footer from './component/footer/Footer'
import Bookings from './component/dashboard/Bookings'
import AnimatedSidebar from './component/sidebar/AnimatedSidebar'
import RootLayout from './component/sidebar/RootLayout'
import PhoneNumber from './component/kyc/PhoneNumber'

import axios from 'axios'
import { useAuth } from './hooks/auth'
import { initialState, reducer } from './reducer/UseReducer'

// redux ------------------
import { useAppDispatch, useAppSelector } from './app/hooks'
import { increment } from './features/counter/CounterSlice'
import { getUserThunk } from './features/login/loginSlice'

interface userInfo {
  name: string
  isLoggedIn: boolean
}

const ProtectedRoute = ({ redirect, children }: any) => {
  if (redirect) return <Navigate to="/" replace />
  return children
}

type initialStateType = {
  login: boolean
}

export const UserContext = createContext<{
  state: boolean
  dispatch: React.Dispatch<any>
}>({
  state: initialState,
  dispatch: () => false
})
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [googleUser, setGoogleUser] = useState()
  const userData = useAuth().user
  const theme = useState('light')
  const { user, isAuthenticated } = useAuth()

  // redux
  const count = useAppSelector(state => state.counter.value)
  const dispatchRedux = useAppDispatch()

  function increaseCount() {
    dispatchRedux(increment())
  }
  const getUsers = () => {
    fetch('http://localhost:5000/api/login/success', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => {
        if (response.status === 200) {
          return response.json()
        }
        throw new Error('authentication has been failed!')
      })
      .then(resObject => {
        setGoogleUser(resObject.user)
        localStorage.setItem('user', JSON.stringify(resObject.user))
      })
      .catch(err => {
        console.log('Loggin is not using social links')
      })
  }

  // set theme
  const setLightMode = () => {
    document.querySelector('body')?.setAttribute('data-theme', 'light')
  }

  useEffect(() => {
    getUsers()
    dispatchRedux(getUserThunk())
    setLightMode()
  }, [])

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Router>
          <Routes>
            <Route
              path="/authentication"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <AnimatedSidebar />
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/"
              element={
                <>
                  <Navbar user={googleUser} />
                  <Home />
                  <Footer />
                </>
              }
            />
            <Route
              path="/vehicle/:id"
              element={
                <>
                  <Navbar user={googleUser} /> <Vehicle />
                  <Footer />
                </>
              }
            />
            <Route
              path="/forgot-password-email"
              element={
                <>
                  <ForgotPasswordEmail />
                </>
              }
            />
            <Route
              path="/api/user/forgotPassword/:id/:token"
              element={
                <>
                  <ForgotPassword />
                </>
              }
            />
            <Route path="/admin/login" element={<SignInSide />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <RootLayout>
                    <Dashboard />
                  </RootLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <RootLayout>
                    <Profile />
                  </RootLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard-vehicles"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <RootLayout>
                    <Vehicles />
                  </RootLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/change-password"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <RootLayout>
                    <ChangePassword user={userData} />
                  </RootLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <RootLayout>
                    <Bookings />
                  </RootLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <RootLayout>
                    <Users />
                  </RootLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/KYC/requests"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <RootLayout>
                    <KycRequest />
                  </RootLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/KYC/KYC-List"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <RootLayout>
                    <AllKycRequest />
                  </RootLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/verifyKyc"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <RootLayout>
                    <PhoneNumber />
                  </RootLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard-vehicles/addVehicle"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <RootLayout>
                    <AddVehicle />
                  </RootLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard-vehicles/editVehicle/:id"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <RootLayout>
                    <EditVehicle />
                  </RootLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/verifyKyc"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <Sidebar />
                  <PhoneNumber />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  )
}

export default App
