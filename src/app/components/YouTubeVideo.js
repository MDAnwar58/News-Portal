"use client";
import React from "react";

const YouTubeVideo = ({ url }) => {
  const getYouTubeEmbedUrl = (url) => {
    const videoIdMatch = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/);
    return videoIdMatch
      ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
      : null;
  };

  const embedUrl = getYouTubeEmbedUrl(url);

  if (!embedUrl) return <p>Invalid YouTube URL</p>;

  return (
    <iframe
      className="w-100"
      style={{ height: "70vh" }}
      src={embedUrl}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default YouTubeVideo;
