import React from 'react';
import styles from './index.module.scss';

const LogoutMenu = ({ user, setUser }) => {
  const verticalAlgin = {
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <ul className={styles.menu}>
      <li className="pure-menu-item" style={verticalAlgin}>
        <p className={styles.greeting}>Welcome, {user}!</p>
      </li>
    </ul>
  );
};

export default LogoutMenu;
