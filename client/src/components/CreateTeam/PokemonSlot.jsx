import React from 'react';

const PokemonSlot = ({ pokemon, slotNum }) => {
  return (
    <div className="team-slot" style={{ textAlign: 'center' }}>
      <img src={pokemon.sprite} alt={`team slot ${slotNum + 1}`} style={{ maxHeight: '100px' }} />
      <p className="poke-name">Name: ???</p>
      <span className="poke-type-1">Type: ???</span>
      <span className="poke-type-2"></span>
    </div>
  );
};

export default PokemonSlot;
