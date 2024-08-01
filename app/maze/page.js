"use client";

import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import "./style.css";

function getGridLayout() {
  return [
    [0, 0, 0, 0, 0, 0, 0, 3],
    [0, 1, 1, 1, 2, 1, 1, 1],
    [1, 1, 0, 0, 0, 1, 1, 1],
    [1, 1, 2, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [4, 1, 1, 1, 1, 1, 1, 1],
  ];
}
export default function Home() {
  const [col, setCol] = useState(0);
  const [row, setRow] = useState(7);
  const [grid, setGrid] = useState(getGridLayout());
  const [score, setScore] = useState(0);

  const type = {
    block: 0,
    path: 1,
    bonus: 2,
    finish: 3,
    character: 4,
  };

  useEffect(() => {
    renderGrid();
  }, [grid]);

  function renderGrid() {
    const blockType = ["blok", "path", "bonus", "finish", "character"];
    const tableBody = document.querySelector("tbody");
    if (tableBody) {
      const data = grid.map((rowVal) => {
        const col = rowVal.map((colVal) => {
          return `<td class="${blockType[colVal]} w-10 h-10"></td>`;
        });
        return `<tr>${col.join("")}</tr>`;
      });
      tableBody.innerHTML = data.join("");
    }
  }

  const handleUp = () => {
    const newRow = row - 1;
    if (newRow >= 0 && grid[newRow][col] !== 0) {
      const newGrid = [...grid];
      if (newGrid[newRow][col] === 2) {
        toast.success("congrats!! you got the bonus");
        setScore(score + 10);
      } else if (newGrid[newRow][col] === 3) {
        toast.success("congrats!! you won");
        setTimeout(() => {
          setGrid(getGridLayout());
          setRow(7);
          setCol(0);
        }, 2000);
      } else {
        setScore(score + 1);
      }
      newGrid[row][col] = 1;
      newGrid[newRow][col] = 4;

      setRow(newRow);
      setGrid(newGrid);
    }
  };

  const handleDown = () => {
    const newRow = row + 1;
    if (newRow < grid.length && grid[newRow][col] !== 0) {
      const newGrid = [...grid];
      if (newGrid[newRow][col] === 2) {
        toast.success("congrats!! you got the bonus");
        setScore(score + 10);
      } else {
        setScore(score + 1);
      }
      newGrid[row][col] = 1;
      newGrid[newRow][col] = 4;
      setRow(newRow);
      setGrid(newGrid);
    }
  };

  const handleLeft = () => {
    const newCol = col - 1;
    if (newCol >= 0 && grid[row][newCol] !== 0) {
      const newGrid = [...grid];
      if (newGrid[row][newCol] === 2) {
        toast.success("congrats!! you got the bonus");
        setScore(score + 10);
      } else {
        setScore(score + 1);
      }
      newGrid[row][col] = 1;
      newGrid[row][newCol] = 4;
      setCol(newCol);
      setGrid(newGrid);
    }
  };

  const handleRight = () => {
    const newCol = col + 1;
    if (newCol < grid[0].length && grid[row][newCol] !== 0) {
      const newGrid = [...grid];
      if (newGrid[row][newCol] === 2) {
        toast.success("congrats!! you got the bonus");
        setScore(score + 10);
      } else {
        setScore(score + 1);
      }
      newGrid[row][col] = 1;
      newGrid[row][newCol] = 4;
      setCol(newCol);
      setGrid(newGrid);
    }
  };

  return (
    <div className="container container-flex w-1/2 mx-auto mt-20">
      <h2 className="text-3xl text-right"> Score: {score}</h2>
      <table
        className="border-collapse border border-gray-800 table mx-auto"
        id="table"
      >
        <tbody></tbody>
      </table>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div></div>
        <button
          onClick={handleUp}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Up
        </button>
        <div></div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <button
          onClick={handleLeft}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Left
        </button>
        <button
          onClick={handleDown}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Down
        </button>
        <button
          onClick={handleRight}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Right
        </button>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
