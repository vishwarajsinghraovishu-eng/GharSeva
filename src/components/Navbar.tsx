import React from 'react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenAddProperty: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenAddProperty }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('marketplace-home')}
          className="flex items-center gap-3 group text-left cursor-pointer border-0 bg-transparent"
        >
          <div className="w-9 h-9 rounded-lg bg-[#131b2e] flex items-center justify-center text-[#89f5e7] shadow-sm">
            <span className="material-symbols-outlined text-[22px]">apartment</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-[#0F172A] group-hover:text-[#0D9488] transition-colors leading-tight">
              GharSeva
            </span>
            <span className="text-[10px] font-bold text-[#0D9488] uppercase tracking-wider -mt-0.5">
              Verified Rentals
            </span>
          </div>
        </button>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-semibold text-[#64748B]">
          <button
            onClick={() => onNavigate('marketplace-search')}
            className={`cursor-pointer transition-colors hover:text-[#0D9488] ${
              currentView === 'marketplace-search' ? 'text-[#0D9488] font-bold' : ''
            }`}
          >
            Explore Homes
          </button>
          <button
            onClick={() => {
              onNavigate('marketplace-home');
              setTimeout(() => {
                const el = document.getElementById('how-it-works');
                el?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="cursor-pointer transition-colors hover:text-[#0D9488]"
          >
            How it Works
          </button>
          <button
            onClick={() => {
              onNavigate('marketplace-home');
              setTimeout(() => {
                const el = document.getElementById('zero-brokerage');
                el?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="cursor-pointer transition-colors hover:text-[#0D9488]"
          >
            Zero Brokerage
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('owner-dashboard')}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-bold transition-all border border-[#d3e4fe]"
            title="Switch to Landlord Dashboard"
          >
            <span className="material-symbols-outlined text-[16px] text-[#006a61]">manage_accounts</span>
            <span className="hidden sm:inline">Owner Hub</span>
          </button>

          <button
            onClick={onOpenAddProperty}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-sm transition-all shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Post Property Free</span>
          </button>
        </div>
      </div>
    </header>
  );
};
