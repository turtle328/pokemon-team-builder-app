import React, { useState, useEffect, useRef } from 'react';
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
  width: 450px;
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
  grid-template-columns: ${props => (props.panelIsCollapsed ? 'repeat(9, 1fr)' : 'repeat(7, 1fr)')};
  gap: 4px;
  padding: 4px;

  @media (max-width: 1280px) {
    grid-template-columns: ${props =>
      props.panelIsCollapsed ? 'repeat(7, 1fr)' : 'repeat(5, 1fr)'};
  }

  @media (max-width: 1040px) {
    grid-template-columns: ${props =>
      props.panelIsCollapsed ? 'repeat(5, 1fr)' : 'repeat(3, 1fr)'};
  }

  @media (max-width: 820px) {
    grid-template-columns: ${props =>
      props.panelIsCollapsed ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)'};
  }
`;

const CollapseIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  position: absolute;
  font-size: 3.5em;
  top: 0px;
  right: 5px;
  transition: transform 0.2s;

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

  // a variable to save a copy to the full list
  // this is necessary because the state list can be filtered
  const pokemonList = useRef();

  const [team, setTeam] = useState(new Array(6).fill(new Pokemon()));
  const [filteredList, setPokemonList] = useState([]);
  const [isActive, setActive] = useState(true);
  const [isCollapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const getPokemon = async () => {
      pokemonList.current = await fetchPokemon();
      setPokemonList(pokemonList.current);
      setActive(false);
      console.log(pokemonList.current);
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

  const removePokemonFromSlot = (pokemon, slot) => {
    if (pokemon.isDefault()) return;

    // make copy of the team array with a default Pokemon slot appended to the end of it
    const newTeam = [...team, new Pokemon()];
    // remove pokemon at the index
    newTeam.splice(slot, 1);
    // update state
    setTeam(newTeam);
  };

  const filterPokemonList = filters => {
    let list = [...pokemonList.current];
    const { types, searchType, search } = filters;

    if (!types.includes('any')) {
      console.log('filtering');
      list = list.filter(pokemon => {
        switch (searchType) {
          case 'and':
            for (const selectedType of types) {
              if (!pokemon.types.includes(selectedType)) {
                return false;
              }
            }
            return true;
          default:
            console.error('Unknown search type: ' + searchType);
            return false;
        }
      });
    }

    if (search) {
      list = list.filter(pokemon => pokemon.name.includes(search.toLowerCase()));
    }

    setPokemonList(list);
  };

  return (
    <Container>
      <ExpandIcon
        icon={faCaretRight}
        onClick={() => setCollapsed(false)}
        title="Expand this panel"
      />
      <PanelContainer style={isCollapsed ? { width: '0px' } : {}}>
        <Panel className="custom-scrollbar">
          <CollapseIcon
            icon={faCaretLeft}
            onClick={() => setCollapsed(true)}
            title="Collapse this panel"
          />
          <TeamView>
            <Heading>Team View</Heading>
            {team.map((pokemon, index) => {
              return (
                <PokemonSlot
                  key={index}
                  pokemon={pokemon}
                  slotNum={index}
                  removeFromSlot={removePokemonFromSlot}
                />
              );
            })}
          </TeamView>
          <div id="pokemon-search">
            <Heading>Pokemon Search</Heading>
            <PokemonSearchForm filterPokemonList={filterPokemonList} />
          </div>
          <div id="team-save">
            <Heading>Save Team</Heading>
            <SaveTeamForm />
          </div>
        </Panel>
      </PanelContainer>
      <PokemonSelection panelIsCollapsed={isCollapsed}>
        <SpinnerComponent loading={isActive} position="global" message="Fetching Pokedex" />
        {filteredList.map((pokemon, index) => {
          return <PokemonContainer key={index} pokemon={pokemon} setTeamSlot={setTeamSlot} />;
        })}
      </PokemonSelection>
    </Container>
  );
};

export default CreateTeam;
