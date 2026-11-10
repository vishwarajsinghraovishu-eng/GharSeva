import React, { useState } from 'react';
import { Property } from '../types';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  onBookVisit: (property: Property) => void;
  onContactOwner: (property: Property) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  onBookVisit,
  onContactOwner
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!property) return null;

  const images = property.images && property.images.length > 0 ? property.images : [property.coverImage];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl flex flex-col gap-5 max-h-[90vh] overflow-y-auto no-scrollbar border border-[#E2E8F0]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#CCFBF1] text-[#006a61] text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[13px]">verified</span>
              {property.hasZeroBrokerage ? 'Zero Brokerage' : 'Verified'}
            </span>
            <span className="text-xs text-[#64748B]">MLS #{property.id.toUpperCase()}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Gallery Viewer */}
        <div className="flex flex-col gap-2">
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#F1F5F9] shadow-sm">
            <img
              src={images[activeImageIdx]}
              alt={property.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="px-2.5 py-1 rounded bg-[#0D9488] text-white text-[11px] font-bold shadow-xs">
                0% BROKERAGE
              </span>
              {property.isOwnerVerified && (
                <span className="px-2.5 py-1 rounded bg-[#0F172A]/90 text-white text-[11px] font-medium flex items-center gap-1 backdrop-blur-xs">
                  <span className="material-symbols-outlined text-[13px] text-[#10B981]">verified</span>
                  Verified Owner
                </span>
              )}
            </div>
            <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/70 text-white text-xs font-semibold backdrop-blur-xs">
              {activeImageIdx + 1} / {images.length} Photos
            </span>
          </div>

          {/* Thumbnails row */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeImageIdx === idx ? 'border-[#0D9488] scale-102 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Title & Pricing */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">{property.title}</h2>
            <p className="text-sm text-[#64748B] flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-sm text-[#0D9488]">location_on</span>
              {property.fullAddress}
            </p>
          </div>
          <div className="flex flex-col sm:items-end">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-[#0F172A]">₹{property.rent.toLocaleString('en-IN')}</span>
              <span className="text-xs text-[#64748B]">/ month</span>
            </div>
            <span className="text-xs text-[#0D9488] font-semibold">
              {property.isMaintenanceIncluded ? 'Maintenance Included' : `+ ₹${property.maintenance.toLocaleString('en-IN')} Maint.`}
            </span>
          </div>
        </div>

        {/* Property Highlights Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-center">
          <div>
            <div className="text-[11px] text-[#64748B] uppercase font-semibold">Super Area</div>
            <div className="text-sm font-bold text-[#0F172A] mt-0.5">{property.area} sq.ft</div>
          </div>
          <div>
            <div className="text-[11px] text-[#64748B] uppercase font-semibold">Security Deposit</div>
            <div className="text-sm font-bold text-[#0F172A] mt-0.5">₹{property.deposit.toLocaleString('en-IN')}</div>
          </div>
          <div>
            <div className="text-[11px] text-[#64748B] uppercase font-semibold">Floor Level</div>
            <div className="text-sm font-bold text-[#0F172A] mt-0.5">{property.floor}</div>
          </div>
          <div>
            <div className="text-[11px] text-[#64748B] uppercase font-semibold">Availability</div>
            <div className="text-sm font-bold text-[#0D9488] mt-0.5">{property.availableFrom}</div>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Society &amp; Apartment Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((amenity, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-[#F1F5F9] text-[#334155] text-xs font-medium flex items-center gap-1 border border-[#E2E8F0]"
              >
                <span className="material-symbols-outlined text-[15px] text-[#0D9488]">check</span>
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Landlord Card */}
        <div className="p-3.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#131b2e] text-white flex items-center justify-center font-bold text-xs">
              {property.ownerInitials}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-[#0b1c30]">{property.ownerName}</span>
                <span className="material-symbols-outlined text-[#006a61] text-[16px]">verified</span>
              </div>
              <span className="text-xs text-[#45464d]">{property.ownerBadge} • Instant Aadhaar Verified</span>
            </div>
          </div>
          <span className="text-xs font-bold text-[#006a61] bg-white px-2.5 py-1 rounded-full shadow-2xs border border-[#d3e4fe]">
            No Middlemen
          </span>
        </div>

        {/* Actions Bar */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => {
              onClose();
              onBookVisit(property);
            }}
            className="py-3 px-4 rounded-xl bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A] font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            <span>Schedule Free Visit</span>
          </button>
          <button
            onClick={() => {
              onClose();
              onContactOwner(property);
            }}
            className="py-3 px-4 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Contact Owner Directly</span>
          </button>
        </div>
      </div>
    </div>
  );
};
