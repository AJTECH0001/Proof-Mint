// src/utils/types.ts
export type Role = "ADMIN_ROLE" | "SELLER_ROLE" | "BUYER_ROLE" | "RECYCLER_ROLE" | "";

export interface Gadget {
  id: number;
  name: string;
  price: string; // BigNumber in ethers.js, string for simplicity
  seller: string;
  sold: boolean;
}

export interface LifecycleEvent {
  eventHash: string;
  timestamp: number;
  eventType: string;
}