export type TransactionType = "income" | "expense";

export type TransactionSource = "manual" | "bank";

export interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  type: TransactionType;
  source: TransactionSource;
}