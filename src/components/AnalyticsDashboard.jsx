import { BookOpen, Trophy, Flame, CheckCircle2 } from 'lucide-react';

export function AnalyticsDashboard({ notesCount, flashcards }) {
  const masteredCount = flashcards.filter((f) => f.status === 'mastered').length;
  const masterPercentage = Math.round((masteredCount / (flashcards.length || 1)) * 100);

  return (
    <div className="space-y-6 max-w-5xl mx-auto w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<BookOpen className="w-5 h-5 text-[#9E7B66]" />}
          label="Documents Parsed"
          value={notesCount}
          subtitle="Ready for queries"
        />
        <StatCard
          icon={<Trophy className="w-5 h-5 text-[#805C47]" />}
          label="Avg. Interview Score"
          value="88%"
          subtitle="Top 10% benchmark"
        />
        <StatCard
          icon={<Flame className="w-5 h-5 text-[#C05621]" />}
          label="Study Streak"
          value="5 Days"
          subtitle="Keep it going!"
        />
        <StatCard
          icon={<CheckCircle2 className="w-5 h-5 text-[#527358]" />}
          label="Deck Mastery"
          value={`${masterPercentage}%`}
          subtitle={`${masteredCount} of ${flashcards.length} cards`}
        />
      </div>

      <div className="p-6 bg-[#F4EDE8] border border-[#DDD5CD] rounded-2xl space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-[#262322] flex items-center gap-2">
          Recommended Next Steps
        </h3>
        <div className="grid gap-3">
          <RecommendationItem
            title="Review Unbalanced BST Invariants"
            description="Your recent mock interview flagged BST deletion time bounds."
          />
          <RecommendationItem
            title="Complete System Design Practice Quiz"
            description="3 new questions generated based on CS101_Data_Structures_Lecture_4.pdf."
          />
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ icon, label, value, subtitle }) => (
  <div className="p-5 bg-[#F4EDE8] border border-[#DDD5CD] rounded-2xl space-y-3 shadow-xs hover:border-[#9E7B66] transition-all">
    <div className="flex items-center justify-between">
      <span className="text-xs text-[#736C68] font-semibold">{label}</span>
      <div className="p-2 rounded-xl bg-[#EAE4DD] border border-[#D0C7BC]">{icon}</div>
    </div>
    <div>
      <h4 className="text-2xl font-bold text-[#262322]">{value}</h4>
      <p className="text-xs text-[#736C68] mt-1">{subtitle}</p>
    </div>
  </div>
);

const RecommendationItem = ({ title, description }) => (
  <div className="p-4 rounded-xl bg-[#FBF8F5] border border-[#DDD5CD] flex justify-between items-center gap-4 hover:border-[#9E7B66] transition-colors">
    <div>
      <p className="text-sm font-bold text-[#262322]">{title}</p>
      <p className="text-xs text-[#736C68] mt-0.5">{description}</p>
    </div>
    <button className="text-xs font-bold text-[#527358] hover:text-white px-4 py-2 rounded-lg bg-[#EBF0EC] border border-[#A3B899]/60 hover:bg-[#527358] transition-all shrink-0">
      Start
    </button>
  </div>
);