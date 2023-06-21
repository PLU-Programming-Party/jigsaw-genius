import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const fullPuzzlePhotoRef = useRef<any>(null);
  const fullPuzzleVideoRef = useRef<any>(null);
  const [photoTaken, setPhotoTaken] = useState<boolean>(false);

  // Display camera
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          // width: { min: 120, ideal: 100, max: 1920 },
          // height: { min: 120, ideal: cameraHeight, max: 1080 },
          facingMode: "environment",
        },
      })
      .then((stream) => {
        let video = fullPuzzleVideoRef.current;
        if (video != null) {
          video.srcObject = stream;
          let videoPromise = video.play();
          if (videoPromise !== undefined) {
            videoPromise
              .then((_: any) => {
                console.log("Safely playing video");
              })
              .catch((error: any) => {
                console.log("Succesfully catch video error");
              });
          }
        } else {
          console.log("video is null");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getVideo();
  }, []);

  const takePhoto = () => {
    let photo = fullPuzzlePhotoRef.current;
    let ctx = photo.getContext("2d");

    ctx.drawImage(fullPuzzleVideoRef.current, 0, 0, photo.width, photo.height);
    let dataUrl = photo.toDataURL();
    let image = new Image();
    image.src = dataUrl;

    setPhotoTaken(true);
  };

  return (
    <>
      <canvas
        id="fullPuzzlePhoto"
        className={photoTaken ? "" : "hide"}
        ref={fullPuzzlePhotoRef}
      ></canvas>
      <video
        id="fullPuzzleVideo"
        className={photoTaken ? "hide" : ""}
        ref={fullPuzzleVideoRef}
      ></video>

      <div id="spacePlacer"></div>
      <button id="fullPuzzleButton" onClick={takePhoto}>
        {" "}
      </button>
    </>
  );
}

export default App;
