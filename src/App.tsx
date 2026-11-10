import React, { useState } from 'react';
import { Property, Conversation } from './types';
import { INITIAL_PROPERTIES, INITIAL_CONVERSATIONS } from './mockData';
import { Navbar } from './components/Navbar';
import { OwnerSidebar } from './components/OwnerSidebar';
import { OwnerHeader } from './components/OwnerHeader';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { BookVisitModal } from './components/BookVisitModal';
import { AgreementModal } from './components/AgreementModal';
import { RMConnectModal } from './components/RMConnectModal';
import { NotificationsModal } from './components/NotificationsModal';
import { MarketplaceHome } from './views/MarketplaceHome';
import { MarketplaceSearch } from './views/MarketplaceSearch';
import { OwnerDashboard } from './views/OwnerDashboard';
import { TenantEnquiriesChat } from './views/TenantEnquiriesChat';
import { AddPropertyFlow } from './views/AddPropertyFlow';

export default function App() {
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [conversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);

  // Active view: 'marketplace-home' | 'marketplace-search' | 'owner-dashboard' | 'add-new-property' | 'tenant-enquiries' | 'my-properties'
  const [activeView, setActiveView] = useState<string>('marketplace-home');
  const [activeChatId, setActiveChatId] = useState<string>('conv-priya-nair');

  // Modals state
  const [selectedPropertyForModal, setSelectedPropertyForModal] = useState<Property | null>(null);
  const [selectedPropertyForVisit, setSelectedPropertyForVisit] = useState<Property | null>(null);
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [agreementTenantName, setAgreementTenantName] = useState('Priya S. Nair');
  const [agreementPropertyName, setAgreementPropertyName] = useState('Prestige Falcon City, Unit B-1204');
  const [agreementRent, setAgreementRent] = useState(34000);
  const [showRMModal, setShowRMModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  const isOwnerView =
    activeView === 'owner-dashboard' ||
    activeView === 'tenant-enquiries' ||
    activeView === 'in-app-messages' ||
    activeView === 'my-properties' ||
    activeView === 'add-new-property' ||
    activeView === 'visit-requests' ||
    activeView === 'rental-agreements-and-e-stamps' ||
    activeView === 'owner-verification-kyc';

  const handleOpenAddProperty = () => {
    setActiveView('add-new-property');
  };

  const handleOpenChatWithTenant = (tenantConvId?: string) => {
    if (tenantConvId) {
      setActiveChatId(tenantConvId);
    }
    setActiveView('tenant-enquiries');
  };

  const handleViewPropertyDetails = (property: Property) => {
    setSelectedPropertyForModal(property);
  };

  const handleViewPropertyById = (propertyId: string) => {
    const prop = properties.find((p) => p.id === propertyId) || properties[0];
    setSelectedPropertyForModal(prop);
  };

  const handleOpenBookVisit = (property: Property) => {
    setSelectedPropertyForVisit(property);
  };

  const handleOpenAgreement = (tenantName?: string, propertyName?: string, rent?: number) => {
    if (tenantName) setAgreementTenantName(tenantName);
    if (propertyName) setAgreementPropertyName(propertyName);
    if (rent) setAgreementRent(rent);
    setShowAgreementModal(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans selection:bg-[#86f2e4] selection:text-[#006f66]">
      {/* Top Banner Quick View Switcher */}
      <div className="bg-[#131b2e] text-white py-1 px-4 text-xs flex items-center justify-between border-b border-[#213145] z-50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
          <span className="font-semibold text-slate-300">GharSeva Prototype Navigation:</span>
          <span className="text-slate-400 hidden sm:inline">Switch between Tenant &amp; Landlord Screens</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveView('marketplace-home')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
              activeView === 'marketplace-home'
                ? 'bg-[#0D9488] text-white'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Marketplace Home
          </button>

          <button
            onClick={() => setActiveView('marketplace-search')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
              activeView === 'marketplace-search'
                ? 'bg-[#0D9488] text-white'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Search &amp; Map
          </button>

          <button
            onClick={() => setActiveView('owner-dashboard')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
              activeView === 'owner-dashboard'
                ? 'bg-[#0D9488] text-white'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Owner Dashboard
          </button>

          <button
            onClick={() => setActiveView('add-new-property')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
              activeView === 'add-new-property'
                ? 'bg-[#0D9488] text-white'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Add Property (Rent &amp; Terms)
          </button>

          <button
            onClick={() => setActiveView('tenant-enquiries')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
              activeView === 'tenant-enquiries'
                ? 'bg-[#0D9488] text-white'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Tenant Chat
          </button>
        </div>
      </div>

      {/* Main Layout Body */}
      {isOwnerView ? (
        <div className="flex-1 flex">
          {/* Owner Sidebar */}
          <OwnerSidebar
            currentTab={activeView}
            onSelectTab={(tab) => {
              if (tab === 'rental-agreements-and-e-stamps') {
                handleOpenAgreement();
              } else if (tab === 'visit-requests') {
                setActiveView('tenant-enquiries');
              } else if (tab === 'in-app-messages') {
                setActiveView('tenant-enquiries');
              } else {
                setActiveView(tab);
              }
            }}
            onConnectRM={() => setShowRMModal(true)}
          />

          {/* Owner Main Content Area */}
          <div className="pl-72 w-full flex flex-col min-h-screen">
            <OwnerHeader
              currentTab={activeView}
              onNavigateMarketplace={() => setActiveView('marketplace-home')}
              onSaveAndExit={() => setActiveView('owner-dashboard')}
              onOpenNotifications={() => setShowNotificationsModal(true)}
              unreadCount={4}
            />

            <main className="w-full pt-16 flex-1 bg-[#f8f9ff]">
              {activeView === 'owner-dashboard' && (
                <OwnerDashboard
                  properties={properties}
                  onOpenAddProperty={handleOpenAddProperty}
                  onOpenChat={handleOpenChatWithTenant}
                  onViewPropertyDetails={handleViewPropertyDetails}
                  onOpenAgreement={handleOpenAgreement}
                />
              )}

              {activeView === 'my-properties' && (
                <OwnerDashboard
                  properties={properties}
                  onOpenAddProperty={handleOpenAddProperty}
                  onOpenChat={handleOpenChatWithTenant}
                  onViewPropertyDetails={handleViewPropertyDetails}
                  onOpenAgreement={handleOpenAgreement}
                />
              )}

              {activeView === 'tenant-enquiries' && (
                <TenantEnquiriesChat
                  conversations={conversations}
                  activeConversationId={activeChatId}
                  onOpenAgreement={handleOpenAgreement}
                  onConnectRM={() => setShowRMModal(true)}
                  onViewPropertyDetails={handleViewPropertyById}
                />
              )}

              {activeView === 'add-new-property' && (
                <AddPropertyFlow
                  onFinishListing={(newProp) => {
                    setProperties((prev) => [newProp, ...prev]);
                    setActiveView('owner-dashboard');
                  }}
                  onGoToDashboard={() => setActiveView('owner-dashboard')}
                  onViewPublicListing={(propId) => {
                    handleViewPropertyById(propId);
                    setActiveView('marketplace-search');
                  }}
                  onConnectRM={() => setShowRMModal(true)}
                />
              )}
            </main>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <Navbar
            currentView={activeView}
            onNavigate={(view) => setActiveView(view)}
            onOpenAddProperty={handleOpenAddProperty}
          />

          <main className="flex-1">
            {activeView === 'marketplace-home' && (
              <MarketplaceHome
                properties={properties}
                onNavigateSearch={(loc) => setActiveView('marketplace-search')}
                onOpenAddProperty={handleOpenAddProperty}
                onSelectProperty={handleViewPropertyDetails}
                onBookVisit={handleOpenBookVisit}
                onContactOwner={(prop) => {
                  setSelectedPropertyForModal(prop);
                }}
              />
            )}

            {activeView === 'marketplace-search' && (
              <MarketplaceSearch
                properties={properties}
                onSelectProperty={handleViewPropertyDetails}
                onBookVisit={handleOpenBookVisit}
                onContactOwner={(prop) => {
                  setSelectedPropertyForModal(prop);
                }}
              />
            )}
          </main>
        </div>
      )}

      {/* Global Modals */}
      <PropertyDetailModal
        property={selectedPropertyForModal}
        onClose={() => setSelectedPropertyForModal(null)}
        onBookVisit={handleOpenBookVisit}
        onContactOwner={(prop) => {
          setSelectedPropertyForModal(null);
          handleOpenChatWithTenant('conv-priya-nair');
        }}
      />

      <BookVisitModal
        property={selectedPropertyForVisit}
        onClose={() => setSelectedPropertyForVisit(null)}
        onSuccess={() => {
          setTimeout(() => {
            setSelectedPropertyForVisit(null);
          }, 1500);
        }}
      />

      {showAgreementModal && (
        <AgreementModal
          onClose={() => setShowAgreementModal(false)}
          tenantName={agreementTenantName}
          propertyName={agreementPropertyName}
          rentAmount={agreementRent}
        />
      )}

      {showRMModal && (
        <RMConnectModal onClose={() => setShowRMModal(false)} />
      )}

      {showNotificationsModal && (
        <NotificationsModal
          onClose={() => setShowNotificationsModal(false)}
          onSelectAction={(action) => {
            setActiveView(action);
          }}
        />
      )}
    </div>
  );
}
