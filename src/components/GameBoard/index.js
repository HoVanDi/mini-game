import classNames from "classnames/bind";
import styles from "./GameBoard.module.scss";
import React, { useEffect, useState } from "react";

const cx = classNames.bind(styles);

const GameBoard = ({ points, isPlaying, onAllCleared }) => {
  const [circles, setCircles] = useState([]);

  // Generate random circles based on points
  useEffect(() => {
    if (isPlaying) {
      const newCircles = Array.from({ length: points }, (_, index) => ({
        id: index + 1,
        x: Math.random() * 90,
        y: Math.random() * 90,
        isDisappearing: false,
      }));
      setCircles(newCircles);
    }
  }, [points, isPlaying]);

  const handleCircleClick = (id) => {
    setCircles((prevCircles) =>
      prevCircles.map((circle) =>
        circle.id === id ? { ...circle, isDisappearing: true } : circle
      )
    );

    setTimeout(() => {
      setCircles((prevCircles) =>
        prevCircles.filter((circle) => circle.id !== id)
      );
      if (circles.length === 1) {
        onAllCleared();
      }
    }, 800); // Adjust the duration to match the CSS transition
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
