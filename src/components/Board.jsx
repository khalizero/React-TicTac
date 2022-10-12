import React, { useState, useRef } from "react";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { stringify } from "circular-json";
import "../styles/Board.scss";

const Board = () => {
  const boardRef = useRef();
  const tictac = useRef([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [player, setPlayer] = useState({
    name: "Player 1",
    icon: <TiTick style={{ color: "green", fontSize: "75px" }} />,
  });

  const playerToggler = () => {
    if (player.name == "Player 1") {
      setPlayer({
        name: "Player 2",
        icon: <ImCross style={{ color: "red" }} />,
      });
    } else {
      setPlayer({
        name: "Player 1",
        icon: <TiTick style={{ color: "green", fontSize: "75px" }} />,
      });
    }
  };

  const allEqual = (arr) =>
    arr.every((val) => val != null && val?.type?.name == arr[0]?.type?.name);

  const checkTrue = (array) => {
    return array.forEach((row) => (allEqual(row) ? true : false));
  };

  const arrayTranspose = (array) => {
    return array.map((_, colIndex) => array.map((row) => row[colIndex]));
  };

  const checkWinner = () => {
    let check = false;

    // Horizontally Checking
    check = checkTrue(tictac.current);

    // Vertically Checking

    // STEP: 1 - Taking Transpose of array

    const transpose = arrayTranspose(tictac.current);

    // STEP: 2 - checking
    check = checkTrue(transpose);

    // Diagnolly Checking

    if (check) {
      setTimeout(() => {
        alert(`You Won ${player.name}`);
      }, 100);
    }

    // return check.some((val) => val == true);
  };

  const changeIcon = (mainIndex, nestedIndex) => {
    if (tictac.current[mainIndex][nestedIndex] == null) {
      tictac.current[mainIndex][nestedIndex] = player.icon;
      playerToggler();
      checkWinner();
      console.log("player Changed");
    }
  };

  return (
    <>
      <div className="player">{player.name}</div>
      <div className="boardWrapper" ref={boardRef}>
        <div className="board">
          {tictac.current[0].map((item, index) => (
            <div
              className="block"
              key={index}
              onClick={() => changeIcon(0, index)}
              onClickCapture={() => changeIcon(0, index)}
            >
              {item}
            </div>
          ))}
          {tictac.current[1].map((item, index) => (
            <div
              className="block"
              key={index}
              onClick={() => changeIcon(1, index)}
              onClickCapture={() => changeIcon(1, index)}
            >
              {item}
            </div>
          ))}
          {tictac.current[2].map((item, index) => (
            <div
              className="block"
              key={index}
              onClick={() => changeIcon(2, index)}
              onClickCapture={() => changeIcon(2, index)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Board;
