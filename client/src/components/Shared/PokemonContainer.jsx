import React from 'react';
import { typeColors } from '../../js/shared';
import styled from 'styled-components';

const Container = styled.div`
  cursor: pointer;
  border: 2px solid black;
  transition: transform 0.2s;
  height: fit-content;

  &:hover {
    transform: scale(1.1);
  }
`;

const PokemonName = styled.p`
  padding: 7px 0;
  background-color: black;
  color: white;
  text-transform: capitalize;
  text-align: center;
`;

const getBackgroundStyle = pokemon => {
  if (!pokemon) return;

  const types = pokemon.types;

  if (types.length === 1) {
    return { backgroundColor: `${typeColors[types[0]]}` };
  } else {
    return {
      background: `linear-gradient(90deg, ${typeColors[types[0]]} 50%,
       ${typeColors[types[1]]} 50%)`,
    };
  }
};

const PokemonContainer = ({ pokemon, setTeamSlot }) => {
  return (
    <Container onClick={() => setTeamSlot(pokemon)} style={getBackgroundStyle(pokemon)}>
      <img src={pokemon.sprite} alt={`sprite of ${pokemon.name}`} className="pure-img" />
      <PokemonName className="pure-u-1">{pokemon.name}</PokemonName>
    </Container>
  );
};

export default PokemonContainer;
