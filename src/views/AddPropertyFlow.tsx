import React, { useState } from 'react';
import { Property } from '../types';

interface AddPropertyFlowProps {
  onFinishListing: (newProperty: Property) => void;
  onGoToDashboard: () => void;
  onViewPublicListing: (propertyId: string) => void;
  onConnectRM: () => void;
}

export const AddPropertyFlow: React.FC<AddPropertyFlowProps> = ({
  onFinishListing,
  onGoToDashboard,
  onViewPublicListing,
  onConnectRM
}) => {
  // Step tracking: 1 (Property & Location), 2 (Rent & Terms), 3 (Photos & Publish), 4 (Celebration Live)
  const [currentStep, setCurrentStep] = useState<number>(2);

  // Step 1 Details
  const [propertyName, setPropertyName] = useState('Prestige Falcon City, 2 BHK');
  const [locality, setLocality] = useState('Kanakapura Road, South Bengaluru');
  const [bhk, setBhk] = useState('2 BHK');
  const [area, setArea] = useState(1240);
  const [floor, setFloor] = useState('7th Floor / 24');
  const [furnishing, setFurnishing] = useState<'Semi-Furnished' | 'Furnished' | 'Unfurnished'>('Semi-Furnished');

  // Step 2 Form State
  const [rentAmount, setRentAmount] = useState<number>(34000);
  const [isNegotiable, setIsNegotiable] = useState(true);
  const [depositTier, setDepositTier] = useState<'2_months' | '3_months' | 'custom'>('3_months');
  const [customDeposit, setCustomDeposit] = useState<number>(102000);
  const [maintenanceType, setMaintenanceType] = useState<'included' | 'extra'>('extra');
  const [maintenanceAmount, setMaintenanceAmount] = useState<number>(3500);
  const [availableType, setAvailableType] = useState<'immediately' | 'date'>('immediately');
  const [tenantPreferences, setTenantPreferences] = useState<string[]>([
    'Families',
    'Bachelors / Singles',
    'Company Lease'
  ]);

  // Step 3 Form State
  const [verificationMethod, setVerificationMethod] = useState<'bill' | 'digilocker'>('bill');
  const [publishImmediately, setPublishImmediately] = useState(true);
  const [contactPref, setContactPref] = useState<'chat' | 'call'>('chat');
  const [showFullPreviewModal, setShowFullPreviewModal] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [galleryImages, setGalleryImages] = useState([
    {
      id: 'img-1',
      title: 'Living Room',
      isCover: true,
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0PsUzkF5q0fkT5nMMm2v4LGZOmqjg0J3PQ41YiUT7NV57v6GyUx_kChJfLCfzwiQMhfGlB0a4TzHc0TlfS4b9z1iigoR-WmKrBZBfsOdkeQxtPyni6BmSuqt5IbM3Qu4UqYDAMAq21q5ENu0eZoZ4AUrz6PKdS_oMmY-2TcYCysJs9Li11h_sWzbCQqtgbQdwJAOEfYe8Sb-mNp5vnsiok_mSK0gANEoPpLAQqRU'
    },
    {
      id: 'img-2',
      title: 'Master Bedroom',
      isCover: false,
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChhfy_jGZvn0xMkocNbF58nQfYcktHzeYqBWu_P7qNclO4k3Ih76Mvve_FKY93OkWitfUatF8Wnu29I5uaV9hlv4kko1OfyLYx0h7OjFmhgzjhfjCiWN6V3Qh5Jv4Q2UeyMvm5rh-raoPUQFKC-2B5fcUbqc5rc5vWNSsZuYl_wCvDTF5g-jiAMn7LzLy0r0J6PYGm1AAdbk6wovvHJc4BSRvrz8j7T8wmWySxUTQ'
    },
    {
      id: 'img-3',
      title: 'Kitchen',
      isCover: false,
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe00NT8VBOK-ZAJjIBiqE0AgC8OxuOlmYQ1zCtL2rn6y80d2pmJYQ8oGbwEfLm869XC3h7UK4UK1hoTxiQn-s5yPOTXJU7aH2z1cH88RKPGbzZS96v0-YjyK2CZ8ywmC2IrOO8koKDLHrp5-n-zEpq3H2yIVqaU5dJjGPZqsn2WBEZzo4PNglF6ieJfEGjm2QmTGrU5H5KEMfOeca4CC6-neqUPUQyyacJbK9aRvk'
    },
    {
      id: 'img-4',
      title: 'Balcony / View',
      isCover: false,
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWf598U6IDB1ixNQv0kZIpaB3maF9XhZwCb3xu2WFjYrm0KY3Es97d5W0W2zd-9dYMyFJ4NFGgDsUqysCFSwrUk9wJ1dpqo_-SH-AZ3wI9sWInqyRCwMNCbIwsIP24zlvdNGqFR2aKKLCb3umMFEVggEd6c30kt3C9_ySxKZdP5ilpAuvvRQjznE1UMYEa3XUlsH2PCokOJUaUktwfEYzJSBoSyDZE8HubzeJpp4M'
    }
  ]);

  // Step 4 Celebration State
  const [linkCopied, setLinkCopied] = useState(false);
  const [weekendSlotsEnabled, setWeekendSlotsEnabled] = useState(true);

  // Compute active deposit
  const calculatedDeposit =
    depositTier === '2_months'
      ? rentAmount * 2
      : depositTier === '3_months'
      ? rentAmount * 3
      : customDeposit;

  // Toggle tenant preference chip
  const toggleTenantPreference = (pref: string) => {
    setTenantPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://gharseva.in/rent/blr-prestige-falcon-city-704');
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2500);
  };

  const handlePublish = () => {
    setShowSubmissionModal(true);
    setTimeout(() => {
      setShowSubmissionModal(false);
      setCurrentStep(4); // Move to Celebratory Live screen
    }, 2000);
  };

  /* -------------------------------------------------------------
   * STEP 4: CELEBRATION / LISTING LIVE SCREEN
   * ------------------------------------------------------------- */
  if (currentStep === 4) {
    return (
      <div className="flex flex-col w-full relative overflow-hidden bg-[#f8f9ff] min-h-screen">
        {/* Subtle Ambient Glow Orbs */}
        <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-[#89f5e7]/30 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-[#4edea3]/20 blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-8 relative z-10">
          {/* Celebratory Hero Header */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-2 pt-2">
            {/* Animated Badge */}
            <div className="relative flex items-center justify-center mb-1">
              <div className="w-20 h-20 rounded-full bg-[#86f2e4]/40 flex items-center justify-center animate-pulse"></div>
              <div className="absolute w-14 h-14 rounded-full bg-[#006a61] flex items-center justify-center shadow-lg shadow-[#006a61]/20">
                <span className="material-symbols-outlined text-white text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
              </div>
              <span className="absolute -top-1 -right-2 material-symbols-outlined text-[#006a61] text-[20px] animate-bounce">
                auto_awesome
              </span>
            </div>

            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white shadow-xs border border-[#e5eeff]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006a61] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#006a61]"></span>
              </span>
              <span className="text-xs font-bold text-[#006a61] uppercase tracking-wider">
                Status: Live &amp; Verified
              </span>
              <span className="text-[#c6c6cd]">•</span>
              <span className="text-xs text-[#45464d] font-medium">Auto-synced with Bengaluru RM Desk</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0b1c30] tracking-tight">
              Congratulations, Rajesh! Your Listing is Live 🎉
            </h1>
            <p className="text-sm sm:text-base text-[#45464d] max-w-2xl">
              <strong className="font-semibold text-[#0b1c30]">Prestige Falcon City, 2 BHK</strong> in Kanakapura Road, South Bengaluru is now actively broadcasting to verified tenants and corporate professionals.
            </p>
          </div>

          {/* Central Showcase Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT: Live Property Mini-Card (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-xl shadow-xs border border-[#e5eeff] p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-[#45464d] font-bold">Listing Preview Snapshot</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#45464d] text-xs font-semibold">
                    MLS ID #BLR-70491
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#86f2e4]/50 text-[#006f66] text-xs font-bold">
                  <span className="material-symbols-outlined text-[15px]">verified_user</span>
                  <span>100% Owner Verified</span>
                </div>
              </div>

              {/* Property Card Structure */}
              <div className="flex flex-col sm:flex-row gap-4 bg-[#eff4ff] rounded-xl p-4 border border-[#dce9ff]">
                <div className="relative w-full sm:w-56 h-44 rounded-lg overflow-hidden shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRwBh_WIFCYrT7hJApZCDfx-fEtA0H9K_uJx8K6G8Q45OLhN1vEE85R2gi1qymE6SJAFHJZ8eeW3XmTR7_r93Dht8xKw6WxmPocI_ndSImv2SbbcWPo9OyEKpEUy28Vz0oI4H1LJaTo030ZBCUbsn8mcGbsj-Q4q4VTX1bUEqCYnXoGTAnRLTzgbs_xsbyXb3NwXlr_O9ookm11uxcuEhJ-LMaMBFW2CPTLITCLWw"
                    alt="Prestige Falcon City"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#006a61] text-white text-[11px] font-bold flex items-center gap-1 shadow-xs">
                    <span className="material-symbols-outlined text-[13px]">check_circle</span>
                    <span>Zero Brokerage</span>
                  </div>
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#131b2e]/90 text-white text-[11px] font-medium backdrop-blur-xs">
                    14 High-Res Photos
                  </div>
                </div>

                <div className="flex flex-col justify-between w-full min-w-0 py-0.5">
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xl font-extrabold text-[#0b1c30]">
                        ₹{rentAmount.toLocaleString('en-IN')}{' '}
                        <span className="text-xs font-normal text-[#45464d]">/ month</span>
                      </span>
                      <span className="text-[11px] font-bold text-[#006a61] bg-[#86f2e4]/40 px-2 py-0.5 rounded">
                        {maintenanceType === 'included' ? 'Incl. Maintenance' : `+ ₹${maintenanceAmount.toLocaleString('en-IN')} Maint.`}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-[#0b1c30] truncate">{propertyName}</h3>
                    <div className="flex items-center gap-1 text-[#45464d] text-xs truncate">
                      <span className="material-symbols-outlined text-[16px] text-[#006a61] shrink-0">location_on</span>
                      <span className="truncate">{locality}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 my-2">
                    <span className="px-2 py-0.5 rounded bg-white text-[#0b1c30] text-[11px] font-semibold border border-[#dce9ff]">
                      {area} sq.ft
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white text-[#0b1c30] text-[11px] font-semibold border border-[#dce9ff]">
                      {furnishing}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white text-[#0b1c30] text-[11px] font-semibold border border-[#dce9ff]">
                      {floor}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white text-[#0b1c30] text-[11px] font-semibold border border-[#dce9ff]">
                      East Facing
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs text-[#45464d]">
                    <span>
                      Security Deposit: <strong className="text-[#0b1c30]">₹{calculatedDeposit.toLocaleString('en-IN')}</strong>
                    </span>
                    <span className="text-[#006a61] font-bold">Ready for Possession</span>
                  </div>
                </div>
              </div>

              {/* Shareable URL Container */}
              <div className="flex flex-col gap-1.5 pt-1">
                <label className="text-xs uppercase tracking-wider text-[#45464d] font-bold">
                  Public Shareable Listing Link
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center bg-[#eff4ff] px-3.5 py-2.5 rounded-lg text-[#0b1c30] text-xs font-mono overflow-hidden border border-[#dce9ff]">
                    <span className="material-symbols-outlined text-[#006a61] text-[18px] mr-2 shrink-0">link</span>
                    <span className="truncate select-all">https://gharseva.in/rent/blr-prestige-falcon-city-704</span>
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2.5 rounded-lg bg-[#dce9ff] hover:bg-[#d3e4fe] text-[#0b1c30] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {linkCopied ? 'check' : 'content_copy'}
                    </span>
                    <span>{linkCopied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Multi-Channel Instant Share */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 bg-[#eff4ff]/60 p-3 rounded-lg border border-[#dce9ff]">
                <span className="text-xs text-[#45464d] font-medium">Broadcast directly to prospective tenants:</span>
                <div className="flex items-center gap-1.5">
                  <a
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs border border-[#dce9ff]"
                    href="https://api.whatsapp.com/send?text=Hi%2C%20check%20out%20my%20newly%20listed%202%20BHK%20flat%20at%20Prestige%20Falcon%20City%20on%20GharSeva%3A%20https%3A%2F%2Fgharseva.in%2Frent%2Fblr-prestige-falcon-city-704"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
                    <span>WhatsApp</span>
                  </a>
                  <a
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs border border-[#dce9ff]"
                    href="https://t.me/share/url?url=https://gharseva.in/rent/blr-prestige-falcon-city-704&text=Verified%20Rental%20at%20Prestige%20Falcon%20City"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#45464d]">send</span>
                    <span>Telegram</span>
                  </a>
                  <button
                    onClick={() => alert('Email drafted with public listing link.')}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs border border-[#dce9ff] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#45464d]">mail</span>
                    <span>Email</span>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: Next Immediate High-Value Setup Actions (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-white rounded-xl shadow-xs border border-[#e5eeff] p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006a61] text-[22px]">tune</span>
                    <h2 className="text-base font-bold text-[#0b1c30]">Recommended Actions</h2>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-xs font-bold">
                    Priority
                  </span>
                </div>

                {/* Action Item 1: Visit Slot Configuration */}
                <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex flex-col gap-2 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#131b2e] flex items-center justify-center text-white shrink-0">
                        <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#0b1c30]">Preferred Visit Windows</span>
                        <span className="text-[11px] text-[#45464d]">Sat &amp; Sun (10:00 AM – 05:00 PM)</span>
                      </div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={weekendSlotsEnabled}
                        onChange={(e) => setWeekendSlotsEnabled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-6 bg-[#d3e4fe] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006a61]"></div>
                    </label>
                  </div>

                  <p className="text-xs text-[#45464d]">
                    Pre-authorized weekend slots reduce back-and-forth phone calls by 75%.
                  </p>

                  <div className="flex justify-end">
                    <button
                      onClick={() => alert('Modify Visit Slots: Select preferred timings in modal.')}
                      className="text-xs text-[#006a61] hover:underline flex items-center gap-0.5 font-bold cursor-pointer"
                    >
                      <span>Modify Time Slots</span>
                      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </button>
                  </div>
                </div>

                {/* Action Item 2: DigiLocker Title Cleared */}
                <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#006a61] flex items-center justify-center text-white shrink-0">
                    <span className="material-symbols-outlined text-[20px]">task_alt</span>
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0b1c30]">DigiLocker Title Cleared</span>
                      <span className="px-2 py-0.5 rounded bg-white text-[#006a61] text-[10px] font-bold border border-[#dce9ff]">
                        0.45s
                      </span>
                    </div>
                    <p className="text-xs text-[#45464d] mt-1">
                      Sale Deed &amp; Khata verified via Karnataka Kaveri 2.0 gateway under Col. Rajesh Sharma.
                    </p>
                  </div>
                </div>

                {/* Action Item 3: Zero-Broker Spam Filter */}
                <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#dce9ff] flex items-center justify-center text-[#006a61] shrink-0">
                    <span className="material-symbols-outlined text-[20px]">shield</span>
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0b1c30]">Zero-Broker Spam Filter</span>
                      <span className="px-2 py-0.5 rounded bg-white text-[#45464d] text-[10px] font-bold border border-[#dce9ff]">
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-[#45464d] mt-1">
                      Brokers, agents, and unsolicited marketing are automatically quarantined.
                    </p>
                  </div>
                </div>
              </div>

              {/* RM Support Micro Card */}
              <div className="bg-[#eff4ff] border border-[#dce9ff] rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#89f5e7] flex items-center justify-center text-[#00201d]">
                    <span className="material-symbols-outlined text-[20px]">support_agent</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#0b1c30]">Assigned Relationship Mgr</span>
                    <span className="text-[11px] text-[#45464d]">Priya Sharma • Direct line available</span>
                  </div>
                </div>
                <button
                  onClick={onConnectRM}
                  className="px-4 py-1.5 rounded-lg bg-white hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-bold shadow-2xs border border-[#dce9ff] transition-colors cursor-pointer"
                >
                  Ping RM
                </button>
              </div>
            </div>
          </div>

          {/* What Happens Next: Process Roadmap */}
          <div className="bg-white rounded-xl shadow-xs border border-[#e5eeff] p-6 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-[#0b1c30]">What Happens Next?</h2>
                <p className="text-xs text-[#45464d]">Your roadmap from first inquiry to digital rental agreement execution.</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#006a61] font-bold">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Guaranteed Broker-Free Lifecycle</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              <div className="flex flex-col gap-1 p-4 rounded-xl bg-[#86f2e4]/20 border border-[#86f2e4]/40">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-[#006a61] text-white text-xs flex items-center justify-center font-bold">
                    ✓
                  </span>
                  <span className="text-[10px] text-[#006a61] font-bold uppercase tracking-wider">Completed</span>
                </div>
                <h4 className="text-xs font-bold text-[#0b1c30] mt-1">1. Listing Published</h4>
                <p className="text-xs text-[#45464d]">Your property is syndicated on GharSeva web and mobile tenant feeds.</p>
              </div>

              <div className="flex flex-col gap-1 p-4 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-[#131b2e] text-white text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  <span className="text-[10px] text-[#45464d] font-bold">Up Next</span>
                </div>
                <h4 className="text-xs font-bold text-[#0b1c30] mt-1">2. Inquiries &amp; Chat</h4>
                <p className="text-xs text-[#45464d]">Verified tenants send inquiries. Get real-time WhatsApp &amp; In-App push pings.</p>
              </div>

              <div className="flex flex-col gap-1 p-4 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-[#dce9ff] text-[#45464d] text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  <span className="text-[10px] text-[#45464d] font-bold">Stage 3</span>
                </div>
                <h4 className="text-xs font-bold text-[#0b1c30] mt-1">3. Guided Visit Booking</h4>
                <p className="text-xs text-[#45464d]">Approve or reschedule tenant visit requests with a single click from your phone.</p>
              </div>

              <div className="flex flex-col gap-1 p-4 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-[#dce9ff] text-[#45464d] text-xs flex items-center justify-center font-bold">
                    4
                  </span>
                  <span className="text-[10px] text-[#45464d] font-bold">Closing</span>
                </div>
                <h4 className="text-xs font-bold text-[#0b1c30] mt-1">4. e-Stamping &amp; Lease</h4>
                <p className="text-xs text-[#45464d]">Aadhaar-based digital lease signature and instant security deposit escrow.</p>
              </div>
            </div>
          </div>

          {/* Final CTA Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 pb-8">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onViewPublicListing('blr-70491')}
                className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-[#006a61] hover:bg-[#005049] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">visibility</span>
                <span>View Public Listing</span>
              </button>

              <button
                type="button"
                onClick={onGoToDashboard}
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-[#131b2e] hover:bg-[#0b1c30] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">grid_view</span>
                <span>Go to Owner Dashboard</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2.5 rounded-lg bg-white hover:bg-[#eff4ff] text-[#0b1c30] font-bold text-xs flex items-center gap-1.5 transition-colors border border-[#dce9ff] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Post Another Property</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------
   * STEP 1: PROPERTY & LOCATION
   * ------------------------------------------------------------- */
  if (currentStep === 1) {
    return (
      <div className="flex flex-col w-full bg-[#f8f9ff] min-h-screen">
        {/* Stepper Breadcrumb */}
        <div className="w-full bg-white px-8 py-4 shadow-xs border-b border-[#e5eeff]">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#006a61] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                1
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#006a61] uppercase font-bold tracking-wider">Step 1</span>
                <span className="text-xs text-[#0b1c30] font-bold leading-none">Property &amp; Location</span>
              </div>
            </div>
            <div className="h-0.5 flex-1 mx-4 bg-[#e5eeff]"></div>
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-8 h-8 rounded-full bg-[#eff4ff] text-[#45464d] flex items-center justify-center font-bold text-xs">
                2
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#45464d] uppercase tracking-wider">Step 2</span>
                <span className="text-xs text-[#45464d] leading-none">Rent &amp; Terms</span>
              </div>
            </div>
            <div className="h-0.5 flex-1 mx-4 bg-[#e5eeff]"></div>
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-8 h-8 rounded-full bg-[#eff4ff] text-[#45464d] flex items-center justify-center font-bold text-xs">
                3
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#45464d] uppercase tracking-wider">Step 3</span>
                <span className="text-xs text-[#45464d] leading-none">Photos &amp; Publish</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="max-w-3xl mx-auto w-full px-6 py-8 flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-[#0b1c30] tracking-tight">Property Details &amp; Location</h1>
            <p className="text-xs text-[#45464d] mt-1">Specify your flat configuration and apartment project details.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-xs border border-[#e5eeff] flex flex-col gap-4">
            <div>
              <label className="text-xs font-bold text-[#0b1c30] block mb-1">Project / Society Name *</label>
              <input
                type="text"
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                className="w-full h-11 px-3.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff] text-xs font-bold text-[#0b1c30] focus:outline-none focus:border-[#006a61]"
                placeholder="e.g. Prestige Falcon City"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#0b1c30] block mb-1">Locality &amp; Address *</label>
              <input
                type="text"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full h-11 px-3.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff] text-xs font-semibold text-[#0b1c30] focus:outline-none focus:border-[#006a61]"
                placeholder="e.g. Kanakapura Road, South Bengaluru"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-[#0b1c30] block mb-1">BHK Configuration</label>
                <select
                  value={bhk}
                  onChange={(e) => setBhk(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff] text-xs font-bold text-[#0b1c30] focus:outline-none cursor-pointer"
                >
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="4+ BHK">4+ BHK</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0b1c30] block mb-1">Built-up Area (sq.ft)</label>
                <input
                  type="number"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full h-11 px-3.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff] text-xs font-bold text-[#0b1c30] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#0b1c30] block mb-1">Floor Level</label>
                <input
                  type="text"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff] text-xs font-semibold text-[#0b1c30] focus:outline-none"
                  placeholder="e.g. 7th of 24 Floors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#0b1c30] block mb-1">Furnishing Status</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Semi-Furnished', 'Furnished', 'Unfurnished'] as const).map((f) => (
                  <button
                    type="button"
                    key={f}
                    onClick={() => setFurnishing(f)}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                      furnishing === f
                        ? 'bg-[#131b2e] text-white border-[#131b2e]'
                        : 'bg-[#eff4ff] text-[#45464d] border-[#dce9ff] hover:bg-[#dce9ff]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#eff4ff]">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-6 py-2.5 rounded-lg bg-[#006a61] hover:bg-[#005049] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Continue to Step 2: Rent &amp; Terms</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------
   * STEP 2: RENT & TERMS (Exact replica of code_02949d49.html)
   * ------------------------------------------------------------- */
  if (currentStep === 2) {
    return (
      <div className="flex flex-col w-full bg-[#f8f9ff] min-h-screen">
        {/* Stepper Breadcrumb Track */}
        <div className="w-full bg-white px-8 py-4 shadow-xs border-b border-[#e5eeff]">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setCurrentStep(1)}
            >
              <div className="w-8 h-8 rounded-full bg-[#86f2e4] flex items-center justify-center text-[#006f66]">
                <span className="material-symbols-outlined text-[18px] font-bold">check</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#45464d] uppercase tracking-wider">Step 1</span>
                <span className="text-xs text-[#0b1c30] font-semibold leading-none">Property &amp; Location</span>
              </div>
            </div>

            <div className="h-0.5 flex-1 mx-4 bg-[#006a61]"></div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#006a61] text-white flex items-center justify-center shadow-md shadow-[#006a61]/20">
                <span className="text-xs font-bold">2</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#006a61] font-bold uppercase tracking-wider">Step 2</span>
                <span className="text-xs text-[#0b1c30] font-bold leading-none">Rent &amp; Terms</span>
              </div>
            </div>

            <div className="h-0.5 flex-1 mx-4 bg-[#e5eeff]"></div>

            <div
              className="flex items-center gap-2 opacity-50 cursor-pointer"
              onClick={() => setCurrentStep(3)}
            >
              <div className="w-8 h-8 rounded-full bg-[#eff4ff] text-[#45464d] flex items-center justify-center">
                <span className="text-xs font-semibold">3</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#45464d] uppercase tracking-wider">Step 3</span>
                <span className="text-xs text-[#45464d] leading-none">Photos &amp; Publish</span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Work Area: Asymmetric Split Grid */}
        <div className="max-w-7xl mx-auto w-full px-6 py-8">
          <div className="grid grid-cols-12 gap-8 items-start">
            {/* Left Column (8 cols) */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-[#0b1c30] tracking-tight">Rental Pricing &amp; Terms</h1>
                <p className="text-xs text-[#45464d]">
                  Set simple, competitive rental terms. GharSeva charge 0% brokerage for landlords and tenants.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-xs border border-[#e5eeff] flex flex-col gap-6">
                {/* Monthly Expected Rent */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-[#0b1c30] flex items-center gap-1">
                      Monthly Expected Rent <span className="text-[#ba1a1a] font-bold">*</span>
                    </label>
                    <span className="text-xs text-[#45464d]">Excludes utility bills</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    <div className="col-span-1 md:col-span-8 relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <span className="text-sm text-[#45464d] font-bold">₹</span>
                      </div>
                      <input
                        className="w-full h-12 pl-8 pr-3.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-xl font-extrabold outline-none focus:bg-white focus:ring-2 focus:ring-[#006a61] transition-all border border-[#dce9ff]"
                        type="number"
                        value={rentAmount}
                        onChange={(e) => setRentAmount(Number(e.target.value))}
                        placeholder="34000"
                      />
                    </div>

                    <div className="col-span-1 md:col-span-4 flex items-center justify-between px-3.5 py-2 rounded-lg bg-[#eff4ff] border border-[#dce9ff]">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#0b1c30]">Negotiable</span>
                        <span className="text-[11px] text-[#45464d]">
                          {isNegotiable ? 'Accept offers' : 'Fixed price'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsNegotiable(!isNegotiable)}
                        className={`w-12 h-6 rounded-full p-0.5 flex items-center transition-colors cursor-pointer ${
                          isNegotiable ? 'bg-[#006a61]' : 'bg-[#c6c6cd]'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                            isNegotiable ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        ></div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Security Deposit */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-[#0b1c30] flex items-center gap-1">
                      Security Deposit <span className="text-[#ba1a1a] font-bold">*</span>
                    </label>
                    <span className="text-xs text-[#006a61] font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">shield</span> 100% Refundable
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label
                      onClick={() => setDepositTier('2_months')}
                      className={`flex flex-col p-4 rounded-xl cursor-pointer transition-all border ${
                        depositTier === '2_months'
                          ? 'bg-[#dce9ff] border-[#006a61] shadow-2xs'
                          : 'bg-[#eff4ff] border-[#dce9ff] hover:bg-[#e5eeff]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#0b1c30]">2 Months</span>
                        <input
                          type="radio"
                          name="deposit_tier"
                          checked={depositTier === '2_months'}
                          onChange={() => setDepositTier('2_months')}
                          className="accent-[#006a61]"
                        />
                      </div>
                      <span className="text-base font-bold text-[#0b1c30]">
                        ₹{(rentAmount * 2).toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-[#45464d] mt-1">Standard option</span>
                    </label>

                    <label
                      onClick={() => setDepositTier('3_months')}
                      className={`flex flex-col p-4 rounded-xl cursor-pointer transition-all border relative overflow-hidden ${
                        depositTier === '3_months'
                          ? 'bg-[#dce9ff] border-[#006a61] shadow-2xs'
                          : 'bg-[#eff4ff] border-[#dce9ff] hover:bg-[#e5eeff]'
                      }`}
                    >
                      <div className="absolute top-0 right-0 bg-[#006a61] text-white text-[9px] px-2 py-0.5 rounded-bl font-bold uppercase">
                        Recommended
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#0b1c30]">3 Months</span>
                        <input
                          type="radio"
                          name="deposit_tier"
                          checked={depositTier === '3_months'}
                          onChange={() => setDepositTier('3_months')}
                          className="accent-[#006a61]"
                        />
                      </div>
                      <span className="text-base font-bold text-[#0b1c30]">
                        ₹{(rentAmount * 3).toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-[#45464d] mt-1">Most popular in area</span>
                    </label>

                    <label
                      onClick={() => setDepositTier('custom')}
                      className={`flex flex-col p-4 rounded-xl cursor-pointer transition-all border ${
                        depositTier === 'custom'
                          ? 'bg-[#dce9ff] border-[#006a61] shadow-2xs'
                          : 'bg-[#eff4ff] border-[#dce9ff] hover:bg-[#e5eeff]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#0b1c30]">Custom</span>
                        <input
                          type="radio"
                          name="deposit_tier"
                          checked={depositTier === 'custom'}
                          onChange={() => setDepositTier('custom')}
                          className="accent-[#006a61]"
                        />
                      </div>
                      {depositTier === 'custom' ? (
                        <input
                          type="number"
                          value={customDeposit}
                          onChange={(e) => setCustomDeposit(Number(e.target.value))}
                          className="w-full bg-white px-2 py-0.5 rounded text-xs font-bold text-[#0b1c30] border border-[#006a61]"
                        />
                      ) : (
                        <span className="text-base font-bold text-[#0b1c30]">Specify ₹</span>
                      )}
                      <span className="text-[11px] text-[#45464d] mt-1">Enter manual figure</span>
                    </label>
                  </div>
                </div>

                {/* Society Maintenance Charges */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#0b1c30] flex items-center gap-1">
                    Society Maintenance Charges <span className="text-[#ba1a1a] font-bold">*</span>
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label
                      onClick={() => setMaintenanceType('included')}
                      className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all border ${
                        maintenanceType === 'included'
                          ? 'bg-[#dce9ff] border-[#006a61]'
                          : 'bg-[#eff4ff] border-[#dce9ff]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="maintenance_type"
                        checked={maintenanceType === 'included'}
                        onChange={() => setMaintenanceType('included')}
                        className="mt-1 accent-[#006a61]"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#0b1c30]">Included in Rent</span>
                        <p className="text-xs text-[#45464d]">Paid directly by owner to the society.</p>
                      </div>
                    </label>

                    <label
                      onClick={() => setMaintenanceType('extra')}
                      className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all border ${
                        maintenanceType === 'extra'
                          ? 'bg-[#dce9ff] border-[#006a61]'
                          : 'bg-[#eff4ff] border-[#dce9ff]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="maintenance_type"
                        checked={maintenanceType === 'extra'}
                        onChange={() => setMaintenanceType('extra')}
                        className="mt-1 accent-[#006a61]"
                      />
                      <div className="flex flex-col w-full">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-[#0b1c30]">Additional / Month</span>
                          <span className="text-[11px] text-[#006a61] font-bold">Paid by Tenant</span>
                        </div>
                        <div className="mt-2 relative">
                          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                            <span className="text-xs text-[#45464d] font-bold">₹</span>
                          </div>
                          <input
                            type="number"
                            value={maintenanceAmount}
                            onChange={(e) => setMaintenanceAmount(Number(e.target.value))}
                            disabled={maintenanceType !== 'extra'}
                            className="w-full h-9 pl-6 pr-3 rounded-lg bg-white text-[#0b1c30] text-xs font-bold outline-none focus:ring-2 focus:ring-[#006a61] border border-[#dce9ff]"
                          />
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Property Available From */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#0b1c30]">Property Available From</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      onClick={() => setAvailableType('immediately')}
                      className={`flex items-center gap-3 p-3.5 rounded-xl cursor-pointer border ${
                        availableType === 'immediately'
                          ? 'bg-[#dce9ff] border-[#006a61]'
                          : 'bg-[#eff4ff] border-[#dce9ff]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="availability"
                        checked={availableType === 'immediately'}
                        onChange={() => setAvailableType('immediately')}
                        className="accent-[#006a61]"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#0b1c30]">Immediately</span>
                        <span className="text-[11px] text-[#45464d]">Ready to move in now</span>
                      </div>
                    </label>

                    <label
                      onClick={() => setAvailableType('date')}
                      className={`flex items-center gap-3 p-3.5 rounded-xl cursor-pointer border ${
                        availableType === 'date'
                          ? 'bg-[#dce9ff] border-[#006a61]'
                          : 'bg-[#eff4ff] border-[#dce9ff]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="availability"
                        checked={availableType === 'date'}
                        onChange={() => setAvailableType('date')}
                        className="accent-[#006a61]"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#0b1c30]">Select Date</span>
                        <span className="text-[11px] text-[#45464d]">1st of Next Month</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Preferred Tenants */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-[#0b1c30]">Preferred Tenants</label>
                    <span className="text-xs text-[#45464d]">Multi-select</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Families', 'Bachelors / Singles', 'Company Lease'].map((pref) => {
                      const isSelected = tenantPreferences.includes(pref);
                      return (
                        <button
                          key={pref}
                          type="button"
                          onClick={() => toggleTenantPreference(pref)}
                          className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#131b2e] text-white shadow-xs'
                              : 'bg-[#eff4ff] text-[#0b1c30] border border-[#dce9ff]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {isSelected ? 'check' : 'add'}
                          </span>
                          <span>{pref}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (4 cols) - Sticky Live Preview */}
            <div className="col-span-12 lg:col-span-4 sticky top-20 flex flex-col gap-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs uppercase tracking-wider text-[#45464d] font-bold">Listing Preview</span>
                <span className="px-2 py-0.5 rounded bg-[#dce9ff] text-[#0b1c30] text-[10px] font-bold">
                  Live Preview
                </span>
              </div>

              <div className="rounded-xl bg-white overflow-hidden shadow-xs border border-[#e5eeff] flex flex-col">
                <div className="relative w-full h-48 bg-[#eff4ff]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHp_5jUH1cpQ-jRvf4_e3tsbQeHwVmFXL29S3gY5-t3ppYlcl-3oHaub4AdkzZHv8_PcTkhafAtlfrGcrS0KbhLPtKQ0lXAJWKK71gbnwSHjZz3tGBwWfWvPwqSROzPLKb-evcUz6JVKxCKGw9KylrP7NlXMyXWkI-1_j81svOVE1GnmmIUM4dIuYzRdohY82VYl7kB1QrsYID4JyKCK-7hUgO1-nwbdRf0ONOH1k"
                    alt="Preview flat"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#006a61] text-white text-[11px] font-bold shadow-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">sell</span> 0% Brokerage
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-extrabold text-[#0b1c30]">
                          ₹{rentAmount.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-[#45464d]">/ mo</span>
                      </div>
                      <span className="text-xs text-[#006a61] font-semibold">
                        {maintenanceType === 'included'
                          ? 'Maint. Included'
                          : `+ ₹${maintenanceAmount.toLocaleString('en-IN')} Maint.`}
                      </span>
                    </div>

                    <h2 className="text-sm font-bold text-[#0b1c30]">{propertyName}</h2>
                    <div className="flex items-center gap-1 text-[#45464d] text-xs">
                      <span className="material-symbols-outlined text-[16px] text-[#006a61]">location_on</span>
                      <span>{locality}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#45464d] text-[10px] font-semibold">
                      {bhk}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#45464d] text-[10px] font-semibold">
                      {area} sq.ft
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#45464d] text-[10px] font-semibold">
                      {furnishing}
                    </span>
                  </div>

                  <div className="rounded-lg bg-[#eff4ff] p-3 flex flex-col gap-1.5 text-xs border border-[#dce9ff]">
                    <div className="flex justify-between items-center text-[#45464d]">
                      <span>Monthly Rent</span>
                      <span className="font-bold text-[#0b1c30]">₹{rentAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center text-[#45464d]">
                      <span>Maintenance</span>
                      <span className="font-bold text-[#0b1c30]">
                        {maintenanceType === 'included' ? 'Included' : `₹${maintenanceAmount.toLocaleString('en-IN')}`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[#45464d]">
                      <span>Security Deposit</span>
                      <span className="font-bold text-[#0b1c30]">
                        ₹{calculatedDeposit.toLocaleString('en-IN')} (Refundable)
                      </span>
                    </div>
                    <div className="h-px bg-[#dce9ff] my-1"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#006a61] font-bold">Brokerage Fee</span>
                      <span className="font-bold text-[#006a61]">₹0 (Zero)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Action Sticky Bottom Bar */}
        <div className="sticky bottom-0 w-full bg-white py-3.5 px-8 shadow-lg z-30 border-t border-[#e5eeff]">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-xs font-bold flex items-center gap-1.5 hover:bg-[#dce9ff] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Back to Property Details</span>
            </button>

            <div className="flex items-center gap-6">
              <span className="hidden md:inline text-xs text-[#45464d]">
                Step 2 of 3 • Changes auto-saved
              </span>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-6 py-2.5 rounded-lg bg-[#006a61] text-white text-xs font-bold flex items-center gap-2 hover:bg-[#005049] shadow-sm transition-all cursor-pointer"
              >
                <span>Continue to Photos &amp; Publish</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------
   * STEP 3: PHOTOS & PUBLISH (Exact replica of code_d0a1bf7e.html)
   * ------------------------------------------------------------- */
  return (
    <div className="flex flex-col w-full bg-[#f8f9ff] min-h-screen">
      {/* Stepper Breadcrumb Track */}
      <section className="w-full bg-white shadow-xs py-4 px-8 border-b border-[#e5eeff]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentStep(1)}
          >
            <div className="w-7 h-7 rounded-full bg-[#86f2e4] flex items-center justify-center text-[#006f66]">
              <span className="material-symbols-outlined text-[16px]">check</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#006a61] uppercase font-bold tracking-wider">Step 1</span>
              <span className="text-xs text-[#0b1c30] font-semibold">Property &amp; Location</span>
            </div>
          </div>

          <div className="flex-1 mx-4 h-0.5 bg-[#006a61]"></div>

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentStep(2)}
          >
            <div className="w-7 h-7 rounded-full bg-[#86f2e4] flex items-center justify-center text-[#006f66]">
              <span className="material-symbols-outlined text-[16px]">check</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#006a61] uppercase font-bold tracking-wider">Step 2</span>
              <span className="text-xs text-[#0b1c30] font-semibold">Rent &amp; Terms</span>
            </div>
          </div>

          <div className="flex-1 mx-4 h-0.5 bg-[#006a61]"></div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#131b2e] text-white flex items-center justify-center text-xs font-bold shadow-xs">
              3
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#006a61] font-bold uppercase tracking-wider">Step 3 • Final</span>
              <span className="text-xs text-[#0b1c30] font-bold">Photos &amp; Publish</span>
            </div>
          </div>
        </div>
      </section>

      {/* Two-Column Interactive Workspace */}
      <div className="max-w-6xl mx-auto w-full px-6 py-8">
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Left Column (8 cols) */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            {/* 1. Photos & Media Section */}
            <div className="bg-white rounded-xl p-6 shadow-xs border border-[#e5eeff] flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#0b1c30] tracking-tight">Upload Photos &amp; Media</h2>
                  <span className="px-3 py-1 rounded-full bg-[#86f2e4] text-[#006f66] text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">auto_awesome</span> 4 Photos Uploaded
                  </span>
                </div>
                <p className="text-xs text-[#45464d]">
                  High-quality photos increase tenant inquiries by 5x. Add at least 3 photos (Cover photo, Living room, Bedroom).
                </p>
              </div>

              {/* Drag and Drop Canvas */}
              <div className="w-full rounded-xl bg-[#eff4ff] border-2 border-dashed border-[#dce9ff] p-6 flex flex-col items-center justify-center text-center transition-all hover:bg-[#e5eeff] group cursor-pointer relative overflow-hidden">
                <input
                  type="file"
                  multiple
                  accept="image/png, image/jpeg, image/webp"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={() => alert('Photo selected and appended to gallery.')}
                />
                <div className="w-12 h-12 rounded-full bg-white shadow-xs flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[#006a61] text-[26px]">cloud_upload</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-[#0b1c30]">
                  <span>Drag &amp; drop property photos here, or</span>
                  <span className="text-[#006a61] underline decoration-2 underline-offset-4">Browse Files</span>
                </div>
                <span className="text-[11px] text-[#45464d] mt-1">
                  Supports JPEG, PNG, WebP up to 15MB each • Min. resolution 1200 x 800px
                </span>
                <div className="mt-3 pt-2 flex items-center gap-3 text-[#45464d]">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert('360 Virtual Tour upload dialog opened.');
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#0b1c30] text-xs font-bold hover:bg-[#dce9ff] transition-colors shadow-2xs border border-[#dce9ff]"
                  >
                    <span className="material-symbols-outlined text-[#006a61] text-[18px]">view_in_ar</span>
                    <span>Upload 360° Virtual Tour / Walkthrough (Optional)</span>
                  </button>
                </div>
              </div>

              {/* Photos Grid with Actions */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#45464d] uppercase tracking-wider font-bold">
                    Uploaded Gallery (Drag to Reorder)
                  </span>
                  <span className="text-[11px] text-[#006a61] font-semibold">
                    Tip: The first image is the public listing cover
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {galleryImages.map((img, idx) => (
                    <div
                      key={img.id}
                      className="relative group rounded-xl overflow-hidden bg-[#dce9ff] aspect-[4/3] shadow-xs flex flex-col justify-between p-2 border border-[#dce9ff]"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${img.url}')` }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none"></div>

                      {/* Top badges */}
                      <div className="relative z-10 flex items-center justify-between w-full">
                        {img.isCover ? (
                          <span className="px-2 py-0.5 rounded-md bg-[#006a61] text-white text-[10px] font-bold flex items-center gap-1 shadow-xs">
                            <span className="material-symbols-outlined text-[13px]">star</span> Cover Photo
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[#0b1c30] text-[10px] font-bold">
                            Photo {idx + 1}
                          </span>
                        )}

                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => alert(`Rotated ${img.title}`)}
                            className="w-6 h-6 rounded-md bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#0b1c30] hover:bg-white shadow-xs cursor-pointer"
                            title="Rotate"
                          >
                            <span className="material-symbols-outlined text-[14px]">rotate_right</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setGalleryImages((prev) => prev.filter((i) => i.id !== img.id))
                            }
                            className="w-6 h-6 rounded-md bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#ba1a1a] hover:bg-white shadow-xs cursor-pointer"
                            title="Delete"
                          >
                            <span className="material-symbols-outlined text-[14px]">delete</span>
                          </button>
                        </div>
                      </div>

                      {/* Bottom tag & reorder handle */}
                      <div className="relative z-10 flex items-center justify-between w-full">
                        <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[#0b1c30] text-[10px] font-semibold">
                          {img.title}
                        </span>
                        <span className="material-symbols-outlined text-white text-[16px] cursor-grab opacity-80 group-hover:opacity-100">
                          drag_indicator
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Add More Slot */}
                  <div
                    onClick={() => alert('Select additional photos from device.')}
                    className="rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] transition-colors aspect-[4/3] flex flex-col items-center justify-center text-center p-4 cursor-pointer group shadow-xs border border-dashed border-[#dce9ff]"
                  >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#006a61] mb-1 group-hover:scale-110 transition-transform shadow-2xs">
                      <span className="material-symbols-outlined text-[22px]">add_photo_alternate</span>
                    </div>
                    <span className="text-xs font-bold text-[#0b1c30]">+ Add More Photos</span>
                    <span className="text-[10px] text-[#45464d]">Up to 20 images</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Fast-Track Ownership Verification */}
            <div className="bg-white rounded-xl p-6 shadow-xs border border-[#e5eeff] flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#006a61] text-[22px]">verified_user</span>
                    <h3 className="text-base font-bold text-[#0b1c30]">Verify Ownership for "Verified Owner" Badge</h3>
                  </div>
                  <p className="text-xs text-[#45464d]">
                    Verified listings appear on top of tenant searches and get 80% faster lease closures with direct trust.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-[#006a61] text-white text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                  Instant Boost
                </span>
              </div>

              {/* Verification Method Selector */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option A: Bill Upload */}
                <div
                  onClick={() => setVerificationMethod('bill')}
                  className={`p-4 rounded-xl flex flex-col justify-between gap-3 shadow-xs border cursor-pointer transition-colors ${
                    verificationMethod === 'bill'
                      ? 'bg-[#eff4ff] border-[#006a61]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0]'
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="verif_bill"
                          name="verification_method"
                          checked={verificationMethod === 'bill'}
                          onChange={() => setVerificationMethod('bill')}
                          className="accent-[#006a61] w-4 h-4 cursor-pointer"
                        />
                        <label className="text-xs font-bold text-[#0b1c30] cursor-pointer" htmlFor="verif_bill">
                          Utility Bill / Tax Receipt
                        </label>
                      </div>
                      <span className="material-symbols-outlined text-[#006a61] text-[18px]">check_circle</span>
                    </div>
                    <p className="text-[11px] text-[#45464d] pl-6">
                      Latest electricity bill (BESCOM / MSEDCL) or Property Tax receipt in your name.
                    </p>
                  </div>

                  {/* Uploaded Sample File Preview Card */}
                  <div className="pl-6 flex flex-col gap-1">
                    <div className="p-2.5 rounded-lg bg-white flex items-center justify-between shadow-2xs border border-[#dce9ff]">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="material-symbols-outlined text-[#ba1a1a] text-[22px]">picture_as_pdf</span>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs text-[#0b1c30] font-semibold truncate">BESCOM_Bill_Oct2024.pdf</span>
                          <span className="text-[10px] text-[#006a61] font-bold flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[12px]">check</span> Verified &amp; Matched
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Replacing document with new file.');
                        }}
                        className="text-[#45464d] hover:text-[#ba1a1a] p-1 transition-colors cursor-pointer"
                        title="Replace"
                      >
                        <span className="material-symbols-outlined text-[16px]">cached</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Option B: DigiLocker */}
                <div
                  onClick={() => setVerificationMethod('digilocker')}
                  className={`p-4 rounded-xl flex flex-col justify-between gap-3 shadow-xs border cursor-pointer transition-colors ${
                    verificationMethod === 'digilocker'
                      ? 'bg-[#eff4ff] border-[#006a61]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0]'
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="verif_digi"
                          name="verification_method"
                          checked={verificationMethod === 'digilocker'}
                          onChange={() => setVerificationMethod('digilocker')}
                          className="accent-[#006a61] w-4 h-4 cursor-pointer"
                        />
                        <label className="text-xs font-bold text-[#0b1c30] cursor-pointer" htmlFor="verif_digi">
                          DigiLocker / Bhoomi
                        </label>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#45464d] text-[10px] font-bold">
                        Instant
                      </span>
                    </div>
                    <p className="text-[11px] text-[#45464d] pl-6">
                      Authenticate e-Khata or Registered Sale Deed instantly via Govt. DigiLocker portal.
                    </p>
                  </div>

                  <div className="pl-6">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert('Connecting with DigiLocker gateway. Sale deed verified in 0.45s.');
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-white text-[#0b1c30] hover:bg-[#dce9ff] text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs border border-[#dce9ff] cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[#006a61] text-[16px]">lock</span>
                      <span>Connect with DigiLocker</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Publishing Settings & Privacy */}
            <div className="bg-white rounded-xl p-6 shadow-xs border border-[#e5eeff] flex flex-col gap-4">
              <h3 className="text-base font-bold text-[#0b1c30]">Publishing Settings &amp; Privacy</h3>

              <div className="flex items-center justify-between p-4 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#86f2e4] text-[#006f66] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#0b1c30]">Publish Immediately upon Verification</span>
                    <span className="text-[11px] text-[#45464d]">
                      Listing goes live for tenants within 30 minutes of automatic deed check.
                    </span>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={publishImmediately}
                    onChange={(e) => setPublishImmediately(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#d3e4fe] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006a61]"></div>
                </label>
              </div>

              {/* Contact Privacy Settings */}
              <div className="flex flex-col gap-2">
                <span className="text-xs text-[#45464d] uppercase tracking-wider font-bold">
                  Tenant Contact Preference
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label
                    onClick={() => setContactPref('chat')}
                    className={`p-3.5 rounded-xl cursor-pointer flex items-start gap-2.5 transition-colors border ${
                      contactPref === 'chat'
                        ? 'bg-[#eff4ff] border-[#006a61]'
                        : 'bg-[#F8FAFC] border-[#E2E8F0]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="contact_pref"
                      checked={contactPref === 'chat'}
                      onChange={() => setContactPref('chat')}
                      className="accent-[#006a61] mt-1 w-4 h-4 cursor-pointer"
                    />
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-[#0b1c30] font-bold">In-App Chat &amp; WhatsApp Only</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#86f2e4] text-[#006f66] text-[9px] font-bold">
                          Recommended
                        </span>
                      </div>
                      <span className="text-[11px] text-[#45464d]">
                        Zero phone call spam. Screen interested profiles before sharing contact.
                      </span>
                    </div>
                  </label>

                  <label
                    onClick={() => setContactPref('call')}
                    className={`p-3.5 rounded-xl cursor-pointer flex items-start gap-2.5 transition-colors border ${
                      contactPref === 'call'
                        ? 'bg-[#eff4ff] border-[#006a61]'
                        : 'bg-[#F8FAFC] border-[#E2E8F0]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="contact_pref"
                      checked={contactPref === 'call'}
                      onChange={() => setContactPref('call')}
                      className="accent-[#006a61] mt-1 w-4 h-4 cursor-pointer"
                    />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-[#0b1c30] font-bold">Direct Phone Calls</span>
                      <span className="text-[11px] text-[#45464d]">
                        Verified tenants can dial your masked virtual number (9 AM – 8 PM).
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols) - Live Tenant View & Listing Quality */}
          <div className="col-span-12 lg:col-span-4 sticky top-20 flex flex-col gap-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#006a61] text-[18px]">visibility</span>
                <span className="text-xs uppercase tracking-wider text-[#45464d] font-bold">Live Tenant View</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-[10px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006a61] animate-pulse"></span> Instant Preview
              </span>
            </div>

            {/* High Fidelity Listing Card */}
            <div className="w-full bg-white rounded-xl overflow-hidden shadow-xs border border-[#e5eeff] flex flex-col">
              <div className="relative w-full aspect-[16/10] bg-[#eff4ff] overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9wOe2qmv1w_f41vqqWAqmfKpfyR2kT8l7C7G7hkT0ZHcYLnbzQoPfc9-2nJr9ef8iXFKQ9TU20WCLlIxlJLva7Z6KSr-TmLOwHQhhMuudh0vWj0fDfAwEm55DWKfKGq9v_9E6gmyIk-CIO2n-Eh_nHcLDy_oSbPo0wYM8Mrp_cMhd8G6foEKFsOE2n6BaJw1HXZCpXJMGkp0bCs44FpZPtGCmzLuzV0qV2szhwg8"
                  alt="Living room preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1">
                  <span className="px-2 py-0.5 rounded-md bg-[#006a61] text-white text-[10px] font-bold shadow-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">savings</span> 0% Brokerage
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1">
                  <span className="px-2 py-0.5 rounded-md bg-[#131b2e] text-white text-[10px] font-bold shadow-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-[#89f5e7] text-[13px]">verified</span> Verified Owner
                  </span>
                </div>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-white text-[10px] font-medium">
                  1/4 Photos
                </span>
              </div>

              <div className="p-4 flex flex-col gap-2.5">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-extrabold text-[#0b1c30]">
                      ₹{rentAmount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-[#45464d]">/ mo</span>
                  </div>
                  <span className="text-[11px] text-[#006a61] font-bold">
                    {maintenanceType === 'included'
                      ? 'Maint. Included'
                      : `+ ₹${maintenanceAmount.toLocaleString('en-IN')} Maint.`}
                  </span>
                </div>

                <div className="flex flex-col">
                  <h4 className="text-sm font-bold text-[#0b1c30] leading-tight">{propertyName}</h4>
                  <div className="flex items-center gap-1 text-[#45464d] text-xs mt-0.5">
                    <span className="material-symbols-outlined text-[15px] text-[#006a61]">location_on</span>
                    <span className="truncate">{locality}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1 py-1">
                  <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#0b1c30] text-[10px] font-semibold">
                    {bhk}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#0b1c30] text-[10px] font-semibold">
                    {area} sq.ft
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#0b1c30] text-[10px] font-semibold">
                    {furnishing}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#0b1c30] text-[10px] font-semibold">
                    {floor}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#eff4ff] flex items-center justify-between text-xs border border-[#dce9ff]">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#45464d] uppercase font-semibold">Security Deposit</span>
                    <span className="font-bold text-[#0b1c30]">₹{calculatedDeposit.toLocaleString('en-IN')}</span>
                  </div>
                  <span className="text-[11px] text-[#006a61] font-semibold">Refundable (3 Mo)</span>
                </div>

                <div className="flex items-center gap-2 pt-0.5">
                  <div className="w-6 h-6 rounded-full bg-[#131b2e] text-white flex items-center justify-center text-[10px] font-bold">
                    RS
                  </div>
                  <span className="text-xs text-[#45464d]">
                    Direct Owner: <strong className="text-[#0b1c30]">Col. Rajesh Sharma</strong>
                  </span>
                </div>

                <div className="p-1 rounded bg-[#eff4ff] text-center border border-[#dce9ff]">
                  <span className="text-[11px] text-[#006a61] font-bold flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">shield</span> Zero Brokerage Guaranteed
                  </span>
                </div>
              </div>
            </div>

            {/* Listing Strength Card */}
            <div className="p-4 rounded-xl bg-white shadow-xs border border-[#e5eeff] flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0b1c30]">Listing Quality Score</span>
                <span className="font-bold text-[#006a61]">95 / 100</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#eff4ff] overflow-hidden">
                <div className="h-full bg-[#006a61] rounded-full" style={{ width: '95%' }}></div>
              </div>
              <span className="text-[11px] text-[#45464d]">
                Excellent! Includes 4 photos, verified utility bill, and transparent zero-broker terms.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <footer className="sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl shadow-[0_-4px_16px_rgba(0,0,0,0.06)] py-3 px-8 border-t border-[#e5eeff]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-bold transition-colors cursor-pointer border border-[#dce9ff]"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Rent &amp; Terms</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-[#45464d] text-xs">
            <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
            <span>Step 3 of 3 • All updates saved to cloud</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowFullPreviewModal(true)}
              className="px-4 py-2.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-[#dce9ff]"
            >
              <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              <span>Full Preview</span>
            </button>

            <button
              type="button"
              onClick={handlePublish}
              className="px-6 py-2.5 rounded-lg bg-[#006a61] hover:bg-[#005049] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer group"
            >
              <span>Publish Property Listing</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </footer>

      {/* Instant Submission Progress Modal */}
      {showSubmissionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl flex flex-col items-center text-center gap-4 animate-in zoom-in-95 duration-200 border border-[#e5eeff]">
            <div className="w-16 h-16 rounded-full bg-[#86f2e4] text-[#006f66] flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-bold text-[#0b1c30]">Listing Submitted Successfully!</h3>
              <p className="text-xs text-[#45464d]">
                Your listing for <strong>{propertyName}</strong> has been submitted. Our automated property validation engine is confirming your ownership deed.
              </p>
            </div>
            <div className="w-full p-4 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex flex-col gap-2 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0b1c30]">Fast-Track Deed Verification</span>
                <span className="text-[#006a61] font-bold">In Progress (90%)</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#dce9ff] overflow-hidden">
                <div className="h-full bg-[#006a61] rounded-full" style={{ width: '90%' }}></div>
              </div>
              <span className="text-[11px] text-[#45464d]">
                Estimated go-live: <strong className="text-[#0b1c30]">Today at 12:15 PM</strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Full Tenant Page Preview Modal */}
      {showFullPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar border border-[#E2E8F0]">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
              <h3 className="text-base font-bold text-[#0b1c30]">Tenant Page Preview</h3>
              <button
                type="button"
                onClick={() => setShowFullPreviewModal(false)}
                className="p-1 text-[#64748B] hover:text-[#0b1c30] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div className="relative w-full h-60 rounded-xl overflow-hidden bg-[#eff4ff]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWLmGhmzBKtCHH5uruexbxn-K0tbCqUdwwiNyjLWPq5PaciIZhSiOE_hcG_tpXE8r6d4EAldC3JQh0Bk5mNkzVITBqKFg7mWfFYc0hb11R0WomfRI1OcFvD56yMvZVWHYlmTIQFxyvD6RKj-QgDH1SKg6YqSyduvyIuyi5ik6Ft1_HXWCPYJQKNA-0Zf1iqVIXC-ejesZlRGSAVh87IGJte983szeWIWbCstangg8"
                  alt="High resolution view"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#006a61] text-white text-xs font-bold">
                  0% Brokerage
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-bold text-[#0b1c30]">{propertyName}</h2>
                <span className="text-xl font-bold text-[#006a61]">₹{rentAmount.toLocaleString('en-IN')} / mo</span>
              </div>

              <p className="text-xs text-[#45464d]">
                Located on {locality}. East-facing, gated community with 100% power backup, EV charging, clubhouse, and swimming pool.
              </p>

              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#eff4ff] text-center border border-[#dce9ff]">
                <div>
                  <div className="text-[10px] text-[#45464d] uppercase font-bold">Super Area</div>
                  <div className="text-sm font-bold text-[#0b1c30]">{area} sq.ft</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#45464d] uppercase font-bold">Deposit</div>
                  <div className="text-sm font-bold text-[#0b1c30]">₹{calculatedDeposit.toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#45464d] uppercase font-bold">Available From</div>
                  <div className="text-sm font-bold text-[#006a61]">
                    {availableType === 'immediately' ? 'Immediate' : '1st of Next Month'}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowFullPreviewModal(false)}
                className="w-full py-2.5 rounded-lg bg-[#000000] text-white text-xs font-bold hover:bg-[#131b2e] cursor-pointer"
              >
                Close Preview &amp; Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
