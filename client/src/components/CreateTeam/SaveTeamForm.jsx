import React from 'react';

const SaveTeamForm = () => {
  const Input = {
    width: '160px',
  };

  return (
    <form
      id="team-form"
      className="pure-form pure-form-stacked"
      action="/addTeam"
      method="post"
      style={{ gap: '0.2em' }}>
      <div>
        <label className="bold" htmlFor="user-field">
          Username
        </label>
        <input
          type="text"
          placeholder="Username"
          id="user-field"
          maxLength="20"
          required
          style={Input}
        />
      </div>
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
        />
      </div>
      <div>
        <button className="pure-button pure-button-primary">Save Team</button>
      </div>
    </form>
  );
};

export default SaveTeamForm;
