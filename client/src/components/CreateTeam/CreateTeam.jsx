import React, { useState, useEffect } from 'react';
import PokemonSlot from './PokemonSlot';
import PokemonSearchForm from './PokemonSearchForm';
import SaveTeamForm from './SaveTeamForm';
import PokemonContainer from './PokemonContainer';
import Pokemon from '../../js/classes/Pokemon';
import styled from 'styled-components';
import { SpinnerComponent } from 'react-element-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

const Container = styled.main`
  display: flex;
  background-color: var(--pokemon-blue);
`;

const Heading = styled.h1`
  grid-column: 1/-1;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const PanelContainer = styled.div`
  z-index: 2;
  width: 400px;
  flex-shrink: 0;
  transition: width 1s;
`;

const Panel = styled.div`
  ${'' /* overflow-y: scroll; */}
  overflow-x: hidden;
  position: sticky;
  top: 34px;
  height: calc(100vh - 34px);
  background-color: var(--pokemon-yellow);
  border-right: 4px solid black;
`;

const TeamView = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 4px;
`;

const PokemonSelection = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  padding: 4px;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CollapseIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  position: absolute;
  font-size: 3.5em;
  top: 0px;
  right: 5px;

  &:hover {
    transform: scale(1.2);
  }
`;

const ExpandIcon = styled(CollapseIcon)`
  z-index: 1;
  position: fixed;
  left: 10px;
  top: 40px;
`;

const CreateTeam = () => {
  const COUNT = 721;

  const [team, setTeam] = useState(new Array(6).fill(new Pokemon()));
  const [pokemonList, setPokemonList] = useState([]);
  const [isActive, setActive] = useState(true);
  const [isCollapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const getPokemon = async () => {
      const pokemonFromServer = await fetchPokemon();
      setPokemonList(pokemonFromServer);
      setActive(false);
      console.log(pokemonFromServer);
    };

    getPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPokemon = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${COUNT}`);
    const data = await res.json();
    const pokeList = await fetchPokemonFromList(data.results);
    return pokeList;
  };

  const fetchPokemonFromList = async list => {
    const pokeList = await Promise.all(
      list.map(async pokemon => {
        const res = await fetch(pokemon.url);
        const data = await res.json();
        return Pokemon.instanceFromApi(data);
      })
    );

    return pokeList;
  };

  const setTeamSlot = pokemon => {
    // find an empty index of the array
    const index = team.findIndex(pokemon => pokemon.isDefault());
    // if team is full, then we exit the function
    if (index === -1) return;
    // otherwise, we fill in the slot with the pokemon
    const newTeam = [...team];
    newTeam[index] = pokemon;
    setTeam(newTeam);
  };

  return (
    <Container>
      <ExpandIcon icon={faCaretRight} onClick={() => setCollapsed(false)} />
      <PanelContainer style={isCollapsed ? { width: '0px' } : {}}>
        <Panel className="custom-scrollbar">
          <CollapseIcon icon={faCaretLeft} onClick={() => setCollapsed(true)} />
          <TeamView>
            <Heading>Team View</Heading>
            {team.map((pokemon, index) => {
              return <PokemonSlot key={index} pokemon={pokemon} slotNum={index} />;
            })}
          </TeamView>
          <div id="pokemon-search">
            <Heading>Pokemon Search</Heading>
            <PokemonSearchForm />
          </div>
          <div id="team-save">
            <Heading>Save Team</Heading>
            <SaveTeamForm />
          </div>
        </Panel>
      </PanelContainer>
      <PokemonSelection>
        <SpinnerComponent loading={isActive} position="global" message="Fetching Pokedex" />
        {pokemonList.map((pokemon, index) => {
          return <PokemonContainer key={index} pokemon={pokemon} setTeamSlot={setTeamSlot} />;
        })}
      </PokemonSelection>
    </Container>
  );
};

export default CreateTeam;
