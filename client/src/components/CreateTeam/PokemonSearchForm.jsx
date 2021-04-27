import React from 'react';

const PokemonSearchForm = () => {
  const SearchButton = {
    alignSelf: 'flex-end',
    marginBottom: '8px',
    marginLeft: '10px',
    padding: '6px 24px',
  };

  return (
    <form id="search-form" className="pure-form pure-form-stacked">
      <div>
        <label className="bold" htmlFor="type-select">
          Type
        </label>
        <select multiple id="type-select" style={{ width: '150px', height: '120px' }}>
          <option value="any">Any</option>
          <option value="normal">Normal</option>
          <option value="fighting">Fighting</option>
          <option value="flying">Flying</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="rock">Rock</option>
          <option value="bug">Bug</option>
          <option value="ghost">Ghost</option>
          <option value="steel">Steel</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="psychic">Psychic</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="fairy">Fairy</option>
        </select>
      </div>
      <div>
        <p className="bold" style={{ marginBottom: '8px' }}>
          Search Options
        </p>
        <label htmlFor="andRadio">
          <input type="radio" name="searchOption" id="andRadio" value="and" defaultChecked /> AND
        </label>
        <label htmlFor="orRadio">
          <input type="radio" name="searchOption" id="orRadio" value="or" /> OR
        </label>
        <label htmlFor="notRadio">
          <input type="radio" name="searchOption" id="notRadio" value="not" /> NOT
        </label>
        <label htmlFor="onlyRadio">
          <input type="radio" name="searchOption" id="onlyRadio" value="only" /> ONLY
        </label>
      </div>
      <div style={{ display: 'flex', gridColumn: '1 / span 2' }}>
        <label className="bold" htmlFor="search-bar">
          Pokemon Name <input type="search" id="search-bar" placeholder="Enter a pokemon" />
        </label>
        <button className="pure-button pure-button-primary" style={SearchButton}>
          Search
        </button>
      </div>
    </form>
  );
};

export default PokemonSearchForm;
