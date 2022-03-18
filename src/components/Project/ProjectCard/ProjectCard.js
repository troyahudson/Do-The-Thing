import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../App';
import '../../Project/Project.css'
import { Project } from '../../../models/project.model'
import { Task } from '../../../models/task.model';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faCaretDown, faCaretUp, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import ConfirmationDialog from '../../Confirmation Dialog/ConfirmationDialog';

// type Props = {}

export default function ProjectCard({ project, projects, setProjects }) {

  const { api, localStorage } = useContext(Context);
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([])
  const user = localStorage.getActiveUser();
  const [isListOpen, setIsListOpen] = useState(true);
  const [tasksTotal, setTasksTotal] = useState(0);
  var [tasksComplete, setTasksComplete] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projectDeleteMessage = "Are you sure you want to delete this project?";

  function toggleList() {
    var toggle = document.getElementsByClassName("toggle-btn");
    console.log(toggle);
    setIsListOpen(!isListOpen);
    toggle.classList.toggle("open");
  }

  const filteredTasks = tasks.filter((task, index) => index <= 4)
  // console.log(tasks.filter((task, index) => index < 3))

  const toggleIcon = () => {
    if (!isListOpen) {
      return (
        <FontAwesomeIcon icon={faAngleDown} />
      )
    } else {
      return (
        <FontAwesomeIcon icon={faAngleUp} />
      )
    }

  }

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  function handleClick() {
    navigate(`/project/${project.id}`);
  }



  function deleteAllTasks() {

    for (let task of tasks) {
      api.removeTask(task.id)
        .then((res) => {
          setTasks((tasks) => {
            return tasks.filter(t => t.id !== task.id)
          })
        }).catch((err) => {
          console.error(err);
        })
    }
  }

  function deleteProject() {

    deleteAllTasks();

    api.removeProjectById(project.id)
      .then(res => {
        setProjects((projects) => {
          return projects.filter(p => p.id !== project.id)
        })
        // navigate(`/workspace/${user.orgId}`)
      })
      .catch(err => {
        console.error(err);
      })
  }


  useEffect(() => {

    api.getTasksByProjectId(project.id)
      .then(res => {
        setTasks(res.data);
        setTasksTotal(res.data.length);
      }).catch(err => {
        console.error(err);
      })

  }, [])

  // useEffect(()=>{
  //   for (let t of tasks) {
  //     if (t.status == Task.STATUS.COMPLETE) {
  //       setTasksComplete(tasksComplete++);
  //     }
  //   }
  //   console.log(tasksComplete);
  // },[tasksTotal])

  return (
    <div className='project-card-root'>
      <div className='header' >
        <h3 onClick={handleClick}>{project.name}</h3>
        <FontAwesomeIcon className='delete btn' icon={faTrashCan} onClick={toggleModal} data="Delete Project" />
        <div className='stats'>
          {/* {tasks.length > 0 && <span>{tasksComplete}/{tasksTotal} Tasks Completed</span>} */}

        </div>
      </div>
      {tasks.length > 0 &&
        <div className="task-list">
          <div className='toggle-btn' onClick={toggleList}>
            {toggleIcon()}
          </div>
          {isListOpen && filteredTasks?.map((t) => {
            return (
              <div className='task-card' key={t.id} onClick={() => { navigate(`/project/${project.id}`) }}>
                <div>{t.name}</div>
                {/* <div>{t.status}</div> */}
              </div>
            )
          })}
        </div>
      }
      {isModalOpen &&
        <ConfirmationDialog
          message={projectDeleteMessage}
          itemName="Project"
          leftButton={deleteProject}
          rightButton={toggleModal}
        // onSave={updateProject}
        />
      }
    </div>
  )
}