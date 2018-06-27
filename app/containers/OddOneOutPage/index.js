/*
 * OddOneOutPage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import H1 from 'components/H1';
import messages from './messages';
import List from './List';
import ListItem from './ListItem';
import ListItemTitle from './ListItemTitle';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import Audio from 'components/Audio';

import backgroundImage from 'images/A1_Instructions.png';
import monsterWobble from 'images/monster_act_2.png';

import continueImage from 'images/continue_BTN_Up.png';
import homeButton from 'images/home_BTN.png';
import homeButtonHover from 'images/home_BTN_down.png';
import continueImageHover from 'images/continue_BTN_Down.png';

import images from "./cardImages";

import linkClickAudio from 'audio/button-21.mp3';
import correctAudio from 'audio/magic-chime-02.mp3';
import inCorrectAudio from 'audio/Buzz.mp3';


const OddOneOutWrapper = styled.div`
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
      height: 100%;

      img{
        margin: 7% 11%;
        position: absolute;
        width: 80%;
      }
      div{
        position: relative;
        width: 35%;
        height: 28%;
        display: inline-block;
        cursor: pointer;
      }
      .topLeft{
        top: 11%;
        left: 14%;
      }
      .topRight{
        top: 11%;
        left: 14%;
      }
      .bottomLeft{
        top: 11%;
        left: 14%;
      }
      .bottomRight{
        top: 11%;
        left: 14%;
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

const answerKey = [null,"bottomLeft","bottomRight","topRight","topLeft","bottomLeft","topRight","bottomLeft","topLeft","bottomRight","topLeft","bottomRight","bottomLeft"];

export default class OddOneOutPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      continue: false,
      currentCard : images["card" + "1"],
      currentCardCounter : 1
    };
  }
  handleContinue(e) {
    this.setState({continue : true});
    this.playAudio("continue");
  }
  checkAnswer(answer) {
    var that = this;
    this.setState({currentCard : images["answer" + that.state.currentCardCounter]});
    if(answer === answerKey[that.state.currentCardCounter]){
      this.playAudio("correct");
    }else{
      this.playAudio("incorrect");
    }
    setTimeout(function(){
      that.setState({currentCard : images["card" + (that.state.currentCardCounter + 1)]});
      that.setState({currentCardCounter : that.state.currentCardCounter + 1});
    },1000);
  }

  playAudio(type,link){
    var src = "";
    if(type === "continue"){
      src = linkClickAudio;
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
    if(this.state.currentCardCounter > 12){
      return (
        <OddOneOutWrapper>
          <Helmet>
            <title>Feature Page</title>
            <meta
              name="description"
              content="OddOneOutPage"
            />
          </Helmet>
          <Link className="homeButton" to="/teacher-creature"></Link>
          <h1 className="homeMessage">Click on Home Button to Go Home.</h1>
        </OddOneOutWrapper>
      )
    }


    return (
      <OddOneOutWrapper>
        <Helmet>
          <title>Feature Page</title>
          <meta
            name="description"
            content="OddOneOutPage"
          />
        </Helmet>
        <Link className="homeButton" to="/teacher-creature"></Link>
        {!this.state.continue && (
          <div>
            <div className="textContainer">
              <div className="text">
                <h1>Odd One Out</h1>
                <p>Read each word.</p>
                <p>Look at the underlined letters.</p>
                <p>Touch the word that does not belong.</p>
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
              <div onClick={this.checkAnswer.bind(this,"topLeft")} className="topLeft"></div>
              <div onClick={this.checkAnswer.bind(this,"topRight")} className="topRight"></div>
              <div onClick={this.checkAnswer.bind(this,"bottomLeft")} className="bottomLeft"></div>
              <div onClick={this.checkAnswer.bind(this,"bottomRight")} className="bottomRight"></div>
          </div>
        )}
        <Audio
          ref="audio"
          volume={1}
          autoplay={false}/>
      </OddOneOutWrapper>
    );
  }
}
