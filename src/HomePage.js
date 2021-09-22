import React, { useState } from "react";
import useFirestore from "./hooks/useFirestore"

const HomePage = () => {
    const { docs } = useFirestore("images", "");

    const [selectedImage, setSelectedImage] = useState(null);

    const handleBackdropClick = (e) => {
        if (e.target.classList.contains("backdrop")) {
            setSelectedImage(null);
        }
    }

    return (
        <div>
            <div className="img-grid">
                {
                docs && docs.map(doc => (
                    <div className="img-wrap" key={doc.id}
                        onClick={() => setSelectedImage(doc.url)}>
                        <img src={doc.url} alt="uploaded content from users"/>
                        <h4><span className="txt-wrap"><span className="title-wrap">{doc.titleValue}</span> by {doc.displayName}</span></h4>
                    </div>
                ))
                }
            </div>

            {
            selectedImage
            &&
            <div className="backdrop" onClick={handleBackdropClick}>
                <h1> Test </h1>
                <img src={selectedImage} alt="enlarged selected content"/> 
            </div>
            }

        </div>
        
    );
}

export default HomePage;