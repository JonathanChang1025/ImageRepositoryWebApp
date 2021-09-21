import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { storage, firestore, timestamp } from "./service/firebase";
import { Button, Card, Form, ButtonGroup, ToggleButton, ProgressBar } from "react-bootstrap";
import { firebase } from "./service/firebase";
import "firebase/compat/auth";

const UploadImagePage = () => {

    const types = ["image/png", "image/jpeg"];

    const [uid, setUid] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [titleValue, setTitleValue] = useState("")
    const [privacyValue, setPrivacyValue] = useState("0");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [progress, setProgress] = useState(0);

    const radios = [
        { name: "Public", value: "0" },
        { name: "Private", value: "1" },
      ];

      firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
              setUid(user.uid);
              setDisplayName(user.displayName);
          } else {
              setUid("");
              setDisplayName("");
          }
      });

    const handleFile = (e) => {
        const imageFile = e.target.files[0];
        if (imageFile && types.includes(imageFile.type)) {
            setImage(imageFile);
            setPreview(URL.createObjectURL(imageFile));
            setProgress(0);
        } else {
            setImage(null);
        }
    };

    const collectionRef = firestore.collection("images");
    const handleUpload = (e) => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                setProgress(Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100));
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url);
                        const createdAt = timestamp();
                        collectionRef.add({
                            uid,
                            titleValue,
                            displayName,
                            privacyValue,
                            url,
                            createdAt
                        });
                    });
            }
        );
    }

    return (
        <div style={{display: "flex", justifyContent:"center"}}>
            <Card style={{ width: "500px", padding: "10px 50px 10px 50px"}}>
                <Card.Body>
                    <h2 className="text-center mb-4">Image Upload</h2>
                    <Form>
                        <Form.Group id="photoTitle">
                            <Form.Control
                                type="text"
                                placeholder="Title"
                                value={ titleValue }
                                onChange={ (e) => {setTitleValue(e.currentTarget.value)}}
                                />
                        </Form.Group>

                        <Form.Group className="mb-3" style={{ marginTop: "30px" }}>
                            <Form.Control type="file" onChange={handleFile}/>
                        </Form.Group>
                        
                        <ButtonGroup className="mb-2" style={{display: "flex", marginTop: "30px"}}>
                            {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant="outline-danger"
                                name="radio"
                                value={radio.value}
                                checked={privacyValue === radio.value}
                                onChange={(e) => {setPrivacyValue(e.currentTarget.value)}}
                            >
                                {radio.name}
                            </ToggleButton>
                            ))}
                        </ButtonGroup>
                        <div style={{display: "flex", justifyContent: "right", marginTop: "30px"}}>
                            <Button variant="primary" onClick={handleUpload}>Upload</Button>
                        </div>
                        <div style={{marginTop: "30px"}}>
                            <ProgressBar animated now={progress} label={progress==100?"Success":`${progress}%`}/>
                        </div>
                        {
                        preview
                        ?
                        <img src={preview} alt="preview image" style={{width: "100%", height: "100%", marginTop: "30px", borderRadius: "8px"}}/>
                        :
                        <></>
                        }
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default UploadImagePage;