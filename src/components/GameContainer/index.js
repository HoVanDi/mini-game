import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import GameBoard from "../GameBoard";
import styles from "./GameContainer.module.scss";

const cx = classNames.bind(styles);

const GameContainer = () => {
  const [points, setPoints] = useState(3); // Start with 3 points
  const [time, setTime] = useState(0); // Timer starts at 0
  const [isPlaying, setIsPlaying] = useState(false); // Game state
  const [gameStarted, setGameStarted] = useState(false); // Track if the game has started
  const [heading, setHeading] = useState("LET'S PLAY");
  const [gameKey, setGameKey] = useState(0); // Key for triggering GameBoard re-render

  // Handle play/restart button click
  const handlePlayRestart = () => {
    setIsPlaying(!isPlaying);
    if (!gameStarted) {
      setGameStarted(true); // Mark the game as started
    }
    setIsPlaying(true);
    setTime(0);
    setHeading("LET'S PLAY");

    // Increment gameKey to force GameBoard re-render with new positions
    setGameKey((prevKey) => prevKey + 1);
  };

  // Handle point change
  const handlePointChange = (e) => {
    const newPoints = parseInt(e.target.value);

    // Handle empty input or invalid number
    if (isNaN(newPoints)) {
      setPoints(0); // Set to 0 or any default value you prefer
    } else {
      setPoints(newPoints);
    }

    setTime(0); // Reset the timer when points change
    setIsPlaying(false); // Stop the game to reset it
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime >= 6.6) {
            setIsPlaying(false);
            setHeading("GAME OVER");
            return prevTime;
          }
          return prevTime + 0.1;
        });
      }, 100);
    }

    return () => clearInterval(timer);
  }, [isPlaying]);

  // Handle all circles cleared
  const handleAllCleared = () => {
    setIsPlaying(false);
    setHeading("ALL CLEARED");
  };

  // Determine the heading color based on the game state
  const headingStyle = cx({
    red: heading === "GAME OVER",
    green: heading === "ALL CLEARED",
  });

  return (
    <div className={cx("wrapper")}>
      <h2 className={headingStyle}>{heading}</h2>
      <div className={cx("scoreboard")}>
        <div className={cx("point")}>
          <p>Points:</p>
          <input
            type="text"
            inputMode="numeric"
            value={points}
            onChange={handlePointChange}
          />
        </div>

        <div className={cx("times")}>
          <p>Times:</p>
          <p className={cx("timer")}>{time.toFixed(1)}s</p>
        </div>
        <button className={cx("btn-restart")} onClick={handlePlayRestart}>
          {gameStarted ? "Restart" : "Play"}
        </button>
      </div>

      <GameBoard
        key={gameKey} // Use gameKey as the key prop to force re-render
        points={points}
        isPlaying={isPlaying}
        onAllCleared={handleAllCleared}
      />
    </div>
  );
};

export default GameContainer;
