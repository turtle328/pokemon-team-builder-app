import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
`;

const SaveButton = styled.button`
  align-self: flex-end;
  margin-left: 10px;
  width: 130px;
  margin-bottom: 4px;
`;

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
    <Form className="pure-form pure-form-stacked" onSubmit={e => handleSubmit(e)}>
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
      <SaveButton className={`pure-button pure-button-primary`}>Save Team</SaveButton>
    </Form>
  );
};

export default SaveTeamForm;
