import React, {useState} from "react";
import { firebase } from "./service/firebase";
import { firestore } from "./service/firebase";
import "firebase/compat/auth";

const MyImagesPage = () => {

    const [uid, setUid] = useState(null);
    const [docs, setDocs] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            setUid(user.uid);
        } else {
            setUid(null);
        }
    });

    firestore.collection("images")
    .orderBy('createdAt','desc')
    .onSnapshot((snap) => {
        const documents = [];
        snap.forEach(doc => {
            if (uid === "") {
                documents.push({...doc.data(), id: doc.id})
            } else if (doc.data().uid === uid) {
                documents.push({...doc.data(), id: doc.id})
            }
        });
        setDocs(documents);
    });

    const handleBackdropClick = (e) => {
        if (e.target.classList.contains("backdrop")) {
            setSelectedImage(null);
        }
    }

    return (
        <div>
            
            <div className="img-grid">
                { docs && docs.map(doc => (
                    <div className="img-wrap" key={doc.id}
                        onClick={() => setSelectedImage(doc.url)}>
                        <img src={doc.url} alt="uploaded image"/>
                        <h4><span className="txt-wrap"><span className="privacy-wrap">{doc.privacyValue==1?"Private\t":"Public\t"}</span><span className="title-wrap">{doc.titleValue}</span></span></h4>
                    </div>
                ))}
            </div>

            {
            selectedImage
            &&
            <div className="backdrop" onClick={handleBackdropClick}>
                <img src={selectedImage} alt="enlarged image"/> 
            </div>
            }

        </div>
    );
}

export default MyImagesPage;