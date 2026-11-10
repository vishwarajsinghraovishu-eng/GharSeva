export interface Property {
  id: string;
  title: string;
  bhk: string;
  propertyType: string;
  rent: number;
  maintenance: number;
  isMaintenanceIncluded: boolean;
  deposit: number;
  depositMonths: number;
  area: number;
  furnishing: 'Furnished' | 'Semi-Furnished' | 'Unfurnished' | 'Fully Furnished';
  facing: string;
  floor: string;
  totalFloors: number;
  locality: string;
  city: string;
  fullAddress: string;
  images: string[];
  coverImage: string;
  hasZeroBrokerage: boolean;
  isOwnerVerified: boolean;
  ownerName: string;
  ownerPhoneMasked: string;
  ownerBadge: string;
  ownerInitials: string;
  viewsThisWeek: number;
  inquiriesCount: number;
  status: 'active' | 'under_kyc' | 'draft';
  availableFrom: string;
  tenantPreferences: string[];
  amenities: string[];
  coordinates?: { lat: number; lng: number };
  priceTag?: string;
}

export interface TenantDossier {
  fullName: string;
  initials: string;
  employer: string;
  designation: string;
  tenure: string;
  kycStatus: string;
  householdSize: string;
  targetMoveIn: string;
  reliabilityScore: number;
  historyNote: string;
  proposedRent: number;
  proposedDeposit: number;
}

export interface ChatMessage {
  id: string;
  sender: 'owner' | 'tenant' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  isVisitCard?: boolean;
  visitDetails?: {
    date: string;
    time: string;
    property: string;
    status: 'pending' | 'accepted' | 'rescheduled';
  };
}

export interface Conversation {
  id: string;
  tenantName: string;
  tenantInitials: string;
  employerBadge: string;
  timeAgo: string;
  propertyTitle: string;
  propertyRent: number;
  lastMessage: string;
  unreadCount: number;
  hasVisitRequest: boolean;
  visitRequestSummary?: string;
  hasOffer: boolean;
  offerAmount?: number;
  isVerified: boolean;
  messages: ChatMessage[];
  dossier: TenantDossier;
}
