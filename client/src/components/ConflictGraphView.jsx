import React, { useState } from 'react';
import { Filter, Search, Download, ZoomIn, ZoomOut, Maximize2, Scale, Info, Sparkles } from 'lucide-react';

export default function ConflictGraphView({ conflictsData }) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Nodes for visualization matching mockup
  const nodes = [
    { id: '6.1.77', label: '6.1.77', text: 'इको यणचि', transliteration: 'iko yaṇ aci', x: 200, y: 150, category: 'Sandhi' },
    { id: '6.1.101', label: '6.1.101', text: 'अकः सवर्णे दीर्घः', transliteration: 'akaḥ savarṇe dīrghaḥ', x: 500, y: 150, category: 'Sandhi' },
    { id: '6.1.87', label: '6.1.87', text: 'आद्गुणः', transliteration: 'ād guṇaḥ', x: 200, y: 350, category: 'Sandhi' },
    { id: '6.1.88', label: '6.1.88', text: 'वृद्धिरेचि', transliteration: 'vṛddhir eci', x: 500, y: 350, category: 'Sandhi' },
    { id: '7.3.102', label: '7.3.102', text: 'सुपि च', transliteration: 'supi ca', x: 650, y: 250, category: 'Morphology' },
    { id: '8.2.66', label: '8.2.66', text: 'ससजुषो रुः', transliteration: 'sasajuṣo ruḥ', x: 350, y: 450, category: 'Tripādī' },
    { id: '8.3.15', label: '8.3.15', text: 'खरवसानयोः...', transliteration: 'kharavasānayor...', x: 550, y: 450, category: 'Tripādī' }
  ];

  // Central hub node
  const hub = { id: 'hub-1', label: 'antaraṅga-bahiraṅga', subtitle: '/ 2400', x: 380, y: 240 };

  const filteredNodes = nodes.filter(n => 
    n.label.includes(searchQuery) || 
    n.text.includes(searchQuery) || 
    n.transliteration.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-4 flex flex-col h-[calc(100vh-140px)]">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <div className="text-xs text-indigo-400 font-medium">Conflicts › Interactive Graph</div>
          <h2 className="text-xl font-bold text-white">Conflict Graph</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Conflict Type Filter */}
          <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <Filter className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-400">Conflict Type:</span>
            <select 
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none"
            >
              <option value="All">All Types</option>
              <option value="antaraṅga-bahiraṅga">antaraṅga-bahiraṅga</option>
              <option value="utsarga-apavāda">utsarga-apavāda</option>
              <option value="nitya-anitya">nitya-anitya</option>
              <option value="para">para (later rule prevails)</option>
            </select>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input 
              type="text" 
              placeholder="Search rules or nodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 w-48"
            />
          </div>

          {/* Zoom controls */}
          <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 2))} className="p-1.5 text-slate-300 hover:text-white rounded">
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.6))} className="p-1.5 text-slate-300 hover:text-white rounded">
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setZoomLevel(1)} className="p-1.5 text-slate-300 hover:text-white rounded">
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas & Inspector Drawer */}
      <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden flex">
        {/* Interactive SVG Network Diagram */}
        <div className="flex-1 h-full relative overflow-auto cursor-grab active:cursor-grabbing p-4">
          <svg 
            className="w-full h-full min-h-[500px] transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
          >
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
              </marker>
              <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Connecting Edge Lines */}
            {filteredNodes.map(node => (
              <g key={`edge-${node.id}`}>
                <line 
                  x1={node.x} 
                  y1={node.y} 
                  x2={hub.x} 
                  y2={hub.y} 
                  stroke="url(#edgeGrad)" 
                  strokeWidth="2" 
                  strokeDasharray="4 2"
                />
              </g>
            ))}

            {/* Central Hub Node */}
            <g transform={`translate(${hub.x}, ${hub.y})`} className="cursor-pointer">
              <circle r="48" fill="#4338ca" fillOpacity="0.3" stroke="#6366f1" strokeWidth="2" />
              <circle r="36" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
              <text textAnchor="middle" y="-4" fill="#ffffff" fontSize="11" fontWeight="bold">
                {hub.label}
              </text>
              <text textAnchor="middle" y="12" fill="#a5b4fc" fontSize="9">
                {hub.subtitle}
              </text>
            </g>

            {/* Sūtra Rule Nodes */}
            {filteredNodes.map(node => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <g 
                  key={node.id} 
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => setSelectedNode(node)}
                  className="cursor-pointer transition-transform hover:scale-110"
                >
                  <circle 
                    r="28" 
                    fill={isSelected ? '#6366f1' : '#1e293b'} 
                    stroke={isSelected ? '#c084fc' : '#475569'} 
                    strokeWidth={isSelected ? '3' : '2'}
                  />
                  <text textAnchor="middle" y="-4" fill="#ffffff" fontSize="11" fontWeight="bold">
                    {node.label}
                  </text>
                  <text textAnchor="middle" y="10" fill="#94a3b8" fontSize="8" className="sanskrit-text">
                    {node.text}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Bottom Graph Legend */}
          <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 flex items-center space-x-6 text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-slate-800 border border-slate-500"></span>
              <span>Rule Node</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-indigo-600 border border-indigo-400"></span>
              <span>Conflict Hub</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-6 h-0.5 border-t border-dashed border-indigo-400"></span>
              <span>Edge (Conflict Pair)</span>
            </div>
          </div>
        </div>

        {/* Right Side Node Inspector Drawer */}
        {selectedNode && (
          <div className="w-80 bg-slate-900 border-l border-slate-800 p-5 flex flex-col justify-between shrink-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-indigo-400">{selectedNode.label}</span>
                <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white sanskrit-text">{selectedNode.text}</h3>
                <p className="text-xs text-slate-300 font-serif italic">{selectedNode.transliteration}</p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Context</div>
                  <div className="text-slate-300">ik (i, u, ṛ, ḷ) in pūrva nimitta</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Condition</div>
                  <div className="text-slate-300">followed by ac (vowel)</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Action</div>
                  <div className="text-slate-300">replace ik with yaṇ (y, v, r, l)</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs">
                <div className="font-bold text-indigo-300 mb-1 flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5" /> Resolved Conflict
                </div>
                <p className="text-slate-300 text-[11px]">
                  Conflicts with 6.1.101 (akaḥ savarṇe dīrghaḥ) on savarṇa vowels; 6.1.101 prevails as apavāda.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
