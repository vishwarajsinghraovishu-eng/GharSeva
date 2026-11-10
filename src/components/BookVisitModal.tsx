import React, { useState } from 'react';
import { Property } from '../types';

interface BookVisitModalProps {
  property: Property | null;
  onClose: () => void;
  onSuccess: (date: string, time: string) => void;
}

export const BookVisitModal: React.FC<BookVisitModalProps> = ({
  property,
  onClose,
  onSuccess
}) => {
  const [selectedDay, setSelectedDay] = useState('Tomorrow');
  const [selectedSlot, setSelectedSlot] = useState('04:00 PM - 05:00 PM');
  const [visitorName, setVisitorName] = useState('Ananya Sengupta');
  const [visitorPhone, setVisitorPhone] = useState('+91 98450 12890');
  const [notes, setNotes] = useState('Interested in immediate possession for family.');
  const [isBooked, setIsBooked] = useState(false);

  if (!property) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => {
      onSuccess(selectedDay, selectedSlot);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4 border border-[#E2E8F0]">
        {!isBooked ? (
          <>
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#CCFBF1] text-[#0D9488] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F172A]">Schedule Free Visit</h3>
                  <p className="text-xs text-[#64748B]">{property.title}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-[#64748B] hover:text-[#0F172A] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
              {/* Day selection */}
              <div>
                <label className="text-xs font-bold text-[#45464d] uppercase mb-1.5 block">
                  Select Preferred Day
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Tomorrow', 'This Saturday', 'This Sunday'].map((day) => (
                    <button
                      type="button"
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        selectedDay === day
                          ? 'bg-[#131b2e] text-white border-[#131b2e] shadow-xs'
                          : 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] hover:bg-[#F1F5F9]'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time slot */}
              <div>
                <label className="text-xs font-bold text-[#45464d] uppercase mb-1.5 block">
                  Select Walkthrough Window
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    '10:30 AM - 11:30 AM',
                    '02:00 PM - 03:00 PM',
                    '04:00 PM - 05:00 PM',
                    '06:00 PM - 07:00 PM'
                  ].map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold border text-left transition-all cursor-pointer ${
                        selectedSlot === slot
                          ? 'bg-[#CCFBF1] text-[#006a61] border-[#0D9488] font-bold shadow-xs'
                          : 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] hover:bg-[#F1F5F9]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visitor Details */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#45464d] uppercase mb-1 block">Full Name</label>
                  <input
                    type="text"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold focus:outline-none focus:border-[#0D9488]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#45464d] uppercase mb-1 block">Phone (Masked)</label>
                  <input
                    type="text"
                    value={visitorPhone}
                    onChange={(e) => setVisitorPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold focus:outline-none focus:border-[#0D9488]"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-bold text-[#45464d] uppercase mb-1 block">Note for Landlord (Optional)</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0F172A] focus:outline-none focus:border-[#0D9488]"
                  placeholder="e.g. Planning to move in by next week"
                />
              </div>

              <div className="p-3 rounded-lg bg-[#eff4ff] border border-[#dce9ff] flex items-center gap-2 text-xs text-[#006f66]">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Your visit is direct to the owner with zero brokerage guaranteed.</span>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-lg bg-[#F1F5F9] text-[#0F172A] font-bold text-xs hover:bg-[#E2E8F0] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs shadow-sm cursor-pointer"
                >
                  Confirm Free Booking
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center text-center py-6 gap-3">
            <div className="w-16 h-16 rounded-full bg-[#CCFBF1] text-[#0D9488] flex items-center justify-center animate-bounce">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">Visit Confirmed with Owner!</h3>
            <p className="text-xs text-[#64748B] max-w-sm">
              Your visit pass for <strong>{property.title}</strong> on <strong>{selectedDay} at {selectedSlot}</strong> has been generated and sent via SMS.
            </p>
            <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0F172A] w-full text-left font-mono">
              Gate Pass Code: <strong>GHAR-VISIT-{Math.floor(1000 + Math.random() * 9000)}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
