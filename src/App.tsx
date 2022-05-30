import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import blueCandy from '/blue.jpg';
import greenCandy from '/green.jpg';
import orangeCandy from '/orange.jpg';
import purpleCandy from '/purple.jpg';
import redCandy from '/red.jpg';
import yellowCandy from '/yellow.jpg';
import blankCandy from '/blank.jpg'
import ScoreBoard from "./components/ScoreBoard";

const width = 8;
const candyColors = [blueCandy, greenCandy, orangeCandy, purpleCandy, redCandy, yellowCandy];
const App = () => {
  const [currentColorArrangment, setCurrentColorArrangment] = useState<
    string[]
  >([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState<any>(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState<any>(null)
  const [score, setScore] = useState(0)

  // check for column of four colors which are same to the 47 index which is last to check
  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decideColor = currentColorArrangment[i];
      const isBlank = currentColorArrangment[i] == blankCandy
      if (
        columnOfFour.every(
          (square) => currentColorArrangment[square] === decideColor && !isBlank
        )
      ) {
        setScore((prevScore) => prevScore + 4)
        columnOfFour.forEach((square) => (currentColorArrangment[square] = blankCandy));
        return true;
      }
    }
  };
  // check for row of four colors which are same to the 47 index which is last to check
  const checkForRowOfFour = () => {
    for (let i = 0; i < 60; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decideColor = currentColorArrangment[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 62, 63,
      ];
      const isBlank = currentColorArrangment[i] == blankCandy
      if (notValid.includes(i)) continue;
      if (
        rowOfFour.every(
          (square) => currentColorArrangment[square] === decideColor && !isBlank
        )
      ) {
        setScore((prevScore) => prevScore + 4)
        rowOfFour.forEach((square) => (currentColorArrangment[square] = blankCandy));
        // setScore((prevScore) => prevScore + 4)
        return true;
      }
    }
  };

  // check for column of three colors which are same to the 47 index which is last to check
  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decideColor = currentColorArrangment[i];
      const isBlank = currentColorArrangment[i] == blankCandy
      if (
        columnOfThree.every(
          (square) => currentColorArrangment[square] === decideColor && !isBlank
        )
      ) {
        setScore((prevScore) => prevScore + 3)
        columnOfThree.forEach(
          (square) => (currentColorArrangment[square] = blankCandy)
        );
        return true;
      }
    }
  };

  // check for row of three colors which are same to the 47 index which is last to check
  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decideColor = currentColorArrangment[i];
      const isBlank = currentColorArrangment[i] == blankCandy
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63,
      ];
      if (notValid.includes(i)) continue;
      if (
        rowOfThree.every(
          (square) => currentColorArrangment[square] === decideColor && !isBlank
        )
      ) {
        setScore((prevScore) => prevScore + 3)
        rowOfThree.forEach((square) => (currentColorArrangment[square] = blankCandy));
        return true;
      }
    }
  };
  // move to candies below if there's a space below
  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArrangment[i] === blankCandy) {
        const randomNumber = Math.floor(Math.random() * candyColors.length);
        currentColorArrangment[i] = candyColors[randomNumber];
      }

      if (currentColorArrangment[i + width] == blankCandy) {
        currentColorArrangment[i + width] = currentColorArrangment[i];
        currentColorArrangment[i] = blankCandy;
      }
    }
  };

  const dragStart = (e: React.DragEvent<HTMLImageElement>) => {
    setSquareBeingDragged(e.target)
  }
  function dragDrop(e: React.DragEvent<HTMLImageElement>) {
    setSquareBeingReplaced(e.target)
  }

  const dragEnd = () => {
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))
    currentColorArrangment[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
    currentColorArrangment[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId + 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + width
    ]
    const validMove = validMoves.includes(squareBeingReplacedId)
    const isAColumnOfFour = checkForColumnOfFour()
    const isARowOfFour = checkForRowOfFour()
    const isAColumnOfThree = checkForColumnOfThree()
    const isARowOfThree = checkForRowOfThree()

    if (squareBeingReplacedId && validMove && (isAColumnOfFour || isAColumnOfThree || isARowOfFour || isARowOfThree)) {
      setSquareBeingDragged(null)
      setSquareBeingReplaced(null)
    } else {
      currentColorArrangment[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
      currentColorArrangment[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
      setCurrentColorArrangment([...currentColorArrangment])
    }
  }

  // create the game board of different colors
  const createBoard = () => {
    const randomColorArrangment = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangment.push(randomColor);
    }
    setCurrentColorArrangment(randomColorArrangment);
  };

  useEffect(() => {
    createBoard();
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangment([...currentColorArrangment]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    currentColorArrangment,
    moveIntoSquareBelow,
  ]);

  return (
    <div className="App">
      <div className="game">
        {currentColorArrangment.map((candyColor, index) => (
          <img
            key={index}
            src={candyColor}
            alt={candyColor}
            draggable={true}
            onDragStart={dragStart}
            data-id={index}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
      <div>
        <ScoreBoard score={score} />
      </div>
    </div>
  );
};

export default App;
