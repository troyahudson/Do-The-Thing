import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProjectCard from '../ProjectCard/ProjectCard';
import TaskCard from '../../Task/TaskCard/TaskCard';
import { Task } from '../../../models/task.model';
import { Context } from '../../../App';
import '../../Project/Project.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import ConfirmationDialog from '../../Confirmation Dialog/ConfirmationDialog';
import TaskForm from '../../Task/TaskForm/TaskForm';
import ProjectBoard from '../ProjectBoard/ProjectBoard';

export default function ProjectPage() {

  const { localStorage, api } = useContext(Context);
  const user = localStorage.getActiveUser();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  // const [project, setProject] = useState(null);
  var project = localStorage.getActiveProject();
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false)
  const [newDescription, setNewDescription] = useState("");
  const [newProject, setNewProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  var completedTasks = [];
  var toDoTasks = [];
  const projectDeleteMessage = "Are you sure you want to delete this project?";

  function addTask() {

    const isEmptyTask = tasks.map(t => {
      if (t.name == '') {
        return t
      }
    })


    if (isEmptyTask) {
      const newTask = new Task({ ...Task, name: '', createdByUserId: user.id, assignedToUserId: user.id, assignedToUserName: user.email, projectId: projectId });

      api.addNewTask(newTask)
        .then(res => {
          setTasks([...tasks, newTask])
        }).catch(err => {
          console.error(err);
        })
    }
  }

  function deleteTask(taskId) {
    api.removeTask(taskId)
      .then((res) => {
        setTasks((tasks) => {
          return tasks.filter(t => t.id !== taskId)
        })
      }).catch((err) => {
        console.error(err);
      })
  }

  function deleteProject() {

    for (let task of tasks) {
      api.removeTask(task.id)
        .then((res) => {
        }).catch((err) => {
          console.error(err);
        })
    }

    api.removeProjectById(projectId)
      .then(res => {
        navigate(`/user/${user.id}`)
      })
      .catch(err => {
        console.error(err);
      })
  }

  function editName() {
    setIsEditingName(true);
  }

  function editDescription() {
    setIsEditingDescription(!isEditingDescription);
  }

  function cancelEdit() {
    setNewDescription(project?.description);
    setIsEditingDescription(false);
    setIsEditingName(false);
  }

  function handleChange(e) {
    // setNewDescription(e.target.value);
    var name = e.target.name
    var value = e.target.value
    // console.log("Name: ", name, "Value: ", value);
    setNewProject({
      ...newProject,
      [name]: value
    })
  }

  function updateProject(e) {
    e.preventDefault();
    // setProject(newProject);
    // setProject({ ...project, description: newDescription });
    // project.description = newDescription;
    // localStorage.saveProject(newProject);
    api.updateProject(newProject)
      .then(res => {
        setIsEditingDescription(false)
        setIsEditingName(false)
      })
      .catch(err => {
        console.error(err)
      });
  }

  function onEnterPress(e) {
    if (e.keyCode == 13 && e.shiftKey == false) {
      // e.preventDefault();
      updateProject(e)
    }
  }

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  useEffect(() => {
    api.getProjectById(projectId)
      .then(res => {
        // setProject(res.data);
        setNewProject(res.data);
        setNewDescription(res.data.description)
      })
      .catch(err => {
        console.error(err)
      });
    // console.log(project);

    api.getTasksByProjectId(projectId)
      .then(res => {
        setTasks(res.data);
        // console.log(tasks);
      })
      .catch(err => {
        // console.error(err);
      })
  }, []);

  toDoTasks = tasks.filter(task => task.status != Task.STATUS.COMPLETE).sort((a, b) => b.dateCreated - a.dateCreated);

  completedTasks = tasks.filter(task => task.status == Task.STATUS.COMPLETE).sort((a, b) => b.dateCreated - b.dateCreated);

  return (
    <div className='project-page-root'>
      <div className='project-details'>
        {!isEditingName ?
          <div className='project-name'>
            <h2>{newProject?.name}</h2>
            <span className='buttons'>
              <FontAwesomeIcon className='edit btn' icon={faEdit} onClick={editName} />
            </span>
          </div>
          :
          <div className="project-name">
            <form
              onSubmit={updateProject}
            >
              <input type="text"
                name="name"
                value={newProject.name}
                onChange={handleChange}
                autoFocus
                size={newProject.name.length}
              // maxLength={255}
              />
            </form>
            <span className='buttons'>
              <FontAwesomeIcon className='cancel btn' icon={faBan} onClick={cancelEdit} />
              <FontAwesomeIcon className='confirm btn' icon={faCheckSquare} onClick={updateProject} />
            </span>
          </div>
        }

        {!isEditingDescription ?
          <div className='project-description'>
            <span>{newProject?.description}
            </span>
            <span className='buttons'>
              <FontAwesomeIcon className='edit btn' icon={faEdit} onClick={editDescription} />
            </span>
          </div >
          :
          <div className='project-description'>
            <form
              className="description-form"
              // id="descriptionForm"
              onSubmit={updateProject}
            >
              <textarea
                name="description"
                value={newProject?.description}
                onChange={handleChange}
                type="submit"
                form="descriptionForm"
                onKeyDown={onEnterPress}
                maxLength="255"
                autoFocus
              />
            </form>
            <span className='buttons'>
              <FontAwesomeIcon className='cancel btn' icon={faBan} onClick={cancelEdit} />
              <FontAwesomeIcon className='confirm btn' icon={faCheckSquare} onClick={updateProject} />
            </span>
          </div>
        }
      </div>
      <button className='new-task btn' type="button" onClick={addTask}>
        Create New Task
      </button>
      <div className='list-container'>
        <div className='task-list'>
          {toDoTasks.map((t) => {
            return (
              <TaskCard key={t.id}
                task={t}
                project={project}
                tasks={tasks}
                setTasks={setTasks}
                deleteTask={deleteTask} />
            )
          })}
        </div>
        <div className='task-list'>
          <details open>
            <summary>
              Completed tasks
            </summary>
            <div className='task-list'>
              {completedTasks.map((t) => {
                return (
                  <TaskCard key={t.id}
                    task={t}
                    project={project}
                    tasks={tasks}
                    setTasks={setTasks}
                    deleteTask={deleteTask}
                  />
                )
              })}
            </div>
          </details>
        </div>
      </div>
      <div className='footer'>
        <FontAwesomeIcon className='delete btn' icon={faTrashCan} onClick={toggleModal} data="Delete Project" />
      </div>

      <ProjectBoard
        tasks={tasks}
        project={project}
        setTasks={setTasks}
        deleteTask={deleteTask}
      />


      {isModalOpen &&
        <ConfirmationDialog
          message={projectDeleteMessage}
          itemName="Project"
          leftButton={deleteProject}
          rightButton={toggleModal}
          onsave={updateProject}
        />
      }
    </div>
  );
}
