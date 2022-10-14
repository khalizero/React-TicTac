import React, { useState, useEffect, useRef, useMemo } from "react";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import "../styles/Board.scss";
import GameOver from "./GameOver";

const Board = () => {
  const boardRef = useRef();
  const check = useRef(false);
  const diagonalOne = useRef([]);
  const diagonalTwo = useRef([]);
  const [show, setShow] = useState(false);
  const [lastPlayer, setLastPlayer] = useState("");

  const player1 = useMemo(() => {
    return {
      name: "Ahmed",
      icon: <TiTick style={{ color: "green", fontSize: "75px" }} />,
    };
  }, []);
  const player2 = useMemo(() => {
    return {
      name: "Unknown",
      icon: <ImCross style={{ color: "red" }} />,
    };
  }, []);

  const [player, setPlayer] = useState(player1);

  const defaultVal = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  const tictac = useRef(defaultVal);

  useEffect(() => {
    if (check.current) {
      setShow(true);
    }
  }, [check.current]);

  const restartGame = () => {
    tictac.current = defaultVal;
    check.current = false;
    setPlayer(player1);
    setShow(false);
  };

  const playerToggler = () => {
    if (!check.current) {
      if (player.name == player1.name) {
        setPlayer(player2);
        setLastPlayer(player1.name);
      } else {
        setPlayer(player1);
        setLastPlayer(player2.name);
      }
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
      <GameOver
        show={show}
        title={lastPlayer + " has won this round."}
        restart={restartGame}
      />
      <div className="player">
        {check.current ? "Game has Been Concluded" : `${player.name}'s Turn`}
      </div>
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
