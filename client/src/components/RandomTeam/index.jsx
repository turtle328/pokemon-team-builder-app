import React, { useState } from 'react';
import styles from './index.module.scss';
import styled from 'styled-components';
import { SpinnerComponent } from 'react-element-spinner';
import GenerationControls from './GenerationControls';
import SaveTeamForm from '../Shared/SaveTeamForm';
import { RandomPokemonContainer } from '../Shared/PokemonContainer';
import * as shared from '../../js/shared';
import Pokemon from '../../js/classes/Pokemon';

const TeamView = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  padding: 4px;
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const getRandBetween = (min, max) => {
  return Math.floor(Math.random() * max - min + 1) + min;
};

const RandomTeam = () => {
  const TEAM_SIZE = 6;
  const MAX_POKEMON = 898;
  const MAX_EVOLVED = 475;
  const MISSING_CHAINS = [210, 222, 225, 226, 227, 231, 238, 251];
  const BASE_URL = 'https://pokeapi.co/api/v2';

  const [team, setTeam] = useState(new Array(TEAM_SIZE).fill(new Pokemon()));
  const [lockedSlots, setLockedSlots] = useState(new Array(TEAM_SIZE).fill(false));
  const [isLoading, setIsLoading] = useState(false);

  const toggleLock = index => {
    const copy = [...lockedSlots];
    copy[index] = !copy[index];
    setLockedSlots(copy);
  };

  const generate = async generationOptions => {
    const unlockedSlots = [];
    for (let i = 0; i < TEAM_SIZE; i++) {
      if (!lockedSlots[i]) {
        unlockedSlots.push(i);
      }
    }

    let pokemon = [];

    switch (generationOptions.generationType) {
      case 'random-any':
        pokemon = await generateAnyTeam(unlockedSlots);
        break;
      case 'random-feo':
        pokemon = await generateFeoTeam(unlockedSlots);
        break;
      case 'random-type':
        pokemon = await generateTypeTeam(unlockedSlots, generationOptions.selectedType);
        break;
      default:
        console.error('Generation type not selected');
    }

    const newTeam = [...team];
    unlockedSlots.forEach((slot, index) => {
      newTeam[slot] = pokemon[index];
    });

    setTeam(newTeam);
    setIsLoading(false);
  };

  const generateAnyTeam = async unlockedSlots => {
    console.log('Generating any team');

    const pokemon = await Promise.all(
      unlockedSlots.map(async slot => {
        const randId = getRandBetween(1, MAX_POKEMON);
        return Pokemon.fetchById(randId);
      })
    );

    return pokemon;
  };

  const generateFeoTeam = async unlockedSlots => {
    console.log('Generating feo team');

    const pokemon = await Promise.all(
      unlockedSlots.map(async slot => {
        let randId;
        do {
          randId = getRandBetween(1, MAX_EVOLVED);
        } while (MISSING_CHAINS.includes(randId));
        const url = `${BASE_URL}/evolution-chain/${randId}`;
        const res = await fetch(url);
        const data = await res.json();
        const chain = data.chain;
        let id = getIdFromSpeciesUrl(chain.species.url);
        let evolves_to = chain.evolves_to;
        while (evolves_to.length > 0) {
          const randNum = Math.floor(Math.random() * evolves_to.length);
          id = getIdFromSpeciesUrl(evolves_to[randNum].species.url);
          evolves_to = evolves_to[randNum].evolves_to;
        }
        return Pokemon.fetchById(id);
      })
    );

    return pokemon;
  };

  const getIdFromSpeciesUrl = url => {
    const match = url.match(/pokemon-species\/(\d+)/);
    return match[1];
  };

  const generateTypeTeam = async (unlockedSlots, type) => {
    console.log('Generating type team of ' + type);
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
        <ControlsContainer>
          <GenerationControls
            generate={generate}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
          <SaveTeamForm hideLegend={true} saveTeam={saveTeam} />
        </ControlsContainer>
      </div>

      <TeamView>
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
      </TeamView>
    </div>
  );
};

export default RandomTeam;
