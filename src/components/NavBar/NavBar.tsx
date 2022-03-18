import { faBuilding, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBuildingColumns, faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { stringify } from 'querystring';
import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Context } from '../../App'
import './NavBar.css'

type Props = {}

export default function NavBar({ }: Props) {

    const { activeUser, setActiveUser, activeProject, setActiveProject, localStorage } = useContext(Context);
    var user = localStorage.getActiveUser();
    // const [project, setProject] = useState(localStorage.getActiveProject());
    const navigate = useNavigate();
    const location = useLocation();
    const isProjectPage = location.pathname.split("/")[1] === "project";
    const isUserPage = location.pathname.split("/")[1] === "user";

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

    useEffect(() => {

        if (isProjectPage) {
            setActiveProject(localStorage.getActiveProject());
        } else {
            setActiveProject(null)
            localStorage.removeActiveProject();
        }

    }, [location]);

    return (
        <>
            <div className='nav-bar-root'>
                <div>
                    <Link to={user ? `/workspace/${user?.id}` : '/'}>
                        <img className='logo' src="https://i.postimg.cc/qvh7dN3c/dott-logo-white.png" />
                    </Link>
                </div>
                <div className='nav-items'>
                    {!user && <Link to="/login">Login</Link>}
                    {user && <Link to="/about">About</Link>}
                    {user && <div onClick={logOutUser}>Log Out</div>}
                </div>
            </div>
            {user && <ul className="breadcrumb">
                <li><Link to={`/user/${user?.id}`}><FontAwesomeIcon icon={faHouseUser} /> {`${user?.firstName} ${user?.lastName}` || user?.email}</Link></li>
                {!isUserPage ? <li><Link to={`/workspace/${user?.orgId}`}>{user?.orgName}</Link></li>
                : <li className='dimmed'><Link to={`/workspace/${user?.orgId}`}>{user?.orgName}</Link></li>}
                {activeProject && <li><a href="#">{activeProject?.name}</a></li>}
                {/* <li>Task Name</li> */}
            </ul>}
        </>
    )
}