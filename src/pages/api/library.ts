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
    const trackList = Array.isArray(data.recenttracks.track) ? data.recenttracks.track : [data.recenttracks.track];
    
    const tracks = await Promise.all(trackList.map(async (track: any) => {
      const title = track.name;
      const artist = track.artist['#text'];
      const album = track.album['#text'];
      
      // Get the best possible image
      const images = track.image || [];
      const image = images[3]?.['#text'] || images[2]?.['#text'] || images[1]?.['#text'] || '';

      // Try to get a preview URL and Apple Music link from iTunes
      let previewUrl = '';
      let appleUrl = track.url; // Fallback to last.fm
      try {
        const itunesRes = await fetch(
          `https://itunes.apple.com/search?term=${encodeURIComponent(`${artist} ${title}`)}&entity=song&limit=1`
        );
        const itunesData = await itunesRes.json();
        if (itunesData.results && itunesData.results.length > 0) {
          previewUrl = itunesData.results[0].previewUrl;
          appleUrl = itunesData.results[0].trackViewUrl;
        }
      } catch (e) {
        console.error('iTunes search failed for', title);
      }

      // Generate a Spotify Search link (best without API key)
      const spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(`${artist} ${title}`)}`;

      return {
        title,
        artist,
        album,
        image,
        url: track.url,
        previewUrl,
        appleUrl,
        spotifyUrl,
        nowPlaying: track['@attr']?.nowplaying === 'true',
      };
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
