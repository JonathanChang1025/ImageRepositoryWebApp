import React, {useState} from "react";

const UploadPage = () => {

    const [title, setTitle] = useState("");

    function onTitleChange(event) {
        const {value} = event.target;
        setTitle(value);
    }

    return (
        <div>
            <h1>Test</h1>
            <div>
                <label>
                    Title:
                </label>

                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={title}
                    onChange={onTitleChange}
                />
            </div>
        </div>
    )
};

export default UploadPage;