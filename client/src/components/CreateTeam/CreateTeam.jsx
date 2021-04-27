import React, { useState, useEffect } from 'react';
import PokemonSlot from './PokemonSlot';
import PokemonSearchForm from './PokemonSearchForm';
import SaveTeamForm from './SaveTeamForm';
import PokemonContainer from './PokemonContainer';
import LoadingOverlay from 'react-loading-overlay';
import Pokemon from '../../classes/Pokemon';
import styled from 'styled-components';

const Container = styled.main`
  display: flex;
  background-color: #3b4cca;
`;

const Heading = styled.h1`
  grid-column: 1/-1;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const Panel = styled.div`
  overflow-y: scroll;
  position: sticky;
  top: 34px;
  min-width: 400px;
  height: calc(100vh - 34px);
  transition: width 0.8s;
  background-color: #ffde00;
  border-right: 4px solid black;
`;

const TeamView = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
  padding: 4px;
`;

const PokemonSelection = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`;

const CreateTeam = () => {
  const COUNT = 721;

  const [team, setTeam] = useState(new Array(6).fill(new Pokemon()));
  const [pokemonList, setPokemonList] = useState([]);
  const [isActive, setActive] = useState(true);

  useEffect(() => {
    const getPokemon = async () => {
      const pokemonFromServer = await fetchPokemon();
      setPokemonList(pokemonFromServer);
      setActive(false);
      console.log(pokemonFromServer);
    };

    getPokemon();
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
        return Pokemon.InstanceFromApi(data);
      })
    );

    return pokeList;
  };

  return (
    <LoadingOverlay active={isActive} spinner text="Loading in Pokedex">
      <Container>
        <Panel className="custom-scrollbar">
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
        <PokemonSelection>
          {pokemonList.map((pokemon, index) => {
            return <PokemonContainer key={index} pokemon={pokemon} />;
          })}
        </PokemonSelection>
      </Container>
    </LoadingOverlay>
  );
};

export default CreateTeam;
