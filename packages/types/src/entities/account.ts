export type AccountType = 'prospect' | 'customer' | 'partner' | 'competitor' | 'supplier';
export type AccountTier = 'strategic' | 'key' | 'standard' | 'dormant';

export interface Account {
  id: string;
  orgId: string;
  name: string;
  type: AccountType;
  industry: string | null;
  country: string;
  city: string | null;
  tier: AccountTier;
  healthScore: number;
  ownerId: string | null;
  website: string | null;
  gstin: string | null;
  createdAt: Date;
  updatedAt: Date;
}
