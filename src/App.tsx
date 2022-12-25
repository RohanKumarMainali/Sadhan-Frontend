import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Navbar from './component/navbar/Navbar'

interface userInfo{
    isLoggedIn: boolean,
    }

function App() {
    
   const obj = {isLoggedIn: true} 
  return (
    <div className="App">
    <Navbar {...obj}/>
      <Router>
        <Routes>
          <Route  path ='/' element = {<Home/>}/>


        </Routes>
      </Router>
    </div>

  );
}

export default App;
