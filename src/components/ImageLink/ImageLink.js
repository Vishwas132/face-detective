import React from "react";
import "./ImageLink.css";

const ImageLink = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="url-input-wrapper">
          <input
            className="input-box"
            type="url"
            name="url"
            placeholder="Enter url of image"
            onChange={onInputChange}
          />

          <button className="button" type="submit" onClick={onButtonSubmit}>
            Find faces
          </button>
        </div>

        <div>
          <input
            className="file-input"
            type="file"
            name="file"
            accept="image/*"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageLink;
