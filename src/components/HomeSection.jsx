import { ArrowRight, BrainCircuit, MessageSquare, SquareStack, Upload } from "lucide-react";


const features = [
  {
    key: "upload",
    icon: Upload,
    title: "Notes Hub",
    copy: "Drop in PDFs or lecture notes and get a clean, searchable summary of every page.",
  },
  {
    key: "cards",
    icon: SquareStack,
    title: "Flashcards",
    copy: "Spaced-repetition decks generated straight from your own material.",
  },
  {
    key: "quiz",
    icon: BrainCircuit,
    title: "Quiz Engine",
    copy: "Timed question sets that adapt to the topics you keep missing.",
  },
  {
    key: "interview",
    icon: MessageSquare,
    title: "AI Interviewer",
    copy: "Practise out loud with follow-up questions and structured feedback.",
  },
];

export function HomeSection({ onNavigate }) {
  return (
    <div className="space-y-20">
      <section className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            <span className="bg-accent size-1.5 rounded-full" />
            Study smarter, not longer
          </span>

          <h1 className="text-balance text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            Turn your notes into an <span className="text-gradient">interview-ready</span> study
            loop.
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            PrepPulse AI reads what you upload, then builds the flashcards, quizzes and mock
            interviews around the gaps it finds — so every session has a point.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate("upload")}
              className="bg-brand inline-flex items-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition-transform duration-300 hover:-translate-y-0.5"
            >
              Upload your notes
              <ArrowRight className="size-4" />
            </button>
            <button
              onClick={() => onNavigate("interview")}
              className="rounded-xl border border-border bg-surface px-7 py-4 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-ring hover:bg-muted"
            >
              Start a mock interview
            </button>
          </div>
        </div>

        <div className="panel space-y-8 p-9">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            This week
          </p>
          <div className="space-y-7">
            {[
              { label: "Cards reviewed", value: "184", pct: 78 },
              { label: "Quiz accuracy", value: "82%", pct: 82 },
              { label: "Interview minutes", value: "46", pct: 55 },
            ].map((row) => (
              <div key={row.label} className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">{row.label}</span>
                  <span className="font-display text-2xl">{row.value}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className="bg-brand h-full rounded-full" style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-7 sm:grid-cols-2">
        {features.map(({ key, icon: Icon, title, copy }) => (
          <button
            key={key}
            onClick={() => onNavigate(key)}
            className="panel group flex flex-col gap-5 p-9 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
          >
            <span className="inline-flex size-12 items-center justify-center rounded-xl border border-border bg-surface transition-colors duration-300 group-hover:border-ring">
              <Icon className="size-5 text-primary-glow" />
            </span>
            <h3 className="text-2xl">{title}</h3>
            <p className="text-base leading-relaxed text-muted-foreground">{copy}</p>
            <span className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary-glow">
              Open
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        ))}
      </section>
    </div>
  );
}
