import axios, { AxiosProgressEvent } from "axios";
import React, { useState } from "react";

const FileUpload = () => {
    const [message, setMessage] = useState("");

    const handleFileChange = async (event: any) => {
        const file = event.target.files[0];

        if (!file) {
            setMessage("No file selected.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        // try {
        //     // Replace with your API endpoint
        //     const response = await fetch("https://ntchinda-giscard-vvims-backend.hf.space/api/v1/upload-file", {
        //         method: "POST",
        //         body: formData,
        //     });
        //
        //     if (response.ok) {
        //         const result = await response.json();
        //         setMessage(`Upload successful: ${result.message}`);
        //     } else {
        //         const error = await response.json();
        //         setMessage(`Upload failed: ${error.message}`);
        //     }
        // } catch (error: any) {
        //     setMessage(`Error: ${error.message}`);
        // }


        try {
            const response = await axios.post("https://ntchinda-giscard-vvims-backend.hf.space/api/v1/upload-file", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    //@ts-ignore
                    const percentCompleted: number = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setMessage(`Upload progress: ${percentCompleted}%`);
                },
            });

            setMessage(`Upload successful: ${response.data.message}`);
        } catch (error: any) {
            setMessage(`Error: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {message && <p>{message}</p>}
        </div>
    );
};

export default FileUpload;
