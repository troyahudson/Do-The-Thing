import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../App'
import WelcomeMessage from '../WelcomeMessage/WelcomeMessage'
import '../WelcomeMessage/WelcomeMessage.css'

// const diagram = require('../../assets/dott-db-er-diagram.svg')

export default function AboutPage() {

  const { localStorage } = useContext(Context);
  const user = localStorage.getActiveUser();

  const title = <>Do The Thing&trade;</>

  return (
    <div className='welcome-message-root'>
      <img className='logo' src="https://i.postimg.cc/gkF2VzXN/dott-logo-text-green.png" />
      <p><b>Do The Thing</b>&trade; is a project management app for people who hate project management apps.</p>

      {!user && <div>
        <p>To get started, <Link to="/signup">sign up for a free account</Link>,
          or <Link to="/login">login</Link> if you're already signed up.</p>
      </div>}

      <h2>Background</h2>
      <p className='text'>{title} began as a personal portfolio project and the culmination of my <a href="https://www.harborec.com/jrs-coding-school" target="_blank">coding bootcamp</a> to demonstrate my ability to create a simple, full-stack web app.
        With only about 3 weeks to get my first solo project up and running, I was attracted to the idea of a project managament tool
        because I actually use software like this myself everyday.</p>
      <p className='text'>Whether it's building new software, overhauling an inventory system, or planning a wedding,
        projects can get extremely complex—and so can the tools we use to manage them.</p>
      <p className='text'>All this complexity can cause us to forget the fact that at any given moment, we can really only
        do <a href="https://www.apa.org/research/action/multitask" target="_bank">one thing at a time</a>, especially if we want to do it well.
        That was the inspiration behind the idea of "doing the thing."</p>

      <h2>Data Structure</h2>
      <p className='callout'>{title} was planned and built with scalablity in mind.</p>
      <p className='text'>While I couldn't execute everything I had in mind in the first sprint, I put considerable effort into
        laying the groundwork for a scalable application with support for more advanced features in future iterations.</p>

      <figure>
        <img src='https://i.postimg.cc/MG44D8hb/dott-db-er-diagram.png' title="Do The Thing ER Diagram" alt="Do The Thing ER Diagram" />
        <figcaption>{title}'s Database Structure</figcaption>
      </figure>

      <p className='text'>As the diagram above shows, entities in the database can be related in many potentially useful arrangements.
        The following roadmap features will take advantage of properties that are already built into the data structure:</p>
      <ul>
        <li>Users will be able to invite others to join either a single project or an entire workspace (organization)</li>
        <li>Users' read/write privileges can be controlled by permission at both the project and organizational level</li>
        <li>Tasks will be assignable to other users</li>
        <li>Tasks can be tagged and sorted by priority and complexity</li>
      </ul>
      <h2>What's Next</h2>
      <p className='callout'>A platform with room to grow</p>
      <p className='text'>For my first independent developer project, I chose to create a tool for task and project management 
      specifically because I knew I would be biting off more than I could chew. My vision for {title} is that the app will 
      continue to evolve and expand as I gain more knowledge and experience as a developer.</p>
      <p className='text'>It's not perfect yet and it never will be, but with every iteration it's gotten a little bit better
      In fact, that's my whole approach to coding. I intend to be building software solutions for a long time. {title} is just the beginning.</p>
      <p className='text'></p>
      <hr/>
      <p>To learn more about me and my other projects, check out my website,
            <br />
            <a href="http://troyahudson.com" target="_blank" rel="noopener noreferrer">
              troyahudson.com
            </a>
          </p>
    </div>
  )
}
