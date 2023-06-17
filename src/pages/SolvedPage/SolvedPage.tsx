import React from 'react';

interface SolvedPageProps {
    backgroundImage: string,
    puzzlePieceImage: string
}

function SolvedPage({backgroundImage, puzzlePieceImage}: SolvedPageProps){
    return (
        <div>
            <img />
            {/* TODO: This image element above will serve as background image */}
            <img />
            {/* TODO: This above image will be puzzle piece */}
            <button>Scan piece</button>
        </div>
    )
}


export default SolvedPage;