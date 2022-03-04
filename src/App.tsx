import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import UserPage from './components/UserPage/UserPage';
import ProjectPage from './components/Project/ProjectPage/ProjectPage';
import LoginPage from './components/LoginPage/LoginPage';
import { useLocalStorage } from './services/local.storage';
import { useApi } from './services/axios.service';
import { User } from './models/user.model';
import SignUpPage from './components/SignUpPage/SignUpPage';
import { Project } from './models/project.model';


type Props = {};

// const axiosService = require('./services/axios.service');
// const localStorageService = require('./services/local.storage');


export const Context = createContext(null);


function App({ }: Props) {

  const api = useApi();
  const localStorage = useLocalStorage();
  const [activeUser, setActiveUser] = useState({ email: "", password: "" });


  const value = {
    activeUser,
    setActiveUser,
    api,
    localStorage
  }

  return (
    <div className="App">
      <Context.Provider value={value}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/users/:userId" element={<UserPage />} />
              <Route path="/projects/:projectId" element={<ProjectPage />} />
            </Route>
            <Route path="*" element={<div><Link to="/"><button type="button">Home</button></Link> <div>404 - Page not found</div></div>} ></Route>
          </Routes>
        </BrowserRouter>
      </Context.Provider>

    </div>
  );
}

export default App;
