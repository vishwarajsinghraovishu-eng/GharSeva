import React from 'react';

interface OwnerHeaderProps {
  currentTab: string;
  onNavigateMarketplace: () => void;
  onSaveAndExit?: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
}

export const OwnerHeader: React.FC<OwnerHeaderProps> = ({
  currentTab,
  onNavigateMarketplace,
  onSaveAndExit,
  onOpenNotifications,
  unreadCount = 4
}) => {
  const isAddProperty = currentTab.startsWith('add-new-property');

  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-white/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-6 border-b border-[#eff4ff]">
      {/* Left zone */}
      <div className="flex items-center gap-4">
        {isAddProperty ? (
          <>
            <button
              onClick={onSaveAndExit}
              className="flex items-center gap-1.5 text-[#45464d] hover:text-[#0b1c30] transition-colors text-xs font-semibold cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Save &amp; Exit</span>
            </button>
            <div className="h-4 w-px bg-[#dce9ff]"></div>
            <div className="flex items-center gap-1.5 text-[#45464d] text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
              <span>Draft Auto-saved at 11:42 AM</span>
            </div>
          </>
        ) : (
          <>
            <button
              onClick={onNavigateMarketplace}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-semibold transition-colors border border-[#d3e4fe] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#006a61]">arrow_back</span>
              <span>Switch to Marketplace</span>
            </button>
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e5eeff] text-[#0b1c30] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
              <span>Direct Lease Mode: Active</span>
            </div>
          </>
        )}
      </div>

      {/* Right zone */}
      <div className="flex items-center gap-4">
        {/* Notification bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-full hover:bg-[#eff4ff] text-[#45464d] hover:text-[#0b1c30] transition-colors cursor-pointer"
          title="Notifications"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#ba1a1a] text-white text-[10px] flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}
        </button>

        <div className="h-5 w-px bg-[#dce9ff]"></div>

        {/* Landlord Profile */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-[#0b1c30]">Col. Rajesh Sharma</span>
              <span className="material-symbols-outlined text-[#006a61] text-[15px]">verified</span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="px-1.5 py-0.2 rounded bg-[#e5eeff] text-[#006a61] text-[9px] font-bold uppercase tracking-wider">
                Verified Landlord
              </span>
              <span className="text-[10px] text-[#45464d]">Whitefield, BLR</span>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-[#000000] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
};
