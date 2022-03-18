import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Task } from '../../../models/task.model'
import ConfirmationDialog from '../../Confirmation Dialog/ConfirmationDialog'
import TaskCard from '../../Task/TaskCard/TaskCard'
import './ProjectBoard.css'

export default function ProjectBoard({ tasks, project, setTasks, deleteTask }) {

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const taskDeleteMessage = "Are you sure you want to delete this task?"

    const toDoTasks = tasks.filter(task => task.status == Task.STATUS.TO_DO).sort((a, b) => a.dateCreated - b.dateCreated);
    const inProgressTasks = tasks.filter(task => task.status == Task.STATUS.IN_PROGRESS).sort((a, b) => a.dateCreated - b.dateCreated);
    const completedTasks = tasks.filter(task => task.status == Task.STATUS.COMPLETE).sort((a, b) => a.dateCreated - b.dateCreated);

    function handleDelete(task) {
        deleteTask(task.id)
    }

    return (
        <div className="board-root wrapper">
            <ul className="column__list">
                <li className="column__item">
                    <div className="column__title--wrapper">
                        <h2>{Task.STATUS.TO_DO}</h2>
                        <i className="fas fa-ellipsis-h"></i>
                    </div>
                    <ul className="card__list">
                        {toDoTasks.map((t) => {
                            return (
                                <BoardTaskCard task={t} key={t.id}/>
                            )
                        })}
                    </ul>
                    <div className="column__item--cta">
                    <h4><FontAwesomeIcon icon={faPlus} /> Add another task</h4>
                    </div>
                </li>
                <li className="column__item">
                    <div className="column__title--wrapper">
                        <h2>{Task.STATUS.IN_PROGRESS}</h2>

                        <i className="fas fa-ellipsis-h"></i>
                    </div>
                    <ul className="card__list">
                    {inProgressTasks.map((t) => {
                            return (
                                <BoardTaskCard task={t} key={t.id}/>
                            )
                        })}
                    </ul>
                    <div className="column__item--cta">
                    <h4><FontAwesomeIcon icon={faPlus} /> Add another task</h4>
                    </div>
                </li>
                <li className="column__item">
                    <div className="column__title--wrapper">
                        <h2>{Task.STATUS.COMPLETE}</h2>
                        <i className="fas fa-ellipsis-h"></i>
                    </div>
                    <ul className="card__list">
                        <ul className="card__list">
                        {completedTasks.map((t) => {
                            return (
                                <BoardTaskCard task={t} key={t.id}/>
                            )
                        })}
                        </ul>
                    </ul>
                    <div className="column__item--cta">
                        <h4><FontAwesomeIcon icon={faPlus} /> Add another task</h4>
                    </div>
                </li>
            </ul>

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

    function BoardTaskCard({task}) {

        return (
            <li className="card__item">
                {/* <span className="card__tag card__tag--browser">{task.priority}</span> */}
                <h6 className="card__title">{task.name}</h6>
                <ol className="card__actions">
                    <li className="card__actions--wrapper">
                        <span className='icon edit'
                        // ref={editRef}
                        // onClick={editTask}
                        >
                            <FontAwesomeIcon icon={faPencil} />
                        </span>
                        <span className='icon delete'
                        // ref={deleteRef}
                        // onClick={() => { setIsConfirmOpen(true) }}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                        <i className="fas fa-align-left"></i></li>
                </ol>
            </li>
        )
    }
}
