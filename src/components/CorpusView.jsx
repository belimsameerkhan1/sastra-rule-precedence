import React, { useState } from 'react';
import { Database, Search, BookOpen, ExternalLink, Tag } from 'lucide-react';

export default function CorpusView({ rules }) {
  const [search, setSearch] = useState('');
  const [selectedAdhyaya, setSelectedAdhyaya] = useState('All');

  const filteredRules = rules.filter(r => {
    const matchesSearch = r.sutraRef.includes(search) || 
                          r.text.includes(search) || 
                          r.transliteration.toLowerCase().includes(search.toLowerCase());
    const matchesAdhyaya = selectedAdhyaya === 'All' || r.adhyaya.toString() === selectedAdhyaya;
    return matchesSearch && matchesAdhyaya;
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <div className="text-xs text-indigo-400 font-medium">Corpus › Digitized Sūtra-pāṭha Datasets</div>
        <h2 className="text-xl font-bold text-white">Śāstra Rule Corpus</h2>
        <p className="text-xs text-slate-400 mt-1">Browse, search, and inspect digitized sūtras from Pāṇini's Aṣṭādhyāyī</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input 
            type="text"
            placeholder="Search sūtras by ref (e.g. 6.1.77) or Devanagari text..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className="text-slate-400">Filter Adhyaya:</span>
          <select 
            value={selectedAdhyaya}
            onChange={(e) => setSelectedAdhyaya(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-semibold focus:outline-none"
          >
            <option value="All">All Adhyāyas (1-8)</option>
            {[1,2,3,4,5,6,7,8].map(a => (
              <option key={a} value={a.toString()}>Adhyāya {a}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Rule Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRules.map((r) => (
          <div key={r.id} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {r.sutraRef}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">{r.category}</span>
              </div>
              <h3 className="text-lg font-bold text-white sanskrit-text">{r.text}</h3>
              <p className="text-xs text-slate-300 font-serif italic mt-0.5">{r.transliteration}</p>
            </div>

            <div className="space-y-2 text-xs pt-2 border-t border-slate-800/80">
              <div className="text-slate-400"><strong className="text-slate-300">Context:</strong> {r.context}</div>
              <div className="text-slate-400"><strong className="text-slate-300">Action:</strong> {r.action}</div>
              <div className="text-slate-400"><strong className="text-slate-300">Commentary:</strong> {r.sourceCommentary}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
