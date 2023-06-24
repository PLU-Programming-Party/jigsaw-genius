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
          // width: { min: 120, ideal: 100, max: 1920 },
          // height: { min: 120, ideal: 100, max: 1080 },
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
      setPiecePhotoTaken(true);
    }
  };

  const revertBack = () => {
    if (piecePhotoTaken) {
      setPiecePhotoTaken(false);
      setButtonImage(piece);
    } else if (puzzlePhotoTaken) {
      setPuzzlePhotoTaken(false);
      setButtonImage(puzzle);
    }

    getVideo();
  };

  function videoClass() {
    if (puzzlePhotoTaken && !piecePhotoTaken) {
      return "show";
    } else if (puzzlePhotoTaken && piecePhotoTaken) {
      return "hide";
    } else {
      return "";
    }
  }

  function photoTakenClass() {
    if (puzzlePhotoTaken && piecePhotoTaken) {
      return "hide";
    } else {
      return "";
    }
  }

  return (
    <>
      <canvas
        id="piecePhoto"
        className={piecePhotoTaken && puzzlePhotoTaken ? "" : "hide"}
        ref={piecePhotoRef}
      ></canvas>

      <canvas
        id="fullPuzzlePhoto"
        className={puzzlePhotoTaken ? "" : "hide"}
        ref={fullPuzzlePhotoRef}
      ></canvas>
      <video
        id="fullPuzzleVideo"
        className={videoClass()}
        ref={fullPuzzleVideoRef}
      ></video>

      <div id="spacePlacer"></div>

      <button
        id="fullPuzzleButton"
        onClick={takePhoto}
        className={photoTakenClass()}
      >
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
