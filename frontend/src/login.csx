import React from "react";
import "./App.css";

export const Desktop = () => {
  return (
    <div className="desktop">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <div className="rectangle" />
          <div className="frame">
            <div className="text-wrapper">Login to Smart Gator</div>
            <img className="img" alt="Frame" src="frame-2.png" />
            <img className="frame-2" alt="Frame" src="frame-3.png" />
            <p className="div">I want to sign up</p>
          </div>
          <div className="text-wrapper-2">SMART GATOR</div>
        </div>
      </div>
    </div>
  );
};