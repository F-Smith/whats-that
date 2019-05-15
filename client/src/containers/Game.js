import React from "react";
import Countdown from "react-countdown-now";

// Redux Imports
import { connect } from "react-redux";
import * as Actions from "../redux/actions/index";

// Component & Container Imports
import Canvas from "../components/Canvas";
import GameHeader from "../components/GameHeader";
import Wrapper from "../components/Wrapper";
import Zorb from "../components/Zorb";

export const Game = props => {
  const renderer = ({ seconds, completed }) => {
    if (completed) {
      return <span>TIME'S UP!!!</span>;
    } else {
      return <span> {seconds} </span>;
    }
  };

  return (
    <Wrapper>
      <GameHeader canYouDraw>
        <p>Can you draw...</p>
        <h2>Hurricane</h2>
      </GameHeader>

      <Canvas />
      <p className="small">Remaining time...</p>
      <div className="countdown-timer">
        <Countdown date={Date.now() + 20000} renderer={renderer} />
      </div>
    </Wrapper>
  );
};

export default Game;
