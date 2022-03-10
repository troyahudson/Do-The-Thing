import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { stringify } from 'querystring';
import React, { useContext, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
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
        <div>
        <div className='nav-bar-root'>
            <div>
                <Link to={user ? `/user/${user?.id}` : '/'}>
                    <img className='logo' src="https://i.postimg.cc/qvh7dN3c/dott-logo-white.png" />
                </Link>
            </div>
            <div className='nav-items'>
                {!user && <Link to="/login">Login</Link>}
                {user && <div onClick={logOutUser}>Log Out</div>}
            </div>
        </div>
        </div>
    )
}