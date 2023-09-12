import React, { useEffect, useRef } from "react";

const VideoPlayer = ({ videoId }) => {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("src");
      videoRef.current.load();
    }
  });
  return (
    <video ref={videoRef} width={320} height="240" controls autoPlay>
      <source src={`http://localhost:5000/media/video/${videoId}`}></source>
      Your browser doesn't support video tag
    </video>
  );
};

export default VideoPlayer;
