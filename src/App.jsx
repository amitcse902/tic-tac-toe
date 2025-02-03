import { useState } from "react";
import GameBoard from "./Component/GameBoard";
import Player from "./Component/Player";
import Log from "./Component/Log";
import GameOver from "./Component/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map((innerArr) => [...innerArr])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
};

const deriveWinner = (gameBoard, players) => {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareCombination =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareCombination =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareCombination =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareCombination &&
      firstSquareCombination === secondSquareCombination &&
      firstSquareCombination === thirdSquareCombination
    ) {
      winner = players[firstSquareCombination];
    }
  }

  return winner;
};

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;
  const onSelectSquareHandle = ({ rowIndex, colIndex }) => {
    setGameTurns((preGameTurn) => {
      const currentPlayer = deriveActivePlayer(preGameTurn);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...preGameTurn,
      ];
      return updatedTurns;
    });
  };

  const handledRestart = () => {
    setGameTurns([]);
  };

  const handledPlayerChange = (symbol, newName) => {
    setPlayers((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handledPlayerChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handledPlayerChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handledRestart} />
        )}
        <GameBoard onSelectSquare={onSelectSquareHandle} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
