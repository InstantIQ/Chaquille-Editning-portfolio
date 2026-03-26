/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Twitter, 
  Youtube, 
  ChevronRight,
  Menu,
  X,
  Plus,
  Video,
  ChevronLeft,
  CheckCircle2,
  Upload,
  Wand2,
  RefreshCw
} from 'lucide-react';
import ReactPlayer from 'react-player';
import { cn } from './lib/utils';
import { Logo } from './components/Logo';

// --- Types ---
interface Project {
  id: string;
  title: string;
  type: 'YouTube' | 'MP4';
  url: string;
  thumbnail: string;
  stats?: string;
  category?: string;
}

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-8 py-5",
      isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-slate-200 py-3" : "bg-transparent"
    )}>
      <div className="max-w-[1800px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Play className="w-4 h-4 fill-white text-white" />
            </div>
            <span className="text-lg font-black tracking-tight text-ink">CHAQUILLE.</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#work" className="text-sm font-semibold text-slate-500 hover:text-accent transition-colors">
              Work
            </a>
            <a href="#process" className="text-sm font-semibold text-slate-500 hover:text-accent transition-colors">
              Process
            </a>
            <a href="#hire" className="text-sm font-semibold text-slate-500 hover:text-accent transition-colors">
              Contact
            </a>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="#hire" className="px-6 py-2.5 bg-accent text-white rounded-full text-sm font-bold hover:bg-accent-hover transition-all shadow-md shadow-accent/10">
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
};

const ProjectRow = ({ title, projects, onSelect, variant = 'featured' }: { title: string, projects: Project[], onSelect: (p: Project) => void, variant?: 'featured' | 'minimal' }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const isFeatured = variant === 'featured';

  return (
    <div className={cn("relative group/row", isFeatured ? "mb-32" : "mb-20")}>
      <div className="flex flex-col mb-10 px-8 md:px-16">
        <h3 className={cn(
          "font-black tracking-tight leading-[0.9] text-ink",
          isFeatured ? "text-5xl md:text-7xl" : "text-3xl md:text-5xl"
        )}>
          {title}
        </h3>
      </div>

      <div className="relative group/row-inner">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 text-ink opacity-0 group-hover/row-inner:opacity-100 transition-all flex items-center justify-center hover:bg-accent hover:text-white hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto no-scrollbar px-8 md:px-16 scroll-smooth"
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              whileHover={{ y: -8 }}
              className={cn(
                "flex-none group cursor-pointer",
                isFeatured ? "w-[320px] md:w-[640px]" : "w-[240px] md:w-[400px]"
              )}
              onClick={() => onSelect(project)}
            >
              <div className="relative aspect-video overflow-hidden bg-slate-100 rounded-3xl mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className={cn(
                    "rounded-full bg-white shadow-2xl flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500",
                    isFeatured ? "w-16 h-16" : "w-12 h-12"
                  )}>
                    <Play className={cn("fill-accent text-accent translate-x-0.5", isFeatured ? "w-6 h-6" : "w-4 h-4")} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 text-ink opacity-0 group-hover/row-inner:opacity-100 transition-all flex items-center justify-center hover:bg-accent hover:text-white hover:scale-110"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const Player = ReactPlayer as any;

