import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function index() {
  const [videoUrl, setVideoUrl] = useState("");
  const [waiting, setWaiting] = useState(false);
  const router = useRouter();
  const downloadYoutubeVideo = async (e) => {
    e.preventDefault();
    setWaiting(true);
    const response = await axios.post("/api/download", { videoLink: videoUrl });
    const data = response.data;

    setTimeout(() => {
      console.log("5 seconds waited");
      setWaiting(false);
      router.push(data.url);
    }, 5000);
  };
  useEffect(() => {}, []);
  return (
    <main className="h-screen grid place-items-center">
      {waiting ? (
      <div className="flex items-center flex-col">
        <p className="text-white font-semibold md:text-xl">
          "wait a couple seconds, your video is downloading..."
        </p>
        <div className="loadingio-spinner-bean-eater-3jsfz8b9x19">
          <div className="ldio-r58fgnr5zdn">
            <div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      ) : (
      <form onSubmit={downloadYoutubeVideo}>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Paste youtube URL"
        />
        <button type="submit">download</button>
      </form>
      )}
    </main>
  );
}

export default index;
