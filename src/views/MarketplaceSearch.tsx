import React, { useState } from 'react';
import { Property } from '../types';

interface MarketplaceSearchProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onBookVisit: (property: Property) => void;
  onContactOwner: (property: Property) => void;
}

export const MarketplaceSearch: React.FC<MarketplaceSearchProps> = ({
  properties,
  onSelectProperty,
  onBookVisit,
  onContactOwner
}) => {
  const [locality, setLocality] = useState('Indiranagar, Bengaluru');
  const [selectedBhk, setSelectedBhk] = useState('2 BHK');
  const [layoutMode, setLayoutMode] = useState<'map' | 'list'>('map');
  const [budgetTier, setBudgetTier] = useState('₹25k - ₹50k');
  const [tenantFilter, setTenantFilter] = useState('Family, Bachelors');
  const [furnishingFilter, setFurnishingFilter] = useState('Semi-Furnished');
  const [sortOption, setSortOption] = useState('Recommended (Default)');
  const [instantAlerts, setInstantAlerts] = useState(true);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [activePropertyId, setActivePropertyId] = useState<string>('blr-70491');
  const [selectedLayer, setSelectedLayer] = useState<'metro' | 'health' | 'schools'>('metro');

  // Toggle favorite
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const activeProperty = properties.find((p) => p.id === activePropertyId) || properties[0];

  return (
    <div className="w-full flex flex-col bg-[#f8f9ff]">
      {/* STICKY DISCOVERY FILTER BAR */}
      <aside aria-label="Search and Filter Console" className="sticky top-20 z-40 bg-white shadow-md border-b border-[#e5eeff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col gap-3">
          {/* Top Row: Query Search, Main BHK Toggles, View Mode */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* City & Locality Input Chamber */}
            <div className="flex-1 flex items-center bg-[#eff4ff] rounded-xl px-3.5 py-2 border border-[#dce9ff]">
              <span className="material-symbols-outlined text-[#006a61] text-xl mr-2">location_on</span>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[10px] text-[#45464d] uppercase font-bold tracking-wider">Locality &amp; Landmark</span>
                <input
                  type="text"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="bg-transparent border-0 p-0 text-sm font-semibold text-[#0b1c30] focus:ring-0 focus:outline-none placeholder:text-[#76777d] truncate"
                  placeholder="Search locality or landmark..."
                />
              </div>
              {locality && (
                <button
                  type="button"
                  onClick={() => setLocality('')}
                  aria-label="Clear location input"
                  className="p-1 rounded-full hover:bg-[#d3e4fe] text-[#45464d] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              )}
            </div>

            {/* BHK Quick Pill Selector */}
            <div className="flex items-center gap-1.5 p-1 bg-[#eff4ff] rounded-xl overflow-x-auto border border-[#dce9ff]">
              {['All', '1 BHK', '2 BHK', '3 BHK', '4+ BHK'].map((bhk) => (
                <button
                  key={bhk}
                  type="button"
                  onClick={() => setSelectedBhk(bhk)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedBhk === bhk
                      ? 'bg-[#131b2e] text-white shadow-xs'
                      : 'text-[#45464d] hover:text-[#0b1c30] hover:bg-[#e5eeff]'
                  }`}
                >
                  {bhk}
                </button>
              ))}
            </div>

            {/* Layout Mode Switcher */}
            <div className="flex items-center gap-1 bg-[#eff4ff] p-1 rounded-xl self-end lg:self-center border border-[#dce9ff]">
              <button
                type="button"
                onClick={() => setLayoutMode('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  layoutMode === 'list'
                    ? 'bg-[#006a61] text-white shadow-xs'
                    : 'text-[#45464d] hover:text-[#0b1c30]'
                }`}
                title="List View Only"
              >
                <span className="material-symbols-outlined text-base">format_list_bulleted</span>
                <span className="hidden sm:inline">List</span>
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('map')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  layoutMode === 'map'
                    ? 'bg-[#006a61] text-white shadow-xs'
                    : 'text-[#45464d] hover:text-[#0b1c30]'
                }`}
                title="Split Map View Active"
              >
                <span className="material-symbols-outlined text-base">map</span>
                <span className="hidden sm:inline">Map View</span>
              </button>
            </div>
          </div>

          {/* Bottom Row: Filter Dropdowns, Active Badge, Sort Order */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              {/* Budget Range Selector */}
              <div className="relative">
                <select
                  value={budgetTier}
                  onChange={(e) => setBudgetTier(e.target.value)}
                  className="appearance-none bg-white border border-[#e5eeff] px-3 pr-8 py-1.5 rounded-lg text-xs font-semibold text-[#0b1c30] cursor-pointer focus:outline-none focus:border-[#006a61] shadow-2xs"
                >
                  <option value="Under ₹25k">Budget: Under ₹25k</option>
                  <option value="₹25k - ₹50k">Budget: ₹25k - ₹50k</option>
                  <option value="₹50k - ₹75k">Budget: ₹50k - ₹75k</option>
                  <option value="₹75k+">Budget: ₹75k+</option>
                </select>
                <span className="material-symbols-outlined text-sm text-[#76777d] absolute right-2 top-2 pointer-events-none">
                  expand_more
                </span>
              </div>

              {/* Tenant Type */}
              <div className="relative">
                <select
                  value={tenantFilter}
                  onChange={(e) => setTenantFilter(e.target.value)}
                  className="appearance-none bg-white border border-[#e5eeff] px-3 pr-8 py-1.5 rounded-lg text-xs font-semibold text-[#0b1c30] cursor-pointer focus:outline-none focus:border-[#006a61] shadow-2xs"
                >
                  <option value="All Tenants">Tenant: All</option>
                  <option value="Family, Bachelors">Tenant: Family, Bachelors</option>
                  <option value="Family Only">Tenant: Family Only</option>
                  <option value="Bachelors Only">Tenant: Bachelors Only</option>
                </select>
                <span className="material-symbols-outlined text-sm text-[#76777d] absolute right-2 top-2 pointer-events-none">
                  expand_more
                </span>
              </div>

              {/* Furnishing Type */}
              <div className="relative">
                <select
                  value={furnishingFilter}
                  onChange={(e) => setFurnishingFilter(e.target.value)}
                  className="appearance-none bg-white border border-[#e5eeff] px-3 pr-8 py-1.5 rounded-lg text-xs font-semibold text-[#0b1c30] cursor-pointer focus:outline-none focus:border-[#006a61] shadow-2xs"
                >
                  <option value="Any Furnishing">Furnishing: Any</option>
                  <option value="Semi-Furnished">Furnishing: Semi-Furnished</option>
                  <option value="Fully Furnished">Furnishing: Fully Furnished</option>
                  <option value="Unfurnished">Furnishing: Unfurnished</option>
                </select>
                <span className="material-symbols-outlined text-sm text-[#76777d] absolute right-2 top-2 pointer-events-none">
                  expand_more
                </span>
              </div>

              {/* More Filters */}
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#e5eeff] text-[#0b1c30] text-xs font-bold hover:bg-[#dce9ff] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">tune</span>
                <span>More Filters</span>
                <span className="w-4 h-4 rounded-full bg-[#006a61] text-white text-[10px] flex items-center justify-center font-bold">
                  2
                </span>
              </button>
            </div>

            {/* Sort Control */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#45464d] hidden md:inline">Sort:</span>
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-[#eff4ff] pl-3 pr-8 py-1.5 rounded-lg text-xs font-bold text-[#0b1c30] border-0 focus:ring-0 cursor-pointer"
                >
                  <option value="Recommended (Default)">Recommended (Default)</option>
                  <option value="Rent: Low to High">Rent: Low to High</option>
                  <option value="Rent: High to Low">Rent: High to Low</option>
                  <option value="Recently Added">Recently Added</option>
                </select>
                <span className="material-symbols-outlined text-sm text-[#76777d] absolute right-2 top-2 pointer-events-none">
                  unfold_more
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN SPLIT WORKSPACE: LISTINGS & DYNAMIC MAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className={`grid gap-6 items-start ${layoutMode === 'map' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
          {/* LEFT COLUMN: FEED & SUMMARY */}
          <div className={`${layoutMode === 'map' ? 'lg:col-span-7' : 'max-w-4xl mx-auto w-full'} flex flex-col gap-5`}>
            {/* Results Summary Banner */}
            <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-lg font-bold text-[#0b1c30]">142 Verified Homes for Rent</h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#89f5e7] text-[#00201d] text-xs font-bold">
                    <span className="material-symbols-outlined text-xs">verified_user</span>
                    0% Brokerage
                  </span>
                </div>
                <p className="text-xs text-[#45464d]">Indiranagar • Bengaluru East • Direct Verified Owners</p>
              </div>

              {/* Real-Time Alerts Switch */}
              <div className="flex items-center gap-3 bg-[#eff4ff] px-3 py-2 rounded-xl border border-[#dce9ff]">
                <div className="flex flex-col">
                  <span className="text-xs text-[#0b1c30] font-bold">Instant Alerts</span>
                  <span className="text-[10px] text-[#45464d]">Notify new flats</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={instantAlerts}
                    onChange={(e) => setInstantAlerts(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-[#c6c6cd] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#006a61]"></div>
                </label>
              </div>
            </div>

            {/* PROPERTY CARDS FEED */}
            {properties.map((prop) => {
              const isFav = favorites[prop.id];
              const isSelected = activePropertyId === prop.id;

              return (
                <article
                  key={prop.id}
                  onClick={() => setActivePropertyId(prop.id)}
                  className={`bg-white rounded-xl shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col relative group border cursor-pointer ${
                    isSelected ? 'border-[#006a61] ring-2 ring-[#86f2e4]/50' : 'border-[#e5eeff]'
                  }`}
                >
                  {/* Top Image & Badges */}
                  <div className="relative w-full aspect-[16/9] bg-[#eff4ff] overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      src={prop.coverImage}
                      alt={prop.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none"></div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#006a61] text-white text-xs font-bold shadow-md">
                        <span className="material-symbols-outlined text-xs">payments</span>
                        Zero Brokerage
                      </span>
                      {prop.isOwnerVerified && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#131b2e] text-white text-xs font-bold shadow-md">
                          <span className="material-symbols-outlined text-xs text-[#89f5e7]">badge</span>
                          Aadhaar Verified Owner
                        </span>
                      )}
                    </div>

                    {/* Right Tools */}
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <span className="px-2 py-1 rounded-lg bg-[#131b2e]/80 backdrop-blur-xs text-white text-[11px] font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">360</span> 360° Tour
                      </span>
                      <button
                        type="button"
                        onClick={(e) => toggleFavorite(prop.id, e)}
                        className={`w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center transition-colors shadow-sm cursor-pointer ${
                          isFav ? 'text-[#ba1a1a]' : 'text-[#0b1c30] hover:text-[#ba1a1a]'
                        }`}
                        title="Save to favorites"
                      >
                        <span
                          className="material-symbols-outlined text-lg"
                          style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
                        >
                          favorite
                        </span>
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                      <span className="text-[11px] bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1 font-semibold">
                        <span className="material-symbols-outlined text-xs">photo_camera</span> 1/12 Photos
                      </span>
                      <span className="text-[11px] bg-[#89f5e7] text-[#00201d] font-bold px-2 py-0.5 rounded">
                        {prop.availableFrom === 'Immediate' ? 'Immediate Move-in' : `Available ${prop.availableFrom}`}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <h2 className="text-base font-bold text-[#0b1c30] group-hover:text-[#006a61] transition-colors">
                          {prop.title}
                        </h2>
                        <p className="text-xs text-[#45464d] flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-[#006a61] text-sm">near_me</span>
                          {prop.fullAddress}
                        </p>
                      </div>

                      <div className="flex flex-col sm:items-end">
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-extrabold text-[#0b1c30]">
                            ₹{prop.rent.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-[#45464d]">/ mo</span>
                        </div>
                        <span className="text-[11px] text-[#76777d]">
                          {prop.isMaintenanceIncluded ? 'Maintenance Incl.' : `+ ₹${prop.maintenance.toLocaleString('en-IN')} Maint.`}
                        </span>
                      </div>
                    </div>

                    {/* Spec Chips */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#45464d] text-xs font-semibold">
                        {prop.bhk}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#45464d] text-xs font-semibold">
                        {prop.area} sq.ft
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#45464d] text-xs font-semibold">
                        {prop.furnishing}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#45464d] text-xs font-semibold">
                        {prop.floor}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#45464d] text-xs font-semibold">
                        {prop.facing}
                      </span>
                    </div>

                    {/* Financial & Landlord Snapshot */}
                    <div className="bg-[#eff4ff] rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-[#dce9ff]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#d3e4fe] flex items-center justify-center text-[#006f66] font-bold text-sm">
                          {prop.ownerInitials}
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-[#0b1c30]">{prop.ownerName}</span>
                            <span className="material-symbols-outlined text-[#006a61] text-xs">verified</span>
                            <span className="text-[10px] text-[#006a61] font-bold">{prop.ownerBadge}</span>
                          </div>
                          <span className="text-[10px] text-[#45464d] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]"></span>
                            Responds in 15 mins
                          </span>
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-[11px] text-[#45464d]">Security Deposit:</span>
                        <p className="text-xs font-bold text-[#0b1c30]">
                          ₹{prop.deposit.toLocaleString('en-IN')}{' '}
                          <span className="font-normal text-[#45464d]">({prop.depositMonths} Months)</span>
                        </p>
                      </div>
                    </div>

                    {/* Action Triggers */}
                    <div className="flex items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onBookVisit(prop);
                        }}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-[#e5eeff] hover:bg-[#dce9ff] text-[#0b1c30] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                        <span>Book Free Visit</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onContactOwner(prop);
                        }}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-[#006a61] hover:bg-[#005049] text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">chat</span>
                        <span>Contact Landlord</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}

            {/* Pagination & Results Counter */}
            <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
              <span className="text-xs text-[#45464d]">
                Showing <strong className="text-[#0b1c30]">4</strong> of <strong className="text-[#0b1c30]">142</strong> properties in Indiranagar
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled
                  className="px-3 py-1.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-xs font-bold opacity-50 cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="w-8 h-8 rounded-lg bg-[#006a61] text-white text-xs font-bold flex items-center justify-center"
                >
                  1
                </button>
                <button
                  type="button"
                  className="w-8 h-8 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-xs font-bold flex items-center justify-center hover:bg-[#dce9ff]"
                >
                  2
                </button>
                <button
                  type="button"
                  className="w-8 h-8 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-xs font-bold flex items-center justify-center hover:bg-[#dce9ff]"
                >
                  3
                </button>
                <span className="text-[#76777d] px-1 text-xs">...</span>
                <button
                  type="button"
                  className="w-8 h-8 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-xs font-bold flex items-center justify-center hover:bg-[#dce9ff]"
                >
                  36
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-xs font-bold hover:bg-[#dce9ff]"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE MAP CANVAS (42%) */}
          {layoutMode === 'map' && (
            <div className="lg:col-span-5 sticky top-48 h-[calc(100vh-14rem)] hidden lg:flex flex-col rounded-2xl overflow-hidden shadow-md bg-[#eff4ff] border border-[#dce9ff] relative">
              {/* Map background image from user asset */}
              <div
                className="w-full h-full bg-cover bg-center relative"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSom1iTdr939RklhcHvixKplMMoROoeHu4MKzzfOzuER-tOlpGpkG7thb-J93NSRvEGyTXfzBjYEsMzxsXhEfIjyjuWiMyWuA7UVToI8jlnQgEs2Qs2my27KK-nk5GVBndoIoVdGTKqcUlDkC2KpYbNcEprwSQO5lQDVVwuORjXeZ5_Y3g8Q9Tg8p5ht3RShhzF_xJDQr-2Vza93gHGMx8HEQxE-L7AOHwVaNSMso')"
                }}
              >
                <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>

                {/* Top Control: Layer Toggles */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto z-30">
                  <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1 rounded-xl shadow-md border border-[#e5eeff]">
                    <button
                      type="button"
                      onClick={() => setSelectedLayer('metro')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer transition-colors ${
                        selectedLayer === 'metro'
                          ? 'bg-[#006a61] text-white'
                          : 'text-[#0b1c30] hover:bg-[#eff4ff]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xs">subway</span>
                      <span>Metro</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedLayer('health')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                        selectedLayer === 'health'
                          ? 'bg-[#006a61] text-white'
                          : 'text-[#0b1c30] hover:bg-[#eff4ff]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xs">local_hospital</span>
                      <span>Health</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedLayer('schools')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                        selectedLayer === 'schools'
                          ? 'bg-[#006a61] text-white'
                          : 'text-[#0b1c30] hover:bg-[#eff4ff]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xs">school</span>
                      <span>Schools</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    className="w-9 h-9 bg-white/95 backdrop-blur-md rounded-xl shadow-md flex items-center justify-center text-[#0b1c30] hover:text-[#006a61] border border-[#e5eeff] transition-colors cursor-pointer"
                    title="Locality Boundary"
                  >
                    <span className="material-symbols-outlined text-lg">polyline</span>
                  </button>
                </div>

                {/* MAP PINS */}
                {/* Marker 1: Prestige Falcon City - ₹36K */}
                <div
                  onClick={() => setActivePropertyId('blr-70491')}
                  className="absolute top-[42%] left-[48%] -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer"
                >
                  <div
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-bold text-xs shadow-xl transition-all ${
                      activePropertyId === 'blr-70491'
                        ? 'bg-[#006a61] text-white scale-110 ring-4 ring-[#89f5e7]/60'
                        : 'bg-white text-[#0b1c30] hover:bg-[#131b2e] hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xs">home</span>
                    <span>₹34K</span>
                  </div>
                  <div
                    className={`w-2.5 h-2.5 rotate-45 mx-auto -mt-1 shadow-sm ${
                      activePropertyId === 'blr-70491' ? 'bg-[#006a61]' : 'bg-white'
                    }`}
                  ></div>
                </div>

                {/* Marker 2: Adarsh Rhythm - ₹55K */}
                <div
                  onClick={() => setActivePropertyId('blr-99214')}
                  className="absolute top-[28%] left-[64%] -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                >
                  <div
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-xs shadow-md transition-all ${
                      activePropertyId === 'blr-99214'
                        ? 'bg-[#006a61] text-white scale-110 ring-4 ring-[#89f5e7]/60'
                        : 'bg-white text-[#0b1c30] hover:bg-[#131b2e] hover:text-white'
                    }`}
                  >
                    <span>₹55K</span>
                  </div>
                </div>

                {/* Marker 3: Indiranagar 1st Stage - ₹24K */}
                <div
                  onClick={() => setActivePropertyId('blr-33018')}
                  className="absolute top-[62%] left-[32%] -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                >
                  <div
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-xs shadow-md transition-all ${
                      activePropertyId === 'blr-33018'
                        ? 'bg-[#006a61] text-white scale-110 ring-4 ring-[#89f5e7]/60'
                        : 'bg-white text-[#0b1c30] hover:bg-[#131b2e] hover:text-white'
                    }`}
                  >
                    <span>₹24K</span>
                  </div>
                </div>

                {/* Marker 4: Sobha Suncrest - ₹38K */}
                <div
                  onClick={() => setActivePropertyId('blr-77189')}
                  className="absolute top-[50%] left-[78%] -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                >
                  <div
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-xs shadow-md transition-all ${
                      activePropertyId === 'blr-77189'
                        ? 'bg-[#006a61] text-white scale-110 ring-4 ring-[#89f5e7]/60'
                        : 'bg-white text-[#0b1c30] hover:bg-[#131b2e] hover:text-white'
                    }`}
                  >
                    <span>₹38K</span>
                  </div>
                </div>

                {/* Metro Tag */}
                {selectedLayer === 'metro' && (
                  <div className="absolute top-[38%] left-[40%] flex items-center gap-1 px-2 py-0.5 rounded bg-white/95 text-[#0b1c30] text-[10px] font-bold shadow-xs pointer-events-none border border-[#dce9ff]">
                    <span className="w-2 h-2 rounded-full bg-[#006a61] inline-block"></span>
                    <span>Indiranagar Metro (Purple Line)</span>
                  </div>
                )}

                {/* Zoom & Controls */}
                <div className="absolute right-4 bottom-32 flex flex-col gap-1 shadow-md rounded-xl overflow-hidden bg-white border border-[#e5eeff] z-20">
                  <button
                    type="button"
                    aria-label="Zoom in"
                    className="w-8 h-8 flex items-center justify-center text-[#0b1c30] hover:bg-[#eff4ff] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">add</span>
                  </button>
                  <div className="h-[1px] bg-[#e5eeff]"></div>
                  <button
                    type="button"
                    aria-label="Zoom out"
                    className="w-8 h-8 flex items-center justify-center text-[#0b1c30] hover:bg-[#eff4ff] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">remove</span>
                  </button>
                  <div className="h-[1px] bg-[#e5eeff]"></div>
                  <button
                    type="button"
                    aria-label="My location"
                    className="w-8 h-8 flex items-center justify-center text-[#006a61] hover:bg-[#eff4ff] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">my_location</span>
                  </button>
                </div>

                {/* FLOATING PREVIEW MINI-CARD FOR ACTIVE PIN */}
                {activeProperty && (
                  <div className="absolute bottom-4 left-4 right-4 bg-white/98 backdrop-blur-md rounded-xl p-3 shadow-xl border border-[#dce9ff] z-30 animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 relative bg-[#eff4ff]">
                        <img
                          src={activeProperty.coverImage}
                          alt={activeProperty.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 left-1 bg-[#006a61] text-white font-bold px-1.5 py-0.2 rounded text-[9px]">
                          0% Fee
                        </span>
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-[#006a61] font-bold uppercase tracking-wider">
                            Active Selection
                          </span>
                          <span className="text-sm font-extrabold text-[#0b1c30]">
                            ₹{activeProperty.rent.toLocaleString('en-IN')}
                            <span className="text-[10px] font-normal text-[#45464d]">/mo</span>
                          </span>
                        </div>
                        <h3 className="text-xs text-[#0b1c30] truncate font-bold">{activeProperty.title}</h3>
                        <p className="text-[11px] text-[#45464d] truncate">{activeProperty.fullAddress}</p>
                        <div className="flex items-center justify-between mt-1 pt-1 border-t border-[#eff4ff]">
                          <span className="text-[10px] text-[#76777d]">
                            {activeProperty.area} sq.ft • {activeProperty.facing}
                          </span>
                          <button
                            type="button"
                            onClick={() => onSelectProperty(activeProperty)}
                            className="text-[11px] text-[#006a61] font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                          >
                            <span>View Details</span>
                            <span className="material-symbols-outlined text-xs">arrow_forward</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* TRUST & CONVENIENCE MICRO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#e5eeff]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#89f5e7] flex items-center justify-center text-[#00201d] shrink-0">
                <span className="material-symbols-outlined text-2xl">verified</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0b1c30]">100% Zero Brokerage</h4>
                <p className="text-xs text-[#45464d]">Pay zero commissions. Deal directly with genuine property owners.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#d3e4fe] flex items-center justify-center text-[#006a61] shrink-0">
                <span className="material-symbols-outlined text-2xl">description</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0b1c30]">Digital e-Stamped Agreements</h4>
                <p className="text-xs text-[#45464d]">Govt registered rental agreements delivered to your inbox in 2 hours.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#e5eeff] flex items-center justify-center text-[#0b1c30] shrink-0">
                <span className="material-symbols-outlined text-2xl">security</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0b1c30]">Aadhaar Verified Owners</h4>
                <p className="text-xs text-[#45464d]">Every listing is verified with official ownership records and physical visits.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
