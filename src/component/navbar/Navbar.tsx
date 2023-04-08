import React, { useMemo, useEffect, useState, useContext } from 'react'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useRef } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import LoginModal from '../modal/LoginModal'
import { CgProfile } from 'react-icons/cg'
import { UserContext } from '../../App'
import { ChakraProvider, extendTheme, VStack, Box } from '@chakra-ui/react'
import { debounce } from 'lodash'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logoutAuth, getUserThunk } from '../../features/login/loginSlice'
import SearchResults from './SearchResults'

let logo = require('../../images/newLogo.png')

function Navbar() {
  const search = useRef<HTMLInputElement>(null)
  const searchResultDiv = useRef<HTMLDivElement>(null)
  const [searchInput, setSearchInput] = useState('')
  const [vehicles, setVehicles] = useState([])
  const [showLogin, setShowLogin] = useState(false)
  const [searchVisible, setSearchVisible] = useState(true)

  const loginDetail = useAppSelector(state => state.login.loggedIn)
  const dispatchRedux = useAppDispatch()

  const navigate = useNavigate()

  function changeLoginState() {
    dispatchRedux(logoutAuth())
  }

  const url = 'http://localhost:5000/api'
  const getUser = async () => {
    try {
      const response = await axios.get(`${url}/session`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
    } catch (error: any) {
      console.log('status ' + error.response.status)
    }
  }

  const focusSearch = () => {
    search.current?.focus()
    setSearchVisible(true)
  }

  const google = () => {
    window.open('http://localhost:5000/api/google', '_self')
  }
  const logoutGoogle = () => {
    window.open('http://localhost:5000/api/logout', '_self')
    localStorage.clear()
  }

  const logout = async () => {
    const response = await axios.get(`${url}/user/logout`, {
      withCredentials: true
    })
    localStorage.clear()
    changeLoginState()
  }

  // handle Click for search bar
  // get search result and store in vehicles array

  const searchVehicle = async (name: string) => {
    if (name) {
      const { data } = await axios.get(`${url}/search/?name=${name}`)
      setVehicles(data.data)
    } else setVehicles([])
  }

  // handleSearchInput

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    searchVehicle(query)
  }

  // useMemo to memoize return value from debounce function

  const debouncedResults = useMemo(() => {
    return debounce(handleSearchInput, 1000)
  }, [])

  // on enter click in search bar

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      navigate(`/search?name=${event.currentTarget.value}`)
      setSearchVisible(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // if user clicks outside the search div
      if (
        searchResultDiv.current &&
        (!searchResultDiv.current.contains(event.target as Node))
      ) {
          console.log('clicked')
        setSearchVisible(false)
      }
    }

    // bind this event
    document.addEventListener('mousedown', handleClickOutside)

    // remove event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [searchResultDiv])

  useEffect(() => {
    return () => {
      debouncedResults.cancel()
    }
  })

  useEffect(() => {
    getUser()
    dispatchRedux(getUserThunk())
  }, [])

  return (
    <ChakraProvider resetCSS={false}>
      <div>
        <nav className="main-navbar">
          <div className="container">
            <div className="row">
              <div className="col-md-3 navbar-logo">
                <Link to="/">
                  <img src={logo} alt="Logo" />
                </Link>
              </div>
              <div className="col-md-3">
                <form action="" className="navbar-form relative">
                  <input
                    type="text"
                    ref={search}
                    onClick={focusSearch}
                    className="navbar-search-input"
                    placeholder="Search Vehicle ..."
                    onChange={debouncedResults}
                    onKeyPress={handleKeyPress}
                    required
                  />
                  <i className="fa">
                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                  </i>
                </form>

                {searchVisible && (
                <div ref={searchResultDiv}>
                  <SearchResults results={vehicles}
                  // when a user clicks on any search list, make the search result invisible
                
                  onListItemClick={()=>setSearchVisible(false)} />
                </div>
                )}
              </div>
              <div className="col-md-6 nav-container">
                <nav>
                  <ul>
                    <button className="btn App-navbar-text">
                      Rent Vehicle
                    </button>

                    <button className="btn App-navbar-text">Become Host</button>

                    {loginDetail ? (
                      <>
                        <Link to="/dashboard">
                          <button className="btn App-navbar-text">
                            Dashboard
                          </button>
                        </Link>
                        <li className="login-list">
                          <button className="btn App-btn" onClick={logout}>
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <button
                        className="btn App-btn"
                        onClick={() => setShowLogin(true)}
                      >
                        Login
                      </button>
                    )}
                  </ul>
                </nav>
                <LoginModal
                  show={showLogin}
                  close={() => setShowLogin(!showLogin)}
                />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </ChakraProvider>
  )
}

export default Navbar
