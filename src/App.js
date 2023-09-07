import { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(new Array(9).fill(""));
  const [plyr, setPlyr] = useState("X");

  const [scoreX, setScoreX] = useState(
    window.sessionStorage.getItem("score-x") || 0
  );

  const [scoreO, setScoreO] = useState(
    window.sessionStorage.getItem("score-o") || 0
  );


  //upating player turns

  function updtPlyr(dummyBoard) {
    if (plyr === "X") {
      setPlyr("O");
    } else {
      setPlyr("X");
    }
    setBoard(dummyBoard);
  }

  //updation board 

  function boardUpdt(idx) {
    let dummyBoard = [...board];
    if (dummyBoard[idx] === "") {
      dummyBoard[idx] = plyr;
      updtPlyr(dummyBoard);

      let winner = findWinner(dummyBoard);
      if (winner !== false) {
        if (winner === "X") {
          window.sessionStorage.setItem("score-x", parseInt(scoreX) + 1);
          setScoreX(window.sessionStorage.getItem("score-x"));
        } else {
          window.sessionStorage.setItem("score-o", parseInt(scoreO) + 1);
          setScoreO(window.sessionStorage.getItem("score-o"));
        }
        setTimeout(() => {
          alert(`${winner} won`);
          setBoard(new Array(9).fill(""));
        }, 100);
      }else{
        let data = board.filter(item => item === '');
        console.log(data)
        if(data.length === 1){
          alert('game tied');
          setBoard(new Array(9).fill(""))
        }
      }
    } else {
      alert("Select Another Box");
    }
  }


  //finding game winner after each round

  function findWinner(board) {
    let winSeries = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let series of winSeries) {
      const [a, b, c] = series;
      if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return false;
  }


  // restart game function

  function restart() {
    window.sessionStorage.clear();
    window.location.reload();
  }

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <h2 className="score">Player X Score : {scoreX}</h2>
      <h2 className="score">Player O Score : {scoreO}</h2>
      <table>
        <tr>
          <td
            className="box"
            onClick={() => boardUpdt(0)}
            style={{ color: board[0] === "X" ? "blue" : "red" }}
          >
            {board[0]}
          </td>
          <td
            className="box"
            onClick={() => boardUpdt(1)}
            style={{ color: board[1] === "X" ? "blue" : "red" }}
          >
            {board[1]}
          </td>
          <td
            className="box"
            onClick={() => boardUpdt(2)}
            style={{ color: board[2] === "X" ? "blue" : "red" }}
          >
            {board[2]}
          </td>
        </tr>
        <tr>
          <td
            className="box"
            onClick={() => boardUpdt(3)}
            style={{ color: board[3] === "X" ? "blue" : "red" }}
          >
            {board[3]}
          </td>
          <td
            className="box"
            onClick={() => boardUpdt(4)}
            style={{ color: board[4] === "X" ? "blue" : "red" }}
          >
            {board[4]}
          </td>
          <td
            className="box"
            onClick={() => boardUpdt(5)}
            style={{ color: board[5] === "X" ? "blue" : "red" }}
          >
            {board[5]}
          </td>
        </tr>
        <tr>
          <td
            className="box"
            onClick={() => boardUpdt(6)}
            style={{ color: board[6] === "X" ? "blue" : "red" }}
          >
            {board[6]}
          </td>
          <td
            className="box"
            onClick={() => boardUpdt(7)}
            style={{ color: board[7] === "X" ? "blue" : "red" }}
          >
            {board[7]}
          </td>
          <td
            className="box"
            onClick={() => boardUpdt(8)}
            style={{ color: board[8] === "X" ? "blue" : "red" }}
          >
            {board[8]}
          </td>
        </tr>
      </table>
      <button className="restart" onClick={() => restart()}>
        Restart Game
      </button>
    </div>
  );
}

export default App;
