import axios from "axios";

// Replace with your actual YouTube Data API key
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

// Function to search for songs on YouTube
export const searchSongs = async (query) => {
  if (!query) return [];
  
  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
      params: {
        part: "snippet",
        q: query,
        type: "video",
        maxResults: 5,
        key: API_KEY,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching songs from YouTube:", error);
    return [];
  }
};

// Function to get the video URL for a selected song
export const getVideoUrl = (videoId) => {
  return `https://www.youtube.com/watch?v=${videoId}`;
};

export const extractAudioSegment = (videoId, start, end) => {
    // This is a placeholder. You would need to implement actual audio extraction logic.
    console.log(`Extracting audio from ${getVideoUrl(videoId)} from ${start} to ${end} seconds.`);
    return `/audio/${videoId}.mp3`; // Placeholder for the audio URL
  };