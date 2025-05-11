import React from "react";
import getVideoId from "get-video-id";
import Iframe from "react-iframe";

const VideoPreview = ({ value }) => {
  if (!value?.url) {
    return <p className="p-4">Add a URL to preview the video</p>;
  }

  let embedUrl = value.url;
  
  if (value.videoType === "youtube") {
    const { id } = getVideoId(value.url);
    embedUrl = `https://www.youtube-nocookie.com/embed/${id}`;
  } else if (value.videoType === "vimeo") {
    const { id } = getVideoId(value.url);
    embedUrl = `https://player.vimeo.com/video/${id}`;
  }

  return (
    <div className="relative w-full">
      <div className="relative aspect-video w-full overflow-hidden rounded-md">
        <Iframe
          url={embedUrl}
          width="100%"
          height="100%"
          className="absolute inset-0"
          display="block"
          position="relative"
          frameBorder="0"
          allowFullScreen
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
      {value.caption && (
        <p className="mt-2 text-sm text-gray-500 italic">
          {value.caption}
        </p>
      )}
    </div>
  );
};

export default VideoPreview;