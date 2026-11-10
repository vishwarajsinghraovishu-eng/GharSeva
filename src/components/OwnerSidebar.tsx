import React from 'react';

interface OwnerSidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onConnectRM: () => void;
}

export const OwnerSidebar: React.FC<OwnerSidebarProps> = ({
  currentTab,
  onSelectTab,
  onConnectRM
}) => {
  const navItems = [
    {
      id: 'dashboard-overview',
      label: 'Dashboard / Overview',
      icon: 'grid_view'
    },
    {
      id: 'my-properties',
      label: 'My Properties',
      icon: 'home_work',
      badge: '6 Active',
      badgeColor: 'bg-[#e5eeff] text-[#006a61]'
    },
    {
      id: 'add-new-property',
      label: 'Add New Property',
      icon: 'add_circle',
      badge: '+ New',
      badgeColor: 'bg-[#006a61] text-white'
    },
    {
      id: 'tenant-enquiries',
      label: 'Tenant Enquiries',
      icon: 'contact_page',
      badge: '12',
      badgeColor: 'bg-[#e5eeff] text-[#45464d]'
    },
    {
      id: 'visit-requests',
      label: 'Visit Requests',
      icon: 'calendar_clock',
      badge: '3 Pending',
      badgeColor: 'bg-[#86f2e4] text-[#006f66]'
    },
    {
      id: 'in-app-messages',
      label: 'In-App Messages',
      icon: 'forum',
      isDot: true
    },
    {
      id: 'rental-agreements-and-e-stamps',
      label: 'Rental Agreements & e-Stamps',
      icon: 'gavel'
    },
    {
      id: 'owner-verification-kyc',
      label: 'Owner Verification / KYC',
      icon: 'verified_user',
      isVerifiedIcon: true
    }
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between border-r border-[#e5eeff]">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between bg-white border-b border-[#eff4ff]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#131b2e] flex items-center justify-center text-[#89f5e7] shadow-sm">
              <span className="material-symbols-outlined text-[22px]">apartment</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[19px] font-extrabold text-[#0b1c30] leading-tight tracking-tight">
                GharSeva
              </span>
              <span className="text-[11px] text-[#006a61] font-bold tracking-wider uppercase">
                Owner Hub
              </span>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <div className="px-3 py-3">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive =
                currentTab === item.id ||
                (currentTab.startsWith('add-new-property') && item.id === 'add-new-property') ||
                (currentTab === 'in-app-messages' && item.id === 'tenant-enquiries');

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-left text-sm transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#131b2e] text-white font-semibold shadow-sm'
                      : 'text-[#45464d] hover:bg-[#e5eeff] hover:text-[#0b1c30]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        isActive ? 'text-[#89f5e7]' : 'text-[#76777d]'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.isDot && <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>}
                  {item.isVerifiedIcon && (
                    <span className="material-symbols-outlined text-[#006a61] text-[18px]">
                      verified
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Relationship Manager Quick Connect Card */}
      <div className="p-3.5 m-3.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex flex-col gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#89f5e7] flex items-center justify-center text-[#00201d] shrink-0">
            <span className="material-symbols-outlined text-[18px]">support_agent</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs text-[#0b1c30] font-bold leading-tight">RM Support Active</span>
            <span className="text-[11px] text-[#45464d] truncate">Priya S. (Bengaluru Hub)</span>
          </div>
        </div>
        <button
          onClick={onConnectRM}
          className="w-full py-1.5 rounded-lg bg-white hover:bg-[#dce9ff] text-center text-xs font-bold text-[#0b1c30] transition-colors border border-[#d3e4fe] cursor-pointer shadow-xs"
        >
          Connect RM
        </button>
      </div>
    </aside>
  );
};
