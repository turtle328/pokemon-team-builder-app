import React, { useState } from 'react';
import styled from 'styled-components';

const SaveButton = styled.button`
  position: relative;
  bottom: ${props => (props.hideLegend ? '3px' : '0px')};
  align-self: flex-end;
  margin-left: 10px;
  width: 130px;
`;

const SaveTeamForm = ({ saveTeam, hideLegend = false }) => {
  const Input = {
    width: '200px',
  };

  const [teamName, setTeamName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    saveTeam(teamName);
  };

  return (
    <form className="pure-form pure-u-1" onSubmit={e => handleSubmit(e)}>
      <fieldset style={{ display: 'flex' }}>
        {hideLegend && <legend className="bold">Save Team</legend>}
        <div className="aligned-container">
          {!hideLegend && (
            <label htmlFor="team-name-field" className="bold">
              Team Name
            </label>
          )}
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
        <SaveButton hideLegend={hideLegend} className={`pure-button pure-button-primary`}>
          Save Team
        </SaveButton>
      </fieldset>
    </form>
  );
};

export default SaveTeamForm;
