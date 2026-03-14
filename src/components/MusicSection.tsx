import React, { useState, useEffect } from 'react';
import { Music, Radio, ListMusic, Play, ExternalLink, Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MusicStatus from './MusicStatus';

interface Track {
  title: string;
  artist: string;
  album: string;
  image: string;
  url: string;
  nowPlaying?: boolean;
}

export default function MusicSection() {
  const [view, setView] = useState<'live' | 'library'>('library');
  const [service, setService] = useState<'apple' | 'spotify'>('apple');
  const [library, setLibrary] = useState<Track[]>([]);
  const [loadingLibrary, setLoadingLibrary] = useState(false);

  const applePlaylist = "https://embed.music.apple.com/us/playlist/heavy-rotation/pl.u-38oWWXvFY56E1k";
  const spotifyPlaylist = "https://open.spotify.com/embed/playlist/7uUkcVP0SpSzyt9UUS9AJT?utm_source=generator&theme=0";

  useEffect(() => {
    if (view === 'library') {
      setLoadingLibrary(true);
      fetch('/api/library')
        .then(res => res.json())
        .then(data => {
          setLibrary(data.tracks || []);
        })
        .catch(err => console.error('Failed to fetch library', err))
        .finally(() => setLoadingLibrary(false));
    }
  }, [view]);

  return (
    <div className="space-y-12">
      {/* View Toggle (Live vs Library) */}
      <div className="flex justify-center md:justify-start">
        <div className="inline-flex p-1.5 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-xl shadow-2xl">
          <button 
            onClick={() => setView('library')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${view === 'library' ? 'bg-gradient-to-r from-synth-purple to-synth-pink text-white shadow-lg shadow-synth-purple/30' : 'text-white/40 hover:text-white/70'}`}
          >
            <ListMusic className="w-4 h-4" />
            Library
          </button>
          <button 
            onClick={() => setView('live')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${view === 'live' ? 'bg-synth-cyan text-white shadow-lg shadow-synth-cyan/30' : 'text-white/40 hover:text-white/70'}`}
          >
            <Radio className="w-4 h-4" />
            Live
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Info and Controls */}
        <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
          <AnimatePresence mode="wait">
            {view === 'library' ? (
              <motion.div 
                key="library-view"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none italic text-transparent bg-clip-text bg-gradient-to-r from-synth-purple to-synth-pink">Sonic Archive</h2>
                  <p className="text-[var(--text-secondary)] text-lg leading-relaxed font-light">
                    My musical DNA. A curated collection of rotations that define my workflow and creative process.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mb-2">Recent Rotation</h3>
                  <div className="grid gap-3">
                    {loadingLibrary ? (
                      [...Array(5)].map((_, i) => (
                        <div key={i} className="h-16 bg-white/5 rounded-xl animate-pulse" />
                      ))
                    ) : (
                      library.slice(0, 6).map((track, i) => (
                        <motion.a
                          key={i}
                          href={track.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-synth-purple/30 transition-all group/track"
                        >
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                            <img src={track.image} alt={track.album} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/track:opacity-100 transition-opacity">
                              <Play className="w-4 h-4 text-white fill-current" />
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-bold text-white truncate group-hover/track:text-synth-purple transition-colors">{track.title}</h4>
                            <p className="text-xs text-white/40 truncate italic">{track.artist}</p>
                          </div>
                          {track.nowPlaying && (
                            <div className="flex gap-0.5 items-end h-2 px-2">
                              <motion.div animate={{ height: [4, 8, 5, 8] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-0.5 bg-synth-cyan" />
                              <motion.div animate={{ height: [6, 4, 8, 6] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-0.5 bg-synth-pink" />
                              <motion.div animate={{ height: [8, 5, 4, 8] }} transition={{ repeat: Infinity, duration: 0.9 }} className="w-0.5 bg-synth-purple" />
                            </div>
                          )}
                        </motion.a>
                      ))
                    )}
                  </div>
                </div>

                {/* Service Toggle */}
                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={() => setService('apple')}
                    className={`flex-1 flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl border transition-all font-bold text-[10px] uppercase tracking-widest ${service === 'apple' ? 'border-[#FC3C44] bg-[#FC3C44]/20 text-white shadow-[0_4px_20px_rgba(252,60,68,0.25)]' : 'border-white/5 text-white/40 hover:text-white hover:border-white/20'}`}
                  >
                    Apple Music
                  </button>
                  <button 
                    onClick={() => setService('spotify')}
                    className={`flex-1 flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl border transition-all font-bold text-[10px] uppercase tracking-widest ${service === 'spotify' ? 'border-[#1ED760] bg-[#1ED760]/20 text-white shadow-[0_4px_20px_rgba(30,215,96,0.25)]' : 'border-white/5 text-white/40 hover:text-white hover:border-white/20'}`}
                  >
                    Spotify
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="live-view"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none italic text-transparent bg-clip-text bg-gradient-to-r from-synth-cyan to-synth-periwinkle">Now Spinning</h2>
                  <p className="text-[var(--text-secondary)] text-lg leading-relaxed font-light">
                    A live broadcast of my current auditory landscape. Real-time synchronization with my mobile and desktop sessions.
                  </p>
                </div>
                
                <MusicStatus />

                <div className="p-6 rounded-2xl bg-synth-cyan/5 border border-synth-cyan/20 space-y-4">
                  <div className="flex items-center gap-3 text-synth-cyan">
                    <Headphones className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Hardware Stack</span>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed italic">
                    Currently pushing signals through a balanced DAC/Amp setup to a pair of Sennheiser HD 600s or Sony WH-1000XM5s depending on the environment.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Player Interface */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <motion.div 
            layout
            className="relative rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10 bg-black/60 backdrop-blur-2xl group"
          >
            {/* Player Glow Effect */}
            <div className={`absolute -inset-4 blur-[80px] opacity-20 transition-colors duration-1000 -z-10 ${view === 'library' ? 'bg-synth-purple' : 'bg-synth-cyan'}`}></div>

            <AnimatePresence mode="wait">
              {view === 'library' ? (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                >
                  <iframe 
                    allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" 
                    frameBorder="0" 
                    height="500" 
                    style={{ width: '100%', maxWidth: '100%', overflow: 'hidden', background: 'transparent' }} 
                    sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
                    src={service === 'apple' ? applePlaylist : spotifyPlaylist}
                  ></iframe>
                </motion.div>
              ) : (
                <motion.div
                  key="live-visualizer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-[500px] flex flex-col items-center justify-center p-12 text-center space-y-10 relative overflow-hidden"
                >
                  {/* Decorative Visualizer Elements */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <div className="w-[150%] h-[150%] border-[40px] border-synth-cyan/30 rounded-full animate-[spin_20s_linear_infinite]"></div>
                    <div className="absolute w-[120%] h-[120%] border-[20px] border-synth-cyan/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 bg-synth-cyan/40 blur-[100px] rounded-full animate-pulse"></div>
                    <div className="relative z-10 p-10 rounded-full bg-black/40 border border-synth-cyan/20 backdrop-blur-3xl shadow-2xl shadow-synth-cyan/20">
                      <Radio className="w-32 h-32 text-synth-cyan animate-pulse" />
                    </div>
                  </div>
                  
                  <div className="space-y-4 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-synth-cyan/10 text-synth-cyan text-[10px] font-black uppercase tracking-widest border border-synth-cyan/20">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-synth-cyan animate-ping"></span>
                      Direct Link Active
                    </div>
                    <h4 className="text-white font-black uppercase tracking-widest text-2xl italic">System Synchronized</h4>
                    <p className="text-white/40 text-sm font-medium leading-relaxed max-w-xs mx-auto italic">
                      The bridge is actively monitoring for new signals across all connected devices.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
