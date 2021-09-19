import React, {useState} from "react";
import { Button, Card, Form, ButtonGroup, ToggleButton } from "react-bootstrap";

const UploadImagePage = () => {

    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('0');

    const radios = [
        { name: 'Public', value: '0' },
        { name: 'Private', value: '1' },
      ];

    const [title, setTitle] = useState("");
    function onTitleChange(event) {
        const {value} = event.target;
        setTitle(value);
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

                        <Form.Group controlId="formPhotosMultiple" className="mb-3" style={{ marginTop: "30px" }}>
                            <Form.Control type="file" />
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
                            <Button variant="primary" >Upload</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default UploadImagePage;