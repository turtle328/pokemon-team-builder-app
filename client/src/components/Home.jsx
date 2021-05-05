import React from 'react';
import pokemonLogo from '../media/pokemon-team-builder.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled.a`
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
  background-color: var(--pokemon-yellow);
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
            Use the log in or sign in buttons in the top right corner of the page to get started.
          </p>
          <p style={Paragraph}>
            Once you are signed in you can access the{' '}
            <StyledLink href="/create-team">create-team</StyledLink> page to build your teams.
          </p>
          <p style={Paragraph}>
            You can also use the <StyledLink href="/random-team">random-team</StyledLink> page to
            generate random teams fun and random nuzlocke runs.
          </p>
          <p style={Paragraph}>
            Finally you can visit the <StyledLink href="/edit-team">edit-team</StyledLink> page to
            edit your own teams or even view another user's team and edit it as your own.
          </p>
        </Box>
        <Box>
          <BoxTitle>Developers</BoxTitle>
          <p style={Paragraph}>The Pokemon Team Builder API currently has two main endpoints.</p>
          <p style={Paragraph}>
            <StyledLink href="/getTeams">/getTeams</StyledLink> &mdash; Gets the entire list of
            teams stored on the server.
          </p>
          <p style={Paragraph}>
            <StyledLink href="/getTeam?user=x">/getTeam?user=x</StyledLink> &mdash; Gets a team
            under a specified username. If the user does not exist it will return false for
            "success".
          </p>
          <p style={Paragraph}>
            Both endpoints respond in JSON by default but they can send XML instead if a 'text/xml'
            Accept header is used.
          </p>
        </Box>
        <Box>
          <BoxTitle>Administrators</BoxTitle>
          <p style={Paragraph}>
            Head to the <StyledLink href="/admin">admin</StyledLink> page to manage the teams saved
            on the server. Admins can edit teams and even remove users.
          </p>
          <p style={Paragraph}>
            Check out the{' '}
            <StyledLink as={Link} to="/unauthorized">
              403 - unauthorized
            </StyledLink>{' '}
            page.
          </p>
          <p style={Paragraph}>
            Check out the{' '}
            <StyledLink as={Link} to="/page-not-found">
              404 - page not found
            </StyledLink>{' '}
            page.
          </p>
          <p style={Paragraph}>
            Like the logo? Make your own{' '}
            <StyledLink as="a" href="https://textcraft.net/">
              here
            </StyledLink>
            !
          </p>
        </Box>
      </InfoContainer>
    </main>
  );
};

export default Home;
