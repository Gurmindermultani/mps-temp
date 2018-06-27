import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

import A from 'components/A';
import Audio from 'components/Audio';
import LocaleToggle from 'containers/LocaleToggle';
import messages from './messages';

import audioImageUp from 'images/btn_music_up.png';
import audioImageDown from 'images/btn_music_down.png';


import themeAudio from 'audio/KidsTrax653-KC07-MuppetsOnTheTitanic-Julin.mp3';

var Wrapper = styled.div`
  background-image: url(${audioImageUp});
  background-size: contain;
  height: 50px;
  width: 200px;  
  position: absolute;
  bottom: 7%;
  left: 43%;
  cursor: pointer;
  @media (max-width:700px)  {
    bottom: 22%;
  }
  @media (min-width:700px) and (max-width:750px)  {
    bottom: 20%;
  }
  @media (min-width:750px) and (max-width:800px)  {
    bottom: 19%;
  }
  @media (min-width:800px) and (max-width:850px)  {
    bottom: 16%;
  }
  @media (min-width:850px) and (max-width:900px)  {
    bottom: 11%;
  } 
`;



export class Footer extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
      super(props)

      this.state = {
          musicStatus: "up"
      };
  }

  togglePlay(){
    const audio = ReactDOM.findDOMNode(this.refs.audio);
    if (audio.paused){
      audio.play();
    }
    else{
      audio.pause();
    }
  }

  componentDidMount(){

    const audio = ReactDOM.findDOMNode(this.refs.audio);
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

    if(this.state.musicStatus === "down"){
      Wrapper = Wrapper.extend`
        background-image: url(${audioImageDown});
      `;
    }

    if(this.state.musicStatus === "up"){
      Wrapper = Wrapper.extend`
        background-image: url(${audioImageUp});
      `;
    }

    return (
      <Wrapper onClick={this.togglePlay.bind(this)}>
        <section>
          <Audio ref="audio" volume={0.2} loop={true} source={themeAudio} autoplay={true} preload={true}/>
        </section>
      </Wrapper>    
    );
  }
}

export default Footer;
