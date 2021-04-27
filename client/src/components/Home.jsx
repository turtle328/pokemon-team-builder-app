import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import pokemonLogo from '../media/pokemon-team-builder.png';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  font-weight: bold;
  color: #3b4cca;

  &:hover {
    color: #2a3279;
  }
`;

const InfoContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1em;
  gap: 2em;
`;

const Box = styled.div`
  width: 400px;
  min-height: 400px;
  padding: 1em;
  border: inset 4px black;
  background-color: #ffde00;
  border-radius: 1em;
`;

const BoxTitle = styled.h2`
  text-align: center;
  margin: 1em 0;
`;

const Home = () => {
  const Paragraph = {
    margin: '0.8em',
  };

  useEffect(() => {
    document.body.style.backgroundColor = '#3B4CCA';

    return () => {
      document.body.style.backgroundColor = '#FFF';
    };
  });

  return (
    <main style={{ padding: '2em 15%' }} className="pure-g">
      <h1 className="pure-u-1">
        <img
          className="pure-img pure-u-1"
          id="logo"
          src={pokemonLogo}
          alt="pokemon team builder logo"
        />
      </h1>
      <InfoContainer className="pure-u-1">
        <Box>
          <BoxTitle>Users</BoxTitle>
          <p style={Paragraph}>
            Want to build your dream Pokémon team? You've come to the right place!
          </p>
          <p style={Paragraph}>
            Visit the <StyledLink to="/create-team">app</StyledLink> to create your own team!
          </p>
          <p style={Paragraph}>
            Feeling lucky? Try a <StyledLink to="/random-team">random team</StyledLink>!
          </p>
          <p style={Paragraph}>
            View or change up your saved team <StyledLink to="/edit-team">here</StyledLink>.
          </p>
        </Box>
        <Box>
          <BoxTitle>Developers</BoxTitle>
          <p style={Paragraph}>The Pokemon Team Builder API currently has two main endpoints.</p>
          <p style={Paragraph}>
            <StyledLink to="/getTeams">/getTeams</StyledLink> &mdash; Gets the entire list of teams
            stored on the server.
          </p>
          <p style={Paragraph}>
            <StyledLink to="/getTeam?user=x">/getTeam?user=x</StyledLink> &mdash; Gets a team under
            a specified username. If the user does not exist it will return false for "success".
          </p>
          <p style={Paragraph}>
            Both endpoints respond in JSON by default but they can send XML instead if a 'text/xml'
            Accept header is used.
          </p>
        </Box>
        <Box>
          <BoxTitle>Administrators</BoxTitle>
          <p style={Paragraph}>
            Head to the <StyledLink to="/admin">admin</StyledLink> page to manage the teams saved on
            the server. Admins can edit teams and even remove users.
          </p>
          <p style={Paragraph}>
            Check out the <StyledLink to="/page-not-found">404</StyledLink> page.
          </p>
          <p style={Paragraph}>
            Like the logo? Make your own <a href="https://textcraft.net/">here</a>!
          </p>
        </Box>
      </InfoContainer>
    </main>
  );
};

export default Home;
