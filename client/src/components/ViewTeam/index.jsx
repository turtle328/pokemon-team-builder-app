import React, { useState } from 'react';
import GetTeamForm from './GetTeamForm';
import TeamView from '../Shared/TeamView';
import Pokemon from '../../js/classes/Pokemon';

const ViewTeam = () => {
  const [team, setTeam] = useState(new Array(6).fill(new Pokemon()));

  return (
    <div className="pure-g padded-container">
      <div className="yellow-box pure-u-1">
        <h2>Instructions</h2>
        <p className="paragraph">
          The "Get Teams" button by default, when there is no username inputed, will grab your team
          information off the server.
        </p>
        <p className="paragraph">
          When you enter a username the "Get Teams" button the server will send you the teams of
          that user.
        </p>
        <p className="paragraph">You can select a team by clicking on the dropdown below.</p>
        <p className="paragraph">
          Finally you can make changes to the team by either clicking on the "Edit Team" or "Edit
          Team Random" buttons. Which will then redirect you to the correpsonding page with the team
          information filled in. This allows you to save a team from another user as your own and
          modify it to your liking.
        </p>
        <GetTeamForm setTeam={setTeam} />
      </div>
      <TeamView team={team} />
    </div>
  );
};

export default ViewTeam;
