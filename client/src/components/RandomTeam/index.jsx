import React, { useState } from 'react';
import styles from './index.module.scss';
import styled from 'styled-components';
import GenerationControls from './GenerationControls';
import SaveTeamForm from '../Shared/SaveTeamForm';
import PokemonContainer from '../Shared/PokemonContainer';
import * as shared from '../../js/shared';
import Pokemon from '../../js/classes/Pokemon';

const TeamView = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 4px;
`;

const ControlsContainer = styled.div `
  display: flex;
  gap: 10px;
`

const RandomTeam = () => {
  const [team, setTeam] = useState(new Array(6).fill(new Pokemon()));

  const generate = generationOptions => {
    console.log('Generating random team');
    console.log(generationOptions);
  };

  const saveTeam = async teamName => {
    console.log('Saving team');
    console.log(teamName);
    // // get team with filtered empty slots
    // const filteredTeam = team.filter(pokemon => !pokemon.isDefault());

    // // check if team has any slots
    // if (filteredTeam.length === 0) {
    //   return openSnackbar('The team needs at least one Pokemon.');
    // }

    // const response = await shared.saveTeam(teamName, filteredTeam);
    // if (response) {
    //   openSnackbar(response);
    // }
  };

  return (
    <div className={`pure-g ${styles.content}`}>
      <div className={`pure-u-1 ${styles.controlsContainer}`}>
        <h1 className={`${styles.header}`}>Random Team Generator</h1>
        <ControlsContainer>
          <GenerationControls generate={generate} />
          <SaveTeamForm hideLegend={true} saveTeam={saveTeam} />
        </ControlsContainer>
      </div>

      <TeamView>
        {team.map((pokemon, index) => {
          return <PokemonContainer key={index} pokemon={pokemon} />;
        })}
        {/* <div class="poke-slot">
          <i class="fas fa-unlock" title="Toggle lock"></i>
          <img class="pure-img" src="team-placeholder.jpg" alt="pokemon sprite" />
          <p class="poke-name pure-u-1 center">Pokemon Name</p>
        </div> */}
      </TeamView>
    </div>
  );
};

export default RandomTeam;
