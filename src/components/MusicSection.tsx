import React, { useState } from 'react';
import { Music, Radio, ListMusic, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MusicStatus from './MusicStatus';

export default function MusicSection() {
  const [view, setView] = useState<'live' | 'library'>('library');
  const [service, setService] = useState<'apple' | 'spotify'>('apple');

  const applePlaylist = "https://embed.music.apple.com/us/playlist/heavy-rotation/pl.u-38oWWXvFY56E1k";
  // Placeholder Spotify Playlist - User can swap this with their actual profile/playlist ID
  const spotifyPlaylist = "https://open.spotify.com/embed/playlist/37i9dQZF1E366m0nE6QeO6?utm_source=generator&theme=0";

  return (
    <div className="space-y-8">
      {/* View Toggle (Live vs Library) */}
      <div className="flex justify-center md:justify-start">
        <div className="inline-flex p-1 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-md">
          <button 
            onClick={() => setView('library')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${view === 'library' ? 'bg-synth-purple text-white shadow-lg shadow-synth-purple/20' : 'text-white/40 hover:text-white/70'}`}
          >
            <ListMusic className="w-4 h-4" />
            My Libraries
          </button>
          <button 
            onClick={() => setView('live')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${view === 'live' ? 'bg-synth-cyan text-white shadow-lg shadow-synth-cyan/20' : 'text-white/40 hover:text-white/70'}`}
          >
            <Radio className="w-4 h-4" />
            Live Status
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        <div className="flex-1 space-y-6">
          <AnimatePresence mode="wait">
            {view === 'library' ? (
              <motion.div 
                key="library-text"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">Sonic Landscapes</h2>
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                  Music is the architecture of my focus. Explore my curated rotations across services. If you're signed in, you can listen directly from these players.
                </p>
                
                {/* Service Toggle */}
                <div className="flex gap-4">
                  <button 
                    onClick={() => setService('apple')}
                    className={`flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl border transition-all font-bold text-[11px] uppercase tracking-widest ${service === 'apple' ? 'border-[#FC3C44] bg-[#FC3C44]/20 text-white shadow-[0_4px_15px_rgba(252,60,68,0.2)]' : 'border-white/5 text-white/40 hover:text-white hover:border-white/20'}`}
                  >
                    <svg className={`w-3.5 h-3.5 transition-transform ${service === 'apple' ? 'fill-white scale-110' : 'fill-current'}`} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Apple Music</title><path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.295-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536a1.88 1.88 0 011.038-2.022c.323-.16.67-.25 1.018-.324.378-.082.758-.153 1.134-.24.274-.063.457-.23.51-.516a.904.904 0 00.02-.193c0-1.815 0-3.63-.002-5.443a.725.725 0 00-.026-.185c-.04-.15-.15-.243-.304-.234-.16.01-.318.035-.475.066-.76.15-1.52.303-2.28.456l-2.325.47-1.374.278c-.016.003-.032.01-.048.013-.277.077-.377.203-.39.49-.002.042 0 .086 0 .13-.002 2.602 0 5.204-.003 7.805 0 .42-.047.836-.215 1.227-.278.64-.77 1.04-1.434 1.233-.35.1-.71.16-1.075.172-.96.036-1.755-.6-1.92-1.544-.14-.812.23-1.685 1.154-2.075.357-.15.73-.232 1.108-.31.287-.06.575-.116.86-.177.383-.083.583-.323.6-.714v-.15c0-2.96 0-5.922.002-8.882 0-.123.013-.25.042-.37.07-.285.273-.448.546-.518.255-.066.515-.112.774-.165.733-.15 1.466-.296 2.2-.444l2.27-.46c.67-.134 1.34-.27 2.01-.403.22-.043.442-.088.663-.106.31-.025.523.17.554.482.008.073.012.148.012.223.002 1.91.002 3.822 0 5.732z"/></svg>
                    Apple Music
                  </button>
                  <button 
                    onClick={() => setService('spotify')}
                    className={`flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl border transition-all font-bold text-[11px] uppercase tracking-widest ${service === 'spotify' ? 'border-[#1ED760] bg-[#1ED760]/20 text-white shadow-[0_4px_15px_rgba(30,215,96,0.2)]' : 'border-white/5 text-white/40 hover:text-white hover:border-white/20'}`}
                  >
                    <svg className={`w-3.5 h-3.5 transition-transform ${service === 'spotify' ? 'fill-white scale-110' : 'fill-current'}`} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Spotify</title><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                    Spotify
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="live-text"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-synth-cyan">Now Spinning</h2>
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                  Real-time broadcast of my current auditory journey. This bridge connects to both my mobile and desktop listening sessions.
                </p>
                <MusicStatus />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-full lg:w-[450px] shrink-0">
          <motion.div 
            layout
            className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-black/40 backdrop-blur-xl group"
          >
            <AnimatePresence mode="wait">
              {view === 'library' ? (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <iframe 
                    allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" 
                    frameBorder="0" 
                    height="450" 
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
                  className="h-[450px] flex flex-col items-center justify-center p-12 text-center space-y-8"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-synth-cyan/20 blur-3xl rounded-full animate-pulse"></div>
                    <Radio className="w-32 h-32 text-synth-cyan relative z-10 animate-bounce" style={{ animationDuration: '3s' }} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-white font-black uppercase tracking-widest text-xl">Live Feed Active</h4>
                    <p className="text-white/40 text-sm font-medium leading-relaxed">
                      The bridge is monitoring for new signals from Apple Music & Spotify.
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
