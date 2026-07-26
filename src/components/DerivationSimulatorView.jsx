import React, { useState, useEffect } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Scale, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';

export default function DerivationSimulatorView({ onSimulateCustom }) {
  const [selectedInput, setSelectedInput] = useState('sudhī + upāsyaḥ');
  const [currentStepIndex, setCurrentStepIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stepMode, setStepMode] = useState(true);

  // Pre-loaded benchmark derivations
  const presetDerivations = [
    { name: 'sudhyupāsyaḥ (सुध्युपास्यः)', input: 'sudhī + upāsyaḥ' },
    { name: 'agnaye (अग्नये)', input: 'agne + e' },
    { name: 'haraye (हरये)', input: 'hare + e' },
    { name: 'devālayaḥ (देवालयः)', input: 'deva + ālayaḥ' }
  ];

  const currentDerivation = {
    title: 'Aṣṭādhyāyī Set - 3.2 › Input: sudhī + upāsyaḥ',
    steps: [
      { step: 1, state: 'sudhī + upāsyaḥ', rule: 'Initial State', ruleType: 'Ingestion', basis: 'Initial', explanation: 'Raw input stem sudhī + upāsyaḥ loaded.' },
      { step: 2, state: 'sudhī + upāsyaḥ', rule: '6.1.77 iko yaṇ aci', ruleType: 'Vyākaraṇa', basis: 'antaraṅga-bahiraṅga', activeConflict: '6.1.77 vs 6.1.101', explanation: 'Sūtra 6.1.77 becomes eligible for ik vowel ī before u.' },
      { step: 3, state: 'sudhy + upāsyaḥ', rule: 'Transformation Applied', ruleType: 'Substitution', basis: 'yaṇ-ādeśa', explanation: 'ī substituted by y (yaṇ).' },
      { step: 4, state: 'sudhy + upāsyaḥ', rule: '8.4.47 anaci ca', ruleType: 'Vyākaraṇa', basis: 'nitya-anitya', activeConflict: '8.4.47 vs 8.4.53', explanation: 'Doubling of consonant dh after vowel.' },
      { step: 5, state: 'suddhy + upāsyaḥ', rule: '8.4.53 jhalāṁ jaś jhaṣi', ruleType: 'Vyākaraṇa', basis: 'utsarga-apavāda', explanation: 'First dh replaced by d (jaś-tva).' },
      { step: 6, state: 'sudhyupāsyaḥ', rule: 'Varna-saṁyoga', ruleType: 'Phonology', basis: 'Join', explanation: 'Final consonant cluster joined with vowel upāsyaḥ.' },
      { step: 7, state: 'sudhyupāsyaḥ', rule: 'Normal Form Reached', ruleType: 'Verification', basis: 'Confluent', explanation: 'Church-Rosser normal form verified with 100% termination.' }
    ]
  };

  const totalSteps = currentDerivation.steps.length;
  const currentStep = currentDerivation.steps[currentStepIndex - 1] || currentDerivation.steps[0];

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev >= totalSteps) {
            setIsPlaying(false);
            return totalSteps;
          }
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, totalSteps]);

  const handlePresetChange = (e) => {
    const val = e.target.value;
    setSelectedInput(val);
    setCurrentStepIndex(1);
    setIsPlaying(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Top Controls Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-indigo-400 font-medium">Verifications › Derivation Trace (Simulator)</div>
          <h2 className="text-xl font-bold text-white">Derivation Trace Simulator</h2>
        </div>

        {/* Input Selector & Player Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <select 
            value={selectedInput}
            onChange={handlePresetChange}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-indigo-500"
          >
            {presetDerivations.map((p, i) => (
              <option key={i} value={p.input}>{p.name}</option>
            ))}
          </select>

          {/* Step player buttons */}
          <div className="flex items-center space-x-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button 
              onClick={() => setCurrentStepIndex(prev => Math.max(prev - 1, 1))}
              disabled={currentStepIndex === 1}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-medium text-white flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white flex items-center gap-1 shadow-md shadow-indigo-600/20"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            <button 
              onClick={() => setCurrentStepIndex(prev => Math.min(prev + 1, totalSteps))}
              disabled={currentStepIndex === totalSteps}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-medium text-white flex items-center gap-1"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Column Derivation Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Timeline Steps (Cols 4) */}
        <div className="lg:col-span-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">Steps ({totalSteps})</h3>
            <div className="space-y-2">
              {currentDerivation.steps.map((st) => {
                const isActive = st.step === currentStepIndex;
                return (
                  <button
                    key={st.step}
                    onClick={() => setCurrentStepIndex(st.step)}
                    className={`w-full p-3 rounded-xl text-left transition-all border flex items-start space-x-3 ${
                      isActive 
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-500/10' 
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                      isActive ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {st.step}
                    </span>
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-slate-200 truncate">{st.rule}</div>
                      <div className="text-[11px] font-mono text-slate-400 truncate">{st.state}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Middle Column: Current Step Detail Card (Cols 5) */}
        <div className="lg:col-span-5 bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Step</span>
              <span className="text-xs font-mono font-bold text-indigo-400 px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20">
                {currentStepIndex} / {totalSteps}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-500">Rule Applied</div>
                <div className="text-lg font-bold text-white mt-0.5">{currentStep.rule}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Rule Type</div>
                  <div className="text-xs font-semibold text-slate-200 mt-0.5">{currentStep.ruleType}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Precedence Basis</div>
                  <div className="text-xs font-semibold text-indigo-400 mt-0.5">{currentStep.basis}</div>
                </div>
              </div>

              {/* Transformation Diff Card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-[10px] uppercase font-bold text-slate-500">Transformation Diff</div>
                <div className="flex items-center justify-center space-x-4 py-2">
                  <span className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20 font-mono text-sm">
                    {currentStepIndex > 1 ? currentDerivation.steps[currentStepIndex - 2].state : currentStep.state}
                  </span>
                  <span className="text-indigo-400 font-bold">→</span>
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono text-sm">
                    {currentStep.state}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs">
                <div className="font-bold text-indigo-300 mb-1">Grammatical Explanation</div>
                <p className="text-slate-300 leading-relaxed text-[11px]">{currentStep.explanation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Active Conflicts Side Panel (Cols 3) */}
        <div className="lg:col-span-3 bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Active Conflicts</h3>
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold flex items-center justify-center border border-amber-500/30">
                {currentStep.activeConflict ? 1 : 0}
              </span>
            </div>

            {currentStep.activeConflict ? (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-mono font-bold text-indigo-400">{currentStep.activeConflict}</div>
                <div className="text-[11px] text-slate-400">Precedence Basis:</div>
                <div className="px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-bold">
                  {currentStep.basis}
                </div>
                <div className="flex items-center space-x-1 text-emerald-400 text-xs font-semibold pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Resolved ✓</span>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-500">
                No active conflicts eligible at this derivation step.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Step Scrubber Player Bar */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center space-x-4">
        <span className="text-xs font-bold text-slate-400 shrink-0">Step Scrubber:</span>
        <div className="flex-1 flex items-center space-x-2">
          {currentDerivation.steps.map((s) => (
            <button
              key={s.step}
              onClick={() => setCurrentStepIndex(s.step)}
              className={`flex-1 h-3 rounded-full transition-all ${
                s.step === currentStepIndex 
                  ? 'bg-indigo-500 shadow-md shadow-indigo-500/50 scale-y-125' 
                  : s.step < currentStepIndex 
                    ? 'bg-indigo-900/80' 
                    : 'bg-slate-800'
              }`}
              title={`Step ${s.step}: ${s.rule}`}
            />
          ))}
        </div>
        <span className="text-xs font-mono text-slate-300 font-bold shrink-0">{currentStepIndex} / {totalSteps}</span>
      </div>
    </div>
  );
}
