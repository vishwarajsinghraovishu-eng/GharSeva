import React from 'react';

interface NotificationsModalProps {
  onClose: () => void;
  onSelectAction: (action: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  onClose,
  onSelectAction
}) => {
  const notifications = [
    {
      id: 'notif-1',
      title: 'New Tenant Inquiry',
      desc: 'Priya Nair (Infosys) inquired about Prestige Falcon City 2 BHK covered parking.',
      time: '35m ago',
      icon: 'chat',
      iconBg: 'bg-[#86f2e4] text-[#006f66]',
      action: 'tenant-enquiries'
    },
    {
      id: 'notif-2',
      title: 'Visit Requested for Tomorrow',
      desc: 'Ananya S. requested a physical visit slot for Hiranandani Estate at 4:00 PM.',
      time: '1h ago',
      icon: 'calendar_month',
      iconBg: 'bg-[#dae2fd] text-[#131b2e]',
      action: 'visit-requests'
    },
    {
      id: 'notif-3',
      title: 'DigiLocker Kaveri Deed Cleared',
      desc: 'Karnataka Kaveri 2.0 gateway verified ownership under Col. Rajesh Sharma.',
      time: '3h ago',
      icon: 'verified',
      iconBg: 'bg-[#6ffbbe] text-[#005236]',
      action: 'owner-verification-kyc'
    },
    {
      id: 'notif-4',
      title: 'Draft Auto-saved',
      desc: 'Your edits to rental terms and pricing were backed up to cloud.',
      time: '11:42 AM',
      icon: 'cloud_done',
      iconBg: 'bg-[#eff4ff] text-[#006a61]',
      action: 'my-properties'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-16 bg-black/40 backdrop-blur-2xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-sm w-full p-4 shadow-2xl flex flex-col gap-3 border border-[#E2E8F0] mt-2 mr-2">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006a61]">notifications</span>
            <span className="font-bold text-sm text-[#0b1c30]">Notifications (4)</span>
          </div>
          <button onClick={onClose} className="p-1 text-[#64748B] hover:text-[#0b1c30]">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex flex-col divide-y divide-[#eff4ff]">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                onSelectAction(n.action);
                onClose();
              }}
              className="py-2.5 flex items-start gap-2.5 hover:bg-[#eff4ff] rounded-lg px-1.5 transition-colors cursor-pointer"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${n.iconBg}`}>
                <span className="material-symbols-outlined text-[16px]">{n.icon}</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0b1c30] truncate">{n.title}</span>
                  <span className="text-[10px] text-[#76777d]">{n.time}</span>
                </div>
                <p className="text-[11px] text-[#45464d] line-clamp-2 mt-0.5">{n.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
