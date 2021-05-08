import React from 'react';
import styled from 'styled-components';
import { SpinnerComponent } from 'react-element-spinner';
import PokemonContainer, { RandomPokemonContainer } from './PokemonContainer';
import Pokemon from '../../js/classes/Pokemon';

const TEAM_SIZE = 6;

const TeamViewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  padding: 4px;
`;

const TeamView = ({ team }) => {
  return (
    <TeamViewContainer>
      {team.concat(new Array(TEAM_SIZE - team.length).fill(new Pokemon())).map((pokemon, index) => {
        return <PokemonContainer key={index} pokemon={pokemon} />;
      })}
    </TeamViewContainer>
  );
};

const TeamViewRandom = ({ isLoading, team, lockedSlots, toggleLock }) => {
  return (
    <TeamViewContainer>
      <SpinnerComponent loading={isLoading} position="centered" message="Generating pokemon" />
      {team.map((pokemon, index) => {
        return (
          <RandomPokemonContainer
            key={index}
            pokemon={pokemon}
            isLocked={lockedSlots[index]}
            index={index}
            toggleLock={toggleLock}
          />
        );
      })}
    </TeamViewContainer>
  );
};

export default TeamView;
export { TeamViewRandom };
