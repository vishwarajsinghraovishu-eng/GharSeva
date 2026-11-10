import React, { useState } from 'react';
import { Conversation, ChatMessage } from '../types';

interface TenantEnquiriesChatProps {
  conversations: Conversation[];
  activeConversationId?: string;
  onOpenAgreement: (tenantName?: string, propertyName?: string, rent?: number) => void;
  onConnectRM: () => void;
  onViewPropertyDetails: (propertyId: string) => void;
}

export const TenantEnquiriesChat: React.FC<TenantEnquiriesChatProps> = ({
  conversations: initialConversations,
  activeConversationId: propActiveId,
  onOpenAgreement,
  onConnectRM,
  onViewPropertyDetails
}) => {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [selectedConvId, setSelectedConvId] = useState<string>(
    propActiveId || initialConversations[0]?.id || 'conv-priya-nair'
  );
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyFilter, setPropertyFilter] = useState('all');
  const [inputText, setInputText] = useState(
    'Saturday 4:00 PM works great. I have accepted the visit and your visitor pass has been generated.'
  );
  const [visitAccepted, setVisitAccepted] = useState(false);
  const [callToast, setCallToast] = useState(false);

  const activeConv =
    conversations.find((c) => c.id === selectedConvId) || conversations[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'owner',
      senderName: 'Col. Rajesh Sharma',
      text: inputText.trim(),
      timestamp: 'Just now'
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConv.id
          ? {
              ...c,
              lastMessage: newMsg.text,
              messages: [...c.messages, newMsg]
            }
          : c
      )
    );
    setInputText('');
  };

  const handleAcceptVisit = () => {
    setVisitAccepted(true);
    if (!activeConv) return;

    const acceptMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'system',
      senderName: 'GharSeva Concierge',
      text: 'Visit pass GHAR-PAS-7104 approved by owner for Saturday 16 Nov, 04:00 PM. Gate security notified.',
      timestamp: 'Just now'
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConv.id
          ? {
              ...c,
              visitRequestSummary: 'Visit Confirmed: Sat 4 PM',
              messages: [...c.messages, acceptMsg]
            }
          : c
      )
    );
  };

  const handleProposeAlternate = () => {
    setInputText('Hi Priya, could we do Sunday 11:00 AM instead? Please let me know.');
  };

  const handleQuickReply = (text: string) => {
    setInputText(text);
  };

  const handleMaskedCall = () => {
    setCallToast(true);
    setTimeout(() => setCallToast(false), 3500);
  };

  // Filter conversations
  const filteredConversations = conversations.filter((c) => {
    if (selectedFilter === 'unread' && c.unreadCount === 0) return false;
    if (selectedFilter === 'visit' && !c.hasVisitRequest) return false;
    if (selectedFilter === 'offer' && !c.hasOffer) return false;
    if (searchQuery && !c.tenantName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (propertyFilter !== 'all' && !c.propertyTitle.toLowerCase().includes(propertyFilter.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="w-full flex flex-col bg-[#f8f9ff]">
      {callToast && (
        <div className="fixed top-20 right-8 z-50 p-4 bg-[#131b2e] text-white rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <span className="material-symbols-outlined text-[#89f5e7]">phone_in_talk</span>
          <div className="flex flex-col text-xs">
            <span className="font-bold">Initiating Masked Direct Call...</span>
            <span className="text-[#a5b4fc]">Dialing virtual gateway connected to Priya Nair.</span>
          </div>
        </div>
      )}

      {/* Top Command & Filter Sub-Bar */}
      <div className="w-full bg-white px-6 py-4 shadow-[0_1px_4px_rgba(0,0,0,0.03)] border-b border-[#e5eeff]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div>
              <h1 className="text-xl font-bold text-[#0b1c30] tracking-tight">Tenant Inquiries &amp; Chat</h1>
              <p className="text-xs text-[#45464d]">Direct communications without brokerage intermediaries</p>
            </div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#86f2e4] text-[#006f66] text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>
              12 Total • 3 Unread • 2 Visit Requests
            </span>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Property Dropdown */}
            <div className="relative inline-flex items-center">
              <select
                value={propertyFilter}
                onChange={(e) => setPropertyFilter(e.target.value)}
                className="appearance-none bg-[#eff4ff] text-[#0b1c30] text-xs font-bold pl-3 pr-8 py-2 rounded-lg cursor-pointer focus:outline-none border border-[#dce9ff]"
              >
                <option value="all">All Properties (3 Units)</option>
                <option value="Prestige Falcon City">Prestige Falcon City, 2 BHK (Unit B-1204)</option>
                <option value="Hiranandani Estate">Hiranandani Estate, 3 BHK (Tower 4)</option>
                <option value="Sobha Dream Acres">Sobha Dream Acres, 1 BHK (Wing C)</option>
              </select>
              <span className="material-symbols-outlined text-[18px] text-[#45464d] absolute right-2 pointer-events-none">
                expand_more
              </span>
            </div>

            {/* Search Tenant Box */}
            <div className="relative flex items-center w-60 lg:w-68">
              <span className="material-symbols-outlined text-[18px] text-[#45464d] absolute left-3 pointer-events-none">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#eff4ff] text-[#0b1c30] placeholder:text-[#76777d] text-xs pl-9 pr-3 py-2 rounded-lg focus:outline-none border border-[#dce9ff]"
                placeholder="Search tenant, email or text..."
              />
            </div>
          </div>
        </div>

        {/* Quick Status Filtering Chips */}
        <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All Inquiries (12)' },
            { id: 'unread', label: 'Unread', badge: '3', badgeColor: 'bg-[#ba1a1a] text-white' },
            { id: 'visit', label: 'Visit Requested', badge: '2', badgeColor: 'bg-[#006a61] text-white' },
            { id: 'offer', label: 'Offer Received (1)' },
            { id: 'kyc', label: 'KYC Cleared' },
            { id: 'archived', label: 'Archived' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                selectedFilter === f.id
                  ? 'bg-[#131b2e] text-white shadow-xs'
                  : 'bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30]'
              }`}
            >
              <span>{f.label}</span>
              {f.badge && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${f.badgeColor}`}>
                  {f.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Pane Responsive Workplace Canvas */}
      <div className="w-full px-6 py-4">
        <div className="grid grid-cols-12 gap-4 items-start">
          {/* PANE 1: Conversation & Inquiry List (4 cols) */}
          <section className="col-span-12 lg:col-span-4 xl:col-span-4 bg-white rounded-xl shadow-xs border border-[#e5eeff] flex flex-col h-[calc(100vh-210px)] overflow-hidden">
            <div className="p-3 bg-[#eff4ff] border-b border-[#dce9ff] flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[#0b1c30] text-xs font-bold">
                <span className="material-symbols-outlined text-[#006a61] text-[18px]">mark_email_unread</span>
                <span>Active Conversations</span>
              </div>
              <button
                type="button"
                className="text-[#45464d] hover:text-[#0b1c30] p-1 rounded-lg hover:bg-[#dce9ff] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-[#eff4ff]">
              {filteredConversations.map((conv) => {
                const isSelected = conv.id === selectedConvId;

                return (
                  <article
                    key={conv.id}
                    onClick={() => setSelectedConvId(conv.id)}
                    className={`p-3.5 transition-colors cursor-pointer relative ${
                      isSelected ? 'bg-[#dce9ff]/60 hover:bg-[#dce9ff]' : 'bg-white hover:bg-[#eff4ff]'
                    }`}
                  >
                    {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#006a61]"></div>}

                    <div className="flex items-start gap-3">
                      <div className="relative shrink-0">
                        <div className="w-10 h-10 rounded-full bg-[#131b2e] text-white flex items-center justify-center font-bold text-xs">
                          {conv.tenantInitials}
                        </div>
                        {conv.isVerified && (
                          <span className="material-symbols-outlined absolute -bottom-1 -right-1 text-[#006a61] bg-white rounded-full text-[15px]">
                            verified
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="text-xs font-bold text-[#0b1c30] truncate">{conv.tenantName}</span>
                            <span className="px-1.5 py-0.2 rounded bg-[#eff4ff] text-[#006a61] text-[9px] uppercase font-bold">
                              {conv.employerBadge}
                            </span>
                          </div>
                          <span className="text-[10px] text-[#76777d] shrink-0">{conv.timeAgo}</span>
                        </div>

                        <div className="mt-0.5">
                          <span className="inline-block px-1.5 py-0.2 rounded bg-[#eff4ff] text-[#45464d] text-[10px]">
                            {conv.propertyTitle} • ₹{conv.propertyRent.toLocaleString('en-IN')}/mo
                          </span>
                        </div>

                        <p className="text-xs text-[#0b1c30] truncate mt-1">{conv.lastMessage}</p>

                        <div className="flex items-center gap-1.5 mt-1.5">
                          {conv.hasVisitRequest && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-[10px] font-bold">
                              <span className="material-symbols-outlined text-[12px]">calendar_month</span>{' '}
                              {conv.visitRequestSummary || 'Visit Req: Sat 4 PM'}
                            </span>
                          )}
                          {conv.hasOffer && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#131b2e] text-white text-[10px] font-bold">
                              <span className="material-symbols-outlined text-[12px]">local_offer</span> Offer: ₹
                              {conv.offerAmount?.toLocaleString('en-IN')}/mo
                            </span>
                          )}
                          {conv.unreadCount > 0 && <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* PANE 2: Main Active Chat Screen (5 cols) */}
          <section className="col-span-12 lg:col-span-8 xl:col-span-5 bg-white rounded-xl shadow-xs border border-[#e5eeff] flex flex-col h-[calc(100vh-210px)] overflow-hidden">
            {/* Chat Header Profile Bar */}
            <div className="px-4 py-3 bg-white border-b border-[#eff4ff] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-[#131b2e] text-white flex items-center justify-center font-bold text-xs">
                      {activeConv.tenantInitials}
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#006a61] absolute bottom-0 right-0 border-2 border-white"></span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-[#0b1c30] leading-tight">{activeConv.tenantName}</span>
                      <span className="px-2 py-0.2 rounded-full bg-[#86f2e4] text-[#006f66] text-[10px] font-bold flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">verified</span> {activeConv.employerBadge} Verified
                      </span>
                    </div>
                    <span className="text-[11px] text-[#45464d] mt-0.5">
                      KYC Complete • High Intent Score {activeConv.dossier.reliabilityScore}%
                    </span>
                  </div>
                </div>

                {/* Quick Communication Triggers */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleMaskedCall}
                    className="px-3 py-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer"
                    title="Masked Direct Call"
                  >
                    <span className="material-symbols-outlined text-[#006a61] text-[16px]">phone_in_talk</span>
                    <span className="hidden sm:inline">Masked Call</span>
                  </button>

                  <button
                    type="button"
                    onClick={onConnectRM}
                    className="p-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#45464d] hover:text-[#0b1c30] transition-colors cursor-pointer"
                    title="Ask RM"
                  >
                    <span className="material-symbols-outlined text-[18px]">support_agent</span>
                  </button>
                </div>
              </div>

              {/* Pinned Property Context Bar */}
              <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff]">
                <div className="flex items-center gap-1.5 text-[#0b1c30]">
                  <span className="material-symbols-outlined text-[#006a61] text-[16px]">apartment</span>
                  <span className="text-xs font-semibold">{activeConv.propertyTitle}</span>
                  <span className="text-[#45464d] text-xs">• ₹{activeConv.propertyRent.toLocaleString('en-IN')}/mo</span>
                </div>
                <button
                  type="button"
                  onClick={() => onViewPropertyDetails('blr-70491')}
                  className="text-xs text-[#006a61] hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
                >
                  <span>View Listing</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </button>
              </div>
            </div>

            {/* Chat Stream */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3.5 bg-[#f8f9ff]">
              {/* Date Separator */}
              <div className="flex items-center justify-center my-0.5">
                <span className="px-3 py-0.5 rounded-full bg-[#eff4ff] text-[#45464d] text-[11px] font-medium border border-[#dce9ff]">
                  Today, November 14
                </span>
              </div>

              {/* Trust & Privacy Security Pill */}
              <div className="p-2.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff] flex items-start gap-2">
                <span className="material-symbols-outlined text-[#006a61] text-[18px] shrink-0 mt-0.5">
                  verified_user
                </span>
                <div className="text-[#0b1c30] text-xs leading-snug">
                  <strong>Zero-Broker Protection Active:</strong> WhatsApp &amp; identity shielding enabled. Never transfer cash deposits before standard digital e-Stamp lease signing.
                </div>
              </div>

              {/* Messages list */}
              {activeConv.messages.map((msg) => {
                const isOwner = msg.sender === 'owner';
                const isSystem = msg.sender === 'system';

                if (isSystem) {
                  return (
                    <div key={msg.id} className="p-2 rounded-lg bg-[#e5eeff] text-[#006a61] text-xs text-center font-bold">
                      {msg.text}
                    </div>
                  );
                }

                if (msg.isVisitCard) {
                  return (
                    <div key={msg.id} className="my-1 max-w-[92%] self-start ml-7">
                      <div className="p-4 rounded-xl bg-white shadow-md border border-[#86f2e4]">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-[#86f2e4] text-[#006f66] flex items-center justify-center">
                              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                            </div>
                            <div>
                              <span className="text-xs font-bold text-[#0b1c30] block leading-tight">
                                Physical Visit Proposed
                              </span>
                              <span className="text-xs text-[#006a61] font-semibold">
                                {msg.visitDetails?.date} • {msg.visitDetails?.time}
                              </span>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              visitAccepted
                                ? 'bg-[#86f2e4] text-[#006f66]'
                                : 'bg-[#eff4ff] text-[#45464d]'
                            }`}
                          >
                            {visitAccepted ? 'Visit Confirmed ✓' : 'Pending Your Action'}
                          </span>
                        </div>

                        <p className="text-xs text-[#45464d] mb-3">
                          Priya Nair and spouse requested an in-person walkthrough at Prestige Falcon City (Unit B-1204).
                        </p>

                        {!visitAccepted ? (
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={handleAcceptVisit}
                              className="px-3.5 py-1.5 rounded-lg bg-[#006a61] text-white hover:bg-[#005049] text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[16px]">check</span>
                              <span>Accept &amp; Generate Gate Pass</span>
                            </button>
                            <button
                              type="button"
                              onClick={handleProposeAlternate}
                              className="px-3 py-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-medium transition-colors cursor-pointer"
                            >
                              Propose Alternate Time
                            </button>
                          </div>
                        ) : (
                          <div className="p-2 rounded-lg bg-[#eff4ff] text-xs text-[#006a61] font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">verified</span>
                            <span>Visitor Pass Code: GHAR-PASS-7104</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 max-w-[85%] ${isOwner ? 'self-end' : 'self-start'}`}
                  >
                    {!isOwner && (
                      <div className="w-7 h-7 rounded-full bg-[#131b2e] text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                        {activeConv.tenantInitials}
                      </div>
                    )}

                    <div className={`flex flex-col gap-0.5 ${isOwner ? 'items-end' : ''}`}>
                      <div
                        className={`p-3 rounded-2xl text-xs font-medium shadow-xs leading-relaxed ${
                          isOwner
                            ? 'rounded-br-xs bg-[#131b2e] text-white'
                            : 'rounded-bl-xs bg-white text-[#0b1c30] border border-[#e5eeff]'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-[#76777d] px-1">
                        <span>{msg.timestamp}</span>
                        {isOwner && (
                          <span className="material-symbols-outlined text-[#006a61] text-[13px]">
                            done_all
                          </span>
                        )}
                      </div>
                    </div>

                    {isOwner && (
                      <div className="w-7 h-7 rounded-full bg-[#000000] text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                        RS
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Replies Pill Strip */}
            <div className="px-4 py-2 bg-white border-t border-[#eff4ff] flex items-center gap-2 overflow-x-auto">
              <span className="text-[10px] text-[#76777d] uppercase font-bold shrink-0">Quick Replies:</span>
              {[
                'Saturday 4 PM works',
                'Please upload salary slip / ID',
                'Send standard 11-mo lease agreement'
              ].map((reply) => (
                <button
                  key={reply}
                  type="button"
                  onClick={() => handleQuickReply(reply)}
                  className="px-2.5 py-1 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-[11px] font-semibold shrink-0 transition-colors cursor-pointer"
                >
                  "{reply}"
                </button>
              ))}
            </div>

            {/* Message Composer Input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-[#eff4ff] flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => alert('Attachment picker opened: Select ID proof or document.')}
                  className="p-1.5 rounded-lg text-[#76777d] hover:text-[#0b1c30] hover:bg-[#eff4ff] transition-colors cursor-pointer"
                  title="Attach File"
                >
                  <span className="material-symbols-outlined text-[20px]">attach_file</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert('Property photo gallery picker opened.')}
                  className="p-1.5 rounded-lg text-[#76777d] hover:text-[#0b1c30] hover:bg-[#eff4ff] transition-colors cursor-pointer"
                  title="Send Photos"
                >
                  <span className="material-symbols-outlined text-[20px]">photo_library</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAgreement(activeConv.tenantName, activeConv.propertyTitle, activeConv.propertyRent)}
                  className="p-1.5 rounded-lg text-[#76777d] hover:text-[#0b1c30] hover:bg-[#eff4ff] transition-colors cursor-pointer"
                  title="Issue Lease Offer"
                >
                  <span className="material-symbols-outlined text-[20px]">gavel</span>
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Type your reply to ${activeConv.tenantName}...`}
                  className="flex-1 bg-[#eff4ff] text-[#0b1c30] placeholder:text-[#76777d] text-xs px-3 py-2 rounded-lg focus:outline-none border border-[#dce9ff]"
                />

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#000000] hover:bg-[#131b2e] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <span>Send</span>
                  <span className="material-symbols-outlined text-[16px]">send</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[#76777d] text-[10px] px-1">
                <span>Press Enter to send • End-to-end encrypted direct lease channel</span>
                <span>GharSeva Verified Channel</span>
              </div>
            </form>
          </section>

          {/* PANE 3: Tenant Dossier & Lease Summary Drawer (3 cols) */}
          <aside className="col-span-12 xl:col-span-3 flex flex-col gap-4">
            {/* Dossier Card 1 */}
            <div className="p-4 bg-white rounded-xl shadow-xs border border-[#e5eeff] flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-[#eff4ff] pb-2">
                <span className="text-xs font-bold text-[#0b1c30]">Tenant Dossier</span>
                <span className="px-2 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-[10px] font-bold">
                  100% Verified
                </span>
              </div>

              <div className="flex flex-col gap-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#45464d]">Full Legal Name</span>
                  <span className="font-semibold text-[#0b1c30]">{activeConv.dossier.fullName}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#45464d]">Corporate Employer</span>
                  <div className="text-right">
                    <span className="font-semibold text-[#0b1c30] block">{activeConv.dossier.employer}</span>
                    <span className="text-[10px] text-[#006a61] font-bold">{activeConv.dossier.designation}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#45464d]">Tenure</span>
                  <span className="text-[#0b1c30]">{activeConv.dossier.tenure}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#45464d]">Identity KYC</span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#006a61] font-bold">
                    <span className="material-symbols-outlined text-[13px]">check_circle</span>{' '}
                    {activeConv.dossier.kycStatus}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#45464d]">Household Size</span>
                  <span className="text-[#0b1c30]">{activeConv.dossier.householdSize}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#45464d]">Target Move-in</span>
                  <span className="font-bold text-[#0b1c30]">{activeConv.dossier.targetMoveIn}</span>
                </div>
              </div>

              {/* Reliability Index Ring */}
              <div className="p-2.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff] flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0b1c30]">Reliability Index</span>
                  <span className="font-bold text-[#006a61]">{activeConv.dossier.reliabilityScore} / 100</span>
                </div>
                <div className="w-full bg-[#dce9ff] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#006a61] h-full rounded-full"
                    style={{ width: `${activeConv.dossier.reliabilityScore}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-[#45464d]">{activeConv.dossier.historyNote}</span>
              </div>
            </div>

            {/* Dossier Card 2: Commercial Offer Breakdown */}
            <div className="p-4 bg-white rounded-xl shadow-xs border border-[#e5eeff] flex flex-col gap-2.5">
              <span className="text-xs font-bold text-[#0b1c30] border-b border-[#eff4ff] pb-2 block">
                Commercial Offer Breakdown
              </span>

              <div className="space-y-1.5 pt-0.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#45464d]">Listed Rent</span>
                  <span className="line-through text-[#76777d]">
                    ₹{activeConv.propertyRent.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0b1c30]">Tenant Proposed Rent</span>
                  <span className="font-extrabold text-[#006a61]">
                    ₹{activeConv.dossier.proposedRent.toLocaleString('en-IN')} / mo
                  </span>
                </div>

                <div className="flex items-center justify-between text-[#45464d]">
                  <span>Security Deposit (3 Mo.)</span>
                  <span className="font-semibold text-[#0b1c30]">
                    ₹{activeConv.dossier.proposedDeposit.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[#45464d]">
                  <span>Society Maintenance</span>
                  <span className="font-semibold text-[#0b1c30]">₹3,500 / mo (Direct)</span>
                </div>

                <div className="flex items-center justify-between text-[#45464d]">
                  <span>Brokerage Fee</span>
                  <span className="font-bold text-[#006a61]">₹0 (Zero Brokerage)</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-2 flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() =>
                    onOpenAgreement(
                      activeConv.tenantName,
                      activeConv.propertyTitle,
                      activeConv.dossier.proposedRent
                    )
                  }
                  className="w-full py-2 px-3 rounded-lg bg-[#131b2e] hover:bg-[#0b1c30] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#89f5e7]">history_edu</span>
                  <span>Draft Online Agreement (e-Stamp)</span>
                </button>
                <p className="text-[10px] text-center text-[#76777d]">
                  Legally compliant under Karnataka Tenancy Act 2021
                </p>
              </div>
            </div>

            {/* Dossier Card 3: Dedicated Support Specialist */}
            <div className="p-3.5 bg-[#eff4ff] rounded-xl border border-[#dce9ff] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#89f5e7] flex items-center justify-center text-[#00201d]">
                  <span className="material-symbols-outlined text-[18px]">support_agent</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-[#0b1c30] font-bold">Priya Sharma</span>
                  <span className="text-[10px] text-[#45464d]">Bengaluru RM Desk</span>
                </div>
              </div>
              <button
                type="button"
                onClick={onConnectRM}
                className="px-2.5 py-1 rounded bg-white hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-semibold transition-colors border border-[#d3e4fe] cursor-pointer"
              >
                Ask RM
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
