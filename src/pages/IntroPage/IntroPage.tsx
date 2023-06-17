import React from 'react';
import puzzlin from "../../assets/puzzlin-intro.jpg"

function IntroPage(){
    return (
        <div>
            <h2>Are you ready to puzzle?</h2>
            <div>
                <img src={puzzlin} width={200} height={200}/>
            </div>
            <button>Begin!</button> 
        </div>
    )
}


export default IntroPage;