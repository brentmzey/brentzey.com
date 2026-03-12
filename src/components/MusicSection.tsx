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
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all font-bold text-[10px] uppercase tracking-widest ${service === 'apple' ? 'border-[#fa243c] bg-[#fa243c]/10 text-[#fa243c]' : 'border-white/5 text-white/40 hover:text-white'}`}
                  >
                    <svg className="w-3.5 h-3.5 fill-current" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Apple Music</title><path d="M12.635 15.003c0-.127-.003-.255-.008-.382-.05-1.554-.916-2.5-2.522-2.65-.294-.029-.597-.05-.95-.05-.35 0-.655.021-.948.05-1.606.15-2.522 1.096-2.522 2.65 0 1.554.916 2.5 2.522 2.651.293.03.598.05.948.05.353 0 .656-.02.95-.05 1.606-.151 2.522-1.097 2.522-2.651-.044.201-.073.4-.082.603.012-.132.018-.264.018-.396-.001-.09-.001-.182-.007-.275zm4.842-8.31l-3.21 1.455v7.653c0 .126-.002.253-.007.38-.05 1.552-.915 2.497-2.52 2.648-.293.029-.596.05-.948.05-.35 0-.655-.021-.948-.05-1.606-.15-2.522-1.096-2.522-2.648 0-1.554.916-2.5 2.522-2.65.293-.03.598-.051.948-.051.353 0 .657.02.95.05.281.026.518.064.721.115v-7.39l4.015-1.815v2.249z"/></svg>
                    Apple Music
                  </button>
                  <button 
                    onClick={() => setService('spotify')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all font-bold text-[10px] uppercase tracking-widest ${service === 'spotify' ? 'border-[#1DB954] bg-[#1DB954]/10 text-[#1DB954]' : 'border-white/5 text-white/40 hover:text-white'}`}
                  >
                    <svg className="w-3.5 h-3.5 fill-current" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Spotify</title><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.839-.539-.12-.418.18-.779.539-.839 4.5-.961 8.461-.539 11.641 1.5.359.24.48.66.24 1.021zM18.961 14.1c-.3.479-.9.6-1.379.3-3.239-1.979-8.159-2.519-11.939-1.38-.54.18-1.019-.3-1.019-.3.42-.18.54-.779.84-1.319.66-.54.18-.84.779-.66 1.319 4.38-1.32 9.78-.719 13.5 1.559.48.3.6.9.3 1.38zM19.08 10.68c-3.9-2.341-10.32-2.521-14.1-1.441a1.2 1.2 0 1 1-.661-2.34c4.321-1.321 11.401-1.021 15.9 1.681a1.2 1.2 0 0 1-1.14 2.1z"/></svg>
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
