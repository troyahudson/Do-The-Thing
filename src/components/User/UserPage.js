import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../App'
import './UserPage.css'

export default function UserPage() {

    const { api, localStorage, activeUser, setActiveUser } = useContext(Context);
    const user = localStorage.getActiveUser();
    const [updatedUser, setUpdatedUser] = useState(user);

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
console.log(updatedUser);
        api.updateUser(updatedUser)
            .then(res => {
                setActiveUser(updatedUser);
            })
            .catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
    }, [])

    return (
        <div className='user-page-root'>
            <form className='user-info'
                onSubmit={handleSubmit}>
                <label htmlFor='email'>Email:</label>
                <input type="text"
                    name="email"
                    value={updatedUser.email}
                    onChange={handleChange}
                // disabled
                />
                <label htmlFor='firstName'>First Name:</label>
                <input type="text"
                    name="firstName"
                    value={updatedUser?.firstName}
                    onChange={handleChange}
                />
                <label htmlFor='lastName'>Last Name:</label>
                <input type="text"
                    name="lastName"
                    value={updatedUser?.lastName}
                    onChange={handleChange}
                />
                <button type='submit'>Save Changes</button>
                {/* <div type="password">{user.password}</div> */}

            </form>
        </div>
    )
}
