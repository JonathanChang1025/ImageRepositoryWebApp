import React, { useState } from "react";
import { storage, firestore, timestamp } from "./service/firebase";
import { Button, Card, Form, ButtonGroup, ToggleButton, ProgressBar } from "react-bootstrap";

const UploadImagePage = () => {

    const types = ["image/png", "image/jpeg"];

    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('0');
    const radios = [
        { name: 'Public', value: '0' },
        { name: 'Private', value: '1' },
      ];

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

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

    const [progress, setProgress] = useState(0);
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
                            <Form.Control type="text" placeholder="Title"/>
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
                                checked={radioValue === radio.value}
                                onChange={(e) => {setRadioValue(e.currentTarget.value)}}
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
                        {preview
                        ?<img src={preview} alt="preview image" style={{width: "100%", height: "100%", marginTop: "30px", borderRadius: "8px"}}/>
                        :<></>
                        }
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default UploadImagePage;