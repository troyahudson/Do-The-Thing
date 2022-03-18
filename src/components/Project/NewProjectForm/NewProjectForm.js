import React, { useContext, useState } from 'react'
import { Context } from '../../../App';
// import { Project } from '../../../models/newProject.model';
import './NewProjectForm.css'

export default function NewProjectForm({ saveButton, cancelButton, project }) {

    const { localStorage } = useContext(Context);

    const user = localStorage.getActiveUser();

    const [newProject, setNewProject] = useState(project);

    function handleChange(e) {
        var name = e.target.name
        var value = e.target.value
        setNewProject({
            ...newProject,
            [name]: value
        })
        // console.log(newProject);
    }

    function handleSubmit() {
        // console.log(newProject);
        saveButton(newProject);
    }


    return (
        <div className='project-form-root'>
            <div className='form-container'>
            <div className='header'>New Project</div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='projectName'>Project Name:</label>
                    <input
                        id="projectName"
                        type="text"
                        name="name"
                        value={newProject?.name}
                        onChange={handleChange}
                        autoFocus
                    />
                    <label htmlFor='projectDescription'>Project Description (optional):</label>
                    <textarea
                        id="projectDescription"
                        type="text"
                        name="description"
                        value={newProject?.description}
                        onChange={handleChange}
                    />
                </form>
                <div>
                    <button className='saveButton' type="button" onClick={handleSubmit}>Create Project</button>
                    <button className='cancelButton' type="button" onClick={cancelButton}>Cancel</button>
                </div>

            </div>
        </div>
    )
}
