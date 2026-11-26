import type { BankAccount } from "../types/account";

export const initialAccounts: BankAccount[] = [
  {
    id: "1",
    bankName: "TD Canada Trust",
    accountType: "Chequing Account",
    lastFour: "4821",
    balance: 8450,
  },
  {
    id: "2",
    bankName: "RBC Royal Bank",
    accountType: "Savings Account",
    lastFour: "9032",
    balance: 4000,
  },
];

export const availableBanks = [
  "TD Canada Trust",
  "RBC Royal Bank",
  "Scotiabank",
  "BMO",
  "CIBC",
];