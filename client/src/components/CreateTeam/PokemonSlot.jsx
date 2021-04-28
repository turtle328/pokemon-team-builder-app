import React from 'react';

const PokemonSlot = ({ pokemon, slotNum }) => {
  return (
    <div className="team-slot" style={{ textAlign: 'center' }}>
      <img src={pokemon.sprite} alt={`team slot ${slotNum + 1}`} style={{ maxHeight: '100px' }} />
      <p className="poke-name">{pokemon.name}</p>
      <span className="poke-type-1">{pokemon.types[0]}</span>
      <span className="poke-type-2">{pokemon.types[1]}</span>
    </div>
  );
};

export default PokemonSlot;
