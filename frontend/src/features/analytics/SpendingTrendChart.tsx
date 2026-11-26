import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

import {
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

import type { MonthlyFinancialData } from "../../types/analytics";

import {
  calculatePercentageChange,
} from "../../utils/analyticsCalculations";

import { formatCurrency } from "../../utils/formatCurrency";

interface SpendingTrendChartProps {
  data: MonthlyFinancialData[];
}

export default function SpendingTrendChart({
  data,
}: SpendingTrendChartProps) {

  // Calculate total expenses
  const totalExpenses = data.reduce(
    (total, item) => total + item.expenses,
    0
  );

  // Calculate average monthly expenses
  const averageExpenses =
    data.length > 0
      ? totalExpenses / data.length
      : 0;

  // Get current and previous month
  const currentMonth = data[data.length - 1];

  const previousMonth = data[data.length - 2];

  // Calculate monthly spending change
  const spendingChange =
    currentMonth && previousMonth
      ? calculatePercentageChange(
          currentMonth.expenses,
          previousMonth.expenses
        )
      : null;

  // Determine spending direction
  const isIncreasing =
    spendingChange !== null && spendingChange > 0;

  const isDecreasing =
    spendingChange !== null && spendingChange < 0;

  // Dynamic icon
  const TrendIcon = isIncreasing
    ? TrendingUp
    : isDecreasing
      ? TrendingDown
      : Minus;

  // Dynamic colour
  const trendColor = isIncreasing
    ? "text-danger"
    : isDecreasing
      ? "text-success"
      : "text-muted";

  return (
    <div className="bg-white border border-border rounded-xl p-6 shadow-sm">

      {/* Chart Header */}
      <h2 className="text-xl font-semibold">
        Spending Trend
      </h2>

      <p className="text-muted text-sm mt-1">
        Monitor your monthly spending patterns.
      </p>

      {/* Spending Summary */}
      <div className="grid grid-cols-2 gap-4 mt-6">

        <div>
          <p className="text-muted text-sm">
            Average Monthly Spending
          </p>

          <h3 className="text-2xl font-bold mt-1">
            {formatCurrency(averageExpenses)}
          </h3>
        </div>

        <div>
          <p className="text-muted text-sm">
            Monthly Change
          </p>

          <div
            className={`flex items-center gap-2 mt-1 ${trendColor}`}
          >
            <TrendIcon size={24} />

            <h3 className="text-2xl font-bold">
              {spendingChange !== null
                ? `${spendingChange > 0 ? "+" : ""}${spendingChange.toFixed(1)}%`
                : "N/A"}
            </h3>
          </div>

          <p className="text-muted text-xs mt-1">
            Compared to previous month
          </p>
        </div>

      </div>

      {/* Spending Chart */}
      <div className="h-72 mt-6">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
            />

            <YAxis
              domain={[0, "auto"]}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
              tickFormatter={(value) => `$${value}`}
            />

            <Tooltip
              formatter={(value) => [
                formatCurrency(Number(value)),
                "Expenses",
              ]}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            />

            {/* Average Spending Line */}
            {data.length > 0 && (
              <ReferenceLine
                y={averageExpenses}
                stroke="#94a3b8"
                strokeDasharray="5 5"
                label={{
                  value: "Average",
                  position: "insideTopRight",
                  fill: "#64748b",
                  fontSize: 12,
                }}
              />
            )}

            {/* Monthly Expenses Line */}
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "#ffffff",
                stroke: "#ef4444",
                strokeWidth: 2,
              }}
              activeDot={{ r: 6 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* Chart Legend */}
      <div className="flex flex-wrap justify-center gap-6 mt-4">

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />

          <span className="text-muted text-sm">
            Monthly Expenses
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-6 border-t-2 border-dashed border-slate-400" />

          <span className="text-muted text-sm">
            Average Spending
          </span>
        </div>

      </div>

    </div>
  );
}