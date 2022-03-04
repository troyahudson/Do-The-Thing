import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { stringify } from 'querystring';
import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../../App'
import './NavBar.css'

type Props = {}

export default function NavBar({ }: Props) {

    const { activeUser, setActiveUser, activeProject, setActiveProject, localStorage } = useContext(Context);
    var user = localStorage.getActiveUser();
    // var project = localStorage.getActiveProject();
    const navigate = useNavigate();

    function logOutUser() {
        navigate("/");
        setActiveUser(null);
        // setActiveProject(null)
        localStorage.removeActiveUser();
        localStorage.removeActiveProject();
    }

    useEffect(() => {
        user = localStorage.getActiveUser();
    }, [activeUser?.id]);

    return (
        <div className='nav-bar-root'>
            <div className='home-btn'>
                <Link to={user ? `/users/${user?.id}` : '/'}
                >☑️Do The Thing</Link>
            </div>
            <div className='nav-items'>
                {!user && <Link to="/login">Login</Link>}
                {/* {!user && <Link to="/signup">Sign Up</Link>} */}
                    {user && <div onClick={logOutUser}>Log Out</div>}
                {user && <Link to={`/users/${user?.id}`}>
                    <FontAwesomeIcon icon={faUser} fontSize="1.2rem" />
                </Link>
                }
            </div>
            {/* <Link to="/projects/:projectId">
                <button type="button">Project Page</button>
            </Link> */}
            {/* {JSON.stringify(user, null, 2)} */}
            {/* <span><b>LoggedIn: </b>{user?.email || "None"} </span> */}
            {/* <div><b>Organization: </b>{user?.orgId || "None"}</div> */}
            {/* <div><b>Project: </b>{activeProject?.name || "None"}</div> */}
        </div >
    )
}