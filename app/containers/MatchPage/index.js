/*
 * MatchPage
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
import backgroundImage2 from 'images/MonsterTexture-1.png';
import monsterWobble from 'images/monster_happy-inversed.png';

import continueImage from 'images/continue_BTN_Up.png';
import homeButton from 'images/home_BTN.png';
import homeButtonHover from 'images/home_BTN_down.png';
import continueImageHover from 'images/continue_BTN_Down.png';

import card1 from 'images/A3_Card_01_Words.png';


import normalMonster from 'images/monster_front.png';
import rightCorrect from 'images/monster_happy.png';
import rightIncorrect from 'images/monster_sad.png';
import leftCorrect from 'images/monster_happy-inversed.png';
import leftIncorrect from 'images/monster_sad_02.png';


import audioButton from 'images/btn_audio_up.png';
import audioButtonHover from 'images/btn_audio_down.png';


import images from "./cardImages";


import linkClickAudio from 'audio/button-21.mp3';
import correctAudio from 'audio/magic-chime-02.mp3';
import inCorrectAudio from 'audio/Buzz.mp3';

var MatchPageWrapper = styled.div`
    background-image: url(${backgroundImage});
    background-size: contain;
    height: 700px;
    padding-top: 8%;
    position: relative;
    width: 100%;
    .textContainer{
      display: inline-block;
      padding-left: 11%;
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
      width: 50%;

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
      height: 100%;
      img{
        margin: 5% 28%;
        position: absolute;
        width: 46%;
        height: 56%;
        min-width: 355px;
        max-width: 355px;
        @media (min-width:900px)  {
          margin: 8% 30%;
          width: 51%;
          height: 60%;
        }
      }
      div.volumeButton{
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
        left: 47%;
      }
      div.card{
        width: 100%;
        height: 120px;
        display: inline-block;
        background-image: url(${card1});
        background-size: cover;
        margin-top: 7%;
        margin-left: 2%;
      }
      .rightAnswer,.leftAnswer{
        position : absolute;
        width: 161px;
        height: 78px;
        cursor: pointer;
      }
      .leftAnswer{
        top: 37%;
        left: 14%;
      }
      .rightAnswer{
        top: 37%;
        left: 69%;
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
`;


export default class MatchPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      continue: false,
      currentMonster : normalMonster,
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
  }

  checkAnswer(position){
    var that = this;
    var key = [null,"left","right","right","left","right","right","left","left","left","right","right","left"];
    
    if(position === "right"){
      if(position === key[this.state.currentCardCounter]){
        this.setState({currentMonster : rightCorrect});
        this.playAudio("correct");
      }else{
        this.setState({currentMonster : rightIncorrect});
        this.playAudio("incorrect");
      }
    }
    if(position === "left"){
      if(position === key[this.state.currentCardCounter]){
        this.setState({currentMonster : leftCorrect});
        this.playAudio("correct");
      }else{
        this.setState({currentMonster : leftIncorrect});
        this.playAudio("incorrect");
      }
    }
    setTimeout(function(){

      that.setState({currentCardCounter : that.state.currentCardCounter + 1});
      that.setState({currentMonster : normalMonster});
    },1000);
  }

  playAudio(type,link){
    var src = "";
    if(type === "continue"){
      src = linkClickAudio;
    }
    if(type === "playAlphabet"){
      src = images[link];
    }
    if(type === "correct"){
      src = correctAudio;
    }

    if(type === "incorrect"){
      src = inCorrectAudio;
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
    if(this.state.continue){
      MatchPageWrapper = MatchPageWrapper.extend`
        background-image: url(${backgroundImage2});
      `;
    }
    MatchPageWrapper = MatchPageWrapper.extend`
      .cardContainer{
        div.card{
          background-image: url(${images["card" + this.state.currentCardCounter]});
        }
      }
    `;
    if(this.state.currentCardCounter > 12){
      return (
        <MatchPageWrapper>
          <Helmet>
            <title>Feature Page</title>
            <meta
              name="description"
              content="MatchPage"
            />
          </Helmet>
          <Link className="homeButton" to="/teacher-creature"></Link>
          <h1 className="homeMessage">Click on Home Button to Go Home.</h1>
        </MatchPageWrapper>
      )
    }

    return (
      <MatchPageWrapper>
        <Helmet>
          <title>Feature Page</title>
          <meta
            name="description"
            content="MatchPage"
          />
        </Helmet>
        <Link className="homeButton" to="/teacher-creature"></Link>
        {!this.state.continue && (
          <div>
            <div className="textContainer">
              <div className="text">
                <h1>Monster Match</h1>
                <p>Tap the audio button to hear a word.</p>
                <p>Listen carefully.</p>
                <p>Tap the word that best matches what you heard.</p>
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
              <img src={this.state.currentMonster} />
              <div onClick={this.playAlphabet.bind(this)} className="volumeButton"></div>
              <div className="card"></div>
              <div onClick={this.checkAnswer.bind(this,"right")} className="rightAnswer"></div>
              <div onClick={this.checkAnswer.bind(this,"left")} className="leftAnswer"></div>
          </div>
        )}
        <Audio
            ref="audio"
            volume={1}
            autoplay={false}/>
      </MatchPageWrapper>
    );
  }
}
