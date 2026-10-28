import React from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenPPDB: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenPPDB,
}) => {
  const navItems = [
    { id: 'kegiatan', label: 'Kegiatan' },
    { id: 'prestasi', label: 'Prestasi' },
    { id: 'fasilitas', label: 'Fasilitas' },
    { id: 'alumni', label: 'Alumni' },
    { id: 'transparansi', label: 'Transparansi' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark in display face */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0"
          >
            SMPS SURYA MANDALA
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    const el = document.getElementById(item.id);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                    isActive
                      ? 'border-emerald-700 text-stone-900 font-semibold'
                      : 'border-transparent hover:text-stone-900 hover:border-stone-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenPPDB}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 rounded-md hover:bg-emerald-900 transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              Pendaftaran Siswa
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav rail */}
      <div className="md:hidden flex overflow-x-auto py-2.5 px-4 gap-2 border-t border-stone-100 bg-stone-50/80">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              const el = document.getElementById(item.id);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`px-3 py-1 text-xs font-medium rounded-sm whitespace-nowrap shrink-0 ${
              activeTab === item.id
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
