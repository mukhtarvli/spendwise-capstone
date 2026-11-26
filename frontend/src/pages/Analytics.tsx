import { useState } from "react";

import {
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Percent,
  CalendarDays,
} from "lucide-react";

import StatCard from "../components/ui/StatCard";

import SavingsChart from "../features/analytics/SavingsChart";
import SpendingTrendChart from "../features/analytics/SpendingTrendChart";
import FinancialInsights from "../features/analytics/FinancialInsights";

import {
  monthlyFinancialData,
} from "../mocks/analyticsData";

import {
  filterByPeriod,
  calculateFinancialSummary,
  generateFinancialInsights,
} from "../utils/analyticsCalculations";

import type { AnalyticsPeriod } from "../types/analytics";

export default function Analytics() {

  // Reporting period state
  const [period, setPeriod] =
    useState<AnalyticsPeriod>("6months");

  // Filter financial records
  const filteredData = filterByPeriod(
    monthlyFinancialData,
    period
  );

  // Calculate financial summary
  const summary = calculateFinancialSummary(filteredData);

  // Generate financial insights
  const insights = generateFinancialInsights(filteredData);

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Financial Analytics
          </h1>

          <p className="text-muted mt-2">
            Understand your spending and financial performance.
          </p>
        </div>

        {/* Reporting Period Filter */}
        <div className="flex items-center gap-3 bg-white border border-border rounded-lg px-4 py-3">

          <CalendarDays
            size={20}
            className="text-muted"
          />

          <select
            aria-label="Reporting period"
            value={period}
            onChange={(e) =>
              setPeriod(e.target.value as AnalyticsPeriod)
            }
            className="bg-transparent outline-none text-sm font-medium"
          >
            <option value="3months">
              Last 3 Months
            </option>

            <option value="6months">
              Last 6 Months
            </option>

            <option value="12months">
              Last 12 Months
            </option>
          </select>

        </div>

      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Total Income"
          amount={summary.totalIncome}
          icon={TrendingUp}
          color="text-green-600"
          background="bg-green-100"
        />

        <StatCard
          title="Total Expenses"
          amount={summary.totalExpenses}
          icon={TrendingDown}
          color="text-red-600"
          background="bg-red-100"
        />

        <StatCard
          title="Net Savings"
          amount={summary.netSavings}
          icon={PiggyBank}
          color={
            summary.netSavings >= 0
              ? "text-blue-600"
              : "text-red-600"
          }
          background="bg-blue-100"
        />

        {/* Savings Rate Card */}
        <div className="bg-white border border-border rounded-xl p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <p className="text-muted text-sm font-medium">
              Savings Rate
            </p>

            <div className="bg-purple-100 text-purple-600 p-3 rounded-lg">
              <Percent size={22} />
            </div>

          </div>

          <h2 className="text-2xl font-bold mt-4">
            {summary.totalIncome > 0
              ? `${summary.savingsRate.toFixed(1)}%`
              : "N/A"}
          </h2>

          <p className="text-muted text-xs mt-2">
            Percentage of income saved
          </p>

        </div>

      </div>

      {/* Financial Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <SavingsChart data={filteredData} />

        <SpendingTrendChart data={filteredData} />

      </div>

      {/* Financial Insights */}
      <FinancialInsights insights={insights} />

    </div>
  );
}