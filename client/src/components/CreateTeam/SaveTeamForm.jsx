import React, { useState } from 'react';
import styles from './index.module.scss';

const SaveTeamForm = ({ saveTeam }) => {
  const Input = {
    width: '200px',
  };

  const [teamName, setTeamName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    saveTeam(teamName);
  };

  return (
    <form
      id="team-form"
      className="pure-form pure-form-stacked"
      onSubmit={e => handleSubmit(e)}
      style={{ gap: '0.2em' }}>
      <div>
        <label className="bold" htmlFor="team-name-field">
          Team Name
        </label>
        <input
          type="text"
          placeholder="Team Name"
          id="team-name-field"
          maxLength="20"
          required
          style={Input}
          value={teamName}
          onChange={e => setTeamName(e.target.value)}
        />
      </div>
      <button className={`pure-button pure-button-primary ${styles.button} ${styles.buttonSave}`}>
        Save Team
      </button>
    </form>
  );
};

export default SaveTeamForm;
