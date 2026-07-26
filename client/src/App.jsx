import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardView from './components/DashboardView';
import RuleAuthoringView from './components/RuleAuthoringView';
import VerificationResultView from './components/VerificationResultView';
import ConflictGraphView from './components/ConflictGraphView';
import DerivationSimulatorView from './components/DerivationSimulatorView';
import ReportsView from './components/ReportsView';
import PrecedenceRulesView from './components/PrecedenceRulesView';
import CorpusView from './components/CorpusView';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [rules, setRules] = useState([]);
  const [axioms, setAxioms] = useState([]);
  const [conflictsData, setConflictsData] = useState(null);
  const [report, setReport] = useState(null);
  const [reportsList, setReportsList] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Stats error:", err));

    fetch('/api/rules')
      .then(res => res.json())
      .then(data => setRules(data))
      .catch(err => console.error("Rules error:", err));

    fetch('/api/precedence')
      .then(res => res.json())
      .then(data => setAxioms(data))
      .catch(err => console.error("Precedence error:", err));

    fetch('/api/conflicts')
      .then(res => res.json())
      .then(data => setConflictsData(data))
      .catch(err => console.error("Conflicts error:", err));

    fetch('/api/reports')
      .then(res => res.json())
      .then(data => setReportsList(data))
      .catch(err => console.error("Reports error:", err));

    triggerVerification();
  }, []);

  const triggerVerification = () => {
    setIsVerifying(true);
    fetch('/api/verify', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        setReport(data);
        setIsVerifying(false);
      })
      .catch(err => {
        console.error("Verification trigger error:", err);
        setIsVerifying(false);
      });
  };

  const handleAddRule = (newRule) => {
    fetch('https://sastra-rule-precedence.onrender.com/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRule)
    })
      .then(res => res.json())
      .then(data => {
        if (data.rule) {
          setRules(prev => [data.rule, ...prev]);
        }
      })
      .catch(err => console.error("Add rule error:", err));
  };

  const handleGenerateNewReport = (name, ruleSet) => {
    fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, ruleSet })
    })
      .then(res => res.json())
      .then(data => {
        if (data.report) {
          setReportsList(prev => [data.report, ...prev]);
        }
      })
      .catch(err => console.error("Generate report error:", err));
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Left Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar & System Workflow */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* View Router */}
        <main className="flex-1 pb-12">
          {activeTab === 'dashboard' && (
            <DashboardView 
              stats={stats} 
              onNavigate={setActiveTab}
              onStartVerification={() => { triggerVerification(); setActiveTab('verifications'); }}
            />
          )}

          {activeTab === 'rules' && (
            <RuleAuthoringView 
              rules={rules}
              onAddRule={handleAddRule}
              onNavigateToVerification={() => { triggerVerification(); setActiveTab('verifications'); }}
            />
          )}

          {activeTab === 'conflicts' && (
            <ConflictGraphView 
              conflictsData={conflictsData}
            />
          )}

          {activeTab === 'precedence' && (
            <PrecedenceRulesView 
              axioms={axioms}
            />
          )}

          {activeTab === 'verifications' && (
            <div className="space-y-6">
              <VerificationResultView 
                report={report} 
                onTriggerVerify={triggerVerification}
                isVerifying={isVerifying}
              />
              <div className="border-t border-slate-800 pt-6">
                <DerivationSimulatorView />
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <ReportsView 
              reports={reportsList}
              onGenerateNewReport={handleGenerateNewReport}
            />
          )}

          {activeTab === 'corpus' && (
            <CorpusView 
              rules={rules}
            />
          )}

          {activeTab === 'settings' && (
            <div className="p-6 text-center space-y-4">
              <h2 className="text-xl font-bold text-white">System Settings & Scholar Curation</h2>
              <div className="max-w-md mx-auto p-6 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-400 space-y-3">
                <p>Configured for Python 3.11 verification core with Z3 SMT solver and bounded Church-Rosser confluence checker.</p>
                <div className="p-3 bg-slate-950 rounded-xl text-slate-300 font-mono text-[11px] text-left">
                  <div>ENGINE_VERSION: 1.0.0-panini</div>
                  <div>REST_API: http://localhost:5000</div>
                  <div>PARIBHASA_MODE: Strict Commentarial</div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
