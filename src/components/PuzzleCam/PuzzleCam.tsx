import React from 'react';
import "./PuzzleCam.css";
import { useEffect, useRef } from "react";


interface PuzzleCamProps {
    cameraHeight: number,
    cameraWidth: number,
    buttonText: string,
    buttonHandler: Function,
    title: string
}

function PuzzleCam({cameraHeight, cameraWidth, buttonText, buttonHandler, title}: PuzzleCamProps){
    const videoRef = useRef<any>(null)

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

    return (
        <div>
            <p> {title} </p>
            
            <div id="vid-cam" >
                <video id="camera" ref={videoRef}></video>
            </div>

            <button className="submit"> {buttonText} </button>
           
        </div>
    )
}


export default PuzzleCam;