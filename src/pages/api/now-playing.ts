import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  // These will be set in your Netlify Environment Variables
  const LASTFM_API_KEY = import.meta.env.LASTFM_API_KEY;
  const LASTFM_USERNAME = import.meta.env.LASTFM_USERNAME;

  if (!LASTFM_API_KEY || !LASTFM_USERNAME) {
    return new Response(JSON.stringify({ playing: false, message: 'Missing API Keys' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`
    );
    const data = await response.json();
    const track = data.recenttracks.track[0];

    if (!track) {
       return new Response(JSON.stringify({ playing: false }), { status: 200 });
    }

    const isPlaying = track['@attr']?.nowplaying === 'true';

    return new Response(JSON.stringify({
      playing: isPlaying,
      title: track.name,
      artist: track.artist['#text'],
      album: track.album['#text'],
      image: track.image[3]['#text'],
      url: track.url,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60' // Cache for 1 minute
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ playing: false, error: 'Failed to fetch' }), { status: 500 });
  }
};
