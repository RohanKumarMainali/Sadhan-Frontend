import { useEffect, useState } from 'react'
import React from 'react'
import { useRef } from 'react'
import SubMenu from './SubMenu'
import { motion } from 'framer-motion'

// * React icons
import { IoIosArrowBack } from 'react-icons/io'
import { SlSettings } from 'react-icons/sl'
import { AiOutlineAppstore, AiOutlineLogout } from 'react-icons/ai'
import { BsPerson } from 'react-icons/bs'
import { HiOutlineDatabase } from 'react-icons/hi'
import { TbReportAnalytics } from 'react-icons/tb'
import { RiBuilding3Line } from 'react-icons/ri'
import { GiSteeringWheel } from 'react-icons/gi'
import { BsFillPersonFill } from 'react-icons/bs'
import { FaUsers, FaFileSignature } from 'react-icons/fa'
import { RiMotorbikeFill } from 'react-icons/ri'

import { useMediaQuery } from 'react-responsive'
import { MdMenu } from 'react-icons/md'
import { NavLink, useLocation, useRoutes } from 'react-router-dom'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

// logo

let logo = require('../../images/newLogo.png')

const AnimatedSidebar = () => {
  const url = 'http://localhost:5000/api'
  const [user, setUser] = useState({})
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState()
  const [role, setRole] = useState()

  // redux
  const userRole = useAppSelector(state => state.login.role)

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
      console.log('error')
    }
  }

  let isTabletMid = useMediaQuery({ query: '(max-width: 768px)' })
  const [open, setOpen] = useState(isTabletMid ? false : true)
  //const sidebarRef = useRef(<HTMLDivElement>);
  const sidebarRef = React.useRef<HTMLInputElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [isTabletMid])

  useEffect(() => {
    isTabletMid && setOpen(false)
  }, [pathname])

  useEffect(() => {
    getUser()
  }, [])

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: '16rem',
          transition: {
            damping: 40
          }
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15
          }
        }
      }
    : {
        open: {
          width: '16rem',
          transition: {
            damping: 40
          }
        },
        closed: {
          width: '4rem',
          transition: {
            damping: 40
          }
        }
      }

  const subMenusList = [
    {
      name: 'KYC',
      icon: RiBuilding3Line,
      menus: ['Requests', 'KYC-List']
    },
    {
      name: 'analytics',
      icon: TbReportAnalytics,
      menus: ['dashboard', 'realtime', 'events']
    }
  ]

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? 'block' : 'hidden'
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? 'open' : 'closed'}
        className=" text-white shadow-xl z-[999] max-w-[16rem]  w-[16rem] App-sidebar 
            overflow-hidden md:relative fixed
         h-screen "
      >
        <NavLink to="/" className="App-sidebar-link">
          <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300  mx-3">
            <img
              src="https://img.icons8.com/color/512/firebase.png"
              width={45}
              alt=""
            />
            <span className="text-xl whitespace-pre App-sidebar-heading">
              Sadhan
            </span>
          </div>
        </NavLink>

        <div className="flex flex-col  h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%]">
            <li>
              <NavLink to={'/dashboard'} className="link App-sidebar-link">
                <AiOutlineAppstore size={23} className="min-w-max" />
                All Apps
              </NavLink>
            </li>
            <li>
              <NavLink to={'/profile'} className="link App-sidebar-link">
                <BsFillPersonFill size={23} className="min-w-max" />
                Profile
              </NavLink>
            </li>
            <li>
              {role == 'admin' && (
                <NavLink to={'/users'} className="link App-sidebar-link">
                  <FaUsers size={23} className="min-w-max" />
                  Users
                </NavLink>
              )}
              <NavLink
                to={'/dashboard-vehicles'}
                className="link App-sidebar-link"
              >
                <GiSteeringWheel size={23} className="min-w-max" />
                Vehicles
              </NavLink>
              <NavLink to={'/bookings'} className="link App-sidebar-link">
                <RiMotorbikeFill size={23} className="min-w-max" />
                Bookings
              </NavLink>
            </li>

            {(open || isTabletMid) && (role == 'admin') && (
              <div className="border-y py-5 border-slate-300 ">
                <small className="pl-3 text-slate-500 inline-block mb-2">
                  Product categories
                </small>
                {subMenusList?.map(menu => (
                  <div key={menu.name} className="flex flex-col gap-1">
                    <SubMenu data={menu} />
                  </div>
                ))}
              </div>
            )}
            <li>
              <NavLink to={'/settings'} className="link App-sidebar-link">
                <SlSettings size={23} className="min-w-max" />
                Settings
              </NavLink>
            </li>
          </ul>
          {open && (
            <div className="flex-1 text-sm z-50  max-h-48 my-auto  whitespace-pre   w-full  font-medium  ">
              <div className="flex border-y border-slate-300 p-4 items-center justify-between">
                <div className=''>
                  <p>Spark</p>
                  <small>No-cost $0/month</small>
                </div>
                <p className="text-teal-500 py-1.5 px-3 text-xs bg-teal-50 rounded-xl">
                  Upgrade
                </p>
              </div>
            </div>
          )}
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open)
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  )
}

export default AnimatedSidebar
