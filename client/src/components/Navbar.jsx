import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './styles/Navbar.css'

const Navbar = () => {
  const links = ['/', '/create-team', '/random-team', '/edit-team', '/admin'];
  const descriptions = ['Home', 'Create a team', 'Random teams', 'View teams', 'Admin'];
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  return (
    <nav className="pure-menu pure-menu-horizontal">
      <h4 to="/" className="pure-menu-heading">Pokémon Team Builder</h4>
      <ul className="pure-menu-list">
        {links.map((link, index) => {
          return <li key={index} className="pure-menu-item">
            <Link to={link} className={selected === link ? 'pure-menu-link selected' : 'pure-menu-link'} onClick={() => setSelected(link)}>
              {descriptions[index]}
            </Link>
          </li>
        })}
      </ul>
    </nav>
  )
}

export default Navbar