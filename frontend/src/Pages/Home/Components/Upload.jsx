import axios from 'axios';
import React, { useState } from 'react'

const Upload = (props) => {
    const user=props.user;
    const [file,setFile] =useState(null);
    const [error,setError] = useState(null);
    const handleFile=(e)=>{
        setFile(e.target.files[0]);
    }    
    const handleUpload=()=>{
        try{
            const formData=new FormData();
            formData.append('file',file);
            formData.append('user',user.email);
            axios.post('https://culture-x-server.vercel.app/media/upload',formData,{
                headers:{
                    'Content-Type':'multipart/form-data',
                },
            }).then((res)=>{
                console.log('Upload successful:',res);
                props.fetchData();
            }).catch((err)=>{
                console.log('Upload failed:',err);
                setError(err.response.data.message);
            })
        }catch(err){
            console.log(err);
            setError(err.data.error);
        }
    };
  return (
    <div>
        <h2>Upload your files (image or video-mp4) here</h2>
        {error && <p className='error'>{error}</p>}
        {/* <p className='error'>error:{error}</p> */}
        <input type='file' onChange={handleFile}/>
        <button className="upload-btn" onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default Upload