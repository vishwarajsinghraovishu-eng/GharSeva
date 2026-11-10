import React, { useState } from 'react';
import { Property } from '../types';

interface MarketplaceHomeProps {
  properties: Property[];
  onNavigateSearch: (locality?: string, bhk?: string, budget?: string) => void;
  onOpenAddProperty: () => void;
  onSelectProperty: (prop: Property) => void;
  onBookVisit: (prop: Property) => void;
  onContactOwner: (prop: Property) => void;
}

export const MarketplaceHome: React.FC<MarketplaceHomeProps> = ({
  properties,
  onNavigateSearch,
  onOpenAddProperty,
  onSelectProperty,
  onBookVisit,
  onContactOwner
}) => {
  const [categoryTab, setCategoryTab] = useState<'rent' | 'commercial' | 'pg'>('rent');
  const [searchLocality, setSearchLocality] = useState('');
  const [searchBhk, setSearchBhk] = useState('2bhk');
  const [searchBudget, setSearchBudget] = useState('20-40');
  const [selectedCity, setSelectedCity] = useState('All');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigateSearch(searchLocality || 'Indiranagar, Bengaluru', searchBhk, searchBudget);
  };

  const filteredProperties = properties.filter((p) => {
    if (selectedCity === 'All') return true;
    if (selectedCity === 'Bengaluru') return p.city.includes('Bengaluru');
    if (selectedCity === 'Mumbai') return p.city.includes('Mumbai');
    if (selectedCity === 'Delhi-NCR') return p.city.includes('Delhi-NCR');
    if (selectedCity === 'Pune') return p.city.includes('Pune');
    return true;
  });

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC]">
      {/* 2. HERO SECTION */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 bg-gradient-to-b from-[#F8FAFC] via-white to-white overflow-hidden">
        {/* Gentle ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#0D9488]/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Friendly headline & subhead */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
            Find your next home with{' '}
            <span className="text-[#0D9488] underline decoration-[#0D9488]/30 underline-offset-8">
              Zero Brokerage
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#64748B] max-w-2xl mx-auto mb-10">
            Direct owner listings, verified properties, and hassle-free agreements.
          </p>

          {/* Intuitive Single-Row Search Console */}
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white rounded-2xl shadow-xl shadow-[#0F172A]/5 border border-[#E2E8F0] p-3 sm:p-4 text-left"
          >
            {/* Segmented Category Tabs */}
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#E2E8F0]/60">
              <button
                type="button"
                onClick={() => setCategoryTab('rent')}
                className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  categoryTab === 'rent'
                    ? 'bg-[#0F172A] text-white'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Rent
              </button>
              <button
                type="button"
                onClick={() => setCategoryTab('commercial')}
                className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  categoryTab === 'commercial'
                    ? 'bg-[#0F172A] text-white'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Commercial
              </button>
              <button
                type="button"
                onClick={() => setCategoryTab('pg')}
                className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  categoryTab === 'pg'
                    ? 'bg-[#0F172A] text-white'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                PG / Flatmates
              </button>
            </div>

            {/* Unified Input Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Locality/City input */}
              <div className="md:col-span-6 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/60 focus-within:border-[#0D9488] focus-within:bg-white transition-all">
                <span className="material-symbols-outlined text-[#0D9488] text-xl">search</span>
                <input
                  type="text"
                  value={searchLocality}
                  onChange={(e) => setSearchLocality(e.target.value)}
                  placeholder="Enter locality, society or city..."
                  className="bg-transparent w-full text-sm text-[#0F172A] placeholder:text-[#64748B]/70 focus:outline-none"
                />
              </div>

              {/* BHK Dropdown */}
              <div className="md:col-span-2.5 flex items-center px-3 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/60">
                <select
                  value={searchBhk}
                  onChange={(e) => setSearchBhk(e.target.value)}
                  className="bg-transparent w-full text-sm text-[#0F172A] focus:outline-none cursor-pointer"
                >
                  <option value="all">BHK Type</option>
                  <option value="1bhk">1 BHK</option>
                  <option value="2bhk">2 BHK</option>
                  <option value="3bhk">3 BHK</option>
                  <option value="4bhk">4+ BHK</option>
                </select>
              </div>

              {/* Budget Dropdown */}
              <div className="md:col-span-2 flex items-center px-3 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/60">
                <select
                  value={searchBudget}
                  onChange={(e) => setSearchBudget(e.target.value)}
                  className="bg-transparent w-full text-sm text-[#0F172A] focus:outline-none cursor-pointer"
                >
                  <option value="any">Budget</option>
                  <option value="under20">Under ₹20K</option>
                  <option value="20-40">₹20K - ₹40K</option>
                  <option value="40-60">₹40K - ₹60K</option>
                  <option value="above60">₹60K+</option>
                </select>
              </div>

              {/* Prominent Search Button */}
              <div className="md:col-span-1.5">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold text-sm transition-all flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                >
                  <span>Search</span>
                </button>
              </div>
            </div>
          </form>

          {/* 4 Clean Clickable Popular Quick-Tags */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-[#64748B]">
            <span className="font-medium text-[#0F172A]">Popular Searches:</span>
            {['Indiranagar', 'HSR Layout', 'Whitefield', 'Bandra West'].map((loc) => (
              <button
                key={loc}
                onClick={() => onNavigateSearch(`${loc}, Bengaluru`)}
                className="px-2.5 py-1 rounded-full bg-[#F8FAFC] hover:bg-[#E2E8F0]/70 border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer"
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TRUST STRIP */}
      <section className="border-y border-[#E2E8F0]/60 bg-white py-8" id="zero-brokerage">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-[#CCFBF1] text-[#0D9488] flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-2xl">verified</span>
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">100% Zero Brokerage</h3>
              <p className="text-xs text-[#64748B] mt-0.5">Direct tenant-to-owner connect</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-[#CCFBF1] text-[#0D9488] flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-2xl">badge</span>
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">Aadhaar-Verified Owners</h3>
              <p className="text-xs text-[#64748B] mt-0.5">Every property legally validated</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-[#CCFBF1] text-[#0D9488] flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-2xl">calendar_month</span>
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">Direct Contact &amp; Visits</h3>
              <p className="text-xs text-[#64748B] mt-0.5">Free scheduled viewings</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-[#CCFBF1] text-[#0D9488] flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-2xl">description</span>
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">Online Rental Agreements</h3>
              <p className="text-xs text-[#64748B] mt-0.5">Digital e-stamping in 24 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED HOMES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="featured-homes">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              Featured Homes for Rent
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              Inspected properties directly from verified landlords.
            </p>
          </div>
          {/* City Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {['All', 'Bengaluru', 'Mumbai', 'Delhi-NCR', 'Pune'].map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCity === city
                    ? 'bg-[#0F172A] text-white'
                    : 'bg-[#F8FAFC] hover:bg-[#E2E8F0]/60 text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.slice(0, 3).map((property) => (
            <article
              key={property.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] hover:shadow-lg transition-all group flex flex-col"
            >
              <div
                className="relative aspect-[16/10] overflow-hidden bg-[#F8FAFC] cursor-pointer"
                onClick={() => onSelectProperty(property)}
              >
                <img
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={property.coverImage}
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#0D9488] text-white text-[11px] font-semibold tracking-wide">
                    ZERO BROKERAGE
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#0F172A]/80 backdrop-blur-xs text-white text-[11px] font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-[#10B981]">check_circle</span>{' '}
                    Verified
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-baseline justify-between mb-1">
                  <div>
                    <span className="text-2xl font-extrabold text-[#0F172A]">
                      ₹{property.rent.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-[#64748B]"> / mo</span>
                  </div>
                  <span className="text-xs font-medium text-[#64748B]">
                    Deposit: ₹{property.deposit.toLocaleString('en-IN')}
                  </span>
                </div>

                <h3
                  onClick={() => onSelectProperty(property)}
                  className="text-base font-bold text-[#0F172A] group-hover:text-[#0D9488] transition-colors line-clamp-1 mb-1 cursor-pointer"
                >
                  {property.title}
                </h3>
                <p className="text-xs text-[#64748B] flex items-center gap-1 mb-4">
                  <span className="material-symbols-outlined text-sm text-[#0D9488]">location_on</span>
                  {property.locality}, {property.city}
                </p>

                <div className="flex items-center gap-3 text-xs text-[#64748B] mb-6 pt-3 border-t border-[#E2E8F0]/60">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-[#0F172A]">chair</span>{' '}
                    {property.furnishing}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-[#0F172A]">train</span>{' '}
                    400m to Metro
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-auto">
                  <button
                    onClick={() => onSelectProperty(property)}
                    className="py-2.5 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-semibold text-center transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onContactOwner(property)}
                    className="py-2.5 rounded-lg bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-semibold text-center transition-colors shadow-xs cursor-pointer"
                  >
                    Contact Owner
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="bg-white py-20 border-y border-[#E2E8F0]/60" id="how-it-works">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight mb-3">How it Works</h2>
          <p className="text-sm sm:text-base text-[#64748B] max-w-xl mx-auto mb-14">
            Renting a home should be simple, open, and broker-free.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F8FAFC] rounded-2xl p-8 border border-[#E2E8F0] text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-white text-[#0D9488] flex items-center justify-center font-bold text-xl mb-5 shadow-xs border border-[#E2E8F0]">
                1
              </div>
              <h3 className="text-base font-bold text-[#0F172A] mb-2">Search verified homes</h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Explore 100% genuine photos, accurate floor plans, and verified rental terms.
              </p>
            </div>

            <div className="bg-[#F8FAFC] rounded-2xl p-8 border border-[#E2E8F0] text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-white text-[#0D9488] flex items-center justify-center font-bold text-xl mb-5 shadow-xs border border-[#E2E8F0]">
                2
              </div>
              <h3 className="text-base font-bold text-[#0F172A] mb-2">Connect with owner directly</h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Book a direct visit slot and chat with the landlord without middleman interference.
              </p>
            </div>

            <div className="bg-[#F8FAFC] rounded-2xl p-8 border border-[#E2E8F0] text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-white text-[#0D9488] flex items-center justify-center font-bold text-xl mb-5 shadow-xs border border-[#E2E8F0]">
                3
              </div>
              <h3 className="text-base font-bold text-[#0F172A] mb-2">Move in with digital lease</h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Complete Aadhaar-based e-signing and legal e-stamped agreement right from your phone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CLEAN CITY GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              Explore Rentals in Top Cities
            </h2>
            <p className="text-sm text-[#64748B] mt-1">Discover popular hubs with verified listings.</p>
          </div>
          <button
            onClick={() => onNavigateSearch()}
            className="text-sm font-semibold text-[#0D9488] hover:text-[#0F766E] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View all cities</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              name: 'Bengaluru',
              count: '14,800+ listings',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIM3mebjUHQbr9IkDtNTZPzzwiSmE-LVfZ7yF_Crooh84Ys_5A0rbrTh6p7tA0unX47fyVTDxBAPWu66j9rUu9aP-57DjTkhb1eLYCLOVOF4waJeK8uQCCFS41-VA1UOyE3xx6fgb0C5Qt4eZUvnEqX3abPLAApykNlh6NAUnnvrnMABdw062l8X7SinN2IjSjCGy1_bXh3PxPGUcnafDo1MBkAKfR4VfJZnfGao8'
            },
            {
              name: 'Mumbai',
              count: '18,200+ listings',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3smyATgBhqjPn3g_11k4ypFhdb-CTdoUEWpyL1FFFAYyJKYY_9zxwglHm2ZT_7GJQreQVhWuuVLCmn364QVW-g1SkE6JUgRgolVIiINV7n1JYX1BH0sV5jwYUrZwT_fnMf_8wamVfCtZMQ--Sjoh8ebqkr-7kNEKEIO32LJ1AqZ29i4EStPK6HFbfDYgyLnwI_t4wpybrm3e2aGx2tzEmWgGp3GtOGoYup72KLd8'
            },
            {
              name: 'Delhi-NCR',
              count: '11,940+ listings',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfQ7YPnl6eR6jIhzd8S2Pjw2hA4Tc1DtX7oNjhZUZp8SJXcz_utgjyCazojj-UZJJRysU2FwFV8QteLXumoVj_rhk4OerkgeqK2clQGOYWIGbSbA52RP9vTgsX5Zx_mmSbfhLGisnu4t7wqF_xtM4IZOcJEK5s2Rnmzqghk80J3YYHU2cgxqy_1ecfzv61rBPUovtI4FyIdzJBlny98TTjTtPXbICOgOHVpbi5ovE'
            },
            {
              name: 'Pune',
              count: '9,600+ listings',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQJgTxlrmMEKA0FY2hRN3dyIHNdhKRojDVvIeN3p1wTSDEcTL1FL0XviiQqTeZuBbNpP3qiT4JqLrPLGc1sz9TAEG_ZAndNukatwkKKfkh9VRS4W_W0Dto_NWOqt6injUaJTAnvupbnnwScNZS968v8u95w0KV1qSfSg09YjlINKiqPJ1TUZiccMfmdDkwP9RQZcrU1DRi-2x2MVj_a9iVSipJkf3HLcxUBtaOIpY'
            }
          ].map((c) => (
            <div
              key={c.name}
              onClick={() => onNavigateSearch(`${c.name}`)}
              className="group relative rounded-2xl overflow-hidden bg-[#0F172A] aspect-[4/3] flex flex-col justify-end p-5 shadow-xs cursor-pointer"
            >
              <img
                alt={c.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                src={c.img}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/40 to-transparent"></div>
              <div className="relative z-10 text-white">
                <h3 className="text-lg font-bold">{c.name}</h3>
                <p className="text-xs text-white/80">{c.count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. LANDLORD CALLOUT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="post-property">
        <div className="rounded-3xl bg-[#0F172A] text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#0D9488]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-xl z-10 text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[#10B981] text-xs font-semibold tracking-wider uppercase mb-3">
              For Landlords
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Have a property to rent out?
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              List for free in 2 minutes and connect directly with tenants. Save 100% on brokerage fees.
            </p>
          </div>
          <div className="z-10 shrink-0">
            <button
              onClick={onOpenAddProperty}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold text-sm transition-all shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">add_circle</span>
              <span>List Your Property</span>
            </button>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-white border-t border-[#E2E8F0]/80 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-[#131b2e] flex items-center justify-center text-[#89f5e7]">
                  <span className="material-symbols-outlined text-[16px]">apartment</span>
                </div>
                <span className="text-lg font-bold text-[#0F172A]">GharSeva</span>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed mb-3">
                India's most trusted verified rental marketplace with zero brokerage and direct owner connection.
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] text-[#0D9488] font-semibold">
                <span className="material-symbols-outlined text-xs">verified</span> RERA Registered
              </span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-3">Popular Cities</h4>
              <ul className="space-y-2 text-xs text-[#64748B]">
                <li><button onClick={() => onNavigateSearch('Bengaluru')} className="hover:text-[#0F172A] cursor-pointer">Rentals in Bengaluru</button></li>
                <li><button onClick={() => onNavigateSearch('Mumbai')} className="hover:text-[#0F172A] cursor-pointer">Rentals in Mumbai</button></li>
                <li><button onClick={() => onNavigateSearch('Delhi-NCR')} className="hover:text-[#0F172A] cursor-pointer">Rentals in Delhi-NCR</button></li>
                <li><button onClick={() => onNavigateSearch('Pune')} className="hover:text-[#0F172A] cursor-pointer">Rentals in Pune</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-3">Company</h4>
              <ul className="space-y-2 text-xs text-[#64748B]">
                <li><a href="#how-it-works" className="hover:text-[#0F172A]">How it Works</a></li>
                <li><a href="#zero-brokerage" className="hover:text-[#0F172A]">Zero Brokerage</a></li>
                <li><button onClick={onOpenAddProperty} className="hover:text-[#0F172A] cursor-pointer">Owner Verification</button></li>
                <li><a href="#featured-homes" className="hover:text-[#0F172A]">Contact &amp; Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-3">Legal &amp; Trust</h4>
              <ul className="space-y-2 text-xs text-[#64748B]">
                <li><a href="#" className="hover:text-[#0F172A]">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#0F172A]">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#0F172A]">Digital Lease Agreement</a></li>
                <li><a href="#" className="hover:text-[#0F172A]">Tenant Safety Guidelines</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#E2E8F0]/60 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-3">
            <p>© 2025 GharSeva Technologies Pvt Ltd. All rights reserved.</p>
            <p className="flex items-center gap-1 text-[#0D9488] font-medium">
              <span className="material-symbols-outlined text-sm">security</span> 100% Zero Brokerage Platform
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
