import type { UserSettings } from "../types/user";

export const initialUserSettings: UserSettings = {
  profile: {
    id: "user-001",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    country: "Canada",
    createdAt: "2026-11-12",
  },

  security: {
    twoFactorEnabled: false,
    lastPasswordChanged: null,
  },

  notifications: {
    budgetAlerts: true,
    transactionAlerts: true,
    monthlyReports: false,
    securityAlerts: true,
  },

  preferences: {
    currency: "CAD",
    language: "en",
    theme: "light",
  },
};