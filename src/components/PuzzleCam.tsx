import React from 'react';
import "../styling/PuzzleCam.css";
import { useState, useEffect, useRef } from "react";

function PuzzleCam(){
    const videoRef = useRef<any>(null)

    // Display camera
    const getVideo = () =>{
        navigator.mediaDevices
        .getUserMedia({video: {
            width: { min: 120, ideal: 360, max: 1920 },
            height: { min: 120, ideal: 360, max: 1080 },
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
            <p> Align the puzzle reference photo inside the box </p>
            
            <div id="vid-cam" >
                <video id="camera" ref={videoRef}></video>
            </div>

            <button className="submit"> Submit </button>
           
        </div>
    )
}


export default PuzzleCam;