import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../../App';
import NavBar from '../NavBar/NavBar';
import './HomePage.css'

type Props = {};

export default function HomePage({ }: Props) {

  const { activeUser, setActiveUser, api, localStorage } = useContext(Context)
  const navigate = useNavigate();
  const user = localStorage.getActiveUser();
  const location = useLocation();

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login")
  //   }
  // }, [])

  return (
    <div className='home-page-root'>
      <NavBar />
      {location.pathname == "/" && <WelcomeMessage />}
      <Outlet />
    </div>
  );

  function WelcomeMessage() {

    return (
      <div className='welcome-message-root'>
        <img className='logo' src="https://i.postimg.cc/gkF2VzXN/dott-logo-text-green.png" />
        <p><b>Do The Thing</b>&trade; is a project management app for people who hate project management apps.</p>
        <p>Right now, it can help you manage and organize personal to-do lists and tasks. DoTT<sup>*</sup> is still in active development,
          and we're working on growing it into a genuinely useful project management app.</p>
        <p>To get started, <Link to="/signup">
          sign up for a free account
        </Link>, <br />
          or <Link to="/login">
            login</Link> if you're already signed up.</p>
        <p>For more information about DoTT and my other projects, check out my website,
          <br />
          <a href="http://troyahudson.com" target="_blank" rel="noopener noreferrer">
            troyahudson.com
          </a>.
        </p>
        <hr />
        <div className='footnote'><sup>*</sup>Yep, we call it DoTT. Feel free to come up with your own nickname or term of endearment, but we're sticking with DoTT.</div>
      </div>
    )

  }

}
