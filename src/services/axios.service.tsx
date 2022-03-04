import { Organization } from "../models/organization.model";
import { Project } from "../models/project.model";
import { Task } from "../models/task.model";
import { User } from "../models/user.model";
const axios = require("axios");
const URL = `http://localhost:8080/api`;

const api = {
  
  /* User */
  login: (user: User) => {
    return axios.post(`${URL}/users/login`, user);
  },
  createNewUser: (user: User) => {
    return axios.post(`${URL}/users`, user);
  },
  updateUser: (user: User) => {
    return axios.put(`${URL}/users/${user.id}`, user);
  },
  getUserById: (userId: string) => {
    return axios.get(`${URL}/users/${userId}`);
  },
  
  /* Organization */
  addNewOrg: (org: Organization) => {
    return axios.post(`${URL}/orgs`, org);
  },

  getOrgsByAdminUserId: (userId: string) => {
    return axios.get(`${URL}/orgs/admin/${userId}`);
  },
  
  /* Affiliation */
  addNewAffiliation: (affiliation: {}) => {
    return axios.post(`${URL}/affiliations`, affiliation);
  },

  /* Task */
  addNewTask: (task: Task) => {
    return axios.post(`${URL}/tasks`, task);
  },

  removeTask: (taskId: string) => {
    return axios.delete(`${URL}/tasks/${taskId}`);
  },

  updateTask: (task: Task) => {
    return axios.put(`${URL}/tasks/${task.id}`, task);
  },

  getTasksByCreatorUserId: (userId: string) => {
    return axios.get(`${URL}/tasks/search?createdByUserId=${userId}`);
  },

  getTasksByProjectId: (projectId: string) => {
    return axios.get(`${URL}/tasks/project/${projectId}`);
  },

  /* Project */
  addNewProject: (project: Project) => {
    return axios.post(`${URL}/projects`, project);
  },

  updateProject: (project: Project) => {
    return axios.put(`${URL}/projects/${project.id}`, project);
  },

  getProjectById: (projectId: string) => {
    return axios.get(`${URL}/projects/${projectId}`);
  },

  removeProjectById: (projectId: string) => {
    return axios.delete(`${URL}/projects/${projectId}`);
  },

  getProjectsByCreatorUserId: (userId: string) => {
    return axios.get(`${URL}/projects/createdBy/${userId}`);
  },

    /* Team */
  addNewTeam: (team: {}) => {    
    return axios.post(`${URL}/teams`, team);
  },

};

function useApi() {
  return api;
}

export { useApi };
