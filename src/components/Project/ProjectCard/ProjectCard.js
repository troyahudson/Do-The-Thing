import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../App';
import '../../Project/Project.css'
import { Project } from '../../../models/project.model'
import { Task } from '../../../models/task.model';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faCaretDown, faCaretUp, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

// type Props = {}

export default function ProjectCard({ project }) {

  const { api, localStorage } = useContext(Context);
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([])
  const user = localStorage.getActiveUser();
  const [isListOpen, setIsListOpen] = useState(true);

  function toggleList() {
    var toggle = document.getElementsByClassName("toggle-btn")
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

  useEffect(() => {

    api.getTasksByProjectId(project.id)
      .then(res => {
        setTasks(res.data)
      }).catch(err => {
        console.error(err);
      })
  }, [])

  return (
    <div className='project-card-root'>
      <div className='header' onClick={() => { navigate(`/projects/${project.id}`) }}>
        <h3 >{project.name}</h3>
      </div>
      {tasks.length > 0 &&
        <div className="task-list">
          <div className='toggle-btn' onClick={toggleList}>
            {toggleIcon()}
          </div>
          {isListOpen && filteredTasks?.map((t) => {
            return (
              <div className='task-card' key={t.id} onClick={() => { navigate(`/projects/${project.id}`) }}>
                <div>{t.name}</div>
                {/* <div>{t.status}</div> */}
              </div>
            )
          })}
        </div>
      }
    </div>
  )
}