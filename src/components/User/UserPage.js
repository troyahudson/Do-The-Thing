import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { Context } from '../../App'
import './UserPage.css'

export default function UserPage() {

    const { api, localStorage, activeUser, setActiveUser } = useContext(Context);
    const user = localStorage.getActiveUser();
    const [updatedUser, setUpdatedUser] = useState(user);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [workspaces, setWorkspaces] = useState([]);

    // const emailRef = useRef();
    // const firstNameRef = useRef();
    // const lastNameRef = useRef();
    const confirmRef = useRef();
    const savePasswordRef = useRef();

    function handleChange(e) {
        var name = e.target.name
        var value = e.target.value
        setUpdatedUser({
            ...updatedUser,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        api.updateUser(updatedUser)
            .then(res => {
                setActiveUser(updatedUser);
                localStorage.saveUser(updatedUser);
                setIsEditing(false);
                const confirm = confirmRef?.current;
                setTimeout(() => { confirm?.classList.add("visible") }, 200);
                setTimeout(() => { confirm?.classList.remove("visible") }, 2500);
            })
            .catch(err => {
                console.error(err);
            })
    }

    function handleCancel() {
        setIsEditing(false);
        setUpdatedUser(user);
        // emailRef.current.disabled = true;
        // firstNameRef.current.disabled = true;
        // lastNameRef.current.disabled = true;
    }

    function editInfo() {
        setIsEditing(true);
        // emailRef.current.disabled = false;
        // firstNameRef.current.disabled = false;
        // lastNameRef.current.disabled = false;
    }

    useEffect(() => {
        api.getOrgsByAdminUserId(user.id)
            .then(res => {
                setWorkspaces(res.data);
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    function UserForm() {
        return (
            <form className='user-info'
                onSubmit={handleSubmit}>
                <div>
                    <h4>Email:</h4>
                    <input type="text"
                        name="email"
                        value={updatedUser.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='firstName'><h4>First Name:</h4></label>
                    <input type="text"
                        name="firstName"
                        value={updatedUser.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='lastName'><h4>Last Name:</h4></label>
                    <input type="text"
                        name="lastName"
                        value={updatedUser?.lastName}
                        onChange={handleChange}
                    />
                </div>

            </form>
        )
    }

    function PasswordForm() {

        const [inputs, setInputs] = useState({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });

        function handlePasswordChange(e) {
            let name = e.target.name;
            let value = e.target.value;

            setInputs({
                ...inputs,
                [name]: value,
            });
        }

        function handlePasswordSubmit(e) {
            e.preventDefault();

            api.changePassword(user, inputs.currentPassword, inputs.newPassword)
                .then((results) => {
                    //    on success -> give notification that password was updated
                    // password changed
                    console.log('Password has been updated!');
                    setIsModalOpen(false);
                    const confirm = savePasswordRef?.current;
                    setTimeout(() => { confirm?.classList.add("visible") }, 200);
                    setTimeout(() => { confirm?.classList.remove("visible") }, 2500);
                    setInputs({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                    });
                    // close();
                })
                .catch((err) => {
                    //    on fail -> give error notification
                    console.error(err.response);
                    console.log('Password did not update!')
                });

            if (inputs.newPassword !== inputs.confirmPassword) {
                console.log('New Passwords do not match!')
            }
        }

        // if ((inputs.confirmPassword.length > 0) && (inputs.newPassword != inputs.confirmPassword)) {
        //     savePasswordRef.current.disabled = true;
        // } else {
        //     savePasswordRef.current.disabled = false;
        // }

        return (
            <div className='password-modal-root'>
                <div>
                    <form className='password-form' onSubmit={handlePasswordSubmit}>
                        <label htmlFor='currentPassword'>Current Password:</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={inputs?.currentPassword}
                            onChange={handlePasswordChange}
                            required
                        />
                        <label htmlFor='newPassword'>New Password:</label>
                        <input
                            type="text"
                            name="newPassword"
                            value={inputs?.newPassword}
                            onChange={handlePasswordChange}
                            required
                        />
                        <label htmlFor='confirmPassword'>Confirm New Password:</label>
                        <input
                            type="text"
                            name="confirmPassword"
                            value={inputs?.confirmPassword}
                            onChange={handlePasswordChange}
                            required
                        />
                    </form>
                    <div className='buttons'>
                        <button className='save' ref={savePasswordRef} type="button" onClick={handlePasswordSubmit}>Save New Password</button>
                        <button type="button" onClick={() => { setIsModalOpen(false) }}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='user-page-root'>
            <h2>User Profile</h2>

            {isEditing ?
                <div>
                    <UserForm />
                    <div className='buttons'>
                        <button className='save' type='button' onClick={handleSubmit}>Save Changes</button>
                        <button type='button' onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
                :
                <div>
                    <div className='user-info display'>
                        {/* <div> */}
                        <h4>Email:</h4>
                        <div>{user?.email}</div>
                        {/* </div> */}
                        {/* <div> */}
                        <h4>First Name:</h4>
                        <div>{user?.firstName}</div>
                        {/* </div> */}
                        {/* <div> */}
                        <h4>Last Name:</h4>
                        <div>{user?.lastName}</div>
                        {/* </div> */}
                    </div>
                    <div className='buttons'>
                        <button type='button' onClick={editInfo}>Edit Profile</button>
                        <div className='success' ref={confirmRef}>
                            <FontAwesomeIcon icon={faCircleCheck} />
                        </div>
                    </div>
                </div>
            }
            {!isModalOpen ?
                <>
                    {!isEditing && <div >
                        <button type='button' onClick={() => { setIsModalOpen(true) }} style={{ margin: "auto" }} >Change Password</button>
                        <div className='success' ref={savePasswordRef}>
                            <FontAwesomeIcon icon={faCircleCheck} />
                        </div>
                    </div>}
                </> :
                <PasswordForm />}
            <hr width="80%" style={{ margin: "1.5rem auto" }} />
            <h2>Workspaces</h2>
            <ul>
                {workspaces && workspaces.map((w) => {
                    return (
                        <li key={w.id}>
                            <Link to={`/workspace/${w.id}`}>
                            {w.name}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
