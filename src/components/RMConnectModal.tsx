import React, { useState } from 'react';

interface RMConnectModalProps {
  onClose: () => void;
}

export const RMConnectModal: React.FC<RMConnectModalProps> = ({ onClose }) => {
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl flex flex-col gap-4 border border-[#E2E8F0]">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#89f5e7] flex items-center justify-center text-[#00201d]">
              <span className="material-symbols-outlined text-[22px]">support_agent</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0b1c30]">Priya Sharma</h3>
              <p className="text-xs text-[#006a61] font-semibold">Senior Relationship Manager • Bengaluru</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#64748B] hover:text-[#0b1c30] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="text-xs text-[#45464d] leading-relaxed">
          Hello Col. Sharma! As your dedicated GharSeva RM, I handle tenant screening, Kaveri deed verification, and scheduling coordination for your Bangalore properties.
        </p>

        {/* Action channels */}
        <div className="flex flex-col gap-2.5">
          <a
            href="https://api.whatsapp.com/send?text=Hi%20Priya%2C%20regarding%20my%20GharSeva%20listing%20at%20Prestige%20Falcon%20City"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-[#e5eeff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-bold transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006a61]"></span>
              <span>Direct WhatsApp Desk</span>
            </div>
            <span className="text-[11px] text-[#006a61]">Instant Ping &rarr;</span>
          </a>

          {!callbackRequested ? (
            <button
              onClick={() => setCallbackRequested(true)}
              className="flex items-center justify-between p-3 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-bold transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#006a61]">call</span>
                <span>Request Phone Callback</span>
              </div>
              <span className="text-[11px] text-[#45464d]">Within 15 mins</span>
            </button>
          ) : (
            <div className="p-3 rounded-xl bg-[#86f2e4]/30 border border-[#86f2e4] text-xs text-[#006f66] font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Callback scheduled to +91 9845X XXXXX</span>
            </div>
          )}
        </div>

        {/* Quick Message Box */}
        <div className="flex flex-col gap-1.5 pt-1">
          <label className="text-[11px] font-bold text-[#45464d] uppercase">Send Message to Priya</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="e.g. Please approve visitor pass for Saturday..."
              className="flex-1 px-3 py-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs focus:outline-none focus:border-[#006a61]"
            />
            <button
              onClick={() => {
                if (messageText.trim()) {
                  setMessageSent(true);
                  setMessageText('');
                  setTimeout(() => setMessageSent(false), 3000);
                }
              }}
              className="px-3 py-2 rounded-lg bg-[#006a61] text-white text-xs font-bold hover:bg-[#005049] transition-colors cursor-pointer"
            >
              Send
            </button>
          </div>
          {messageSent && (
            <span className="text-[11px] text-[#006a61] font-semibold">Message delivered to RM desk!</span>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-2 w-full py-2 rounded-lg bg-[#F1F5F9] text-xs font-bold text-[#0b1c30] hover:bg-[#E2E8F0] cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};
