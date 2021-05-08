import React, { useState } from 'react';
import styles from './index.module.scss';
import { useSnackbar } from 'react-simple-snackbar';
import { useHistory } from 'react-router-dom';
import Pokemon from '../../js/classes/Pokemon';

const TEAM_SIZE = 6;

const GetTeamForm = ({ setTeam }) => {
  const [username, setUsername] = useState('');
  const [teams, setTeams] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [openSnackbar] = useSnackbar();
  const history = useHistory();

  const fetchTeam = async () => {
    console.log('fetching the teams from the server for user: ' + username);
    const res = await fetch(`/team/${username}`);
    const data = await res.json();
    const teamsJson = data.teams;
    if (teamsJson) {
      setTeams(teamsJson);
      setTeam(teamsJson[0].team);
    }
    openSnackbar(data.message);
  };

  const handleSelectTeam = e => {
    const index = e.target.value;
    const teamObj = teams[index];
    setSelectedIndex(index);
    setTeam(teamObj.team);
  };

  const redirectWithTeamData = url => {
    const { name, team } = teams[selectedIndex];
    // convert objects into pokemon objects with ES6 class methods
    // also pads the array with default pokemon objects if it's less than the max team size
    const convertedTeam = team
      .map(pokeObj => Pokemon.instanceFromObject(pokeObj))
      .concat(new Array(TEAM_SIZE - team.length).fill(new Pokemon()));
    history.push(url, { name, team: convertedTeam });
  };

  return (
    <form className="pure-form pure-form-stacked pure-u-1" onSubmit={e => e.preventDefault()}>
      <fieldset>
        <legend></legend>
        <div className={`${styles.flexContainer} ${styles.wrap}`}>
          <div>
            <label htmlFor="search-box">Username</label>
            <input
              type="search"
              id="search-box"
              placeholder="Search a user"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div>
            <button
              className={`pure-button pure-button-primary ${styles.button}`}
              onClick={fetchTeam}>
              Get Teams
            </button>
          </div>
          <div className={`${styles.flexContainer} ${styles.wrap}`} style={{ marginLeft: '1em' }}>
            <div>
              <label htmlFor="team-select">Select a team</label>
              <select
                className={`${styles.teamSelect}`}
                name="team-select"
                disabled={teams.length === 0}
                value={selectedIndex}
                onChange={e => handleSelectTeam(e)}>
                {teams.map((team, index) => {
                  return (
                    <option key={index} value={index}>
                      {team.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.flexContainer}>
              <button
                className={`pure-button pure-button-primary ${styles.button}`}
                disabled={teams.length === 0}
                onClick={() => redirectWithTeamData('/create-team')}>
                Edit Team
              </button>
              <button
                className={`pure-button pure-button-primary ${styles.button}`}
                disabled={teams.length === 0}
                onClick={() => redirectWithTeamData('/random-team')}>
                Edit Team Random
              </button>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default GetTeamForm;
