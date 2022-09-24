import React from "react";
import "./FaceDetect.css";

const FaceDetect = ({ imageUrl, faceBoxes }) => {
  return (
    <div className="full-width-container">
      <div className="image-container">
        <img id="input-image" src={imageUrl} alt="" />
        {faceBoxes.map((box, index) => {
          return (
            <div
              className="face-bounding-box"
              key={index.toString()}
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceDetect;
