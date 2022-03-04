import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../../App';
import { UserContext } from '../../contexts/UserContext';
import { Organization } from '../../models/organization.model';
import { Project } from '../../models/project.model';
import { User } from '../../models/user.model';
import { useApi } from '../../services/axios.service';
import { useLocalStorage } from '../../services/local.storage';
import { login } from '../../utils/login';
import './LoginPage.css'

type Props = {};

export default function LoginPage({ }: Props) {

    const { activeUser, setActiveUser, setActiveProject, api, localStorage } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div>
            <div className="login-root">
                <h2>Login</h2>
                <LoginForm />
                <br />
                {/* <div>Active User: {activeUser.email}</div> */}
            </div>
        </div>
    );

    function LoginForm() {

        var user = localStorage.getActiveUser();

        const [newUser, setNewUser] = useState({ email: "", password: "" });

        const emailRef = useRef(null);
        const passwordRef = useRef(null);

        function handleChange(e: any) {
            var name = e.target.name;
            var value = e.target.value;

            setNewUser({
                ...newUser,
                [name]: value
            })
        }

        function handleSubmit(e: { preventDefault: () => void; }) {
            e.preventDefault();

            if (newUser.email && newUser.password) {
                api.login(newUser)
                    .then((res: { data: { user: User; }; }) => {
                        const loggedInUser = res.data.user
                        localStorage.saveUser(loggedInUser);
                        setActiveUser(loggedInUser);
                        api.getOrgsByAdminUserId(loggedInUser.id)
                            .then((res: any) => {
                                localStorage.saveUser({ ...loggedInUser, orgId: res.data.id, orgName: res.data.name })
                                setActiveUser({ ...loggedInUser, orgId: res.data.id, orgName: res.data.name });
                                navigate(`/users/${loggedInUser.id}`)
                            })
                            .catch((err: any) => {
                                console.error(err);
                            })
                    })
                    .catch((err: any) => {
                        console.error(err);
                    });
            }
        }

        return (
            <form
                className='login-form'
                onSubmit={handleSubmit}
            >
                <label>Email:</label>
                <input type="text"
                    ref={emailRef}
                    name="email"
                    value={newUser?.email}
                    onChange={handleChange}
                />

                <label>Password:</label>
                <input type="password"
                    ref={passwordRef}
                    name="password"
                    value={newUser?.password}
                    onChange={handleChange}
                />
                {/* <br /> */}
                <button type="submit"
                    onClick={handleSubmit}
                >Login</button>
                <hr />
                <div>Don't have an account?</div>
                <button type="button"
                    onClick={() => { navigate("/signup") }}>
                    Sign Up
                </button>
            </form >
        )
    }
}
