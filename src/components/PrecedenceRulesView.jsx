import React from 'react';
import { Scale, BookOpen, ShieldCheck, Award } from 'lucide-react';

export default function PrecedenceRulesView({ axioms }) {
  return (
    <div className="p-6 space-y-6">
      <div>
        <div className="text-xs text-indigo-400 font-medium">Precedence Rules › Paribhāṣā Axiom Library</div>
        <h2 className="text-xl font-bold text-white">Paribhāṣā Precedence Metarules</h2>
        <p className="text-xs text-slate-400 mt-1">Formal conflict-resolution metarules derived from classical Śāstra commentarial tradition</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {axioms.map((ax) => (
          <div key={ax.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-indigo-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Priority #{ax.priority}
              </span>
              <span className="text-xs font-bold text-slate-400">Weight: {ax.weight}</span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white sanskrit-text mb-1">{ax.title}</h3>
              <div className="text-xs font-mono text-indigo-400 font-semibold">{ax.name}</div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
              {ax.description}
            </p>

            <div className="flex items-center space-x-2 text-[11px] text-slate-400">
              <BookOpen className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>Cited Source: <strong className="text-slate-200">{ax.citedSource}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
