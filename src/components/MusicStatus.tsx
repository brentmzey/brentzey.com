import React, { useState, useEffect } from 'react';
import { Music, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrackInfo {
  playing: boolean;
  title: string;
  artist: string;
  album: string;
  image: string;
  url: string;
}

export default function MusicStatus() {
  const [track, setTrack] = useState<TrackInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/now-playing');
      const data = await response.json();
      setTrack(data);
    } catch (e) {
      console.error('Failed to fetch music status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    // Poll every 30 seconds for live updates
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="flex items-center gap-4 animate-pulse p-6 bg-black/20 rounded-2xl border border-white/5">
      <div className="w-12 h-12 rounded-lg bg-synth-purple/20" />
      <div className="space-y-2">
        <div className="h-2 w-24 bg-white/10 rounded" />
        <div className="h-3 w-32 bg-white/10 rounded" />
      </div>
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      {track && (
        <motion.div 
          key={track.title + track.artist}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-4 hover:border-synth-purple/30 transition-all group/status"
        >
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 overflow-hidden rounded-lg shadow-lg">
              {track.image ? (
                <img src={track.image} alt={track.album} className="w-full h-full object-cover group-hover/status:scale-110 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full bg-synth-purple/20 flex items-center justify-center">
                   <Music className="w-6 h-6 text-synth-purple" />
                </div>
              )}
              {track.playing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="flex gap-0.5 items-end h-3">
                    <motion.div animate={{ height: [4, 12, 6, 12] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-synth-cyan" />
                    <motion.div animate={{ height: [8, 4, 12, 8] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1 bg-synth-pink" />
                    <motion.div animate={{ height: [12, 6, 8, 12] }} transition={{ repeat: Infinity, duration: 0.9 }} className="w-1 bg-synth-purple" />
                  </div>
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-synth-purple mb-0.5">
                {track.playing ? 'Now Playing // Live' : 'Last Played'}
              </p>
              <h3 className="text-white font-bold tracking-tight truncate group-hover/status:text-synth-cyan transition-colors">
                <a href={track.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  {track.title}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover/status:opacity-100 transition-opacity" />
                </a>
              </h3>
              <p className="text-white/60 text-xs font-medium uppercase tracking-tighter truncate">
                {track.artist} — {track.album}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
