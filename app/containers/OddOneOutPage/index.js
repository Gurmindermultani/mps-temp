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

import backgroundImage from 'images/A1_Instructions.png';
import monsterWobble from 'images/monster_act_2.png';

import continueImage from 'images/continue_BTN_Up.png';
import homeButton from 'images/home_BTN.png';
import homeButtonHover from 'images/home_BTN_down.png';
import continueImageHover from 'images/continue_BTN_Down.png';

import images from "./cardImages";


const OddOneOutWrapper = styled.div`
    background-image: url(${backgroundImage});
    background-size: contain;
    height: 700px;
    position: relative;
    width: 100%;
    .textContainer{
      display: inline-block;
      margin-left: 110px;
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
      margin-top: 100px;
      cursor: pointer;
      &:hover {
        background-image: url(${continueImageHover});
      }
    }
    .imageContainer{
      display: inline-block;
      width: 50%;

      img{
        margin-top: 70px;
        height: 550px;
        margin-left: 40px;
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
        margin: 98px 97px;
        cursor: pointer;
        position: absolute;
        width: 82%;
      }
      div{
        position: relative;
        width: 336px;
        height: 228px;
        display: inline-block;
        cursor: pointer;
      }
      .topLeft{
        top: 120px;
        left: 117px;
      }
      .topRight{
        top: 120px;
        left: 117px;
      }
      .bottomLeft{
        top: 120px;
        left: 117px;
      }
      .bottomRight{
        top: 120px;
        left: 117px;
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
  }
  checkAnswer(e) {
    var that = this;
    this.setState({currentCard : images["answer" + that.state.currentCardCounter]});
    setTimeout(function(){
      that.setState({currentCard : images["card" + (that.state.currentCardCounter + 1)]});
      that.setState({currentCardCounter : that.state.currentCardCounter + 1});
    },1000);
  }
  render() {
    return (
      <OddOneOutWrapper>
        <Helmet>
          <title>Feature Page</title>
          <meta
            name="description"
            content="OddOneOutPage"
          />
        </Helmet>
        <Link className="homeButton" to="/"></Link>
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
              <div onClick={this.checkAnswer.bind(this)} className="topLeft"></div>
              <div onClick={this.checkAnswer.bind(this)} className="topRight"></div>
              <div onClick={this.checkAnswer.bind(this)} className="bottomLeft"></div>
              <div onClick={this.checkAnswer.bind(this)} className="bottomRight"></div>
          </div>
        )}
      </OddOneOutWrapper>
    );
  }
}
