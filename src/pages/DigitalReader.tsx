import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, ChevronLeft, ChevronRight, Bookmark, BookmarkCheck, List, 
  Settings, Type, Sparkles, Sliders, Moon, Sun, ArrowLeft, RefreshCw, 
  Smile, Award, BookmarkX, Star, HelpCircle, CheckCircle, Flame, Download, Clock
} from 'lucide-react';
import { useLibrary } from '../hooks/useLibrary';

// Mock Chapter Data for our prime selection of books
interface Chapter {
  id: string;
  title: string;
  pages: string[];
}

const BOOK_CHAPTERS: { [bookId: string]: Chapter[] } = {
  '1': [
    {
      id: 'c1',
      title: 'Chapter 1: West Egg Beginnings',
      pages: [
        "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since. 'Whenever you feel like criticizing any one,' he told me, 'just remember that all the people in this world haven't had the advantages that you've had.'",
        "He didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I'm inclined to reserve all judgments, a habit that has opened up many curious natures to me.",
        "And so it came about that I bought a small house in the commuter country of West Egg, a long strip of high-class land stretching out to the sound. My house was at the very tip, between two huge places that rented for outstanding sums."
      ]
    },
    {
      id: 'c2',
      title: 'Chapter 2: The Valley of Ashes',
      pages: [
        "About half way between West Egg and New York the motor road hastily joins the railroad and runs beside it for a quarter of a mile, so as to shrink away from a certain desolate area of land. This is a valley of ashes—a fantastic farm where ashes grow like wheat into ridges and hills and grotesque gardens.",
        "But above the grey land and the spasms of bleak dust which drift endlessly over it, you perceive, after a moment, the eyes of Doctor T. J. Eckleburg. The eyes of Doctor T. J. Eckleburg are blue and gigantic—their retinas are one yard high.",
        "They look out of no face, but, instead, from a pair of enormous yellow spectacles which pass over a non-existent nose. Evidently some wild wag of an oculist set them there to fatten his practice in the borough of Queens."
      ]
    },
    {
      id: 'c3',
      title: "Chapter 3: Gatsby's Midnight Gala",
      pages: [
        "There was music from my neighbor's house through the summer nights. In his blue gardens men and girls came and went like moths among the whisperings and the champagne and the stars. At high tide in the afternoon I watched his guests diving from the tower of his raft.",
        "Every Friday five crates of oranges and lemons arrived from a fruiterer in New York—every Monday these same oranges and lemons left his back door in a pyramid of pulpless halves. There was a machine in the kitchen which could extract the juice of two hundred oranges in ten minutes.",
        "At least once a fortnight a corps of caterers came down with several hundred feet of canvas and enough colored lights to make a Christmas tree of Gatsby's enormous garden. On buffet tables, garnished with glistening hors-d'oeuvre, spiced baked hams crowded against salads of harlequin designs."
      ]
    }
  ],
  '2': [
    {
      id: 'c1',
      title: 'Chapter 1: The Surprising Power of Habits',
      pages: [
        "It is so easy to overestimate the importance of one defining moment and underestimate the value of making small improvements on a daily basis. Too often, we convince ourselves that massive success requires massive action.",
        "Meanwhile, improving by 1 percent isn't particularly notable—sometimes it isn't even noticeable—but it can be far more meaningful, especially in the long run. The difference a tiny improvement can make over time is astounding.",
        "Here is how the math works out: if you can get 1 percent better each day for one year, you'll end up thirty-seven times better by the time you're done. Conversely, if you get 1 percent worse each day for a year, you'll decline nearly down to zero."
      ]
    },
    {
      id: 'c2',
      title: 'Chapter 2: Identity-Based Transformation',
      pages: [
        "Changing our habits is challenging for two reasons: (1) we try to change the wrong thing and (2) we try to change our habits in the wrong way. The first mistake is trying to change what we want to achieve.",
        "To understand what I mean, consider that there are three levels at which change can occur. You can imagine them like the layers of an onion. The first layer is changing your outcomes. The second layer is changing your process. The third and deepest layer is changing your identity.",
        "Outcomes are about what you get. Processes are about what you do. Identity is about what you believe. When it comes to building habits that last, the problem is not that one level is 'better' or 'worse' than another. The problem is the direction of change."
      ]
    },
    {
      id: 'c3',
      title: 'Chapter 3: The Four Laws of Loop Behavior',
      pages: [
        "A habit is a behavior that has been repeated enough times to become automatic. The process of habit formation can be divided into four simple steps: cue, craving, response, and reward.",
        "Breaking it down into these fundamental parts can help us understand what a habit is, how it works, and how to improve it. This four-step pattern is the backbone of every habit, and your brain runs through these steps in the same order each time.",
        "First, there is the cue. The cue triggers your brain to initiate a behavior. It is a bit of information that predicts a reward. Cues naturally lead to a craving, which is the motivational force behind every habit."
      ]
    }
  ],
  '3': [
    {
      id: 'c1',
      title: 'Chapter 1: Our Picture of the Universe',
      pages: [
        "A well-known scientist (some say it was Bertrand Russell) once gave a public lecture on astronomy. He described how the earth orbits around the sun and how the sun, in turn, orbits around the center of a vast collection of stars called our galaxy.",
        "At the end of the lecture, a little old lady at the back of the room stood up and said: 'What you have told us is rubbish. The world is really a flat plate supported on the back of a giant tortoise.'",
        "The scientist gave a superior smile before replying, 'What is the tortoise standing on?' 'You're very clever, young man, very clever,' said the old lady. 'But it's turtles all the way down!'"
      ]
    },
    {
      id: 'c2',
      title: 'Chapter 2: Space and Time',
      pages: [
        "Our present ideas about the motion of bodies date back to Galileo and Newton. Before them, people believed Aristotle, who said that the natural state of a body was to be at rest and that it only moved if driven by a force.",
        "This implied that a heavy body should fall faster than a light one because it would have a larger pull toward the earth. Galileo, however, proved this concept wrong by performing experiments dropping different weights from the leaning tower of Pisa.",
        "Galileo's measurements showed that each body increased its speed at the same rate, regardless of its weight. Of course, a feather does not fall as fast as a lead weight, but that is only because of air resistance."
      ]
    }
  ],
  '5': [
    {
      id: 'c1',
      title: 'Chapter 1: The Gom Jabbar',
      pages: [
        "In the week before they departed to Arrakis, when all the final scurrying had reached a nearly unbearable frenzy, an old crone came to visit the mother of the boy, Paul.",
        "It was a warm night at Castle Caladan, but the ancient pile of stone that had served the Atreides family for twenty-six generations bore its usual drafty chill.",
        "The old woman was let in by a side door and hurried up the stone hallway to Paul's chamber, where he lay pretending sleep. She was the Reverend Mother Gaius Helen Mohiam, and she carried a small box of pure metal."
      ]
    },
    {
      id: 'c2',
      title: 'Chapter 2: The Desert Planet Arrakis',
      pages: [
        "Arrakis—also known as Dune—was a place of dry heat, endless sand, and the invaluable spice melange that granted longevity, foresight, and interstellar travel.",
        "The Duke Leto was aware of the trap laid by the Harkonnens, yet he had no choice but to accept the Emperor's command to take over the spice harvesting operations.",
        "Paul sat at the master desk, reviewing projection maps. He looked at the giant circular symbols representing sandworms, monsters of the sand sea that could swallow full spice harvesters in a single bite."
      ]
    }
  ],
  '7': [
    {
      id: 'c1',
      title: 'Chapter 1: No One’s Crazy',
      pages: [
        "Your personal experiences with money make up maybe 0.00000001% of what’s happened in the world, but rules about 80% of how you think the world works.",
        "Therefore, equally smart people can disagree about how and why recessions happen, how you should invest, what should belong to whom, and how much risk is acceptable.",
        "People from different generations, raised by different parents who earned different incomes in different parts of the world, learn very different lessons about finances."
      ]
    },
    {
      id: 'c2',
      title: 'Chapter 2: Confounding Compounding',
      pages: [
        "If you look at the life of Warren Buffett, his incredible fortune isn’t just due to him being an amazing investor. It is primarily because he has been an amazing investor for seventy-five years.",
        "Buffett began investing when he was ten years old. By the time he was thirty, he had a net worth of $1 million. If he had been a regular guy who started investing at age thirty and retired at sixty, his net worth would be a fraction of what it is.",
        "That is the power of compound interest. It is counterintuitive because we think of exponential growth in linear terms. But compounding works by stacking micro-gains over decades."
      ]
    }
  ]
};

