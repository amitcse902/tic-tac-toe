const GameBoard = ({ onSelectSquare, board }) => {
    // let gameBoard = initialGameBoard;
    // for (const turn of turns) {
    //     const { square, player } = turn;
    //     const { row, col } = square;

    //     gameBoard[row][col] = player;

    //     console.log(square, turn);
    // }
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // const onClickSelectSquare = (rowIndex, colIndex) => {
    //     setGameBoard((prevGameBoard) => {
    //         const updatedGameBoard = [...prevGameBoard.map((innerArray) => [...innerArray])];
    //         updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedGameBoard;
    //     })

    //     onSelectSquare();
    // }
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => <li key={rowIndex}><ol>
                {row.map((playerSymbol, colIndex) => <li key={colIndex}><button onClick={() => onSelectSquare({ rowIndex, colIndex })} disabled={playerSymbol !== null} >{playerSymbol}</button></li>)}
            </ol>
            </li>)}
        </ol>
    )
}
export default GameBoard;