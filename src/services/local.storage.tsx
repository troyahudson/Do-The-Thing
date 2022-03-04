import React from "react";
import { Project } from "../models/project.model";
import { User } from "../models/user.model";

const api = {
  saveUser: (user: User) => {
    // console.log(user);
    const value = JSON.stringify(user);
    localStorage.setItem("activeUser", value);
  },
  getActiveUser: () => {
    return JSON.parse(localStorage.getItem("activeUser"));
  },
  removeActiveUser: () => {
    localStorage.removeItem("activeUser");
  },

  saveProject: (project: Project) => {
    // console.log(user);
    const value = JSON.stringify(project);
    localStorage.setItem("activeProject", value);
  },
  getActiveProject: () => {    
    return JSON.parse(localStorage.getItem("activeProject"));
  },
  removeActiveProject: () => {
    localStorage.removeItem("activeProject");
  },
};

function useLocalStorage() {
  return api;
}
export { useLocalStorage };