// Default generic chapters for other books
const DEFAULT_CHAPTERS: Chapter[] = [
  {
    id: 'dc1',
    title: 'Chapter 1: Introducing the Core Premise',
    pages: [
      "This digital copy of the book is fully calibrated for Perpustakaanku’s interactive learning system. Each line is structured to promote active reading recall.",
      "As you read, note down your inquiries and bookmark essential insights using the personal reflection box attached on your panel workspace.",
      "The wisdom contained in these chapters is best comprehended by reflecting on how you can immediately practice these frameworks in your direct studies or professional life."
    ]
  },
  {
    id: 'dc2',
    title: 'Chapter 2: Detailed Framework Development',
    pages: [
      "Expanding on the central thesis, we observe deep structural similarities with contemporary models of learning and behavior.",
      "Observe your current environments or workspace. Where do you find the most notable indicators of system stagnation or productive momentum?",
      "Marking your pages and adding continuous reading progress signals has been demonstrated to boost comprehension and long-term memory of educational materials."
    ]
  },
  {
    id: 'dc3',
    title: 'Chapter 3: Synthesizing Insights',
    pages: [
      "By combining these frameworks, we arrive at a unified set of practices that can be integrated daily.",
      "You have made spectacular progress. Keep exploring the rest of Perpustakaanku's collection to cross-pollinate ideas across science, philosophy, and history.",
      "This concludes our digital preview guide. Be sure to check this book out regularly and review your bookmark insights!"
    ]
  }
];

