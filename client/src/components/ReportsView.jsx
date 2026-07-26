import React, { useState } from 'react';
import { FileText, Download, Share2, Plus, ExternalLink, ShieldCheck, CheckCircle2, XCircle, Clock, Sparkles, RefreshCw } from 'lucide-react';

export default function ReportsView({ reports, onGenerateNewReport }) {
  const [activeSubTab, setActiveSubTab] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [isGeneratingModal, setIsGeneratingModal] = useState(false);
  const [reportNameInput, setReportNameInput] = useState('Imported Corpus (sample_sutra_corpus.pdf)');
  const [ruleSetNameInput, setRuleSetNameInput] = useState('Imported Dataset v1.0');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadReport = (rep) => {
    const reportData = {
      reportId: rep.id,
      name: rep.name,
      ruleSet: rep.ruleSet,
      status: rep.status,
      generatedOn: rep.generatedOn,
      summary: {
        rulesVerified: rep.rulesVerified,
        conflictsChecked: rep.conflictsChecked,
        violationsCount: rep.violations,
        confluence: `${rep.confluence}%`,
        termination: `${rep.termination}%`
      },
      auditSignature: "SHA256: 8f9b2c...e14"
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `sastra_report_${rep.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCreateReportSubmit = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      onGenerateNewReport(reportNameInput, ruleSetNameInput);
      setIsGenerating(false);
      setIsGeneratingModal(false);
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Reports</h2>
          <p className="text-xs text-slate-400">Generate and manage formal verification reports for your sūtra corpora</p>
        </div>

        <button 
          onClick={() => setIsGeneratingModal(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-indigo-600/20 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Generate Report for Imported File</span>
        </button>
      </div>

      {/* Sub Tabs: All Reports, My Reports, Shared With Me */}
      <div className="border-b border-slate-800 flex space-x-6">
        {[
          { id: 'all', label: 'All Reports' },
          { id: 'my', label: 'My Reports' },
          { id: 'shared', label: 'Shared With Me' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveSubTab(t.id)}
            className={`pb-3 text-xs font-bold transition-all ${
              activeSubTab === t.id
                ? 'text-indigo-400 border-b-2 border-indigo-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Reports Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="p-3.5">Report Name</th>
                <th className="p-3.5">Rule Set</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Generated On</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {reports.map((r, index) => (
                <tr key={r.id || index} className={`hover:bg-slate-800/50 transition-colors ${index === 0 ? 'bg-indigo-950/20' : ''}`}>
                  <td className="p-3.5 font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <span>{r.name}</span>
                    {index === 0 && (
                      <span className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        NEW
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 font-mono text-slate-300">{r.ruleSet}</td>
                  <td className="p-3.5">
                    {r.status === 'Passed' && (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Passed
                      </span>
                    )}
                    {r.status === 'Failed' && (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        Failed
                      </span>
                    )}
                    {r.status === 'In Progress' && (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        In Progress
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-slate-400 font-semibold">{r.generatedOn}</td>
                  <td className="p-3.5 text-right space-x-2">
                    <button 
                      onClick={() => setSelectedReport(r)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                      title="View Details"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDownloadReport(r)}
                      className="p-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300"
                      title="Download PDF/JSON Certificate"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate New Report Modal */}
      {isGeneratingModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" /> Generate Formal Verification Report
              </h3>
              <button onClick={() => setIsGeneratingModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateReportSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Report Name *</label>
                <input 
                  type="text" 
                  value={reportNameInput}
                  onChange={(e) => setReportNameInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-bold"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Rule Set / File Version *</label>
                <input 
                  type="text" 
                  value={ruleSetNameInput}
                  onChange={(e) => setRuleSetNameInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono"
                  required
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-slate-400">
                <div className="text-slate-200 font-bold">Verification Engine Target:</div>
                <div>Includes 100% Confluence check, Church-Rosser verification, and Paribhāṣā precedence resolution audit.</div>
              </div>

              <button 
                type="submit"
                disabled={isGenerating}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 disabled:opacity-50"
              >
                {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                <span>{isGenerating ? 'Running Verification & Building Certificate...' : 'Generate & Audit Report'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Report Detail Preview */}
      {selectedReport && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">{selectedReport.name} Report</h3>
              <button onClick={() => setSelectedReport(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Rule Set:</span>
                <span className="font-mono text-white">{selectedReport.ruleSet}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="font-bold text-emerald-400">{selectedReport.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Rules Verified:</span>
                <span className="font-bold text-white">{selectedReport.rulesVerified}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Confluence Rating:</span>
                <span className="font-bold text-indigo-400">{selectedReport.confluence}%</span>
              </div>
            </div>
            <button 
              onClick={() => { handleDownloadReport(selectedReport); setSelectedReport(null); }}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Certificate
            </button>
          </div>
        </div>
      )}

      {/* Bottom Feature Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <div className="text-indigo-400 font-bold text-xs mb-1">PDF / HTML</div>
          <div className="text-[10px] text-slate-400">Export Formats</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <div className="text-emerald-400 font-bold text-xs mb-1">Detailed Traces</div>
          <div className="text-[10px] text-slate-400">Step-by-step logs</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <div className="text-purple-400 font-bold text-xs mb-1">Citations</div>
          <div className="text-[10px] text-slate-400">Sources & commentary</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <div className="text-amber-400 font-bold text-xs mb-1">Shareable</div>
          <div className="text-[10px] text-slate-400">Secure audit links</div>
        </div>
      </div>
    </div>
  );
}
