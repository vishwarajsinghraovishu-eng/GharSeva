import React, { useState } from 'react';

interface AgreementModalProps {
  onClose: () => void;
  tenantName?: string;
  propertyName?: string;
  rentAmount?: number;
}

export const AgreementModal: React.FC<AgreementModalProps> = ({
  onClose,
  tenantName = 'Priya S. Nair',
  propertyName = 'Prestige Falcon City, Unit B-1204',
  rentAmount = 34000
}) => {
  const [isSigned, setIsSigned] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('7829');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar border border-[#E2E8F0]">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006a61] text-[24px]">gavel</span>
            <div>
              <h3 className="text-base font-bold text-[#0b1c30]">Digital Rental Agreement &amp; e-Stamp</h3>
              <p className="text-xs text-[#45464d]">Karnataka Tenancy &amp; Rent Act 2021 Compliant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0b1c30] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* e-Stamp Header Simulation */}
        <div className="border-2 border-[#006a61] rounded-xl p-4 bg-[#eff4ff] flex flex-col gap-2 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[#dce9ff] pb-2 text-[11px]">
            <span className="font-bold text-[#006a61]">GOVERNMENT OF KARNATAKA e-STAMP CERTIFICATE</span>
            <span className="text-[#0b1c30]">IN-KA82910482019482T</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-[#0b1c30]">
            <div><strong>Certificate Issued To:</strong> Col. Rajesh Sharma (Landlord)</div>
            <div><strong>Tenant:</strong> {tenantName}</div>
            <div><strong>Stamp Duty Paid:</strong> ₹500 (ESIC/SHCIL)</div>
            <div><strong>Tenure:</strong> 11 Months (Lock-in: 6 Mo)</div>
          </div>
        </div>

        {/* Clauses Summary */}
        <div className="flex flex-col gap-2 text-xs text-[#45464d] bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] leading-relaxed">
          <h4 className="font-bold text-[#0b1c30] text-sm">Key Commercial Terms:</h4>
          <p>
            1. <strong>Premises:</strong> {propertyName}, Kanakapura Road, Bengaluru.
          </p>
          <p>
            2. <strong>Monthly Rent:</strong> ₹{rentAmount.toLocaleString('en-IN')}/- payable on or before the 5th of every English calendar month via direct bank transfer or UPI.
          </p>
          <p>
            3. <strong>Security Deposit:</strong> ₹{(rentAmount * 3).toLocaleString('en-IN')}/- (Three Months), 100% refundable at the time of vacating subject to clear utility dues.
          </p>
          <p>
            4. <strong>Brokerage:</strong> Zero percent (0%). Neither party is liable to any broker or commission agent.
          </p>
        </div>

        {/* Digital Signature Action */}
        <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006a61]">fingerprint</span>
              <span className="font-bold text-xs text-[#0b1c30]">Aadhaar e-Sign Authorization</span>
            </div>
            {isSigned ? (
              <span className="px-2 py-0.5 rounded bg-[#86f2e4] text-[#006f66] text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check</span> Digitally Signed
              </span>
            ) : (
              <span className="text-xs text-[#45464d]">Pending Landlord Signature</span>
            )}
          </div>

          {!isSigned && (
            <div className="flex flex-col gap-2 pt-1">
              {!otpSent ? (
                <button
                  type="button"
                  onClick={() => setOtpSent(true)}
                  className="py-2.5 px-4 rounded-lg bg-[#006a61] hover:bg-[#005049] text-white font-bold text-xs transition-colors cursor-pointer text-center"
                >
                  Send OTP to Registered Aadhaar Mobile (+91 9845X XXXXX)
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={otpValue}
                    onChange={(e) => setOtpValue(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-white border border-[#006a61] text-xs font-bold text-center tracking-widest w-32"
                    placeholder="Enter OTP"
                  />
                  <button
                    type="button"
                    onClick={() => setIsSigned(true)}
                    className="flex-1 py-2 px-3 rounded-lg bg-[#006a61] hover:bg-[#005049] text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Verify OTP &amp; Affix e-Sign
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-lg bg-[#F1F5F9] text-[#0b1c30] font-bold text-xs hover:bg-[#E2E8F0] cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              alert('Draft agreement downloaded as PDF.');
              onClose();
            }}
            className="py-2.5 px-4 rounded-lg bg-[#131b2e] hover:bg-[#0b1c30] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Download e-Stamped Draft</span>
          </button>
        </div>
      </div>
    </div>
  );
};
