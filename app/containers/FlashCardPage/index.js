/*
 * FlashCardPage
 *
 * List all the features
 */
import React from 'react';
import ReactDOM from 'react-dom';

import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import H1 from 'components/H1';
import Audio from 'components/Audio';

import messages from './messages';
import List from './List';
import ListItem from './ListItem';
import ListItemTitle from './ListItemTitle';
import styled from 'styled-components';

import backgroundImage from 'images/A1_Instructions.png';
import monsterWobble from 'images/monster2.png';

import continueImage from 'images/continue_BTN_Up.png';
import homeButton from 'images/home_BTN.png';
import homeButtonHover from 'images/home_BTN_down.png';
import continueImageHover from 'images/continue_BTN_Down.png';

import audioButton from 'images/btn_audio_up.png';
import audioButtonHover from 'images/btn_audio_down.png';


import images from "./cardImages";


import linkClickAudio from 'audio/button-21.mp3';


const FlasCardWrapper = styled.div`
    background-image: url(${backgroundImage});
    background-size: contain;
    height: 700px;
    position: relative;
    padding-top: 4%;
    width: 100%;
    .textContainer{
      display: inline-block;
      padding-left: 12%;
      width: 45%;
    }
    .text{
      color : #eaebec;
    }
    .continueButton{
      background-image: url(${continueImage});
      background-position: top -21px left -18px;
      background-size: 204px;
      height: 77px;
      width: 195px;
      margin-top: 20%;
      cursor: pointer;
      &:hover {
        background-image: url(${continueImageHover});
      }
    }
    .imageContainer{
      display: inline-block;
      width: 55%;
      padding-top: 6%;
      img{
        height: 100%;
        width: 100%;
        -webkit-animation: mover 1s infinite  alternate;
        animation: mover 1s infinite  alternate;
      }
      @-webkit-keyframes mover {
          0% { transform: translateY(0); }
          100% { transform: translateY(-20px); }
      }
      @keyframes mover {
          0% { transform: translateY(0); }
          100% { transform: translateY(-20px); }
      }
    }
    .cardContainer{
      img{
        margin: 7% 11%;
        position: absolute;
        width: 80%;
      }
      div{
        position: relative;
        width: 85px;
        height: 85px;
        display: inline-block;
        cursor: pointer;
        background-image: url(${audioButton});
        background-position: top -1px left -1px;
        background-size: 88px;
        &:hover{
          background-image: url(${audioButtonHover});
        }
      }
      .volumeButton{
        margin-top: 30%;
        left: 20%;

      }
    }
    .homeButton{
      background-image: url(${homeButton});
      background-position: top -13px left -12px;
      background-size: 83px;
      width: 60px;
      height: 60px;
      position: absolute;
      top: 73px;
      right: 60px;
      z-index: 10000;
      &:hover{
        background-image: url(${homeButtonHover});
      }
    }
    .homeMessage{
      color: white;
      text-align: center;
      margin-top: 79px;
    }
`;


export default class FlashCardPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      continue: false,
      currentCard : images["card" + "2"],
      currentCardCounter : 2
    };
  }
  handleContinue(e) {
    this.setState({continue : true});
    this.playAudio("continue");
  }
  playAlphabet(e) {
    var that = this;
    that.playAudio("playAlphabet","audio" + (that.state.currentCardCounter));
    setTimeout(function(){
      that.setState({currentCard : images["card" + (that.state.currentCardCounter + 1)]});
      that.setState({currentCardCounter : that.state.currentCardCounter + 1});
    },2000);
  }

  playAudio(type,link){
    var src = "";
    if(type === "continue"){
      src = linkClickAudio;
    }
    if(type === "playAlphabet"){
      src = images[link];
    }


    const audio = ReactDOM.findDOMNode(this.refs.audio);
    audio.src = src;
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
    if(this.state.currentCardCounter > 12){
      return (
        <FlasCardWrapper>
          <Helmet>
            <title>Feature Page</title>
            <meta
              name="description"
              content="FlashCardPage"
            />
          </Helmet>
          <Link className="homeButton" to="/teacher-creature"></Link>
          <h1 className="homeMessage">Click on Home Button to Go Home.</h1>
        </FlasCardWrapper>
      )
    }


    return (
      <FlasCardWrapper>
        <Helmet>
          <title>Feature Page</title>
          <meta
            name="description"
            content="FlashCardPage"
          />
        </Helmet>
        <Link className="homeButton" to="/teacher-creature"></Link>
        {!this.state.continue && (
          <div>
            <div className="textContainer">
              <div className="text">
                <h1>Flash Cards</h1>
                <p>Use these flash cards for practice.</p>
                <p>Tap the audio button to hear each letter and word.</p>
                <p>Swipe the screen to see another card.</p>
              </div>
              <div onClick={this.handleContinue.bind(this)} className="continueButton"></div>
            </div>
            <div className="imageContainer">
              <img src={monsterWobble} />
            </div>
          </div>
        )}
        {this.state.continue && (
          <div className="cardContainer">
              <img src={this.state.currentCard} />
              <div onClick={this.playAlphabet.bind(this)} className="volumeButton"></div>
          </div>
        )}
        <Audio
            ref="audio"
            volume={1}
            autoplay={false}/>
      </FlasCardWrapper>
    );
  }
}
