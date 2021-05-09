import React, { useState, useRef } from 'react';
import { useSnackbar } from 'react-simple-snackbar';
import styles from './index.module.scss';
import GetUsersForm from './GetUsersForm';
import TeamSubmissions from './TeamSubmssions';

const Admin = () => {
  const user = useRef('');
  const [teams, setTeams] = useState([]);
  const [showSnackbar] = useSnackbar();

  const getTeams = async username => {
    const res = await fetch(`/team/${username}`);
    const data = await res.json();
    setTeams(data.teams || []);
    user.current = username;
  };

  const deleteTeam = async teamName => {
    const res = await fetch(`/team/${teamName}/${user.current}`, { method: 'DELETE' });
    const data = await res.json();
    if (res.ok) {
      // update the team view
      getTeams(user.current);
    }
    if (data) {
      showSnackbar(data.message);
    }
  };

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
        <GetUsersForm getTeams={getTeams} />
      </div>
      <TeamSubmissions teams={teams} deleteTeam={deleteTeam} />
    </div>
  );
};

export default Admin;
