import axios from 'axios';
import React, { useState } from 'react'

const Upload = (props) => {
    const user=props.user;
    const [file,setFile] =useState(null);
    const handleFile=(e)=>{
        setFile(e.target.files[0]);
    }    
    const handleUpload=()=>{
        try{
            const formData=new FormData();
            formData.append('file',file);
            formData.append('user',user.email);
            axios.post('http://localhost:5000/media/upload',formData,{
                headers:{
                    'Content-Type':'multipart/form-data',
                },
            }).then((res)=>{
                console.log('Upload successful:',res);
            }).catch((err)=>{
                console.log('Upload failed:',err);
            })
        }catch(err){
            console.error(err);
        }
    };
  return (
    <div>
        <h2>Upload your files here</h2>
        <input type='file' onChange={handleFile}/>
        <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default Upload