import React, { useState, useEffect, createContext, useReducer } from 'react'
import './App.css'
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
        console.log(err)
      })
  }
  useEffect(() => {
    getUsers()
    dispatchRedux(getUserThunk())
  }, [])

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Router>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <Sidebar />
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/profile"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <Sidebar />
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/vehicles"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <Sidebar />
                  <Vehicles />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/change-password"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <Sidebar />
                  <ChangePassword user={userData} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/users"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <Sidebar />
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/kyc-requests"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <Sidebar />
                  <KycRequest />
                </ProtectedRoute>
              }
            />


            <Route
              path="/dashboard/addVehicle"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <Sidebar />
                  <AddVehicle />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/editVehicle/:id"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <Sidebar />
                  <EditVehicle />
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

            <Route
              path="/"
              element={
                <>
                  <Navbar user={googleUser} />
                  <Home />
                </>
              }
            />
            <Route
              path="/vehicle/:id"
              element={
                <>
                  <Navbar user={googleUser} /> <Vehicle />
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
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  )
}

export default App
