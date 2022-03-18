import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../../App';
import { Organization } from '../../models/organization.model';
import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';
import '../LoginPage/LoginPage.css'

type Props = {};

export default function SignUpPage({ }: Props) {

    const { activeUser, setActiveUser, api, localStorage } = useContext(Context);

    const [user, setUser] = useState({ email: '', password: '' });

    const navigate = useNavigate();

    function setUpNewUser(user: User, newOrg: Organization, userName: string) {

        const newAff = {
            userId: user.id,
            orgId: newOrg.id,
            permission: 3
        };

        api.addNewOrg(newOrg)
            .then((res: { data: { org: Organization; }; }) => {
                // user.orgId = newOrg.id;
                // console.log(user.orgId);                
                api.addNewAffiliation(newAff)
                    .then((res: { data: { message: string } }) => {
                        const newProject = new Project({
                            name: `My Tasks`,
                            orgId: newOrg.id,
                            description: `This is your personal tasks list. New tasks you create will show up here by default.`
                        });
                        localStorage.saveProject(newProject);
                        api.addNewProject(newProject)
                            .then((res: { data: { message: string } }) => {

                                const newTeam = { userId: user.id, projectId: newProject.id, permission: 3 }
                                api.addNewTeam(newTeam)
                                    .then((res: { data: { message: string } }) => {

                                        const newTask1 = new Task({ ...Task, name: "This is your first task", description: "From the project page, you can add, edit, and delete tasks.", createdByUserId: user.id, assignedToUserId: user.id, projectId: newProject.id })
                                        // console.log(newTask1);


                                        api.addNewTask(newTask1)
                                            .then((res: any) => {
                                                navigate(`/workspace/${user.id}`);
                                            })
                                            .catch((err: any) => {
                                                console.error(err);
                                            });
                                    })
                                    .catch((err: any) => {
                                        console.error(err);
                                    });
                            }).catch((err: any) => {
                                console.error(err);
                            });
                    }).catch((err: any) => {
                        console.error(err);
                    });
            }).catch((err: any) => {
                console.error(err);
            });
    }

    function handleChange(e: any) {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value
        })
    }

    function attemptSignUp(user: User) {

        const newUser = new User({ email: user.email, password: user.password });
        let userName = "";
        if (newUser.firstName) {
            userName = newUser.firstName
        } else {
            userName = newUser.email
        }
        const newOrg = new Organization({
            ...Organization,
            name: `${userName}'s Workspace`,
            members: [newUser]
        })

        api.createNewUser(newUser)
            .then((res: { data: { user: User; }; }) => {
                api.getUserById(newUser.id)
                    .then((res: { data: { user: User; }; }) => {
                        setActiveUser({ ...res.data.user, orgId: newOrg.id });
                        localStorage.saveUser({ ...res.data.user, orgId: newOrg.id });
                        setUpNewUser(res.data.user, newOrg, userName);
                    }).catch((err: any) => {
                        console.error(err);
                    })
            }).catch((err: any) => {
                console.error(err);
            });

    }


    function handleSubmit(e: any) {
        e.preventDefault();
        attemptSignUp(user);
        // let newUser = new User({ "email": user.email, "password": user.password });
        // console.log(newUser);

    }

    return (
        <div className='signup-root'>
            <h2>Sign Up</h2>
            <form className='signup-form' onSubmit={handleSubmit}>
                <label htmlFor='email'>Email: </label>
                <input type="text"
                    name='email'
                    value={user.email}
                    onChange={handleChange}></input>
                <label htmlFor='password'>Password: </label>
                <input type="password"
                    name='password'
                    value={user.password}
                    onChange={handleChange}></input>
                <button className='action-btn' type="submit" onClick={handleSubmit}>Register</button>
                <hr />
                <div>Already have an account?</div>
                <button className='link-btn' type="button"
                    onClick={() => { navigate("/login") }}>
                    Login
                </button>
            </form>
        </div>
    );
}
