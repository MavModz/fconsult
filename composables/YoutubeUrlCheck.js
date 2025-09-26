function isValidYoutubeUrl(url) {
  const youtubeUrlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  return youtubeUrlPattern.test(url);
}
async function videoExists(videoId) {
  const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  try {
    const response = await fetch(url);
    return response.ok;
  } catch (error) {
    
    return false;
  }
}
function getYoutubeVideoId(url) {
  const match = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}
export async function YoutubeUrlCheck(i) {
  if (isValidYoutubeUrl(i)) {
    let videoId = getYoutubeVideoId(i);
    if (videoId && await videoExists(videoId)) {
      return {status:true,url:videoId};
    } else {
      return {status:false,msg:'Youtube Video Not Exists'};
    }
  } else {
    return {status:false,msg:'Invalid Youtube Url'};
  }
}