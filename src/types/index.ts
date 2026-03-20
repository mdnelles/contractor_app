export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  userLevel: number;
  homeStore: number;
  isDisabled: boolean;
  isDeleted: boolean;
  createdAt: string;
  lastLogin: string;
  uuid: string;
}

export interface Contract {
  id: string;
  jobTitle: string;
  task: string;
  room: string;
  description: string;
  clientId: string;
  homeStore: number;
  stage: number;
  orderPickedBy: string;
  contractorId: string;
  createdAt: string;
}

export interface Store {
  id: string;
  number: number;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
}

export interface TodoItem {
  id: string;
  title: string;
  details: string;
  createdAt: string;
  due: string;
}

export interface Session {
  token: string;
  user: User | null;
  isAuthenticated: boolean;
}

export type UserLevel = 1 | 2 | 3 | 4 | 5;

export const USER_LEVELS: Record<number, string> = {
  1: "Super Admin",
  2: "Store Manager",
  3: "Order Picker",
  4: "Contractor",
  5: "Client",
};

export const STAGE_NAMES: Record<number, string> = {
  1: "New Order",
  2: "In Progress",
  3: "Ready",
  4: "Picked Up",
  5: "Completed",
};

export const STAGE_COLORS: Record<number, string> = {
  1: "#2196F3",
  2: "#FF9800",
  3: "#9C27B0",
  4: "#4CAF50",
  5: "#F44336",
};
