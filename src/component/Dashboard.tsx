import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { ProSidebarProvider } from 'react-pro-sidebar';
import { truncate } from 'fs';


function Dashboard() {
    const url = 'http://localhost:5000/api'
    const [user, setUser] = useState({})
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState();
    const [role, setRole] = useState();

    const getTokenFromCookies = async () => {
        const response = await axios.get(`${url}/token`,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json',
                },
                withCredentials: true
            }
        )
        let accessToken = ''
        let refreshToken = ''
        if (response) {
            accessToken = response.data.accessToken;
            refreshToken = response.data.refreshToken;
        }
        return { accessToken, refreshToken }
    }

    const renewToken = async () => {
        try {
            const { refreshToken } = await getTokenFromCookies();

            if (refreshToken !== '') {
                const response = await axios.post(`${url}/renewToken`, { refreshToken: refreshToken })
                const details = response.data.payload;
                localStorage.setItem('user', JSON.stringify(response.data.payload))
                setUser(details)
                setUserName(details.firstName + ' ' + details.lastName);
                setEmail(details.email);
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
                    'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            let details = response.data.payload
            setUser(details)
            setUserName(details.firstName + ' ' + details.lastName);
            setEmail(details.email);
            setRole(details.role)

        } catch (error: any) {
            console.log('status code' + JSON.stringify(error.response))
            localStorage.clear();
            if (error.response.data == 'jwt expired') {
                console.log('jwt expired')
                renewToken();
            }
        }
    }

    useEffect(() => {

        getUser();
    }, [])


    return (
        <ProSidebarProvider>
            <>

                {email ?
                    <>
                        <h1>Welcome {userName}</h1>
                        <h1>email : {email}</h1>
                        <h1>role: {role}</h1>
                    </>
                    :
            null    }


            </>
        </ProSidebarProvider>
    )
}

export default Dashboard
