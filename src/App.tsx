import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Navbar from './component/navbar/Navbar'
import axios from 'axios'


interface userInfo {

    name: string,
    isLoggedIn: boolean,
}

function App() {

    const [user, setUser] = useState({});
    const getUser = () => {
        axios
            .get("http://localhost:5000/api/login/success", {
                withCredentials: true
            },)
            .then(data => console.log(data))
            .catch(error => console.log('errror ' + error));
    };
    const getUsers = () => {
        fetch("http://localhost:5000/api/login/success", {
            method: "GET",
            credentials: "include",
        },
        )
            .then((response) => {
                if (response.status === 200) return response.json();
                throw new Error("authentication has been failed!");
            })
            .then((resObject) => {
                setUser(resObject.user);
                console.log(resObject.user);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getUsers();
    }, []);

    const obj = {
        isLoggedIn: true
    }
    return (
        <div className="App">
            <Navbar user={user} />
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                </Routes>
            </Router>
        </div>

    );
}

export default App;
