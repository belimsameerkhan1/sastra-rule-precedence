import React, { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  GitMerge,
  Scale,
  CheckCircle2,
  FileText,
  Database,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const [open, setOpen] = useState(false);

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
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
            Ś
          </div>

          <div>
            <h1 className="text-white font-bold text-sm">Śāstra</h1>
            <p className="text-indigo-400 text-xs">Rule Precedence</p>
          </div>
        </div>

        <button onClick={() => setOpen(!open)}>
          {open ? (
            <X className="text-white" />
          ) : (
            <Menu className="text-white" />
          )}
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:sticky
        top-0 left-0
        z-50
        h-screen
        w-64
        bg-slate-900
        border-r
        border-slate-800
        flex
        flex-col
        justify-between
        transition-transform
        duration-300

        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        <div>
          <div className="p-5 border-b border-slate-800 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
              Ś
            </div>

            <div>
              <h1 className="text-base font-bold text-white">
                Śāstra
              </h1>

              <p className="text-xs text-indigo-400">
                Rule Precedence
              </p>
            </div>
          </div>

          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition
                  ${
                    active
                      ? "bg-indigo-600 text-white"
                      : "text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-900 flex items-center justify-center text-xs font-bold">
              SA
            </div>

            <div>
              <div className="text-xs font-semibold text-white flex items-center gap-1">
                Scholar Admin
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
              </div>

              <div className="text-[11px] text-slate-500">
                admin@sastra.dev
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
