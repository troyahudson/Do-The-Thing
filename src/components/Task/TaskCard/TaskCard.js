import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { func, string } from 'prop-types';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../../App';
import { Task } from '../../../models/task.model'
import './Task.css';
import TaskForm from '../TaskForm/TaskForm';
import ConfirmationDialog from '../../Confirmation Dialog/ConfirmationDialog';


export default function TaskCard({ task, tasks, setTasks, project, deleteTask }) {

    const { api } = useContext(Context)
    // const [_task, set_Task] = useState(task)
    const [isChecked, setIsChecked] = useState(false);
    const boxRef = useRef(null);
    const nameRef = useRef(null);
    const editRef = useRef(null);
    const deleteRef = useRef(null);
    const statusRef = useRef(null);
    const optionsRef = useRef(null);
    const inputRef = useRef(null);
    const [editingValue, setEditingValue] = useState(task.name);
    const [newTask, setNewTask] = useState(task)
    const [status, setStatus] = useState(task.status)
    const [isHovering, setIsHovering] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const taskDeleteMessage = "Are you sure you want to delete this task?"

    function markTaskComplete() {

        if (task.status == Task.STATUS.COMPLETE) {
            // setStatus(Task.STATUS.COMPLETE);
            task.status = Task.STATUS.TO_DO;
        } else {
            // setStatus(Task.STATUS.TO_DO);
            task.status = Task.STATUS.COMPLETE;
        }

        setTasks(tasks.map(t => {
            if (t.id == task.id) {
                return { ...t, status: task.status }
            } else {
                return t;
            }
        }))
        api.updateTask(task)
            .then(res => {
                setIsChecked(!isChecked);
                nameRef.current?.classList.toggle('checked');
                boxRef.current?.classList.toggle('checked');
                editRef.current?.classList.toggle('checked');
                deleteRef.current?.classList.toggle('checked');
                statusRef.current?.classList.toggle('checked');

            }).catch(err => {
                console.error(err)
            })
        console.log(status);
    }

    function editTask() {
        setIsModalOpen(!isModalOpen);
    }

    function handleChange(e) {
        setEditingValue(e.target.value)
        let name = e.target.name;
        let value = e.target.value;

        setNewTask({
            ...newTask,
            [name]: value
        });
    }

    function handleKeyDown(e) {
        if (e.key === "Enter" || e.key === "Escape") {
            e.target.blur();
            document.getElementById("name").disabled = true;
            document.getElementById('task-card-root')?.classList.remove("editing")

        }
    }

    function handleBlur(e) {
        setEditingValue(e.target.value)
        api.updateTask({ ...task, name: editingValue })
            .then(res => {
                document.getElementById('task-card-root')?.classList.remove("editing");
                if (newTask.name != '')
                {
                    document.getElementById("name").disabled = true;
                }
            })
            .catch(err => {
                console.error(err);
            })
        // handleSubmit(newTask);
    }

    function handleSubmit() {
        // console.log(newTask);
        // api.updateTask(newTask)
        api.updateTask({ id: task.id, name: editingValue })
            .then(res => {
            })
            .catch(err => {
                console.error(err);
            })
    }

    function handleDelete() {
        deleteTask(task.id)
    }

    function toggleOptions() {
        if (!isHovering){
            setIsHovering(true);
            optionsRef.current?.classList.add("visible")
        } else {
            setIsHovering(false)
            optionsRef.current?.classList.remove("visible")
        }
    }

    useEffect(() => {
        setNewTask(task)

        if (task.status == Task.STATUS.COMPLETE) {
            setIsChecked(true);
            nameRef.current?.classList.toggle('checked');
            boxRef.current?.classList.toggle('checked');
            editRef.current?.classList.toggle('checked');
            deleteRef.current?.classList.toggle('checked');
            statusRef.current?.classList.toggle('checked');
        }
        if (task.name == '') {
            document.getElementById("name").disabled = false;
        }
    }, [task])


    return (
        <div
            className='task-card-root'
            onMouseEnter={toggleOptions}
            onMouseLeave={toggleOptions}
            
        >
            <div className='top-section'>
                <div ref={nameRef} className='task-info task-name'>
                    <div ref={boxRef} className='icon checkbox' onClick={markTaskComplete}>
                        {isChecked ? <FontAwesomeIcon icon={faCheckSquare} />
                            : <FontAwesomeIcon icon={faSquare} />}
                    </div>
                    <input type="text"
                    ref={inputRef}
                        autoFocus
                        disabled={true}
                        className='textInput'
                        name="name"
                        id="name"
                        value={newTask.name}
                        placeholder="New task..."
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}

                    // onInput={handleInput}
                    />
                </div>
                <div className='task-info'>
                    <div className='options' ref={optionsRef}>
                        <span className='icon edit' ref={editRef}
                            onClick={editTask}>
                            <FontAwesomeIcon icon={faPencil} />
                        </span>
                        <span className='icon delete' ref={deleteRef}
                            onClick={() => { setIsConfirmOpen(true) }}>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                    </div>
                    <div className='task-status' ref={statusRef}>{task.status}</div>
                </div>
            </div>

            <div className='task-description'>
                {task?.description}
            </div>
            {isModalOpen && <TaskForm
                task={newTask}
                onSave={handleSubmit}
                onCancel={editTask}
            />}
            {isConfirmOpen &&
                <ConfirmationDialog
                    message={taskDeleteMessage}
                    leftButton={handleDelete}
                    itemName={"Task"}
                    rightButton={() => { setIsConfirmOpen(false) }}
                />
            }
        </div>
    )


}