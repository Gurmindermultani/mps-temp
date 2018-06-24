import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { Link } from 'react-router-dom';


import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';


const HomeDiv = styled.div`
  width: 100%;
  margin: 0 auto;
  display: block;
`;

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    return (
      <HomeDiv>
        <NavBar>
          <Link to="/">
            <FormattedMessage {...messages.home} />
          </Link>
          <Link to="/features">
            <FormattedMessage {...messages.features} />
          </Link>
        </NavBar>
      </HomeDiv>
    );
  }
}

export default Header;
