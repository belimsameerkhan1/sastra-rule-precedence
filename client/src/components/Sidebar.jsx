import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  GitMerge, 
  Scale, 
  CheckCircle2, 
  FileText, 
  Database, 
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'rules', label: 'Rules', icon: BookOpen },
    { id: 'conflicts', label: 'Conflicts', icon: GitMerge },
    { id: 'precedence', label: 'Precedence Rules', icon: Scale },
    { id: 'verifications', label: 'Verifications', icon: CheckCircle2 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'corpus', label: 'Corpus', icon: Database },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
            Ś
          </div>
          <div>
            <h1 className="text-base font-bold text-white leading-tight">Śāstra</h1>
            <p className="text-xs text-indigo-400 font-medium">Rule Precedence</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-indigo-600/90 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User / Scholar Admin Badge */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-purple-900/60 text-purple-300 flex items-center justify-center font-bold text-xs border border-purple-500/30">
            SA
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-semibold text-slate-200 flex items-center gap-1">
              Scholar Admin <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-[11px] text-slate-500 truncate">admin@sastra.dev</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
