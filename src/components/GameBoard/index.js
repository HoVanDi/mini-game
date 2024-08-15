import classNames from "classnames/bind";
import styles from "./GameBoard.module.scss";
import React, { useEffect, useState } from "react";

const cx = classNames.bind(styles);

const GameBoard = ({ points, isPlaying, onAllCleared, onGameOver }) => {
  const [circles, setCircles] = useState([]);
  const [nextIdToClick, setNextIdToClick] = useState(1); // Track the next correct ID

  // Generate random circles based on points
  useEffect(() => {
    if (isPlaying) {
      const newCircles = Array.from({ length: points }, (_, index) => ({
        id: index + 1,
        x: Math.random() * 90,
        y: Math.random() * 90,
        isDisappearing: false,
      })).sort((a, b) => a.id - b.id);

      setCircles(newCircles);
      setNextIdToClick(1); // Reset the next ID to click
    }
  }, [points, isPlaying]);

  const handleCircleClick = (id) => {
    if (id === nextIdToClick) {
      // Correct order
      setCircles((prevCircles) =>
        prevCircles.map((circle) =>
          circle.id === id ? { ...circle, isDisappearing: true } : circle
        )
      );

      setTimeout(() => {
        setCircles((prevCircles) => {
          const updatedCircles = prevCircles.filter(
            (circle) => circle.id !== id
          );
          if (updatedCircles.length === 0) {
            onAllCleared(); // All circles cleared
          }
          return updatedCircles;
        });
      }, 500); // Adjust the duration to match the CSS transition

      setNextIdToClick(nextIdToClick + 1); // Update the next ID
    } else {
      // Incorrect order
      onGameOver();
    }
  };

  return (
    <div className={cx("container")}>
      {circles.map((circle) => (
        <div
          className={cx("circle", { disappearing: circle.isDisappearing })}
          key={circle.id}
          style={{
            left: `${circle.x}%`,
            top: `${circle.y}%`,
            zIndex: points - circle.id,
          }}
          onClick={() => handleCircleClick(circle.id)}
        >
          {circle.id}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
