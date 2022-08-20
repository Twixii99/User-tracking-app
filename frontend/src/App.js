import React from 'react';
import { Popup } from './components/Popup';
import { LoginForm }  from './components/LoginForm';
import { AppletTable } from './components/AppletTable';
import { PopupUpdate } from './components/PopupUpdate';
import { AppletNavbar } from './components/AppletNavbar';
import { Routes, Route } from 'react-router-dom';

import './App.css'

function App() {
  return (
    <Routes>
      <Route exact path='/' element={
        <div className="App"> 
          <LoginForm/>
        </div>
      }/>

      <Route exact path='/admin-user' element={
        <div className="App">
            <AppletNavbar/>
            <AppletTable privilage={ 'Yes' }/>
        </div>
      } />

      <Route exact path='/user' element={
        <div className="App">
            <AppletNavbar/>
            <AppletTable privilage={ 'No' }/>
        </div>
      } />

      <Route exact path='/add-user' element={
        <div className="App">
            <Popup />
        </div>
      } />

      <Route exact path='/update-user/:id' element={
        <div className="App">
            <PopupUpdate />
        </div>
      } />
    </Routes>
  );
  
}

export default App;
