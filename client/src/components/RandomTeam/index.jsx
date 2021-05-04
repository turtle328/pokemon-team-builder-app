import React from 'react';
import styles from './index.module.scss';
import GenerationControls from './GenerationControls';
import SaveTeamForm from '../SaveTeamForm';

const RandomTeam = () => {
  const generate = generationOptions => {
    console.log('Generating random team');
    console.log(generationOptions);
  };

  return (
    <div className={`pure-g ${styles.content}`}>
      <div className={`pure-u-1 ${styles.controlsContainer}`}>
        <h1 className={`${styles.header}`}>Random Team Generator</h1>
        <GenerationControls generate={generate} />
        <SaveTeamForm />
        {/* <form
          class="pure-form pure-form-stacked pure-u-1"
          id="save-form"
          action="/addTeam"
          method="post">
          <fieldset>
            <legend>Save Team</legend>
            <div class="pure-u-2-5">
              <label for="user">Username</label>
              <input
                type="text"
                class="pure-u-23-24"
                id="user"
                required
                maxlength="20"
                placeholder="TurboSlayer123"
              />
            </div>
            <div class="pure-u-2-5">
              <label for="team-name">Team Name</label>
              <input
                type="text"
                class="pure-u-23-24"
                id="team-name"
                required
                maxlength="20"
                placeholder="Team Renegade"
              />
            </div>
            <div class="pure-u-1-6 button-container">
              <button class="pure-button pure-button-primary pure-u-23-24" id="save-btn">
                Save
              </button>
            </div>
          </fieldset>
        </form> */}
      </div>

      <div class="poke-team">
        <div class="poke-slot">
          <i class="fas fa-unlock" title="Toggle lock"></i>
          <img class="pure-img" src="team-placeholder.jpg" alt="pokemon sprite" />
          <p class="poke-name pure-u-1 center">Pokemon Name</p>
        </div>
        <div class="poke-slot">
          <i class="fas fa-unlock" title="Toggle lock"></i>
          <img class="pure-img" src="team-placeholder.jpg" alt="pokemon sprite" />
          <p class="poke-name pure-u-1 center">Pokemon Name</p>
        </div>
        <div class="poke-slot">
          <i class="fas fa-unlock" title="Toggle lock"></i>
          <img class="pure-img" src="team-placeholder.jpg" alt="pokemon sprite" />
          <p class="poke-name pure-u-1 center">Pokemon Name</p>
        </div>
        <div class="poke-slot">
          <i class="fas fa-unlock" title="Toggle lock"></i>
          <img class="pure-img" src="team-placeholder.jpg" alt="pokemon sprite" />
          <p class="poke-name pure-u-1 center">Pokemon Name</p>
        </div>
        <div class="poke-slot">
          <i class="fas fa-unlock" title="Toggle lock"></i>
          <img class="pure-img" src="team-placeholder.jpg" alt="pokemon sprite" />
          <p class="poke-name pure-u-1 center">Pokemon Name</p>
        </div>
        <div class="poke-slot">
          <i class="fas fa-unlock" title="Toggle lock"></i>
          <img class="pure-img" src="team-placeholder.jpg" alt="pokemon sprite" />
          <p class="poke-name pure-u-1 center">Pokemon Name</p>
        </div>
      </div>
    </div>
  );
};

export default RandomTeam;
