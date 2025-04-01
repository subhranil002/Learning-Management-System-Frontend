import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ hlsUrl, mp4Url, handleEnded, config, ...props }) => {
    const [videoUrl, setVideoUrl] = useState(null);
    const playerRef = useRef(null);

    useEffect(() => {
        const video = document.createElement("video");

        if (hlsUrl && video.canPlayType("application/vnd.apple.mpegurl")) {
            setVideoUrl(hlsUrl.trim());
        } else if (Hls.isSupported() && hlsUrl) {
            const hls = new Hls();
            hls.loadSource(hlsUrl);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                setVideoUrl(hlsUrl.trim());
            });

            return () => {
                hls.destroy();
            };
        } else if (mp4Url) {
            setVideoUrl(mp4Url.trim());
        }
    }, [hlsUrl, mp4Url]);

    if (videoUrl) {
        return (
            <ReactPlayer
                ref={playerRef}
                url={videoUrl}
                onEnded={handleEnded}
                config={config}
                {...props}
            />
        );
    }
};

export default VideoPlayer;
