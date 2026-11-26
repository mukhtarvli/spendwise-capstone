export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  lastPasswordChanged: string | null;
}

export interface NotificationPreferences {
  budgetAlerts: boolean;
  transactionAlerts: boolean;
  monthlyReports: boolean;
  securityAlerts: boolean;
}

export type Currency = "CAD" | "USD" | "EUR" | "GBP";

export type Language = "en" | "fr";

export type Theme = "light" | "dark" | "system";

export interface UserPreferences {
  currency: Currency;
  language: Language;
  theme: Theme;
}

export interface UserSettings {
  profile: UserProfile;
  security: SecuritySettings;
  notifications: NotificationPreferences;
  preferences: UserPreferences;
}