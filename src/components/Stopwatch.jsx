import React, { useState } from "react";
import Cont from "./Cont";
import "./Stopwatch.css";

const Stopwatch = () => {
  const [wa, setWa] = useState([1]);

  const handleAddClick = (event) => {
    event.preventDefault();
    setWa((prev) => {
      return [...prev, 1];
    });
    console.log(wa);
  };

  const deletefun = (index) => {
    const updatedWa = wa.filter((wa, waIndex) => waIndex !== index);
    setWa(updatedWa);
    console.log(updatedWa);
  };

  return (
    <>
      <div className="main-container">
        <button className="add-btn" onClick={handleAddClick}>
          Add
        </button>

        {wa.map((i, index) => {
          return <Cont key={index} index={index} deletefun={deletefun} />;
        })}
      </div>
    </>
  );
};

export default Stopwatch;
