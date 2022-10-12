import React, { useState, useRef } from "react";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { stringify } from "circular-json";
import "../styles/Board.scss";

const Board = () => {
  const boardRef = useRef();
  const check = useRef(false);
  const diagonalOne = useRef([]);
  const diagonalTwo = useRef([]);
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
    array.forEach((row) => {
      if (allEqual(row)) {
        check.current = true;
      }
    });
  };

  const arrayTranspose = (array) => {
    return array.map((_, colIndex) => array.map((row) => row[colIndex]));
  };

  const checkWinner = () => {
    // Horizontally Checking
    checkTrue(tictac.current);

    // Vertically Checking

    // STEP: 1 - Taking Transpose of array //
    const transpose = arrayTranspose(tictac.current);

    // STEP: 2 - checking //
    checkTrue(transpose);

    // Diagnolly Checking
    // STEP: 1 - Checking first Diagonal
    for (let i = 0; i < tictac.current.length; i++) {
      diagonalOne.current.push(tictac.current[i][i]);
      if (i == 2) {
        if (!allEqual(diagonalOne.current)) {
          diagonalOne.current = [];
        } else {
          check.current = true;
        }
      }
    }

    // STEP: 2 - Checking Second Diagonal
    const arr = [2, 1, 0];
    for (let j = tictac.current.length - 1; j >= 0; j--) {
      diagonalTwo.current.push(tictac.current[arr[j]][j]);
      if (j == 0) {
        console.log(diagonalTwo.current);
        if (!allEqual(diagonalTwo.current)) {
          diagonalTwo.current = [];
          console.log("not equal");
        } else {
          console.log("equal");
          check.current = true;
        }
      }
    }

    // Showing Output If Matched
    if (check.current) {
      setTimeout(() => {
        alert(`You Won ${player.name}`);
      }, 100);
    }
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
            >
              {item}
            </div>
          ))}
          {tictac.current[1].map((item, index) => (
            <div
              className="block"
              key={index}
              onClick={() => changeIcon(1, index)}
            >
              {item}
            </div>
          ))}
          {tictac.current[2].map((item, index) => (
            <div
              className="block"
              key={index}
              onClick={() => changeIcon(2, index)}
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
