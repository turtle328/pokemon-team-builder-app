import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavLink = styled(Link)`
  background-color: ${props => (props.selected ? 'rgb(160, 160, 160)' : 'initial')};
  color: ${props => (props.selected ? 'white' : 'initial')};

  &:hover,
  &:focus {
    background-color: ${props => (props.selected ? 'rgb(160, 160, 160)' : 'red')};
    color: white;
  }
`;

const Navbar = () => {
  const Nav = {
    position: 'sticky',
    top: 0,
    backgroundColor: 'white',
    zIndex: '1',
  };

  const links = ['/', '/create-team', '/random-team', '/edit-team', '/admin'];
  const descriptions = ['Home', 'Create a team', 'Random teams', 'View teams', 'Admin'];
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  useEffect(() => {
    setSelected(location.pathname);
  }, [location.pathname]);

  return (
    <nav className="pure-menu pure-menu-horizontal" style={Nav}>
      <h4 to="/" className="pure-menu-heading">
        Pokémon Team Builder
      </h4>
      <ul className="pure-menu-list">
        {links.map((link, index) => {
          return (
            <li key={index} className="pure-menu-item">
              <NavLink to={link} className="pure-menu-link" selected={selected === link}>
                {descriptions[index]}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
