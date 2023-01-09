import React from 'react'
import {useEffect ,useState} from 'react'
import axios from 'axios'

function Dashboard() {
    const url = 'http://localhost:5000/api'
    const[user,setUser] = useState({})
    const getUser = async () => {
        try {
            const response = await axios.get(`${url}/session`, {
                headers: {
                    'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            console.log('res ' + JSON.stringify('user response ' +response.data))
            
            setUser(response.data.payload)
            console.log(response.data.payload)
        } catch (error: any) {
            console.log('status ' + error.response.status)
        }
    }

    useEffect(() => {
      
    getUser();
    }, [])
    

  return (
    <>
        {user ? <>{user}</> : null}
        <h1 style={{margin: 'auto'}}> Hello user, you are authenticated</h1>
    
    </>
  )
}

export default Dashboard
