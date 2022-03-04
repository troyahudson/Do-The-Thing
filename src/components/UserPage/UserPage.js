import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../App';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';
import './UserPage.css'
import { Project } from '../../models/project.model';
import ProjectCard from '../Project/ProjectCard/ProjectCard';
import { useParams } from 'react-router-dom';
import NewProjectForm from '../Project/NewProjectForm/NewProjectForm';

// type Props = {};

var taskNumber = 1;

export default function UserPage() {

    const { activeUser, setActiveUser, activeProject, setActiveProject, api, localStorage } = useContext(Context);
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const user = localStorage.getActiveUser();
    const project = localStorage.getActiveProject();
    const { userId } = useParams();

    function getProjects(){
        api.getProjectsByCreatorUserId(userId)
        .then((res) => {
            setProjects(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function addProject(newProject) {

        // const newProject = new Project({ name: `${user.email}'s NEW Project`, orgId: user.orgId });
        // console.log(newProject);
        api.addNewProject(newProject)
            .then(res => {
                // setActiveProject(newProject);
                setProjects([...projects, newProject])
                const newTeam = { userId: user.id, projectId: newProject.id, permission: 3 };
                api.addNewTeam(newTeam)
                    .then((res) => {
                        toggleModal();
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    function toggleModal() {
        setIsModalOpen(!isModalOpen);
    }

    useEffect(() => {
        getProjects();
    }, [])

    return (
        <div className='user-page-root'>
            {/* <h2>{user.email}'s Page</h2> */}
            <button type="button" onClick={toggleModal}>
                Create New Project
            </button>
            <h2>Projects</h2>
            <div className='project-list'>
                {projects && projects.map(p => {
                    return (
                        <div key={p.id}>
                            <ProjectCard key={p.id}
                                project={p} />
                        </div>
                    )
                })}
            </div>
            {isModalOpen && <NewProjectForm 
            saveButton={addProject} 
            cancelButton={toggleModal}
            project={new Project({...Project, name: '', orgId: user.orgId })}
            />}
        </div >
    );

}
