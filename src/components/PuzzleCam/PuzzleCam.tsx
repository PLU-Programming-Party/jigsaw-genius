import React from 'react';
import "./PuzzleCam.css";
import { useEffect, useRef } from "react";


interface PuzzleCamProps {
    cameraHeight: number,
    cameraWidth: number,
    buttonText: string,
    buttonHandler: Function,
    title: string,
    backgroundImage?: any
}

function PuzzleCam({cameraHeight, cameraWidth, buttonText, buttonHandler, title}: PuzzleCamProps){
    const photoRef = useRef<any>(null);
    const videoRef = useRef<any>(null);

    // Display camera
    const getVideo = () =>{
        navigator.mediaDevices
        .getUserMedia({video: {
            width: { min: 120, ideal: cameraWidth, max: 1920 },
            height: { min: 120, ideal: cameraHeight, max: 1080 },
            facingMode: 'environment'
          }
        })
        .then(stream =>{
            let video = videoRef.current;
            if (video != null){
                video.srcObject = stream;
                let videoPromise = video.play();
                if (videoPromise !== undefined) {
                    videoPromise.then((_:any) => {
                        console.log("Safely playing video");
                    })
                    .catch((error: any) => {
                      console.log("Succesfully catch video error");
                    });
                  }
            } else{
                console.log("video is null")
            }
        })
        .catch(err =>{
            console.error(err);
        })
    }

    useEffect(() => {
        getVideo();
    }, [videoRef])

    const takePhoto = () => {
        let photo = photoRef.current;
        let ctx = photo.getContext('2d');

        ctx.drawImage(videoRef.current, 0, 0, photo.width, photo.height);
        let dataUrl = photo.toDataURL();
        let image = new Image();
        image.src = dataUrl;
    }

    return (
        <div>
            <p> {title} </p>
            
            <div id="vid-cam" >
                <video id="camera" ref={videoRef}></video>
            </div>

            <div>
                <canvas ref={photoRef} width="360" height="360"></canvas>
            </div>
            
            <button className="submit" onClick={takePhoto}> {buttonText} </button>
           
        </div>
    )
}


export default PuzzleCam;