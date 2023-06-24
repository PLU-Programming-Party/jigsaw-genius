import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import puzzle from "./assets/puzzle.png";
import piece from "./assets/piece.png";
import back from "./assets/back.png";

function App() {
  const fullPuzzlePhotoRef = useRef<any>(null);
  const piecePhotoRef = useRef<any>(null);
  const fullPuzzleVideoRef = useRef<any>(null);
  const pieceVideoRef = useRef<any>(null);
  const [puzzlePhotoTaken, setPuzzlePhotoTaken] = useState<boolean>(false);
  const [piecePhotoTaken, setPiecePhotoTaken] = useState<boolean>(false);
  const [buttonImage, setButtonImage] = useState<any>(puzzle);

  // Display camera
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: { min: 120, ideal: 100, max: 1920 },
          height: { min: 120, ideal: 100, max: 1080 },
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

  const takePhoto = (e: any) => {
    if (!puzzlePhotoTaken) {
      let photo = fullPuzzlePhotoRef.current;
      let ctx = photo.getContext("2d");
      console.log(photo);

      ctx.drawImage(
        fullPuzzleVideoRef.current,
        0,
        0,
        photo.width,
        photo.height
      );
      let dataUrl = photo.toDataURL();
      let image = new Image();
      image.src = dataUrl;

      setPuzzlePhotoTaken(true);
      setButtonImage(piece);
    } else {
      let photo = piecePhotoRef.current;
      let ctx = photo.getContext("2d");
      console.log(photo);

      ctx.drawImage(pieceVideoRef.current, 0, 0, photo.width, photo.height);
      let dataUrl = photo.toDataURL();
      let image = new Image();
      image.src = dataUrl;
      setPiecePhotoTaken(true);
    }
  };

  const revertBack = () => {
    setPuzzlePhotoTaken(false);
    setButtonImage(puzzle);
    getVideo();
  };

  return (
    <>
      <canvas
        id="piecePhoto"
        className={piecePhotoTaken ? "" : "hide"}
        ref={piecePhotoRef}
      ></canvas>

      <video
        id="puzzlePieceVideo"
        className={puzzlePhotoTaken ? "" : "hide"}
        ref={pieceVideoRef}
      ></video>
      <canvas
        id="fullPuzzlePhoto"
        className={puzzlePhotoTaken ? "" : "hide"}
        ref={fullPuzzlePhotoRef}
      ></canvas>
      <video
        id="fullPuzzleVideo"
        className={puzzlePhotoTaken ? "hide" : ""}
        ref={fullPuzzleVideoRef}
      ></video>

      <div id="spacePlacer"></div>

      <button id="fullPuzzleButton" onClick={takePhoto}>
        <input id="buttonImage" type="image" src={buttonImage} />
      </button>

      <button
        id="fullPuzzleButton"
        className={puzzlePhotoTaken ? "" : "hide"}
        onClick={revertBack}
      >
        <input id="buttonImage" type="image" src={back} />
      </button>
    </>
  );
}

export default App;
