import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function TicTacToeApp() {
  // State: 0-empty, 1-X, 2-O
  const [board, setBoard] = useState(Array(9).fill(0));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState('Next: X');
  const [score, setScore] = useState({ X: 0, O: 0, Draws: 0 });
  const [gameOver, setGameOver] = useState(false);

  // Stubs for real-time (potential socket/api connect)
  // const [connected, setConnected] = useState(false);

  // PUBLIC_INTERFACE
  function handleClick(i) {
    if (board[i] !== 0 || gameOver) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? 1 : 2;

    const winner = calculateWinner(newBoard);

    if (winner) {
      let newScore = { ...score };
      if (winner === 1) newScore.X += 1;
      else if (winner === 2) newScore.O += 1;
      setScore(newScore);
      setStatus(`Winner: ${winner === 1 ? 'X' : 'O'}`);
      setGameOver(true);
    } else if (!newBoard.includes(0)) {
      setScore({ ...score, Draws: score.Draws + 1 });
      setStatus('Draw game');
      setGameOver(true);
    } else {
      setXIsNext(!xIsNext);
      setStatus(`Next: ${!xIsNext ? 'X' : 'O'}`);
    }
    setBoard(newBoard);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setBoard(Array(9).fill(0));
    setXIsNext(true);
    setStatus('Next: X');
    setGameOver(false);
  }

  // Utility: Determine winner (classic Tic Tac Toe)
  function calculateWinner(squares) {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8], // rows
      [0,3,6],[1,4,7],[2,5,8], // cols
      [0,4,8],[2,4,6]          // diags
    ];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
    }
    return null;
  }

  return (
    <div className="app ttt-app">
      <nav className="navbar ttt-header" style={{ background: "#fafafa", borderBottom: "1px solid #ececec" }}>
        <div className="container" style={{ padding: "0 12px" }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", width: '100%' }}>
            <div className="logo" style={{ fontWeight: 700 }}>
              <span style={{ color: "#4CAF50", fontWeight: 900, fontSize: "1.4rem" }}>○×</span>
              WebTicTacToe
            </div>
            <button className="btn btn-large" style={{ background: "#2196F3" }} onClick={handleReset}>
              Reset Game
            </button>
          </div>
        </div>
      </nav>
      <main>
        <div className="container ttt-main" style={{ maxWidth: 460, marginTop: 110 }}>
          {/* Score section */}
          <section className="ttt-score-section" style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: "#f5f5f5", borderRadius: 16, padding: '16px 24px', marginBottom: 28, boxShadow: "0 1px 8px rgba(33,150,243,0.06)"
          }}>
            <div>
              <div style={{ fontSize: 14, color: "#4CAF50" }}>Score</div>
              <div style={{ fontWeight: 600, fontSize: 18, color: "#333" }}>X: {score.X} &nbsp; O: {score.O} &nbsp; <span style={{ color: "#FFC107" }}>Draws: {score.Draws}</span></div>
            </div>
            <div style={{ fontSize: 15, color: "#2196F3", fontWeight: 400 }}>{status}</div>
          </section>
          {/* Game Board */}
          <section className="ttt-board-section" style={{ display: 'flex', justifyContent: 'center' }}>
            <Board squares={board} onClick={handleClick} gameOver={gameOver} />
          </section>
          {/* Placeholder for Real-time: */}
          <div className="ttt-realtime-note" style={{
            marginTop: 34,
            color: "#bbb",
            fontSize: 13,
            textAlign: "center"
          }}>
            {/* In real implementation, players would see updates instantly via WebSockets. */}
            <span role="img" aria-label="bolt">⚡</span> Real-time stub: moves are reflected instantly for local play.
          </div>
        </div>
      </main>
    </div>
  );
}

/** PUBLIC_INTERFACE
 * Board component: receives the current board state as an array of 9, renders grid.
 */
function Board({ squares, onClick, gameOver }) {
  // Square == 0: empty, 1: X, 2: O
  return (
    <div
      className="ttt-board"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 64px)",
        gridTemplateRows: "repeat(3, 64px)",
        gap: 8,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 16px rgba(76,175,80,0.07)",
        padding: 12,
      }}
    >
      {squares.map((sq, idx) => (
        <Square
          key={idx}
          value={sq}
          onClick={() => onClick(idx)}
          disabled={gameOver || sq !== 0}
        />
      ))}
    </div>
  );
}

/** PUBLIC_INTERFACE
 * Single square for the Tic Tac Toe grid.
 */
function Square({ value, onClick, disabled }) {
  let display = '';
  let markerColor = "#bdbdbd";
  if (value === 1) {
    display = 'X';
    markerColor = "#FF0000"; // Red for X
  } else if (value === 2) {
    display = 'O';
    markerColor = "#000000"; // Black for O
  }
  return (
    <button
      className="ttt-square"
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 64,
        height: 64,
        background: "#fafafa",
        color: markerColor,
        fontWeight: 700,
        fontSize: 32,
        border: `2.5px solid #ececec`,
        borderRadius: 10,
        outline: 'none',
        cursor: disabled ? "default" : "pointer",
        transition: "background .14s",
        userSelect: "none",
        boxShadow: value ? `0 3px 16px rgba(33,150,243,0.08)` : undefined,
      }}
      aria-label={`Board Cell ${display || 'empty'}`}
    >
      {display}
    </button>
  );
}

export default TicTacToeApp;