export default function App() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'm1',
      title: 'Mixed - GDJCdAbrUCk',
      type: 'YouTube',
      url: 'https://www.youtube.com/watch?v=GDJCdAbrUCk',
      thumbnail: 'https://img.youtube.com/vi/GDJCdAbrUCk/maxresdefault.jpg',
      category: 'Mixed Creators'
    },
    {
      id: 'm2',
      title: 'Mixed - N4OEYoT_qW8',
      type: 'YouTube',
      url: 'https://www.youtube.com/watch?v=N4OEYoT_qW8',
      thumbnail: 'https://img.youtube.com/vi/N4OEYoT_qW8/maxresdefault.jpg',
      category: 'Mixed Creators'
    },
    {
      id: 'm3',
      title: 'Mixed - P8vFZ3iu--8',
      type: 'YouTube',
      url: 'https://www.youtube.com/watch?v=P8vFZ3iu--8&t=15s',
      thumbnail: 'https://img.youtube.com/vi/P8vFZ3iu--8/maxresdefault.jpg',
      category: 'Mixed Creators'
    },
    {
      id: 'm4',
      title: 'Mixed - 81cpJbH1__A',
      type: 'YouTube',
      url: 'https://www.youtube.com/shorts/81cpJbH1__A',
      thumbnail: 'https://img.youtube.com/vi/81cpJbH1__A/maxresdefault.jpg',
      category: 'Mixed Creators'
    },
    {
      id: 'j7',
      title: 'Jimarkus - TsPiyAVNzUQ',
      type: 'YouTube',
      url: 'https://www.youtube.com/watch?v=TsPiyAVNzUQ&t=96s',
      thumbnail: 'https://img.youtube.com/vi/TsPiyAVNzUQ/maxresdefault.jpg',
      category: 'Jimarkus Collection'
    },
    {
      id: 'j1',
      title: 'Jimarkus - Epic Gaming Highlights',
      type: 'YouTube',
      url: 'https://www.youtube.com/watch?v=ewi040ljBCQ',
      thumbnail: 'https://img.youtube.com/vi/ewi040ljBCQ/maxresdefault.jpg',
      stats: 'Trending Now',
      category: 'Jimarkus Collection'
    },
    {
      id: 'j2',
      title: 'Jimarkus - Insane Pacing Edit',
      type: 'YouTube',
      url: 'https://www.youtube.com/watch?v=OrcZMoPOowA',
      thumbnail: 'https://img.youtube.com/vi/OrcZMoPOowA/maxresdefault.jpg',
      stats: 'High Retention',
      category: 'Jimarkus Collection'
    },
    {
      id: 'j3',
      title: 'Jimarkus - The Ultimate Comeback',
      type: 'YouTube',
      url: 'https://www.youtube.com/watch?v=NKC-EUgQMA0',
      thumbnail: 'https://img.youtube.com/vi/NKC-EUgQMA0/maxresdefault.jpg',
      stats: 'New Release',
      category: 'Jimarkus Collection'
    },
    {
      id: 'j4',
      title: 'Jimarkus - Pro Level Gameplay',
      type: 'YouTube',
      url: 'https://www.youtube.com/watch?v=lBRVi8ibMeU',
      thumbnail: 'https://img.youtube.com/vi/lBRVi8ibMeU/maxresdefault.jpg',
      stats: 'High Retention',
      category: 'Jimarkus Collection'
    },
    {
      id: 'j5',
      title: 'Jimarkus - Viral Shorts Edit',
      type: 'YouTube',
      url: 'https://www.youtube.com/shorts/G_MPk-QxaL8',
      thumbnail: 'https://img.youtube.com/vi/G_MPk-QxaL8/maxresdefault.jpg',
      stats: 'Viral Potential',
      category: 'Jimarkus Collection'
    },
    {
      id: 's1',
      title: 'SeeMops - Edit 1',
      type: 'YouTube',
      url: 'https://www.youtube.com/watch?v=OPXQ1BIc_hU',
      thumbnail: 'https://img.youtube.com/vi/OPXQ1BIc_hU/maxresdefault.jpg',
      category: 'SeeMops Collection'
    },
    {
      id: 's2',
      title: 'SeeMops - Edit 2',
      type: 'YouTube',
      url: 'https://www.youtube.com/watch?v=PKdatBnAoB0',
      thumbnail: 'https://img.youtube.com/vi/PKdatBnAoB0/maxresdefault.jpg',
      category: 'SeeMops Collection'
    },
    {
      id: 's3',
      title: 'SeeMops - Edit 3',
      type: 'YouTube',
      url: 'https://www.youtube.com/watch?v=WCL3u8kPwF8',
      thumbnail: 'https://img.youtube.com/vi/WCL3u8kPwF8/maxresdefault.jpg',
      category: 'SeeMops Collection'
    },
    {
      id: 's4',
      title: 'SeeMops - Edit 4',
      type: 'YouTube',
      url: 'https://www.youtube.com/watch?v=vO_5jJ8219I',
      thumbnail: 'https://img.youtube.com/vi/vO_5jJ8219I/maxresdefault.jpg',
      category: 'SeeMops Collection'
    },
    {
      id: 's5',
      title: 'SeeMops - Edit 5',
      type: 'YouTube',
      url: 'https://www.youtube.com/watch?v=Qol68iF9CNE',
      thumbnail: 'https://img.youtube.com/vi/Qol68iF9CNE/maxresdefault.jpg',
      category: 'SeeMops Collection'
    },
    {
      id: 's6',
      title: 'SeeMops - Edit 6',
      type: 'YouTube',
      url: 'https://www.youtube.com/watch?v=0ot8b8eDozk',
      thumbnail: 'https://img.youtube.com/vi/0ot8b8eDozk/maxresdefault.jpg',
      category: 'SeeMops Collection'
    },
    {
      id: 's7',
      title: 'SeeMops - Edit 7',
      type: 'YouTube',
      url: 'https://www.youtube.com/watch?v=wPb5iSaXrOw',
      thumbnail: 'https://img.youtube.com/vi/wPb5iSaXrOw/maxresdefault.jpg',
      category: 'SeeMops Collection'
    },
    {
      id: 's8',
      title: 'SeeMops - Edit 8',
      type: 'YouTube',
      url: 'https://www.youtube.com/watch?v=TgQQn3mJ2dQ',
      thumbnail: 'https://img.youtube.com/vi/TgQQn3mJ2dQ/maxresdefault.jpg',
      category: 'SeeMops Collection'
    },
    {
      id: 's9',
      title: 'SeeMops - Edit 9',
      type: 'YouTube',
      url: 'https://www.youtube.com/watch?v=maoTU9GsiIs',
      thumbnail: 'https://img.youtube.com/vi/maoTU9GsiIs/maxresdefault.jpg',
      category: 'SeeMops Collection'
    },
    {
      id: 's10',
      title: 'SeeMops - Edit 10',
      type: 'YouTube',
      url: 'https://www.youtube.com/watch?v=mQdgDweAQxE',
      thumbnail: 'https://img.youtube.com/vi/mQdgDweAQxE/maxresdefault.jpg',
      category: 'SeeMops Collection'
    },
    {
      id: 's11',
      title: 'SeeMops - Edit 11',
      type: 'YouTube',
      url: 'https://www.youtube.com/watch?v=XV_1XO5PFNE',
      thumbnail: 'https://img.youtube.com/vi/XV_1XO5PFNE/maxresdefault.jpg',
      category: 'SeeMops Collection'
    },
    {
      id: 's12',
      title: 'SeeMops - Edit 12',
      type: 'YouTube',
      url: 'https://www.youtube.com/watch?v=12noH3PCI-o',
      thumbnail: 'https://img.youtube.com/vi/12noH3PCI-o/maxresdefault.jpg',
      category: 'SeeMops Collection'
    },
    {
      id: 's13',
      title: 'SeeMops - Edit 13',
      type: 'YouTube',
      url: 'https://www.youtube.com/watch?v=YiJI6kDv5mU',
      thumbnail: 'https://img.youtube.com/vi/YiJI6kDv5mU/maxresdefault.jpg',
      category: 'SeeMops Collection'
    }
  ]);

  const [activeVideo, setActiveVideo] = useState<Project | null>(null);
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addVideo = (url?: string) => {
    const targetUrl = url || newVideoUrl;
    if (!targetUrl) return;
    
    const isYoutube = targetUrl.includes('youtube.com') || targetUrl.includes('youtu.be');
    const newProj: Project = {
      id: Date.now().toString(),
      title: url ? 'Uploaded Clip' : 'New Project',
      type: isYoutube ? 'YouTube' : 'MP4',
      url: targetUrl,
      thumbnail: 'https://picsum.photos/seed/' + Math.random() + '/800/450',
      category: 'My Uploads'
    };
    setProjects([newProj, ...projects]);
    setNewVideoUrl('');
    setIsAdding(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      addVideo(url);
    }
  };

  const categories = ['SeeMops Collection', 'Jimarkus Collection'];
  const featured = projects[0];

  return (
    <div className="min-h-screen bg-bg text-ink selection:bg-accent selection:text-white">
      <Navbar />

      {/* --- 1. HERO SECTION --- */}
      <section className="relative min-h-screen w-full flex items-center px-8 md:px-16 pt-24 pb-16 sexy-gradient overflow-hidden">
        <div className="relative z-20 w-full max-w-[1800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
                Millions + Views Generated
              </span>
            </div>
            <h1 className="font-black tracking-tight mb-12 text-ink max-w-5xl">
              <span className="text-6xl md:text-8xl lg:text-9xl block mb-6 leading-[1]">I'm Chaquille.</span>
              <span className="text-2xl md:text-4xl lg:text-5xl text-slate-500 block font-bold leading-tight">
                I turn raw footage into <br />
                <span className="text-accent">high-performance</span> content.
              </span>
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">
              <div className="space-y-8 max-w-2xl">
                <div className="flex gap-12">
                  <div>
                    <p className="text-3xl font-black tracking-tight text-ink">MILLIONS +</p>
                    <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-2">Total Impressions</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black tracking-tight text-ink">DAILY</p>
                    <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-2">Availability</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <a href="#work" className="brutal-btn text-center">
                  View Portfolio
                </a>
                <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase text-center">
                  Trusted by top creators
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 1.5 SERVICES / PROCESS --- */}
      <section id="process" className="py-24 px-8 md:px-16 bg-white relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col mb-20">
            <span className="text-xs font-bold tracking-widest uppercase text-accent mb-3 block">
              The Workflow
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight text-ink">
              How we work <br />
              <span className="text-accent">together.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-slate-100 -translate-y-1/2 z-0" />
            
            <div className="p-10 glass-card space-y-8 relative z-10 hover:border-accent/20 transition-colors group">
              <div className="w-16 h-16 bg-accent text-white rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-accent/40">01</span>
                  <h3 className="text-2xl font-black text-ink">Footage & Brief.</h3>
                </div>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Send over your raw recordings and any specific creative direction or special requests you have in mind.
                </p>
              </div>
            </div>

            <div className="p-10 glass-card space-y-8 relative z-10 hover:border-accent/20 transition-colors group">
              <div className="w-16 h-16 bg-accent text-white rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
                <Wand2 className="w-8 h-8" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-accent/40">02</span>
                  <h3 className="text-2xl font-black text-ink">Production.</h3>
                </div>
                <p className="text-slate-500 font-medium leading-relaxed">
                  I dive into the edit, applying high-retention pacing, sound design, and visual flair to bring your content to life.
                </p>
              </div>
            </div>

            <div className="p-10 glass-card space-y-8 relative z-10 hover:border-accent/20 transition-colors group">
              <div className="w-16 h-16 bg-accent text-white rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
                <RefreshCw className="w-8 h-8" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-accent/40">03</span>
                  <h3 className="text-2xl font-black text-ink">Review & Polish.</h3>
                </div>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Receive the first draft for review. We'll handle any necessary revamps until the final video is perfect.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. WORK ROWS --- */}
      <section id="work" className="py-24 bg-bg">
        <div className="max-w-[1800px] mx-auto">
          <ProjectRow 
            title="Mixed Creators" 
            projects={projects.filter(p => p.category === 'Mixed Creators')} 
            onSelect={setActiveVideo}
            variant="featured"
          />
          <ProjectRow 
            title="Jimarkus Collection" 
            projects={projects.filter(p => p.category === 'Jimarkus Collection')} 
            onSelect={setActiveVideo}
            variant="minimal"
          />
          <ProjectRow 
            title="SeeMops Collection" 
            projects={projects.filter(p => p.category === 'SeeMops Collection')} 
            onSelect={setActiveVideo}
            variant="minimal"
          />
        </div>
      </section>

      {/* --- 3. TESTIMONIALS --- */}
      <section id="reviews" className="py-24 px-8 md:px-16 bg-slate-50">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] text-ink">
              What creators <br />
              <span className="text-accent">are saying.</span>
            </h2>
            <div className="space-y-12">
              {[
                { name: "Jimarkus", quote: "Working with you has completely changed my workflow. The edits are top-tier and the turnaround is insane.", role: "YouTube Creator" },
                { name: "SeeMops", quote: "I just watched the video and it is really awesome! The retention and pacing are exactly what I needed.", role: "Twitch Streamer" }
              ].map((t, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-10 glass-card"
                >
                  <p className="text-xl md:text-2xl font-medium mb-8 leading-tight text-slate-600 italic">"{t.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink">{t.name}</p>
                      <p className="text-xs font-medium text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. HIRE ME --- */}
      <section id="hire" className="py-32 px-8 md:px-16 text-center bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-xs font-bold tracking-widest uppercase text-accent mb-8 block">
              Available Daily • Fast Turnaround
            </span>
            <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tight leading-[1] text-ink">
              Hire me. <br />
              <span className="text-accent">DM me on X.</span>
            </h2>
            <a 
              href="https://x.com/NotChaQuille" 
              target="_blank" 
              rel="noopener noreferrer"
              className="brutal-btn"
            >
              DM ON X
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 md:px-16 border-t border-slate-200 bg-white">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex gap-12">
            <a href="https://twitter.com/NotChaQuille" className="text-xs font-bold text-slate-400 hover:text-accent transition-colors">Twitter</a>
            <a href="#" className="text-xs font-bold text-slate-400 hover:text-accent transition-colors">YouTube</a>
            <a href="#" className="text-xs font-bold text-slate-400 hover:text-accent transition-colors">Instagram</a>
          </div>
          <p className="text-slate-300 text-xs font-bold">© 2026 CHAQUILLE. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
          >
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-10 h-10" />
            </button>
            <div className="w-full max-w-6xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <Player 
                url={activeVideo.url} 
                width="100%" 
                height="100%" 
                controls 
                playing
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
