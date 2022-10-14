import React from "react";
import "../styles/GameOver.scss";

const GameOver = (props) => {
  const { show, title, restart } = props;
  return (
    <>
      {show && (
        <>
          <div className="overlay"></div>
          <div className="gameOverWrapper">
            <div className="gameOverTitle">
              <h4>{title}</h4>
            </div>
            <div className="gameOverBtn">
              <button onClick={restart}>Restart</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GameOver;
