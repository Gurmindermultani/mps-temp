/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import OddOneOutPage from 'containers/OddOneOutPage/Loadable';
import FlashCardPage from 'containers/FlashCardPage/Loadable';
import MatchPage from 'containers/MatchPage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

import backgroundImage from 'images/MonsterTexture-1.png';

const AppWrapper = styled.div`
  min-width: 768px;
  max-width: 900px;
  margin: 0 auto;
  min-height: 100%;
  padding: 0 16px;
  position: relative;

`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Switch>
        <Route exact path="/teacher-creature" component={HomePage} />
        <Route path="/teacher-creature/flashCard" component={FlashCardPage} />
        <Route path="/teacher-creature/oddOneOut" component={OddOneOutPage} />
        <Route path="/teacher-creature/match" component={MatchPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
    </AppWrapper>
  );
}
