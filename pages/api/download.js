import ytdl from "ytdl-core";

export default async function handler(req, res) {
  const videoLink = req.body.videoLink;
  if (!videoLink) res.json("No videolink was provided");
  try {
    const info = await ytdl.getInfo(videoLink);
    const downloadFormats = ytdl.filterFormats(info.formats, "videoandaudio");
    const finalFormats = ytdl.chooseFormat(downloadFormats, {
      quality: "highest",
    });

    const video = {
      url: finalFormats.url,
      audio: finalFormats.hasAudio,
      video: finalFormats.hasVideo,
    };

    res.json(video);
  } catch (err) {
    console.log(err);
  }
}
