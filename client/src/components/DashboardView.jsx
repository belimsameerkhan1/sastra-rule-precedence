import React from 'react';
import { 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Plus, 
  Upload, 
  Play, 
  Database,
  ArrowUpRight
} from 'lucide-react';

export default function DashboardView({ stats, onNavigate, onStartVerification }) {
  const verifications = [
    { name: "Aṣṭādhyāyī Set - 3.2", date: "Jul 14, 2026", status: "Passed" },
    { name: "Kṛdanta Ruleset", date: "Jul 13, 2026", status: "Failed" },
    { name: "Taddhita Prakaraṇa", date: "Jul 12, 2026", status: "Passed" },
    { name: "Samāsa Ruleset", date: "Jul 11, 2026", status: "In Progress" },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg md:text-xl lg:text-xl md:text-2xl font-bold text-white">Dashboard</h2>
          <p className="text-xs text-slate-400">Overview of your rule verification workspace</p>
        </div>
        <button 
          onClick={onStartVerification}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-xs flex items-center space-x-2 shadow-lg shadow-indigo-500/20 self-start md:self-auto">

          <Plus className="w-4 h-4" />
          <span>+ New Verifier</span>
        </button>
      </div>

      {/* 4 Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl md:text-xl md:text-2xl font-extrabold text-white">{stats?.totalRules || 128}</div>
            <div className="text-xs text-slate-400 font-medium">Total Rules</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl md:text-2xl font-extrabold text-white">{stats?.conflictsDetected || 42}</div>
            <div className="text-xs text-slate-400 font-medium">Conflicts Detected</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl md:text-2xl font-extrabold text-white">{stats?.verificationsRun || 18}</div>
            <div className="text-xs text-slate-400 font-medium">Verifications Run</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="text-xl md:text-2xl font-extrabold text-white">{stats?.passedCount || 12}</div>
            <div className="text-xs text-slate-400 font-medium">Passed</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Verification Summary + Recent Verifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Donut Chart + Recent Verifications */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Donut Chart Card */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">Verification Summary</h3>
            <div className="flex items-center justify-center relative py-4">
              <svg className="w-32 h-32 md:w-40 md:h-40 transform -rotate-90">
                <circle cx="80" cy="80" r="60" stroke="#1e293b" strokeWidth="16" fill="transparent" />
                {/* Passed segment: 66.7% */}
                <circle cx="80" cy="80" r="60" stroke="#10b981" strokeWidth="16" fill="transparent" 
                  strokeDasharray={`${66.7 * 3.77} 377`} strokeDashoffset="0" />
                {/* Failed segment: 22.2% */}
                <circle cx="80" cy="80" r="60" stroke="#ef4444" strokeWidth="16" fill="transparent" 
                  strokeDasharray={`${22.2 * 3.77} 377`} strokeDashoffset={`-${66.7 * 3.77}`} />
                {/* In Progress segment: 11.1% */}
                <circle cx="80" cy="80" r="60" stroke="#f59e0b" strokeWidth="16" fill="transparent" 
                  strokeDasharray={`${11.1 * 3.77} 377`} strokeDashoffset={`-${(66.7 + 22.2) * 3.77}`} />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl md:text-xl md:text-2xl font-black text-white">18</span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Total</span>
              </div>
            </div>
            <div className="space-y-2 mt-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Passed
                </span>
                <span className="font-bold text-slate-200">12 (66.7%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Failed
                </span>
                <span className="font-bold text-slate-200">4 (22.2%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> In Progress
                </span>
                <span className="font-bold text-slate-200">2 (11.1%)</span>
              </div>
            </div>
          </div>

          {/* Recent Verifications Card */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Recent Verifications</h3>
                <button onClick={() => onNavigate('verifications')} className="text-xs text-indigo-400 hover:underline flex items-center gap-1">
                  View all <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-3">
                {verifications.map((v, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold text-white break-words">   {v.name} </div>
                      <div className="text-[10px] text-slate-500">{v.date}</div>
                    </div>
                    <div>
                      {v.status === 'Passed' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Passed
                        </span>
                      )}
                      {v.status === 'Failed' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          Failed
                        </span>
                      )}
                      {v.status === 'In Progress' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          In Progress
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Quick Actions & Corpus Stats */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button 
                onClick={() => onNavigate('rules')}
                className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-center transition-colors border border-slate-700 flex flex-col items-center gap-1.5">

                <Upload className="w-4 h-4 text-indigo-400" />
                <span className="text-[10px] font-medium text-slate-200">Import Rules</span>
              </button>
              <button 
                onClick={() => onNavigate('rules')}
                className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-center transition-colors border border-slate-700 flex flex-col items-center gap-1.5">

                <Plus className="w-4 h-4 text-purple-400" />
                <span className="text-[10px] font-medium text-slate-200">Create Rule</span>
              </button>
              <button 
                onClick={onStartVerification}
                className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-center transition-colors border border-slate-700 flex flex-col items-center gap-1.5">

                <Play className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-medium text-slate-200">Run Verification</span>
              </button>
            </div>
          </div>

          {/* Corpus Stats Breakdown */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-400" /> Corpus Stats
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="text-lg font-bold text-white">8564</div>
                <div className="text-[10px] text-slate-400">Sūtras</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="text-lg font-bold text-white">8</div>
                <div className="text-[10px] text-slate-400">Adhyāyas</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="text-lg font-bold text-white">32</div>
                <div className="text-[10px] text-slate-400">Pādas</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="text-lg font-bold text-white">14</div>
                <div className="text-[10px] text-slate-400">Sources</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