// Themes for custom E-Reader aesthetics
interface ReaderTheme {
  id: string;
  name: string;
  bg: string;
  text: string;
  accentText: string;
  cardBg: string;
  borderColor: string;
}

const THEMES: ReaderTheme[] = [
  {
    id: 'parchment',
    name: '🍵 Warm Parchment',
    bg: 'bg-[#fbf6ec]',
    text: 'text-[#4a3cf2] md:text-[#2d2424]', // high contrast text for body
    accentText: 'text-[#d97706]',
    cardBg: 'bg-[#f4ebe1]',
    borderColor: 'border-[#e6d7c3]'
  },
  {
    id: 'slate',
    name: '💡 Classic Slate',
    bg: 'bg-[#f8fafc]',
    text: 'text-slate-800',
    accentText: 'text-primary',
    cardBg: 'bg-white',
    borderColor: 'border-slate-100'
  },
  {
    id: 'moss',
    name: '🌲 Soft Moss',
    bg: 'bg-[#f1f5f2]',
    text: 'text-[#1e2f24]',
    accentText: 'text-emerald-700',
    cardBg: 'bg-[#e4ece6]',
    borderColor: 'border-[#d0ded3]'
  },
  {
    id: 'nordic',
    name: '🌌 Nordic Night',
    bg: 'bg-[#0f172a]',
    text: 'text-slate-200',
    accentText: 'text-indigo-400',
    cardBg: 'bg-[#1e293b]',
    borderColor: 'border-slate-800'
  }
];

// User mood profile config
interface Mood {
  id: string;
  emoji: string;
  name: string;
  description: string;
  glowColor: string;
  recommendedTag: string; // tags used to match books
}

const MOODS: Mood[] = [
  { id: 'focus', emoji: '🧘', name: 'Focused', description: 'Seeking structured, clean productivity rules', glowColor: 'shadow-emerald-500/20 text-emerald-600 border-emerald-100 bg-emerald-50/50', recommendedTag: 'Productivity' },
  { id: 'curious', emoji: '🧠', name: 'Curious', description: 'Eager to grasp secrets about space, history, or science', glowColor: 'shadow-blue-500/20 text-blue-600 border-blue-100 bg-blue-50/50', recommendedTag: 'Science' },
  { id: 'imaginative', emoji: '🌌', name: 'Imaginative', description: 'Ready to embark on deep fictional realities', glowColor: 'shadow-purple-500/20 text-purple-600 border-purple-100 bg-purple-50/50', recommendedTag: 'Fiction' },
  { id: 'relaxed', emoji: '☕', name: 'Relaxed', description: 'Cozy wisdom, easy life advice, or light adventure', glowColor: 'shadow-amber-500/20 text-amber-600 border-amber-100 bg-amber-50/50', recommendedTag: 'Adventure' },
  { id: 'analytical', emoji: '📊', name: 'Thoughtful', description: 'Deep human behavior, habits, and psychology', glowColor: 'shadow-cyan-500/20 text-cyan-600 border-cyan-100 bg-cyan-50/50', recommendedTag: 'Psychology' }
];

