import React, { useState } from 'react';
import { Property } from '../types';

interface OwnerDashboardProps {
  properties: Property[];
  onOpenAddProperty: () => void;
  onOpenChat: (tenantId?: string) => void;
  onViewPropertyDetails: (property: Property) => void;
  onOpenAgreement: () => void;
}

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({
  properties,
  onOpenAddProperty,
  onOpenChat,
  onViewPropertyDetails,
  onOpenAgreement
}) => {
  const [confirmedVisit, setConfirmedVisit] = useState(false);
  const [downloadSlipToast, setDownloadSlipToast] = useState(false);
  const [kycUploaded, setKycUploaded] = useState(false);

  const handleConfirmVisit = () => {
    setConfirmedVisit(true);
    setTimeout(() => {
      alert('Physical visit confirmed for Ananya S. on Tomorrow at 4:00 PM. Gate pass generated.');
    }, 100);
  };

  const handleDownloadSlips = () => {
    setDownloadSlipToast(true);
    setTimeout(() => setDownloadSlipToast(false), 3000);
  };

  const handleUploadBill = () => {
    setKycUploaded(true);
    alert('BESCOM Electricity Bill uploaded and matched with Kaveri records! Sobha Dream Acres is now 100% verified.');
  };

  return (
    <div className="w-full flex flex-col bg-[#f8f9ff]">
      <div className="max-w-[1280px] w-full mx-auto px-4 md:px-8 py-8 flex flex-col gap-8">
        {/* Toast notification */}
        {downloadSlipToast && (
          <div className="fixed top-20 right-8 z-50 p-4 bg-[#131b2e] text-white rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <span className="material-symbols-outlined text-[#89f5e7]">download_done</span>
            <span className="text-xs font-semibold">Rent slip statement (Oct-Nov 2024) generated and downloaded.</span>
          </div>
        )}

        {/* 1. Warm Greeting & Primary Action Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 md:p-8 rounded-xl shadow-xs border border-[#e5eeff]">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl font-bold text-[#0b1c30]">Welcome back, Rajesh</h1>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#86f2e4] text-[#006f66] text-xs font-bold">
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified_user
                </span>
                Aadhaar Verified Owner
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#45464d]">
              Here is a quick snapshot of your active listings, upcoming visits, and tenant inquiries today.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={handleDownloadSlips}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] transition-colors text-xs font-bold border border-[#dce9ff] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-[#006a61]">receipt_long</span>
              <span>Download Rent Slips</span>
            </button>

            <button
              type="button"
              onClick={onOpenAddProperty}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#006a61] text-white hover:bg-[#005049] transition-all shadow-xs text-xs font-bold cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>+ Post New Property</span>
            </button>
          </div>
        </div>

        {/* 2. Essential Quick Stats (4-tile grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Active Listings */}
          <div className="bg-white p-5 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col justify-between gap-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#45464d] font-bold">Portfolio</span>
              <div className="w-9 h-9 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#006a61]">
                <span className="material-symbols-outlined text-[20px]">apartment</span>
              </div>
            </div>
            <div>
              <span className="text-2xl font-extrabold text-[#0b1c30]">3 Active</span>
              <p className="text-xs text-[#45464d] mt-0.5">Properties published</p>
            </div>
            <div className="flex items-center gap-1.5 text-[#006a61] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
              <span>All 3 generating views</span>
            </div>
          </div>

          {/* Monthly Rent Income */}
          <div className="bg-white p-5 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col justify-between gap-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#45464d] font-bold">Monthly Rent</span>
              <div className="w-9 h-9 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#006a61]">
                <span className="material-symbols-outlined text-[20px]">payments</span>
              </div>
            </div>
            <div>
              <span className="text-2xl font-extrabold text-[#0b1c30]">₹1,42,000</span>
              <p className="text-xs text-[#45464d] mt-0.5">Projected for November</p>
            </div>
            <span className="text-xs text-[#45464d] font-semibold">Auto-collected on 1st</span>
          </div>

          {/* New Inquiries */}
          <div className="bg-white p-5 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col justify-between gap-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#45464d] font-bold">Tenant Leads</span>
              <div className="w-9 h-9 rounded-lg bg-[#86f2e4] flex items-center justify-center text-[#006f66]">
                <span className="material-symbols-outlined text-[20px]">mark_chat_unread</span>
              </div>
            </div>
            <div>
              <span className="text-2xl font-extrabold text-[#0b1c30]">5 Inquiries</span>
              <p className="text-xs text-[#45464d] mt-0.5">Past 48 hours</p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#eff4ff] text-[#0b1c30] text-xs w-fit font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]"></span>
              2 require response
            </div>
          </div>

          {/* Scheduled Visits */}
          <div className="bg-white p-5 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col justify-between gap-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#45464d] font-bold">Physical Visits</span>
              <div className="w-9 h-9 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#006a61]">
                <span className="material-symbols-outlined text-[20px]">event</span>
              </div>
            </div>
            <div>
              <span className="text-2xl font-extrabold text-[#0b1c30]">3 This Week</span>
              <p className="text-xs text-[#45464d] mt-0.5">Next visit: Tomorrow 4 PM</p>
            </div>
            <span className="text-xs text-[#006a61] font-bold">
              {confirmedVisit ? 'All confirmed' : '1 awaiting confirmation'}
            </span>
          </div>
        </div>

        {/* 3. Action Required / Priority Inbox */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006a61] text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                priority_high
              </span>
              <h2 className="text-lg font-bold text-[#0b1c30]">Requires Your Immediate Attention</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold">
                {confirmedVisit ? '1 Action' : '2 Actions'}
              </span>
            </div>
            <span className="text-xs text-[#45464d] hidden sm:inline-block">
              Fast responses increase booking speed by 3x
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Action 1: Visit Approval */}
            <div className="bg-white p-5 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#86f2e4] text-[#006f66] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">calendar_month</span>
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#eff4ff] text-[#006a61] uppercase tracking-wide">
                      Visit Request
                    </span>
                    <span className="text-xs text-[#45464d]">Hiranandani Estate, 3 BHK</span>
                  </div>
                  <h3 className="text-sm font-semibold text-[#0b1c30]">Ananya S. requested physical visit</h3>
                  <p className="text-xs text-[#45464d] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-[#006a61]">schedule</span>
                    Tomorrow, 15 Nov at 4:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1 border-t border-[#eff4ff]">
                <button
                  type="button"
                  onClick={() => alert('Alternate slots sent to Ananya S.: Saturday 11 AM or Sunday 3 PM.')}
                  className="px-3.5 py-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-bold transition-colors cursor-pointer"
                >
                  Reschedule
                </button>
                <button
                  type="button"
                  onClick={handleConfirmVisit}
                  className={`px-4 py-1.5 rounded-lg text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer ${
                    confirmedVisit ? 'bg-[#10B981]' : 'bg-[#006a61] hover:bg-[#005049]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">check</span>
                  <span>{confirmedVisit ? 'Pass Issued' : 'Confirm Visit'}</span>
                </button>
              </div>
            </div>

            {/* Action 2: Tenant Enquiry */}
            <div className="bg-white p-5 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#131b2e] text-[#89f5e7] flex items-center justify-center shrink-0 font-bold text-sm">
                  PN
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-[#0b1c30]">Priya Nair</span>
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#eff4ff] text-[#45464d] text-[10px] font-bold">
                      <span className="material-symbols-outlined text-[13px] text-[#006a61]">verified</span> Infosys Verified
                    </span>
                    <span className="text-[#45464d] text-xs">· 35 mins ago</span>
                  </div>
                  <p className="text-xs text-[#0b1c30] italic bg-[#eff4ff] p-2.5 rounded-lg border border-[#dce9ff] leading-relaxed">
                    "Hi Col. Sharma, does the monthly rent of ₹34,000 for Prestige Falcon City include covered car parking?"
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1 border-t border-[#eff4ff]">
                <button
                  type="button"
                  onClick={() => onOpenChat('conv-priya-nair')}
                  className="px-3.5 py-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-bold transition-colors cursor-pointer"
                >
                  View Profile
                </button>
                <button
                  type="button"
                  onClick={() => onOpenChat('conv-priya-nair')}
                  className="px-4 py-1.5 rounded-lg bg-[#131b2e] text-white hover:bg-[#0b1c30] transition-colors text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#89f5e7]">chat</span>
                  <span>Reply via In-App Chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Active Properties List */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#0b1c30]">My Properties</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#006a61] text-xs font-bold">
                {properties.length} Managed
              </span>
            </div>
            <button
              onClick={onOpenAddProperty}
              className="text-xs text-[#006a61] font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>+ Add New Unit</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {properties.slice(0, 3).map((property, idx) => {
              const isKycItem = property.status === 'under_kyc' && !kycUploaded;

              return (
                <div
                  key={property.id}
                  className="bg-white p-4 md:p-6 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4 w-full md:w-auto">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 relative bg-[#eff4ff]">
                      <img
                        className={`w-full h-full object-cover ${isKycItem ? 'opacity-80' : ''}`}
                        src={property.coverImage}
                        alt={property.title}
                      />
                      <span
                        className={`absolute top-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] font-bold ${
                          isKycItem
                            ? 'bg-[#dce9ff] text-[#0b1c30]'
                            : 'bg-[#006a61] text-white'
                        }`}
                      >
                        {isKycItem ? 'Under KYC' : 'Active'}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-lg font-bold text-[#0b1c30]">
                          ₹{property.rent.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-[#45464d]">/ month</span>
                      </div>

                      <h3 className="text-sm font-semibold text-[#0b1c30] truncate">{property.title}</h3>

                      <p className="text-xs text-[#45464d] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px] text-[#006a61]">location_on</span>
                        {property.fullAddress}
                      </p>

                      {isKycItem ? (
                        <div className="flex items-center gap-2 mt-1.5 max-w-xs">
                          <div className="w-32 bg-[#e5eeff] rounded-full h-2 overflow-hidden">
                            <div className="bg-[#006a61] h-2 rounded-full w-[80%]"></div>
                          </div>
                          <span className="text-[11px] text-[#0b1c30] font-bold">80% Completed</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-[#45464d] flex-wrap">
                          <span className="flex items-center gap-1 font-semibold text-[#0b1c30]">
                            <span className="material-symbols-outlined text-[16px] text-[#006a61]">visibility</span>
                            {property.viewsThisWeek} Views this week
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1 font-semibold text-[#006a61]">
                            <span className="material-symbols-outlined text-[16px]">inbox</span>
                            {property.inquiriesCount} Inquiries
                          </span>
                          <span>·</span>
                          <span>Deposit: {property.depositMonths} Months</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto justify-end pt-2 md:pt-0">
                    {isKycItem ? (
                      <div className="flex flex-col items-end gap-1 w-full sm:w-auto">
                        <button
                          type="button"
                          onClick={handleUploadBill}
                          className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#006a61] text-white hover:bg-[#005049] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">upload_file</span>
                          <span>Upload Electricity Bill</span>
                        </button>
                        <span className="text-[11px] text-[#45464d]">Takes less than 1 min to go live</span>
                      </div>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => onViewPropertyDetails(property)}
                          className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">visibility</span>
                          <span>View Listing</span>
                        </button>
                        <button
                          type="button"
                          onClick={onOpenAddProperty}
                          className="w-full sm:w-auto px-5 py-2 rounded-lg bg-[#131b2e] text-white hover:bg-[#0b1c30] text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">tune</span>
                          <span>Manage</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Direct Lease Tips */}
        <div className="bg-[#eff4ff] p-5 rounded-xl border border-[#dce9ff] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white text-[#006a61] flex items-center justify-center shrink-0 shadow-2xs">
              <span className="material-symbols-outlined text-[20px]">handshake</span>
            </div>
            <div>
              <span className="text-sm font-bold text-[#0b1c30]">Zero-Brokerage Guarantee</span>
              <p className="text-xs text-[#45464d] mt-0.5">
                Tenants pay directly to your account. Digital stamp agreements are generated instantly upon mutual agreement.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenAgreement}
            className="px-4 py-2 rounded-lg bg-white text-[#0b1c30] hover:bg-[#dce9ff] text-xs font-bold transition-colors whitespace-nowrap border border-[#d3e4fe] cursor-pointer shadow-2xs"
          >
            Learn about e-Stamps
          </button>
        </div>
      </div>
    </div>
  );
};
