import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import GameBoard from "../GameBoard";
import styles from "./GameContainer.module.scss";

const cx = classNames.bind(styles);

const GameContainer = () => {
  const [points, setPoints] = useState(3);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [heading, setHeading] = useState("LET'S PLAY");
  const [gameKey, setGameKey] = useState(0);

  // Handle play/restart button click
  const handlePlayRestart = () => {
    setIsPlaying(true);
    setGameStarted(true);
    setTime(0);
    setHeading("LET'S PLAY");
    setGameKey((prevKey) => prevKey + 1);
  };

  const handlePointChange = (e) => {
    const newPoints = parseInt(e.target.value);
    if (isNaN(newPoints)) {
      setPoints(0);
    } else {
      setPoints(newPoints);
    }
    setTime(0);
    setIsPlaying(false);
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 0.1);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Handle all circles cleared
  const handleAllCleared = () => {
    setIsPlaying(false);
    setHeading("ALL CLEARED");
  };

  // Handle game over
  const handleGameOver = () => {
    setIsPlaying(false);
    setHeading("GAME OVER");
  };

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
        key={gameKey}
        points={points}
        isPlaying={isPlaying}
        onAllCleared={handleAllCleared}
        onGameOver={handleGameOver} // Pass the handleGameOver function here
      />
    </div>
  );
};

export default GameContainer;
