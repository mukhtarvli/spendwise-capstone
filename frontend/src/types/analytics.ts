export interface MonthlyFinancialData {
  month: string;
  year: number;
  income: number;
  expenses: number;
}

export interface CategorySpending {
  category: string;
  amount: number;
  color: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  savingsRate: number;
}

export interface FinancialInsight {
  id: string;
  title: string;
  description: string;
  type: "success" | "warning" | "info";
}

export type AnalyticsPeriod =
  | "3months"
  | "6months"
  | "12months";