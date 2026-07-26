import React from 'react';
import { 
  ShieldCheck, 
  GitBranch, 
  PlayCircle, 
  FileCheck2,
  ChevronRight
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const topCards = [
    {
      id: 'precedence',
      title: 'Verify Precedence',
      subtitle: 'Ensure correct rule ordering using paribhāṣā metarules',
      icon: ShieldCheck,
      color: 'from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30'
    },
    {
      id: 'conflicts',
      title: 'Detect Conflicts',
      subtitle: 'Identify overlapping rules & build conflict graphs',
      icon: GitBranch,
      color: 'from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30'
    },
    {
      id: 'verifications',
      title: 'Simulate & Check',
      subtitle: 'Symbolic derivations, confluence & termination checks',
      icon: PlayCircle,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30'
    },
    {
      id: 'reports',
      title: 'Generate Reports',
      subtitle: 'Certification reports with pass/fail and violation details',
      icon: FileCheck2,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30'
    }
  ];

  const workflowSteps = [
    { label: 'Rule Input / Import', tab: 'rules' },
    { label: 'Parsing & Normalization', tab: 'rules' },
    { label: 'Conflict Detection', tab: 'conflicts' },
    { label: 'Precedence Resolution', tab: 'precedence' },
    { label: 'Rewrite Simulation', tab: 'verifications' },
    { label: 'Confluence & Termination Check', tab: 'verifications' },
    { label: 'Verification Result', tab: 'verifications' },
    { label: 'Report Generation', tab: 'reports' }
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-20 px-6 py-4">
      {/* Top Banner with 4 feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        {topCards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => setActiveTab(card.id)}
              className={`p-3 rounded-xl border bg-gradient-to-br text-left transition-all hover:scale-[1.01] ${card.color} ${
                activeTab === card.id ? 'ring-2 ring-indigo-500' : ''
              }`}
            >
              <div className="flex items-center space-x-2.5 mb-1">
                <div className="p-1.5 rounded-lg bg-slate-950/40">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wide">{card.title}</h3>
              </div>
              <p className="text-[11px] text-slate-300 line-clamp-2 leading-tight">{card.subtitle}</p>
            </button>
          );
        })}
      </div>

      {/* Interactive System Workflow Bar */}
      <div className="bg-slate-950/60 rounded-xl p-2 border border-slate-800/80 flex items-center justify-between text-xs overflow-x-auto">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 shrink-0">System Workflow</span>
        <div className="flex items-center space-x-1 shrink-0">
          {workflowSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <button
                onClick={() => setActiveTab(step.tab)}
                className="px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap"
              >
                {step.label}
              </button>
              {idx < workflowSteps.length - 1 && (
                <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </header>
  );
}
