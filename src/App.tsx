import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import WorkspacePage from './components/Workspace/WorkspacePage';
import ProjectPage from './components/Project/ProjectPage/ProjectPage';
import LoginPage from './components/LoginPage/LoginPage';
import { useLocalStorage } from './services/local.storage';
import { useApi } from './services/axios.service';
import { User } from './models/user.model';
import SignUpPage from './components/SignUpPage/SignUpPage';
import { Project } from './models/project.model';
import ProjectBoard from './components/Project/ProjectBoard/ProjectBoard';
import UserPage from './components/User/UserPage';
import AboutPage from './components/AboutPage/AboutPage';


type Props = {};

// const axiosService = require('./services/axios.service');
// const localStorageService = require('./services/local.storage');


export const Context = createContext(null);


function App({ }: Props) {

  const api = useApi();
  const localStorage = useLocalStorage();
  const [activeUser, setActiveUser] = useState({ email: "", password: "" });
  const [activeProject, setActiveProject] = useState(null)


  const value = {
    activeUser,
    setActiveUser,
    activeProject,
    setActiveProject,
    api,
    localStorage
  }

  return (
    <div className="App">
      <Context.Provider value={value}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}>
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/user/:userId" element={<UserPage />} />
              <Route path="/workspace/:orgId" element={<WorkspacePage />} />
              <Route path="/project/:projectId" element={<ProjectPage />} />
              {/* <Route path="/project/:projectId/board" element={<ProjectBoard />} /> */}
            </Route>
            <Route path="*" element={<div><Link to="/"><button type="button">Home</button></Link> <div>404 - Page not found</div></div>} ></Route>
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
}

export default App;
