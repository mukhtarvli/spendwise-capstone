import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from "lucide-react";

import StatCard from "../components/ui/StatCard";
import { financialSummary } from "../mocks/dashboardData";
import IncomeExpenseChart from "../features/analytics/IncomeExpenseChart";
import SpendingChart from "../features/analytics/SpendingChart";
import RecentTransactions from "../features/transactions/RecentTransactions";

export default function Dashboard() {
  return (
    <div className="space-y-8">


      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, John!
        </h1>

        <p className="text-muted mt-2">
          Here's what's happening with your finances.
        </p>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Total Balance"
          amount={financialSummary.totalBalance}
          icon={Wallet}
          color="text-blue-600"
          background="bg-blue-100"
        />

        <StatCard
          title="Monthly Income"
          amount={financialSummary.monthlyIncome}
          icon={TrendingUp}
          color="text-green-600"
          background="bg-green-100"
        />

        <StatCard
          title="Monthly Expenses"
          amount={financialSummary.monthlyExpenses}
          icon={TrendingDown}
          color="text-red-600"
          background="bg-red-100"
        />

        <StatCard
          title="Monthly Savings"
          amount={financialSummary.monthlySavings}
          icon={PiggyBank}
          color="text-purple-600"
          background="bg-purple-100"
        />

      </div>

      {/* Financial Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          <div className="xl:col-span-2 min-w-0">
            <IncomeExpenseChart />
          </div>

          <div className="min-w-0">
            <SpendingChart />
          </div>

        </div>

        {/* Recent Transactions */}
        <RecentTransactions />

    </div>
  );
}