import React from 'react'
import { Link } from 'react-router-dom'
import './WelcomeMessage.css'

export default function WelcomeMessage() {
    return (
        <div className='welcome-message-root'>
          <img className='logo' src="https://i.postimg.cc/gkF2VzXN/dott-logo-text-green.png" />
          <p><b>Do The Thing</b>&trade; is a project management app for people who hate project management apps.</p>
          <p>To get started, <Link to="/signup">
            sign up for a free account
          </Link>, <br />
            or <Link to="/login">
              login</Link> if you're already signed up.</p>
          <p>DoTT<sup>*</sup> is still in active development,
            and we're working on growing it into a genuinely useful project management app.</p>
          <p>For more information about DoTT and my other projects, check out my website,
            <br />
            <a href="http://troyahudson.com" target="_blank" rel="noopener noreferrer">
              troyahudson.com
            </a>.
          </p>
          <hr />
          <div className='footnote'><sup>*</sup>Yep, we call it DoTT. Feel free to come up with your own nickname or term of endearment!</div>
        </div>
      )
}
