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
import UserLayout from './component/sidebar/UserLayout'
import AdminLayout from './component/sidebar/AdminLayout'
import PhoneNumber from './component/kyc/PhoneNumber'
import HostForm from './component/kyc/HostForm'
import SearchVehicle from './component/search/SearchVehicle'
import Categories from './component/dashboard/Category'
import AddCategory from './component/dashboard/AddCategory'
import EditCategory from './component/dashboard/EditCategory'

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

const ProtectedRoute = ({role, redirect, children }: any) => {
  if (redirect && role !== 'user') return <Navigate to="/" replace />
  return children
}

const AdminRoute = ({role, redirect, children }: any) => {
  if (redirect && role!== 'admin') return <Navigate to="/" replace />
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

// for seperate routing for different user type

const userRoutes = [{ path: '/user/dashboard', component: Dashboard }]

const renteeRoutes = [
  { path: '/rentee/dashboard', component: Dashboard },
  { path: '/rentee/login', component: Bookings }
]

type RouteType = {
  path: string
  component: React.FC
}
let routes: Array<RouteType> = []

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
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
    dispatchRedux(getUserThunk())
    setLightMode()
  }, [])

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Router>
          <Routes>
            {
              // routes mapping
            }

            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Home />
                  <Footer />
                </>
              }
            />
            <Route
              path="/vehicle/:id"
              element={
                <>
                  <Navbar />
                  <Vehicle />
                  <Footer />
                </>
              }
            />
            <Route
              path="/search"
              element={
                <>
                  <Navbar />
                  <SearchVehicle />
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
            {// Admin protected Routes
            }
            <Route path="/admin/login" element={<SignInSide />} />


            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute redirect={!isAuthenticated}>
                  <AdminLayout>
                    <Dashboard />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="admin/profile"
              element={
                <AdminRoute redirect={!isAuthenticated}>
                  <AdminLayout>
                    <Profile />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="admin/dashboard-vehicles"
              element={
                <AdminRoute redirect={!isAuthenticated}>
                  <AdminLayout>
                    <Vehicles />
                  </AdminLayout>
                </AdminRoute>
              }
            />

            <Route
              path="admin/categories"
              element={
                <AdminRoute redirect={!isAuthenticated}>
                  <AdminLayout>
                    <Categories />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="admin/users"
              element={
                <AdminRoute redirect={!isAuthenticated}>
                  <AdminLayout>
                    <Users />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="admin/KYC/requests"
              element={
                <AdminRoute redirect={!isAuthenticated}>
                  <AdminLayout>
                    <KycRequest />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="admin/KYC/KYC-List"
              element={
                <AdminRoute redirect={!isAuthenticated}>
                  <AdminLayout>
                    <AllKycRequest />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="admin/dashboard-categories/edit/:id"
              element={
                <AdminRoute redirect={!isAuthenticated}>
                  <AdminLayout>
                    <EditCategory />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="admin/categories/addCategory"
              element={
                <AdminRoute redirect={!isAuthenticated}>
                  <AdminLayout>
                    <AddCategory />
                  </AdminLayout>
                </AdminRoute>
              }
            />




            {// User Protected Route
            }
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute role = {user} redirect={!isAuthenticated}>
                  <UserLayout>
                    <Dashboard />
                  </UserLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <UserLayout>
                    <Profile />
                  </UserLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard-vehicles"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <UserLayout>
                    <Vehicles />
                  </UserLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/categories"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <UserLayout>
                    <Categories />
                  </UserLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/change-password"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <UserLayout>
                    <ChangePassword user={userData} />
                  </UserLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <UserLayout>
                    <Bookings />
                  </UserLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <UserLayout>
                    <Users />
                  </UserLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/verifyKyc"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <UserLayout>
                    <PhoneNumber />
                  </UserLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/become-a-host"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <UserLayout>
                    <HostForm />
                  </UserLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard-vehicles/addVehicle"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <UserLayout>
                    <AddVehicle />
                  </UserLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard-vehicles/edit/:id"
              element={
                <ProtectedRoute redirect={!isAuthenticated}>
                  <UserLayout>
                    <EditVehicle />
                  </UserLayout>
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
