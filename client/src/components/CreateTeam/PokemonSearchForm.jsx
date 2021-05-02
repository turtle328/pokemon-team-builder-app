import React, { useState } from 'react';

const PokemonSearchForm = ({ filterPokemonList }) => {
  const Button = {
    alignSelf: 'flex-end',
    marginBottom: '8px',
    marginLeft: '10px',
  };

  const [types, setTypes] = useState(['any']);
  const [searchType, setSearchType] = useState('and');
  const [search, setSearch] = useState();

  const handleSubmit = e => {
    e.preventDefault();
    const filters = { types, searchType, search };
    filterPokemonList(filters);
  };

  const resetFilters = e => {
    setTypes(['any']);
    setSearchType('and');
    setSearch('');
  };

  return (
    <form id="search-form" className="pure-form pure-form-stacked" onSubmit={e => handleSubmit(e)}>
      <div>
        <label className="bold" htmlFor="type-select">
          Type
        </label>
        <select
          multiple={true}
          value={types}
          onChange={e => setTypes(Array.from(e.target.selectedOptions, option => option.value))}
          id="type-select"
          style={{ width: '150px', height: '120px' }}>
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
        <p className="bold">Search Options</p>
        <label htmlFor="andRadio" className="pure-radio">
          <input
            type="radio"
            name="searchOption"
            id="andRadio"
            value="and"
            checked={searchType === 'and'}
            onChange={e => setSearchType(e.target.value)}
          />{' '}
          AND
        </label>
        <label htmlFor="orRadio" className="pure-radio">
          <input
            type="radio"
            name="searchOption"
            id="orRadio"
            value="or"
            checked={searchType === 'or'}
            onChange={e => setSearchType(e.target.value)}
          />{' '}
          OR
        </label>
        <label htmlFor="notRadio" className="pure-radio">
          <input
            type="radio"
            name="searchOption"
            id="notRadio"
            value="not"
            checked={searchType === 'not'}
            onChange={e => setSearchType(e.target.value)}
          />{' '}
          NOT
        </label>
        <label htmlFor="onlyRadio" className="pure-radio">
          <input
            type="radio"
            name="searchOption"
            id="onlyRadio"
            value="only"
            checked={searchType === 'only'}
            onChange={e => setSearchType(e.target.value)}
          />{' '}
          ONLY
        </label>
      </div>
      <div style={{ display: 'flex', gridColumn: '1 / span 2' }}>
        <label className="bold" htmlFor="search-bar">
          Pokemon Name{' '}
          <input
            type="search"
            id="search-bar"
            placeholder="Enter a pokemon"
            style={{ width: '220px' }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </label>
        <button className="pure-button pure-button-primary" style={Button}>
          Search
        </button>
        <button className="pure-button button-danger" style={Button} onClick={e => resetFilters(e)}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default PokemonSearchForm;
