import React, { useContext, useState } from 'react';
import { Context } from '../../../App';
import { Project } from '../../../models/task.model';
import './TaskForm.css'

export default function TaskForm({ task, tasks, setTasks, onSave, onCancel, onDelete }) {

    const { localStorage, api } = useContext(Context);

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

    function onEscapePress(e) {
        if (e.keyCode == 27) {
            handleCancel();
        }
    }

    function handleSubmit(e) {
        // e.preventDefault();

        setTasks(tasks.map(t => {
            if (t.id == task.id) {
                console.log(t.name);
                return { ...t, name: task.name, description: task.description }
            } else {
                return t;
            }
        }))
        api.updateTask(newTask)
            .then(res => {
                console.log("Successfuly updated task");
                
                // onSave();
                onCancel();
            })
            .catch(err => {
                console.error(err);
            })
    }


    function handleCancel() {
        if (task.name == "") {
            onDelete();
        } else {
            onCancel();
        }
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
                        onKeyDown={onEscapePress}
                        autoFocus
                    />
                    <details open>
                        <summary htmlFor='taskDescription'>Task Description (optional):</summary>
                        <textarea
                            id="taskDescription"
                            type="text"
                            name="description"
                            value={newTask.description || ""}
                            onChange={handleChange}
                            onKeyDown={onEnterPress}
                        />
                    </details>
                    <button className='saveButton' type="button" onClick={handleSubmit}>Save Changes</button>
                    <button className='cancelButton' type="button" onClick={onCancel}>Cancel</button>
                </form>
                <div>
                </div>

            </div>
        </div>
    )
}
