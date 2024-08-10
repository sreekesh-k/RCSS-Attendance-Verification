import React from "react";

function LevelSelector({ setLevel, day }) {
  return (
    <div className=" w-full flex gap-5">
      <div className=" font-bold">Level:</div>
      <label>
        <input
          type="radio"
          name="level"
          value="UG"
          disabled={!day}
          onChange={() => setLevel("UG")}
        />
        UG
      </label>
      <label>
        <input
          type="radio"
          name="level"
          value="PG"
          disabled={!day}
          onChange={() => setLevel("PG")}
        />
        PG
      </label>
    </div>
  );
}

export default LevelSelector;