import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Share2, Music } from 'lucide-react';
import { motion } from 'framer-motion';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  image: string;
  duration: number;
  url: string;
  previewUrl: string;
  nowPlaying?: boolean;
}

export default function AppleMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playlistTracks, setPlaylistTracks] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    fetchLibrary();
    // Poll every 30 seconds to keep synced with Last.fm
    const interval = setInterval(() => fetchLibrary(true), 30000);
    return () => clearInterval(interval);
  }, []);

  // Update audio element whenever current track or play state changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        // Only attempt to play if there's a source
        if (audioRef.current.src) {
          audioRef.current.play().catch(e => {
            console.error('Audio play failed:', e);
            setIsPlaying(false);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const fetchLibrary = async (isPoll = false) => {
    try {
      if (!isPoll) setLoading(true);
      const response = await fetch('/api/library');
      const data = await response.json();
      if (data.tracks && data.tracks.length > 0) {
        const tracks = data.tracks.map((track: any, index: number) => ({
          id: `${track.artist}-${track.title}-${index}`,
          title: track.title,
          artist: track.artist,
          album: track.album,
          image: track.image,
          duration: 30, // Default for preview
          url: track.url,
          previewUrl: track.previewUrl,
          nowPlaying: track.nowPlaying
        }));
        
        setPlaylistTracks(tracks);

        const firstTrack = tracks[0];
        const isNewTrack = !currentTrack || firstTrack.title !== currentTrack.title || firstTrack.artist !== currentTrack.artist;
        
        // Initial load: Set current track
        if (!isPoll) {
          setCurrentTrack(firstTrack);
          setCurrentTrackIndex(0);
          setProgress(0);
          // Don't auto-play on initial load to avoid browser restrictions
        } 
        // Polling: Update if a new track is scrobbling
        else if (isNewTrack && firstTrack.nowPlaying) {
          setCurrentTrack(firstTrack);
          setCurrentTrackIndex(0);
          setProgress(0);
          // If we were playing, keep playing the new track
          if (isPlaying) {
             // Let the useEffect handle it
          }
        } else if (!isNewTrack && currentTrack) {
          // Just update the "Live" status if it's the same track
          setCurrentTrack(prev => prev ? { ...prev, nowPlaying: firstTrack.nowPlaying } : firstTrack);
        }
      }
    } catch (error) {
      console.error('Failed to fetch library:', error);
    } finally {
      if (!isPoll) setLoading(false);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      if (total) {
        setProgress((current / total) * 100);
      }
    }
  };

  const handleEnded = () => {
    if (!currentTrack?.nowPlaying) {
      playNext();
    } else {
      // If live, just loop it or stay at end
      setIsPlaying(false);
      setProgress(100);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (currentTrackIndex < playlistTracks.length - 1) {
      const nextIndex = currentTrackIndex + 1;
      setCurrentTrackIndex(nextIndex);
      setCurrentTrack(playlistTracks[nextIndex]);
      setProgress(0);
    }
  };

  const playPrevious = () => {
    if (currentTrackIndex > 0) {
      const prevIndex = currentTrackIndex - 1;
      setCurrentTrackIndex(prevIndex);
      setCurrentTrack(playlistTracks[prevIndex]);
      setProgress(0);
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-2xl p-8 flex items-center justify-center border border-white/10">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/10 animate-pulse" />
          <p className="text-white/60 text-sm">Loading your library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl hover:border-white/20 transition-colors">
      {/* Album Art */}
      <div className="relative aspect-square bg-black overflow-hidden group">
        <audio 
          ref={audioRef}
          src={currentTrack?.previewUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />
        {currentTrack?.image ? (
          <>
            <img 
              src={currentTrack.image} 
              alt={currentTrack.album}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            {currentTrack?.nowPlaying && (
              <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FC3C44] text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-2xl border border-white/20">
                <span className="flex h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                Live Now
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-synth-purple to-synth-pink flex items-center justify-center">
            <Music className="w-24 h-24 text-white/50" />
          </div>
        )}

        {/* Play/Pause Overlay */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlayPause}
          className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors group"
        >
          <div className="p-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-white/20 transition-all">
            {isPlaying ? (
              <Pause className="w-12 h-12 text-white fill-current" />
            ) : (
              <Play className="w-12 h-12 text-white fill-current ml-1" />
            )}
          </div>
        </motion.button>
      </div>

      {/* Track Info */}
      <div className="p-6 space-y-4">
        <div className="space-y-1.5">
          <div className="flex justify-between items-start gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-white truncate">
                {currentTrack?.title || 'No track'}
              </h3>
              <p className="text-sm text-white/60 truncate">
                {currentTrack?.artist || 'Unknown Artist'}
              </p>
            </div>
            {!currentTrack?.previewUrl && !loading && (
              <span className="text-[10px] bg-white/10 text-white/40 px-2 py-1 rounded uppercase tracking-tighter shrink-0">
                No Preview
              </span>
            )}
          </div>
          <p className="text-xs text-white/40 truncate italic">
            {currentTrack?.album || 'Unknown Album'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 pt-2">
          <div 
            className="w-full h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer group hover:h-1.5 transition-all"
            onClick={(e) => {
              if (audioRef.current && audioRef.current.duration) {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const pct = x / rect.width;
                audioRef.current.currentTime = pct * audioRef.current.duration;
              }
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-synth-purple to-synth-pink transition-all duration-100"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/40 font-mono">
            <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
            <span>{formatTime(audioRef.current?.duration || 0)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between pt-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setLiked(!liked)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Heart 
              className="w-5 h-5 transition-colors"
              fill={liked ? 'currentColor' : 'none'}
              stroke={liked ? '#FC3C44' : 'currentColor'}
              color={liked ? '#FC3C44' : 'white'}
            />
          </motion.button>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={playPrevious}
              disabled={currentTrackIndex === 0}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <SkipBack className="w-5 h-5 text-white" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlayPause}
              className="p-3 bg-gradient-to-r from-synth-purple to-synth-pink rounded-full hover:shadow-lg hover:shadow-synth-purple/30 transition-all"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white fill-current" />
              ) : (
                <Play className="w-5 h-5 text-white fill-current ml-0.5" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={playNext}
              disabled={currentTrackIndex === playlistTracks.length - 1}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <SkipForward className="w-5 h-5 text-white" />
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => currentTrack && window.open(currentTrack.url, '_blank')}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Share2 className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          <Volume2 className="w-4 h-4 text-white/60 shrink-0" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-synth-purple"
            style={{
              background: `linear-gradient(to right, rgba(147, 51, 234, 0.5) 0%, rgba(147, 51, 234, 0.5) ${volume}%, rgba(255, 255, 255, 0.1) ${volume}%, rgba(255, 255, 255, 0.1) 100%)`
            }}
          />
          <span className="text-xs text-white/60 w-8 text-right font-mono">{volume}%</span>
        </div>

        {/* Now Playing in Apple Music Link */}
        <a
          href={currentTrack?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full mt-4 py-3 px-4 bg-[#FC3C44] hover:bg-[#FF453A] text-white font-bold rounded-lg transition-colors text-center text-sm uppercase tracking-wide shadow-lg shadow-[#FC3C44]/30 hover:shadow-[#FC3C44]/50"
        >
          Open in Apple Music
        </a>
      </div>

      {/* Playlist Queue */}
      {playlistTracks.length > 1 && (
        <div className="border-t border-white/5 max-h-64 overflow-y-auto bg-black/20 backdrop-blur-sm">
          <div className="p-4 space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Queue</p>
            {playlistTracks.slice(0, 10).map((track, index) => (
              <motion.button
                key={track.id}
                onClick={() => {
                  setCurrentTrackIndex(index);
                  setCurrentTrack(track);
                  setProgress(0);
                  setIsPlaying(true);
                }}
                whileHover={{ x: 4 }}
                className={`w-full text-left p-3 rounded-lg transition-all group ${
                  index === currentTrackIndex
                    ? 'bg-synth-purple/20 border border-synth-purple/30'
                    : 'hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xs text-white/40 w-4 pt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white truncate group-hover:text-synth-purple transition-colors">
                      {track.title}
                    </p>
                    <p className="text-xs text-white/50 truncate">
                      {track.artist}
                    </p>
                  </div>
                  {index === currentTrackIndex && isPlaying && (
                    <div className="flex gap-0.5 items-end h-2.5 flex-shrink-0">
                      <motion.div animate={{ height: [4, 8, 5, 8] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-0.5 bg-synth-cyan" />
                      <motion.div animate={{ height: [6, 4, 8, 6] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-0.5 bg-synth-pink" />
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
