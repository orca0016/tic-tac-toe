import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./App.css";
import Column from "./components/Column";
import Row from "./components/Row";

function App() {
  const [turn, setTurn] = useState("X");
  const [twoPlayer, setTwoPlayer] = useState(false);
  const [allMoves, setAllMoves] = useState([]);
  const [myGame, setMyGame] = useState([
    {
      id: 0,
      column: [
        { id: 0, position: "" },
        { id: 1, position: "" },
        { id: 2, position: "" },
      ],
    },
    {
      id: 1,
      column: [
        { id: 0, position: "" },
        { id: 1, position: "" },
        { id: 2, position: "" },
      ],
    },
    {
      id: 2,
      column: [
        { id: 0, position: "" },
        { id: 1, position: "" },
        { id: 2, position: "" },
      ],
    },
  ]);
  const [listPosition, setListPosition] = useState([
    {
      x: 0,
      y: 0,
    },
    {
      x: 1,
      y: 0,
    },
    {
      x: 2,
      y: 0,
    },
    {
      x: 0,
      y: 1,
    },
    {
      x: 1,
      y: 1,
    },
    {
      x: 2,
      y: 1,
    },
    {
      x: 0,
      y: 2,
    },
    {
      x: 1,
      y: 2,
    },
    {
      x: 2,
      y: 2,
    },
  ]);

  // question for 1v1
  useEffect(() => {
    Swal.fire({
      title: "Do you want to play 1v1?",
      icon: "question",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      setTwoPlayer(result.isConfirmed);
    });
  }, []);

  const checkWin = (player) => {
    const winPatterns = [
      // Rows
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      // Columns
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      // Diagonals
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    return winPatterns.some((pattern) =>
      pattern.every(([row, col]) => myGame[row].column[col].position === player)
    );
  };

  const resetGame = () => {
    location.reload();
  };

  // get random position for 1 player game mode
  const getRandomEmptyPosition = () => {
    const getRandomIndex = (max) => {
      return Math.floor(Math.random() * max);
    };

    if (listPosition.length === 0) {
      return null;
    }
    const randomIndex = getRandomIndex(listPosition.length);
    const returnValue = listPosition[randomIndex];
    return returnValue;
  };

  // start O user movement in 1 player game
  useEffect(() => {
    if (turn === "O" && !twoPlayer) {
      const newArrayO = myGame.map((row) => ({
        ...row,
        column: row.column.map((col) => ({ ...col })),
      }));
      setTimeout(() => {
        const randomPosition = getRandomEmptyPosition();
        const itemFindO = { x: randomPosition.x, y: randomPosition.y };
        const findO = listPosition.findIndex(
          (item) => item.x === itemFindO.x && item.y === itemFindO.y
        );
        if (findO > -1) {
          let newListPositionO = [...listPosition];
          newListPositionO.splice(findO, 1);
          setListPosition(newListPositionO);
        }
        newArrayO[randomPosition.y].column[randomPosition.x].position = "O";
        setMyGame(newArrayO);
        setAllMoves((prev) => [
          ...prev,
          { x: randomPosition.x, y: randomPosition.y },
        ]);
      }, 500);
      setTurn("X");
    }
  }, [listPosition, allMoves]);

  // check win in every movement
  useEffect(() => {
    clickWin()
  }, [myGame]);
const clickWin = ()=>{
  if (checkWin(turn)) {
    Swal.fire({
      title: `user "${turn}" is win !! ✨🎉`,
      text: `Congratulations, you won`,
      icon: "success",
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: "reload the game",
      denyButtonText: "No",
    }).then((result) => {
      result ? resetGame() : null;
    });
  }
  if (listPosition.length === 0 && !checkWin(turn)) {
    Swal.fire({
      title: `The result of the game was tied. 🥱😵`,
      icon: "warning",
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: "reload the game",
      denyButtonText: "No",
    }).then((result) => {
      result ? resetGame() : null;
    });
  }
}
  const startOperation = (numberRow, numberColumn) => {
    if (
      !allMoves.some((item) => item.x === numberColumn && item.y === numberRow)
    ) {
      clickWin()
      setTurn("X");
      const newArray = myGame.map((row) => ({
        ...row,
        column: row.column.map((col) => ({ ...col })),
      }));
      newArray[numberRow].column[numberColumn].position = turn;
      const itemFind = { x: numberColumn, y: numberRow };
      const find = listPosition.findIndex(
        (item) => item.x === itemFind.x && item.y === itemFind.y
      );
      if (find > -1) {
        let newListPosition = [...listPosition];
        newListPosition.splice(find, 1);
        setListPosition(newListPosition);
      }
      setMyGame(newArray);
      setAllMoves((prev) => [...prev, { x: numberColumn, y: numberRow }]);

      if (twoPlayer) {
        setTurn(turn === "X" ? "O" : "X");
        
      } else {
        setTurn("O");
      }
    } else {
      Swal.fire({
        title: "Please choose another option",
        text: `This option was selected by another user`,
        icon: "warning",
      });
    }
  };
  return (
    <>
      <div className="container grainy-dark">
        <h1 style={{ color: "black" }}>Welcome to my game</h1>
        <h3>
          It's{" "}
          <span style={{ fontSize: "1.5rem", color: "black" }}>{turn}</span>{" "}
          turn
        </h3>
        <div className="box">
          {myGame.map((rows) => (
            <Row key={rows.id}>
              {rows.column.map((columns) => (
                <Column
                  key={columns.id}
                  fncColumn={startOperation}
                  numberRow={rows.id}
                  numberColumn={columns.id}
                  position={columns}
                />
              ))}
            </Row>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
