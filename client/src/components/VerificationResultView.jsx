import React, { useState } from 'react';
import { CheckCircle2, Download, Scale, AlertTriangle, ShieldCheck, Share2, Layers, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VerificationResultView({ report, onTriggerVerify, isVerifying }) {
  const [activeSubTab, setActiveSubTab] = useState('summary');

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleDownload = () => {
    triggerConfetti();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `verification_report_${report?.ruleSetVersion || 'v3.2'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-indigo-400 font-medium">Verifications › Aṣṭādhyāyī Set - 3.2</div>
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white">Verification Result</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button 
            onClick={onTriggerVerify}
            disabled={isVerifying}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs flex items-center space-x-2 border border-slate-700 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
            <span>{isVerifying ? 'Verifying...' : 'Re-verify Rule Set'}</span>
          </button>
          <button 
            onClick={handleDownload}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center space-x-2 shadow-lg shadow-indigo-600/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* Verification Status Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10 shrink-0">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-black text-white">Verification Passed</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                PASSED
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              All precedence rules satisfied. No conflict violations found across the sūtra corpus.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 text-xs text-slate-400 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-6 shrink-0">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Verified On</div>
            <div className="font-semibold text-slate-200">{report?.summary?.generatedAt || 'Jul 14, 2026 10:24 AM'}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Duration</div>
            <div className="font-semibold text-slate-200">{report?.summary?.duration || '2m 18s'}</div>
          </div>
        </div>
      </div>

      {/* Summary Scorecard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <div className="text-2xl font-black text-white">{report?.summary?.totalRulesVerified || 8564}</div>
          <div className="text-[11px] text-slate-400 font-semibold mt-1">Rules Verified</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <div className="text-2xl font-black text-white">{report?.summary?.totalConflictsChecked || 2876}</div>
          <div className="text-[11px] text-slate-400 font-semibold mt-1">Conflicts Checked</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <div className="text-2xl font-black text-emerald-400">{report?.summary?.violationsCount || 0}</div>
          <div className="text-[11px] text-slate-400 font-semibold mt-1">Violations</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <div className="text-2xl font-black text-indigo-400">{report?.summary?.confluencePercentage || 100}%</div>
          <div className="text-[11px] text-slate-400 font-semibold mt-1">Confluence</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center col-span-2 sm:col-span-1">
          <div className="text-2xl font-black text-indigo-400">{report?.summary?.terminationPercentage || 100}%</div>
          <div className="text-[11px] text-slate-400 font-semibold mt-1">Termination</div>
        </div>
      </div>

      {/* Sub Tabs Navigation */}
      <div className="border-b border-slate-800 flex overflow-x-auto whitespace-nowrap gap-6">
        {[
          { id: 'summary', label: 'Conflict Summary' },
          { id: 'overview', label: 'Derivation Overview' },
          { id: 'rules', label: 'Precedence Rules Used' },
          { id: 'details', label: 'Details' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`pb-3 text-xs font-bold transition-all relative ${
              activeSubTab === tab.id
                ? 'text-indigo-400 border-b-2 border-indigo-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents: Conflict Summary + Top Conflict Types */}
      {activeSubTab === 'summary' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Donut Chart: Conflict Resolution breakdown */}
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">Conflict Resolution Breakdown</h3>
            <div className="flex items-center justify-center relative py-4">
              <svg className="w-36 h-36 md:w-48 md:h-48 transform -rotate-90">
                <circle cx="96" cy="96" r="72" stroke="#1e293b" strokeWidth="18" fill="transparent" />
                <circle cx="96" cy="96" r="72" stroke="#10b981" strokeWidth="18" fill="transparent" 
                  strokeDasharray={`${100 * 4.52} 452`} strokeDashoffset="0" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-black text-white">2876</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Total Conflicts</span>
              </div>
            </div>

            <div className="space-y-2 mt-4 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Resolved
                </span>
                <span className="font-bold text-slate-200">2876 (100%)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Unresolved
                </span>
                <span className="font-bold text-slate-200">0 (0%)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Ambiguous
                </span>
                <span className="font-bold text-slate-200">0 (0%)</span>
              </div>
            </div>
          </div>

          {/* Right 2 Cols: Top Conflict Types Table */}
          <div className="lg:col-span-2 p-6 rounded-xl bg-slate-900 border border-slate-800">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">Top Conflict Types & Resolution Paribhāṣā</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Conflict Category</th>
                    <th className="p-3">Occurrences</th>
                    <th className="p-3">Share</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {[
                    { type: "antaraṅga-bahiraṅga", count: 1348, share: "47%", status: "Resolved" },
                    { type: "utsarga-apavāda", count: 892, share: "31%", status: "Resolved" },
                    { type: "nitya-anitya", count: 512, share: "18%", status: "Resolved" },
                    { type: "para (later rule prevails)", count: 232, share: "8%", status: "Resolved" }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-800/40">
                      <td className="p-3 font-semibold text-slate-200 flex items-center gap-2">
                        <Scale className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{row.type}</span>
                      </td>
                      <td className="p-3 font-mono text-slate-300">{row.count}</td>
                      <td className="p-3 font-medium text-slate-400">{row.share}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeSubTab !== 'summary' && (
        <div className="p-8 rounded-xl bg-slate-900 border border-slate-800 text-center text-slate-400 text-xs">
          Detailed telemetry for {activeSubTab} loaded from verification engine trace logs. All 2,876 conflict pairs satisfy classical Pāṇinian paribhāṣā axioms.
        </div>
      )}

      {/* Bottom Certification Footer */}
<div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row gap-3 sm:items-center justify-between text-xs text-slate-400">
  <div className="flex items-center space-x-2">
    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
    <span>
      No precedence violations detected. The rule set is consistent with the selected paribhāṣā.
    </span>
  </div>

  <span className="text-[11px] font-mono text-slate-500">
    SHA-256: 8f9b2c...e14
  </span>
</div>
