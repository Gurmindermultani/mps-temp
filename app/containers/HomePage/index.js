/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Link } from 'react-router-dom';



import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import Audio from 'components/Audio';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

import creativeImage from 'images/creature_teacher_logo2.png';

import leftMonsterImage from 'images/monster_happy.png';
import rightMonsterImage from 'images/monster2.png';
import flashCardImage from 'images/Activity_Button_01_Up.png';
import flashCardImageHover from 'images/Activity_Button_01_Down.png';

import oddOneOut from 'images/Activity_Button_02_Up.png';
import oddOneOutHover from 'images/Activity_Button_02_Down.png';

import match from 'images/Activity_Button_03_Up.png';
import matchHover from 'images/Activity_Button_03_Down.png';
import backgroundImage from 'images/MonsterTexture-1.png';

import linkClickAudio from 'audio/button-21.mp3';

const HomeWrapper = styled.div`
	background-image: url(${backgroundImage});
	background-size: contain;
  height: 700px;
  width: 100%;
`;

const CreatureImageContainer = styled.div`
	width: 90%;
  padding-top: 5%;
  margin-left: 5%;
`;

const Image = styled.img`
	max-width:100%;
	max-height:100%;
`;

const LinkContainer = styled.div`
	width: 88%;
	margin: auto;
  min-height: 306px;
	background-image: url(${leftMonsterImage}),url(${rightMonsterImage});
	background-size: 38%,53%;
	background-position:
	    top 0px left 0px,
	    top -57px right -58px;
  a{
    display:block;
    min-height: 90px;
  }
`;

const LinkToOdd = styled.div`
	width: 31%;
	margin: auto;
	background-image: url(${oddOneOut});
  background-position: top -10px left 0px;
  background-size: 100% 115%;
  min-height: 90px;
  cursor : pointer;
  &:hover {
	 background-image: url(${oddOneOutHover});
	}
`;

const LinkToMatch = styled.div`
	width: 31%;
	margin: auto;
	background-image: url(${match});
  background-position: top -10px left 0px;
  background-size: 100% 115%;
  min-height: 90px;
  cursor : pointer;
  &:hover {
		background-image: url(${matchHover});
	}
`;

const LinkToFlashGame = styled.div`
	width: 31%;
	margin: auto;
	background-image: url(${flashCardImage});
  background-position: top -10px left 0px;
  background-size: 100% 115%;
  min-height: 90px;
  cursor : pointer;
  &:hover {
	 background-image: url(${flashCardImageHover});
	}
`;

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  playAudio(){
    const audio = ReactDOM.findDOMNode(this.refs.audio);
    audio.src = linkClickAudio;
    audio.load();
    var playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.then(_ => {
        // Automatic playback started!
        // Show playing UI.
        audio.play();
      })
      .catch(error => {
        // Auto-play was prevented
        // Show paused UI.
        audio.play();
      });
    }
  }

  render() {
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    return (
      <HomeWrapper>
        <Helmet>
          <title>Home Page</title>
          <meta
            name="description"
            content="HomePage2"
          />
        </Helmet>
        <div>
          <CenteredSection>
            <CreatureImageContainer>
            	<Image src={creativeImage} />
            </CreatureImageContainer>
            <LinkContainer>
              <LinkToFlashGame onClick={this.playAudio.bind(this)}>
            	   <Link to="/teacher-creature/flashCard"></Link>
              </LinkToFlashGame>
          		<LinkToOdd onClick={this.playAudio.bind(this)}>
                <Link to="/teacher-creature/oddOneOut"></Link>  
              </LinkToOdd>
          		<LinkToMatch onClick={this.playAudio.bind(this)}>
                <Link to="/teacher-creature/match"></Link>  
              </LinkToMatch>
            </LinkContainer>
          </CenteredSection>
          <Audio
            ref="audio"
            volume={1}
            autoplay={false}/>
        </div>
      </HomeWrapper>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
