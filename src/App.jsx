import { useState } from 'react';
import { Home, Upload, SquareStack, BrainCircuit, MessageSquare, LayoutDashboard } from 'lucide-react';

import { HomeSection } from './components/HomeSection';
import { FileUploader } from './components/FileUploader';
import { FlashcardDeck } from './components/FlashcardDeck';
import { QuizEngine } from './components/QuizEngine';
import { InterviewChat } from './components/InterviewChat';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';

import { initialNotes, mockFlashcards, mockQuizzes } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [notes, setNotes] = useState(initialNotes);

  const handleFileParsed = (newNote) => {
    setNotes((prev) => [newNote, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#FBF8F5] text-[#363231] flex flex-col font-sans selection:bg-[#6E8B74] selection:text-white">
      {/* Top Header Navbar */}
      <header className="border-b border-[#E5DDD5] bg-[#FAF6F0]/90 backdrop-blur-md sticky top-0 z-50 w-full shadow-xs">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          
          {/* Brand Logo */}
          <div
            className="group flex items-center gap-2.5 shrink-0 cursor-pointer"
            onClick={() => setActiveTab('home')}
          >
            <div className="p-2 bg-[#6E8B74]/15 border border-[#6E8B74]/30 rounded-xl group-hover:bg-[#527358] group-hover:text-white transition-all duration-300">
              <BrainCircuit className="w-4 h-4 text-[#527358] group-hover:text-white group-hover:rotate-12 transition-transform" />
            </div>
            <span className="font-bold text-lg text-[#262322] tracking-tight">
              PrepPulse <span className="text-[#527358]">AI</span>
            </span>
          </div>

          {/* Navigation Controls */}
          <nav className="flex gap-1 bg-[#EFEAE4] p-1 rounded-xl border border-[#E0D8CE] shadow-inner">
            <NavButton
              active={activeTab === 'home'}
              onClick={() => setActiveTab('home')}
              icon={<Home className="w-3.5 h-3.5" />}
              label="Home"
            />
            <NavButton
              active={activeTab === 'upload'}
              onClick={() => setActiveTab('upload')}
              icon={<Upload className="w-3.5 h-3.5" />}
              label="Notes Hub"
            />
            <NavButton
              active={activeTab === 'cards'}
              onClick={() => setActiveTab('cards')}
              icon={<SquareStack className="w-3.5 h-3.5" />}
              label="Flashcards"
            />
            <NavButton
              active={activeTab === 'quiz'}
              onClick={() => setActiveTab('quiz')}
              icon={<BrainCircuit className="w-3.5 h-3.5" />}
              label="Quiz Engine"
            />
            <NavButton
              active={activeTab === 'interview'}
              onClick={() => setActiveTab('interview')}
              icon={<MessageSquare className="w-3.5 h-3.5" />}
              label="AI Interviewer"
            />
            <NavButton
              active={activeTab === 'analytics'}
              onClick={() => setActiveTab('analytics')}
              icon={<LayoutDashboard className="w-3.5 h-3.5" />}
              label="Analytics"
            />
          </nav>
        </div>
      </header>

      {/* Main Viewport */}
      <main className="flex-1 flex flex-col justify-center items-center w-full max-w-5xl mx-auto px-6 py-10 lg:py-14">
        <div className="w-full flex justify-center items-center">
          {activeTab === 'home' && <HomeSection onNavigate={(tab) => setActiveTab(tab)} />}
          {activeTab === 'upload' && (
            <FileUploader onFileParsed={handleFileParsed} notesList={notes} />
          )}
          {activeTab === 'cards' && <FlashcardDeck cards={mockFlashcards} />}
          {activeTab === 'quiz' && <QuizEngine quizzes={mockQuizzes} />}
          {activeTab === 'interview' && <InterviewChat />}
          {activeTab === 'analytics' && (
            <AnalyticsDashboard notesCount={notes.length} flashcards={mockFlashcards} />
          )}
        </div>
      </main>
    </div>
  );
}

const NavButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 shrink-0 ${
      active
        ? 'bg-[#527358] text-white shadow-sm'
        : 'text-[#615B57] hover:text-[#262322] hover:bg-[#E2DCD4]'
    }`}
  >
    {icon}
    <span className="hidden sm:inline">{label}</span>
  </button>
);