import { useState } from "react";
import "./style.css";
import Slider from "react-slider";

export default function index({ handleChange, min, max }) {
  const [values, setValues] = useState([min, max]);
  const handleSliderChange = (newValue) => {
    setValues(newValue);
    handleChange(newValue);
  };
  return (
    <div className="w-full">
      <h2 className="sidebar-title color-title">Price Range</h2>

      <div className="px-3">
        <div className="">
          ${values[0]} - ${values[1]}
        </div>

        <small>Current Range:${values[1] - values[0]}</small>
        <Slider
          className={"slider"}
          onChange={handleSliderChange}
          value={values}
          min={min}
          max={max}
        />
      </div>
    </div>
  );
}
