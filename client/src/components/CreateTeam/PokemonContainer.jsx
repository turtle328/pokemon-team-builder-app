import React from 'react';

const PokemonContainer = ({ pokemon }) => {
  return (
    <div>
      <img src={pokemon.sprite} alt={`sprite of ${pokemon.name}`} className="pure-img" />
      <p>{pokemon.name}</p>
    </div>
  );
};

export default PokemonContainer;
