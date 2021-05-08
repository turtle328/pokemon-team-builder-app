import React from 'react';
import styles from './index.module.scss';
import GetUsersForm from './GetUsersForm';

const Admin = () => {
  return (
    <div className={`pure-g ${styles.container}`}>
      <div className="yellow-box pure-u-1">
        <h2>Instructions</h2>
        <p className="paragraph">
          Click the "Get Users" button to get a list of users on the server.
        </p>
        <p className="paragraph">
          The "Delete User" button will delete the user that is currently selected by the dropdown.
        </p>
        <p className="paragraph">
          Whenever you select a new user the teams by that user will be displayed.
        </p>
        <p className="paragraph">
          Each team has three buttons, two that let you modify the team with a redirect with the
          data filled in. And finally the third button will delete the team for that user.
        </p>
        <GetUsersForm />
      </div>
    </div>
  );
};

export default Admin;