export default function DigitalReader() {
  const { books, borrows, favorites, toggleFavorite } = useLibrary();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const bookId = searchParams.get('bookId') || '1';
  const currentBook = books.find(b => b.id === bookId) || books[0];

  // Load chapters for the selected book
  const chapters = BOOK_CHAPTERS[currentBook.id] || DEFAULT_CHAPTERS;

  // Reading state variables
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [activeTheme, setActiveTheme] = useState<ReaderTheme>(THEMES[0]);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [lineSpacing, setLineSpacing] = useState<'normal' | 'relaxed' | 'loose'>('relaxed');
  
  // Custom interactive book bookmark management
  const [bookmarks, setBookmarks] = useState<{ chapterIndex: number; pageIndex: number; note: string; timestamp: string }[]>([]);
  const [newNoteText, setNewNoteText] = useState('');
  const [isAddingBookmark, setIsAddingBookmark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Active user mood selector
  const [selectedMood, setSelectedMood] = useState<string>('focus');

  // Book reader tracking statistics
  const [streakDays, setStreakDays] = useState(3);
  const [readMinutes, setReadMinutes] = useState(42);

  // Sound effect / microinteraction toggle
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Toast confirmation feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load reading progress and bookmarks from localStorage
  useEffect(() => {
    if (currentBook) {
      // 1. Progress recall
      const savedProgress = localStorage.getItem(`read_progress_${currentBook.id}`);
      if (savedProgress) {
        try {
          const { cIdx, pIdx } = JSON.parse(savedProgress);
          if (cIdx < chapters.length) {
            setActiveChapterIndex(cIdx);
            if (pIdx < chapters[cIdx].pages.length) {
              setActivePageIndex(pIdx);
            } else {
              setActivePageIndex(0);
            }
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        setActiveChapterIndex(0);
        setActivePageIndex(0);
      }

      // 2. Bookmarks recall
      const savedBookmarks = localStorage.getItem(`read_bookmarks_${currentBook.id}`);
      if (savedBookmarks) {
        try {
          setBookmarks(JSON.parse(savedBookmarks));
        } catch (e) {
          console.error(e);
        }
      } else {
        setBookmarks([]);
      }
    }
  }, [currentBook, chapters.length, bookId]);

  // Persist index markers upon change
  const handlePageChange = (cIdx: number, pIdx: number) => {
    setActiveChapterIndex(cIdx);
    setActivePageIndex(pIdx);
    localStorage.setItem(`read_progress_${currentBook.id}`, JSON.stringify({ cIdx, pIdx }));
    
    // Increment stats mockingly for delightful gamification
    setReadMinutes(prev => prev + 1);
    
    if (soundEnabled) {
      // Trigger a subtle, clean click visual or sound feedback
      try {
        const synth = window.speechSynthesis;
        // Optionally can speak or triggers standard clean vibe (no actual speech to not disturb)
      } catch (e){}
    }
  };

  // Quick flash Toast Notification helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Add bookmark function
  const addPageBookmark = () => {
    const isAlreadyBookmarked = bookmarks.some(b => b.chapterIndex === activeChapterIndex && b.pageIndex === activePageIndex);
    if (isAlreadyBookmarked) {
      // Remove
      const filtered = bookmarks.filter(b => !(b.chapterIndex === activeChapterIndex && b.pageIndex === activePageIndex));
      setBookmarks(filtered);
      localStorage.setItem(`read_bookmarks_${currentBook.id}`, JSON.stringify(filtered));
      triggerToast("Bookmark removed successfully!");
    } else {
      // Add with custom reflection note
      const newB = {
        chapterIndex: activeChapterIndex,
        pageIndex: activePageIndex,
        note: newNoteText.trim() || `Bookmark on Chapter ${activeChapterIndex + 1}, Page ${activePageIndex + 1}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const updated = [...bookmarks, newB];
      setBookmarks(updated);
      localStorage.setItem(`read_bookmarks_${currentBook.id}`, JSON.stringify(updated));
      setNewNoteText('');
      setIsAddingBookmark(false);
      triggerToast("Insight saved to your Personal Journal!");
    }
  };

  // Reading calculations
  const totalBookPages = chapters.reduce((sum, ch) => sum + ch.pages.length, 0);
  const precedingPages = chapters.slice(0, activeChapterIndex).reduce((sum, ch) => sum + ch.pages.length, 0);
  const currentOverallPage = precedingPages + activePageIndex + 1;
  const progressPercent = Math.round((currentOverallPage / totalBookPages) * 100);

  // Filter recommendations based on selected mood
  const activeMoodInfo = MOODS.find(m => m.id === selectedMood) || MOODS[0];
  const moodRecommendedBooks = books.filter(b => 
    b.id !== currentBook.id && 
    (b.tags.includes(activeMoodInfo.recommendedTag) || b.category.toLowerCase().includes(activeMoodInfo.recommendedTag.toLowerCase()))
  ).slice(0, 3);

  // Fallback of books if mood tags match zero
  const finalMoodRecommended = moodRecommendedBooks.length > 0 ? moodRecommendedBooks : books.filter(b => b.id !== currentBook.id).slice(0, 3);

  return (
    <div className={`min-h-screen ${activeTheme.bg} Transition duration-500 flex flex-col font-sans transition-colors relative`}>
      
      {/* Dynamic Toast System */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-2xl flex items-center gap-3 border border-slate-800"
          >
            <Sparkles size={14} className="text-accent animate-spin" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Controls bar */}
      <header className={`px-4 md:px-8 py-4 border-b flex flex-col md:flex-row items-center justify-between gap-4 ${activeTheme.cardBg} ${activeTheme.borderColor} relative z-30 shadow-sm`}>
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <Link 
            to="/catalog" 
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-primary transition-colors bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100"
          >
            <ArrowLeft size={16} />
            <span>Catalog</span>
          </Link>

          <div className="h-4 w-[1px] bg-slate-200 hidden md:block"></div>

          {/* Book select dropdown with rich preview */}
          <div className="flex items-center gap-3">
            <img src={currentBook.coverImage} className="w-8 h-10 object-cover rounded-md shadow" alt="cover" />
            <div>
              <h3 className="font-serif font-bold text-slate-800 text-sm line-clamp-1">{currentBook.title}</h3>
              <p className="text-[10px] text-gray-400 font-sans italic">by {currentBook.author}</p>
            </div>
          </div>
        </div>

        {/* E-Reader Adjustments HUD */}
        <div className="flex flex-wrap items-center gap-4 justify-center md:justify-end w-full md:w-auto">
          
          {/* Theme chips */}
          <div className="flex items-center gap-1 bg-white/80 p-1 rounded-2xl border border-gray-100 shadow-sm">
            {THEMES.map(theme => (
              <button
                key={theme.id}
                onClick={() => {
                  setActiveTheme(theme);
                  triggerToast(`Theme preset set to ${theme.name}`);
                }}
                className={`p-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeTheme.id === theme.id 
                    ? 'bg-slate-900 text-white scale-105 shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {theme.id === 'parchment' ? ' Parchment' : theme.id === 'slate' ? ' Slate' : theme.id === 'moss' ? ' Moss' : ' Night'}
              </button>
            ))}
          </div>

          {/* Text controls block */}
          <div className="flex items-center gap-2 bg-white/80 p-1 rounded-2xl border border-gray-100 shadow-sm text-slate-600">
            {/* Font size picker */}
            <div className="flex items-center gap-1 px-2 border-r border-gray-100">
              <Type size={14} className="text-gray-400 mr-1" />
              {(['sm', 'md', 'lg', 'xl'] as const).map(sz => (
                <button
                  key={sz}
                  onClick={() => setFontSize(sz)}
                  className={`w-6 h-6 flex items-center justify-center text-xs rounded-lg transition-all font-bold ${
                    fontSize === sz ? 'bg-primary text-white scale-105' : 'hover:bg-slate-100'
                  }`}
                >
                  {sz.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Line spacing picker */}
            <button 
              onClick={() => {
                const nextSpacing = lineSpacing === 'normal' ? 'relaxed' : lineSpacing === 'relaxed' ? 'loose' : 'normal';
                setLineSpacing(nextSpacing);
                triggerToast(`Line spacing: ${nextSpacing}`);
              }}
              title="Adjust line spacing"
              className="p-2 hover:bg-slate-100 rounded-xl"
            >
              <Sliders size={14} />
            </button>
          </div>

          {/* Table of contents fold toggle button */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-3 rounded-2xl flex items-center gap-2 transition-all shadow-sm border ${
              sidebarOpen 
                ? 'bg-primary text-white border-primary-light' 
                : 'bg-white text-slate-600 border-gray-100 hover:bg-slate-50'
            }`}
          >
            <List size={16} />
            <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Index</span>
          </button>
        </div>
      </header>

      {/* Main Reader View workspace grid */}
      <div className="flex-1 flex flex-col md:flex-row relative overflow-hidden">
        
        {/* LEFT COMPONENT: Interactive Animated Table of Contents / Progress Tracker */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 340, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className={`h-full border-r ${activeTheme.cardBg} ${activeTheme.borderColor} flex flex-col shrink-0 z-20 relative shadow-lg overflow-y-auto`}
            >
              <div className="p-6 border-b border-gray-200/50 space-y-6">
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Interactive Catalog</h4>
                  <h3 className="text-xl text-slate-800 font-serif font-bold flex items-center gap-2">
                    <List size={18} className="text-primary" />
                    Table of Contents
                  </h3>
                </div>

                {/* Micro Reading stats blocks */}
                <div className="grid grid-cols-2 gap-3 bg-white/60 p-3 rounded-2xl border border-gray-100">
                  <div className="text-center p-2 rounded-xl">
                    <div className="flex items-center justify-center gap-1 text-orange-500 font-semibold mb-1">
                      <Flame size={14} />
                      <span className="text-sm font-bold">{streakDays}d Streak</span>
                    </div>
                    <span className="text-[9px] uppercase font-medium text-gray-400">Streak Active</span>
                  </div>
                  <div className="text-center p-2 rounded-xl border-l border-gray-100">
                    <div className="flex items-center justify-center gap-1 text-primary font-semibold mb-1">
                      <Clock size={14} />
                      <span className="text-sm font-bold">{readMinutes}m</span>
                    </div>
                    <span className="text-[9px] uppercase font-medium text-gray-400">Reading Time</span>
                  </div>
                </div>

                {/* Progress Circle Visual */}
                <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-3xl border border-primary/10">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-accent transition-all duration-500"
                        strokeWidth="3.5"
                        strokeDasharray={`${progressPercent}, 100`}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-700">{progressPercent}%</span>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Book Completed</h5>
                    <p className="text-[10px] text-gray-400 font-sans mt-0.5">Page {currentOverallPage} of {totalBookPages}</p>
                  </div>
                </div>
              </div>

              {/* Chapters list */}
              <div className="flex-1 p-4 space-y-4">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest px-2 block">Chapters Index</span>
                <div className="space-y-2">
                  {chapters.map((ch, cIndex) => {
                    const isCurrent = activeChapterIndex === cIndex;
                    const isCompleted = activeChapterIndex > cIndex;

                    return (
                      <button
                        key={ch.id}
                        onClick={() => handlePageChange(cIndex, 0)}
                        className={`w-full p-4 rounded-2xl text-left transition-all duration-200 flex items-start gap-3 border ${
                          isCurrent 
                            ? 'bg-primary text-white border-primary shadow-lg ring-2 ring-primary/20 scale-102 font-bold' 
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-100 hover:border-slate-200'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[10px] ${
                          isCurrent 
                            ? 'bg-amber-400 text-slate-900 font-bold' 
                            : isCompleted 
                            ? 'bg-emerald-100 text-emerald-600' 
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {isCompleted ? <CheckCircle size={10} /> : cIndex + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className={`block text-[10px] uppercase tracking-wider ${isCurrent ? 'text-amber-300' : 'text-slate-400'}`}>
                            {ch.pages.length} Pages
                          </span>
                          <h4 className="font-serif text-sm line-clamp-2 mt-0.5 leading-tight">{ch.title}</h4>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Personal E-Reader Journal / Bookmark shelf */}
                <div className="pt-6 border-t border-gray-200/50 mt-6 space-y-4 px-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                      <BookmarkCheck size={14} className="text-amber-500" />
                      Saved Insights ({bookmarks.length})
                    </h4>
                  </div>

                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {bookmarks.map((b, bIdx) => {
                      const chTitle = chapters[b.chapterIndex]?.title || `Chapter ${b.chapterIndex + 1}`;
                      return (
                        <div 
                          key={bIdx}
                          onClick={() => handlePageChange(b.chapterIndex, b.pageIndex)}
                          className="p-3 bg-white rounded-xl border border-slate-100 text-left hover:border-amber-300 hover:shadow-sm transition-all cursor-pointer group relative"
                        >
                          <span className="text-[8px] uppercase font-bold text-amber-600 tracking-wider">
                            Ch {b.chapterIndex + 1} • Pg {b.pageIndex + 1}
                          </span>
                          <p className="text-xs text-slate-800 font-serif italic mt-1 line-clamp-2 group-hover:text-primary transition-colors">
                            "{b.note}"
                          </p>
                          <span className="text-[8px] text-gray-400 block mt-2 text-right">{b.timestamp}</span>
                        </div>
                      );
                    })}

                    {bookmarks.length === 0 && (
                      <div className="p-4 text-center bg-white/50 rounded-2xl border border-dashed border-gray-100 text-[10px] text-gray-400 inline-block w-full">
                        No custom notes written yet. Bookmark a page to save your highlights!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* MIDDLE / CENTRAL DIGITAL READER: Responsive single page or luxurious spread */}
        <div className="flex-1 p-4 md:p-8 flex flex-col justify-between overflow-y-auto max-w-full">
          
          <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col justify-center py-6">
            
            {/* Quick chapter identifier banner */}
            <div className="text-center mb-6">
              <span className={`text-[10px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-full ${activeTheme.cardBg} ${activeTheme.text} shadow-sm border ${activeTheme.borderColor}`}>
                📖 {chapters[activeChapterIndex]?.title || 'Reading room'}
              </span>
            </div>

            {/* Simulated tablet layout box with realistic animations */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeChapterIndex}_${activePageIndex}`}
                initial={{ opacity: 0, x: 20, rotateY: -5 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -25, rotateY: 5 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                style={{ perspective: '1000px' }}
                className={`w-full p-8 md:p-14 rounded-[32px] md:rounded-[48px] shadow-2xl relative border overflow-hidden ${activeTheme.cardBg} ${activeTheme.borderColor} ${activeTheme.text}`}
              >
                {/* Book header coordinates inside page layout */}
                <div className="flex justify-between items-center text-[9px] uppercase font-semibold tracking-widest text-[#4a3cf2]/60 md:text-slate-400 mb-8 border-b border-slate-200/50 pb-4">
                  <span>{currentBook.title}</span>
                  <span>Chapter {activeChapterIndex + 1}</span>
                </div>

                {/* Simulated highlight pen floating overlay indicator */}
                <span className="absolute top-10 right-10 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>

                {/* Actual book simulated text body calibrated on font variables */}
                <div className={`prose max-w-none font-serif select-text relative leading-relaxed text-slate-800 ${activeTheme.text} ${
                  fontSize === 'sm' ? 'text-sm md:text-sm' : 
                  fontSize === 'md' ? 'text-base md:text-xl' : 
                  fontSize === 'lg' ? 'text-lg md:text-2xl' : 'text-xl md:text-3xl'
                } ${
                  lineSpacing === 'normal' ? 'leading-normal' : 
                  lineSpacing === 'relaxed' ? 'leading-relaxed' : 'leading-loose'
                }`}>
                  <p className="indent-8 transition-all first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:font-serif">
                    {chapters[activeChapterIndex]?.pages[activePageIndex] || "Perpustakaanku premium reader is preparing this gorgeous page content dynamic module..."}
                  </p>
                </div>

                {/* Footer bookmark trigger / page counter inside booklet */}
                <div className="flex justify-between items-center text-[10px] uppercase font-semibold tracking-widest text-slate-400 mt-12 pt-4 border-t border-slate-200/50">
                  <span>Page {activePageIndex + 1} of {chapters[activeChapterIndex]?.pages.length || 1}</span>
                  
                  {/* Dynamic interactive page save trigger */}
                  <button
                    onClick={() => {
                      const isAlreadyB = bookmarks.some(b => b.chapterIndex === activeChapterIndex && b.pageIndex === activePageIndex);
                      if (isAlreadyB) {
                        addPageBookmark();
                      } else {
                        setIsAddingBookmark(true);
                      }
                    }}
                    className="flex items-center gap-1.5 hover:text-accent transition-colors"
                  >
                    {bookmarks.some(b => b.chapterIndex === activeChapterIndex && b.pageIndex === activePageIndex) ? (
                      <>
                        <BookmarkCheck size={14} className="text-accent fill-accent" />
                        <span className="text-accent">Bookmarked</span>
                      </>
                    ) : (
                      <>
                        <Bookmark size={14} />
                        <span>Bookmark Page</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Custom Notes dialog prompt when bookmarking is clicked */}
            <AnimatePresence>
              {isAddingBookmark && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-5 bg-white rounded-3xl border border-slate-200 shadow-xl space-y-3 relative z-10 text-slate-700"
                >
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Add Personal Journal Reflection
                  </label>
                  <input
                    type="text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Write a highlight or note on this page (e.g., Brilliant phrasing! / Remember this for projects)"
                    className="w-full text-xs p-3 rounded-xl border border-gray-100 bg-gray-50/50 outline-none focus:ring-2 focus:ring-primary/20 text-slate-800"
                  />
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => setIsAddingBookmark(false)}
                      className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-600 uppercase tracking-widest"
                    >
                      Skip Note
                    </button>
                    <button 
                      onClick={addPageBookmark}
                      className="px-4 py-2 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:shadow-lg transition-all"
                    >
                      Save Bookmark
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* IMMERSIVE NEXT/PREV MARGIN CONTROLS OR FOOTER BUTTONS */}
            <div className="flex justify-between items-center mt-8 gap-4">
              <button
                disabled={activeChapterIndex === 0 && activePageIndex === 0}
                onClick={() => {
                  if (activePageIndex > 0) {
                    handlePageChange(activeChapterIndex, activePageIndex - 1);
                  } else if (activeChapterIndex > 0) {
                    const prevC = activeChapterIndex - 1;
                    const prevLastP = chapters[prevC].pages.length - 1;
                    handlePageChange(prevC, prevLastP);
                  }
                }}
                className={`px-6 py-4 rounded-2xl flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all ${
                  activeChapterIndex === 0 && activePageIndex === 0
                    ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                    : 'bg-white text-slate-700 shadow-md hover:scale-105 hover:-translate-x-1 border border-slate-100'
                }`}
              >
                <ChevronLeft size={16} />
                <span>Prev Page</span>
              </button>

              {/* Progress counter pill */}
              <div className="text-center">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest block">Reading Depth</span>
                <span className="text-xs font-bold text-slate-600 block">{progressPercent}% complete</span>
              </div>

              <button
                disabled={activeChapterIndex === chapters.length - 1 && activePageIndex === chapters[activeChapterIndex].pages.length - 1}
                onClick={() => {
                  if (activePageIndex < chapters[activeChapterIndex].pages.length - 1) {
                    handlePageChange(activeChapterIndex, activePageIndex + 1);
                  } else if (activeChapterIndex < chapters.length - 1) {
                    handlePageChange(activeChapterIndex + 1, 0);
                  }
                }}
                className={`px-6 py-4 rounded-2xl flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all ${
                  activeChapterIndex === chapters.length - 1 && activePageIndex === chapters[activeChapterIndex].pages.length - 1
                    ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                    : 'bg-primary text-white shadow-xl hover:scale-105 hover:translate-x-1'
                }`}
              >
                <span>Next Page</span>
                <ChevronRight size={16} />
              </button>
            </div>

          </div>

          {/* LOWER COMPONENT: Interactive Mood-Based Book Suggester Workspace */}
          <div className="border-t border-slate-200/50 pt-8 mt-8 pb-4">
            <div className="max-w-4xl mx-auto space-y-6">
              
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl text-slate-800 font-serif font-bold flex items-center gap-2">
                    <Smile className="text-accent animate-bounce" size={18} />
                    Aura-Based Reading Companion
                  </h3>
                  <p className="text-xs text-gray-500 font-sans">Pick an atmosphere, and let our catalog align with your current headspace</p>
                </div>
                
                {/* Mood buttons ribbon */}
                <div className="flex flex-wrap gap-2">
                  {MOODS.map(m => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setSelectedMood(m.id);
                        triggerToast(`Reading aura tuned to: ${m.name}`);
                      }}
                      className={`px-4 py-2 rounded-2xl text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-2 border ${
                        selectedMood === m.id 
                          ? m.glowColor + ' scale-105 font-bold border-opacity-60 shadow-lg' 
                          : 'bg-white hover:bg-slate-50 text-slate-600 border-gray-100'
                      }`}
                    >
                      <span>{m.emoji}</span>
                      <span>{m.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Suggestions grid matching selected mood */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {finalMoodRecommended.map((b) => (
                  <motion.div
                    key={b.id}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="p-5 bg-white rounded-[24px] border border-slate-100 hover:border-accent/40 hover:shadow-xl transition-all flex gap-4 text-left group cursor-pointer relative"
                  >
                    <img src={b.coverImage} className="w-16 h-22 object-cover rounded-xl shadow-md shrink-0" alt="Cover" />
                    
                    <div className="min-w-0 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Interactive Sparkle tag indicator */}
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-[8px] uppercase font-bold text-accent opacity-80 tracking-widest">Recommended Match</span>
                        </div>
                        <h4 className="font-serif font-bold text-sm text-slate-800 truncate leading-tight group-hover:text-primary transition-colors">
                          {b.title}
                        </h4>
                        <p className="text-[10px] text-gray-400 truncate mt-0.5">by {b.author}</p>
                      </div>

                      <div className="flex items-center justify-between gap-2 mt-2">
                        {/* Read now action button */}
                        <button
                          onClick={() => {
                            setSearchParams({ bookId: b.id });
                            triggerToast(`Loaded immersive stream of "${b.title}"!`);
                          }}
                          className="px-3 py-1.5 bg-primary/5 hover:bg-primary text-primary hover:text-white rounded-xl text-[9px] font-semibold uppercase tracking-widest transition-colors flex items-center gap-1"
                        >
                          <BookOpen size={10} />
                          <span>Tune Reader</span>
                        </button>

                        <button
                          onClick={() => toggleFavorite(b.id)}
                          className="p-1.5 text-slate-300 hover:text-red-500 transition-colors"
                          title="Save to Wishlist"
                        >
                          <Star size={12} className={favorites.includes(b.id) ? 'fill-accent text-accent' : ''} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
