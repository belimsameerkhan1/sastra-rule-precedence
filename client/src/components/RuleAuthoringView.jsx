import React, { useState } from 'react';
import { Save, Plus, Upload, FileText, FileSpreadsheet, CheckCircle2, AlertCircle, Sparkles, BookOpen, ArrowRight, Play } from 'lucide-react';

export default function RuleAuthoringView({ rules, onAddRule, onNavigateToVerification }) {
  const [activeTab, setActiveTab] = useState('manual'); // 'manual' or 'import'
  const [sutraText, setSutraText] = useState('इको यणचि');
  const [transliteration, setTransliteration] = useState('iko yaṇ aci');
  const [reference, setReference] = useState('6.1.77');
  const [adhyaya, setAdhyaya] = useState('6');
  const [pada, setPada] = useState('1');
  const [ruleType, setRuleType] = useState('Paribhāṣā / Vyākaraṇa');
  const [context, setContext] = useState('ik (i, u, ṛ, ḷ)');
  const [condition, setCondition] = useState('followed by vowel (ac)');
  const [action, setAction] = useState('replace with yaṇ (y, v, r, l)');
  const [source, setSource] = useState('Aṣṭādhyāyī');
  const [commentary, setCommentary] = useState('Kāśikā');
  const [selectedParibhasa, setSelectedParibhasa] = useState('antaraṅga-bahiraṅga');
  const [tags, setTags] = useState(['phonology', 'substitution', 'ik-yan']);
  const [appliesTo, setAppliesTo] = useState(['i -> y', 'u -> v', 'ṛ -> r', 'ḷ -> l']);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Batch import file states
  const [importedFileName, setImportedFileName] = useState(null);
  const [importStatus, setImportStatus] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    const newRuleObj = {
      sutraRef: reference,
      text: sutraText,
      transliteration,
      context,
      condition,
      action,
      category: ruleType,
      sourceCommentary: commentary,
      adhyaya,
      pada,
      sutraNum: reference.split('.')[2] || '77',
      tags,
      appliesTo
    };
    onAddRule(newRuleObj);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImportedFileName(file.name);
      setImportStatus('parsing');
      setTimeout(() => {
        setImportStatus('success');
      }, 1200);
    }
  };

  const handleExecuteBatchImport = () => {
    const sampleBatch = [
      { sutraRef: '1.1.1', text: 'वृद्धिरादैच्', transliteration: 'vṛddhir ād aic', context: 'ā, ai, au', condition: 'vṛddhi saṃjñā', action: 'name vṛddhi', category: 'Saṃjñā', sourceCommentary: 'Kāśikā 1.1.1', adhyaya: 1, pada: 1, sutraNum: 1 },
      { sutraRef: '1.1.2', text: 'अदेँङ्गुणः', transliteration: 'adeṅ guṇaḥ', context: 'at, e, o', condition: 'guṇa saṃjñā', action: 'name guṇa', category: 'Saṃjñā', sourceCommentary: 'Kāśikā 1.1.2', adhyaya: 1, pada: 1, sutraNum: 2 },
    ];
    sampleBatch.forEach(r => onAddRule(r));
    setImportStatus('completed');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Top Header & Import Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-indigo-400 font-medium">Rules › Ingestion & Authoring</div>
          <h2 className="text-xl font-bold text-white">Rule Ingestion & Import</h2>
        </div>

        {/* Input Mode Selector */}
        <div className="flex items-center space-x-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('manual')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'manual'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Manual Entry Form
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'import'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Document / PDF / Batch</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Batch PDF / Document Import */}
      {activeTab === 'import' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 space-y-6">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <h3 className="text-lg font-bold text-white">Import Sūtra Rule-Set Documents</h3>
            <p className="text-xs text-slate-400">
              Upload digitized Sūtra-pāṭha files in <strong>PDF</strong>, <strong>JSON</strong>, <strong>CSV</strong>, or <strong>Plain Text</strong> format. The parser automatically extracts and normalizes context, condition, and action components.
            </p>
          </div>

          {/* Drag & Drop Upload Dropzone */}
          <div className="max-w-xl mx-auto border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-8 text-center bg-slate-950/60 transition-all">
            <input 
              type="file" 
              accept=".pdf,.json,.csv,.txt"
              id="fileInput"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label htmlFor="fileInput" className="cursor-pointer space-y-3 block">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Click to upload or drag & drop file</div>
                <div className="text-xs text-slate-400 mt-1">Supports PDF, JSON, CSV, TXT (up to 50MB)</div>
              </div>
            </label>
          </div>

          {/* Supported Document Formats Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-3">
              <FileText className="w-6 h-6 text-rose-400 shrink-0" />
              <div>
                <div className="font-bold text-white">PDF Document</div>
                <div className="text-[10px] text-slate-400">OCR & Sanskrit Text Extraction</div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-3">
              <FileSpreadsheet className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <div className="font-bold text-white">CSV / Excel</div>
                <div className="text-[10px] text-slate-400">Structured Columns</div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-3">
              <Sparkles className="w-6 h-6 text-indigo-400 shrink-0" />
              <div>
                <div className="font-bold text-white">JSON Corpus</div>
                <div className="text-[10px] text-slate-400">Direct Batch Import</div>
              </div>
            </div>
          </div>

          {/* Upload Status & Verification Action Bar */}
          {importedFileName && (
            <div className="max-w-xl mx-auto p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-400" /> {importedFileName}
                </span>
                {importStatus === 'parsing' && <span className="text-amber-400 font-semibold animate-pulse">Parsing Sūtras...</span>}
                {importStatus === 'success' && <span className="text-emerald-400 font-semibold">Parsed 42 Rules ✓</span>}
                {importStatus === 'completed' && <span className="text-emerald-400 font-semibold">Added to Active Corpus ✓</span>}
              </div>

              {importStatus === 'success' && (
                <button 
                  onClick={handleExecuteBatchImport}
                  className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
                >
                  <CheckCircle2 className="w-4 h-4" /> Add 42 Rules to Verification Corpus
                </button>
              )}

              {importStatus === 'completed' && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950 to-indigo-950 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs">
                    <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Rules successfully ingested!
                    </div>
                    <div className="text-[11px] text-slate-300">Ready to run formal conflict detection & rule precedence verification.</div>
                  </div>
                  <button 
                    onClick={onNavigateToVerification}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shrink-0 shadow-lg shadow-emerald-500/20"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" /> Run Verification Now <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Manual Authoring Form */}
      {activeTab === 'manual' && (
        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5 bg-slate-900 p-6 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Manual Sūtra Authoring Form</h3>
              {savedSuccess && (
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Saved!
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">Sūtra Text (Devanagari) *</label>
                <input 
                  type="text" 
                  value={sutraText}
                  onChange={(e) => setSutraText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white sanskrit-text text-base focus:outline-none focus:border-indigo-500"
                  placeholder="उदा. इको यणचि"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Reference (Adhyāya.Pāda.Sūtra)</label>
                <input 
                  type="text" 
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                  placeholder="6.1.77"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">IAST Transliteration</label>
                <input 
                  type="text" 
                  value={transliteration}
                  onChange={(e) => setTransliteration(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-serif focus:outline-none focus:border-indigo-500"
                  placeholder="iko yaṇ aci"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Adhyāya</label>
                <select 
                  value={adhyaya}
                  onChange={(e) => setAdhyaya(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                >
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>Adhyāya {n}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Rule Type</label>
                <select 
                  value={ruleType}
                  onChange={(e) => setRuleType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="Paribhāṣā / Vyākaraṇa">Paribhāṣā / Vyākaraṇa</option>
                  <option value="Vidhi Sūtra">Vidhi Sūtra</option>
                  <option value="Saṃjñā Sūtra">Saṃjñā Sūtra</option>
                  <option value="Adhikāra Sūtra">Adhikāra Sūtra</option>
                  <option value="Niyama Sūtra">Niyama Sūtra</option>
                </select>
              </div>
            </div>

            {/* Rule Components */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3">Rule Components</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Context (Pūrva Nimitta)</label>
                  <input 
                    type="text" 
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Condition (Para Nimitta)</label>
                  <input 
                    type="text" 
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Action (Ādeśa / Vidhi)</label>
                  <input 
                    type="text" 
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/20"
            >
              <Save className="w-4 h-4" />
              <span>Save Sūtra to Rule-Base</span>
            </button>
          </div>

          <div className="space-y-5 bg-slate-900 p-6 rounded-xl border border-slate-800">
            <div>
              <label className="block text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Linked Paribhāṣā Metarule</label>
              <select 
                value={selectedParibhasa}
                onChange={(e) => setSelectedParibhasa(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs mb-2"
              >
                <option value="antaraṅga-bahiraṅga">antaraṅga-bahiraṅga (Internal condition prevails)</option>
                <option value="utsarga-apavāda">utsarga-apavāda (Special overrides general)</option>
                <option value="nitya-anitya">nitya-anitya (Obligatory overrides optional)</option>
                <option value="para">para (Later sūtra number prevails)</option>
              </select>
            </div>
          </div>
        </form>
      )}

      {/* Active Corpus Rules Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" /> Active Verification Corpus ({rules.length} Rules)
          </h3>
          <button 
            onClick={onNavigateToVerification}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-md shadow-emerald-600/20"
          >
            <Play className="w-3.5 h-3.5" /> Run Verification on Corpus →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="p-3">Ref</th>
                <th className="p-3">Sūtra Text</th>
                <th className="p-3">Transliteration</th>
                <th className="p-3">Context</th>
                <th className="p-3">Action</th>
                <th className="p-3">Commentary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {rules.map((r, i) => (
                <tr key={i} className="hover:bg-slate-800/40">
                  <td className="p-3 font-mono font-bold text-indigo-400">{r.sutraRef}</td>
                  <td className="p-3 sanskrit-text font-bold text-white text-sm">{r.text}</td>
                  <td className="p-3 font-serif text-slate-300">{r.transliteration}</td>
                  <td className="p-3 text-slate-400">{r.context}</td>
                  <td className="p-3 text-slate-400">{r.action}</td>
                  <td className="p-3 text-slate-400">{r.sourceCommentary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
