import React, { useContext, useState } from 'react';
import { Context } from '../../../App';
import { Project } from '../../../models/task.model';
import './TaskForm.css'

export default function TaskForm({task, onSave, onCancel}) {

    const {localStorage, api} = useContext(Context);

    const user = localStorage.getActiveUser();

    const [newTask, setNewTask] = useState(task);

    function handleChange(e) {
        var name = e.target.name
        var value = e.target.value
        setNewTask({
            ...newTask,
            [name]: value
        })
        // console.log(task);
    }

    
  function onEnterPress(e) {
      if (e.keyCode == 13 && e.shiftKey == false) {
        e.preventDefault();
      handleSubmit()
    }
  }

    function handleSubmit(){
        // e.preventDefault();
        api.updateTask(newTask)
        .then(res => {
            console.log("Successfuly updated task");
            onCancel();
        })
        .catch(err => {
            console.error(err);
        })
    }

    return (
        <div className='task-form-root'>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='taskName'>Task Name:</label>
                    <input
                        id="taskName"
                        type="text"
                        name="name"
                        value={newTask?.name}
                        onChange={handleChange}
                        // onKeyDown={onEnterPress}
                    />
                    <label htmlFor='taskDescription'>Task Description (optional):</label>
                    <textarea
                        id="taskDescription"
                        type="text"
                        name="description"
                        value={newTask.description || ""}
                        onChange={handleChange}
                        onKeyDown={onEnterPress}
                    />
                    <button className='saveButton' type="button" onClick={handleSubmit}>Save Changes</button>
                    <button className='cancelButton' type="button" onClick={onCancel}>Cancel</button>
                </form>
                <div>
                </div>

            </div>
        </div>
    )
}
