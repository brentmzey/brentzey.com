import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const LASTFM_API_KEY = import.meta.env.LASTFM_API_KEY;
  const LASTFM_USERNAME = import.meta.env.LASTFM_USERNAME;

  if (!LASTFM_API_KEY || !LASTFM_USERNAME) {
    return new Response(JSON.stringify({ tracks: [], message: 'Missing API Keys' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=10`
    );
    const data = await response.json();
    const tracks = data.recenttracks.track.map((track: any) => ({
      title: track.name,
      artist: track.artist['#text'],
      album: track.album['#text'],
      image: track.image[3]['#text'],
      url: track.url,
      nowPlaying: track['@attr']?.nowplaying === 'true',
    }));

    return new Response(JSON.stringify({ tracks }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ tracks: [], error: 'Failed to fetch' }), { status: 500 });
  }
};
