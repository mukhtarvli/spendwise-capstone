import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { MonthlyFinancialData } from "../../types/analytics";

import {
  calculateMonthlySavings,
} from "../../utils/analyticsCalculations";

import { formatCurrency } from "../../utils/formatCurrency";

interface SavingsChartProps {
  data: MonthlyFinancialData[];
}

export default function SavingsChart({
  data,
}: SavingsChartProps) {

  // Prepare chart data
  const savingsData = calculateMonthlySavings(data);

  // Calculate total savings
  const totalSavings = savingsData.reduce(
    (total, item) => total + item.savings,
    0
  );

  // Calculate average monthly savings
  const averageSavings =
    savingsData.length > 0
      ? totalSavings / savingsData.length
      : 0;

  return (
    <div className="bg-white border border-border rounded-xl p-6 shadow-sm">

      {/* Chart Header */}
      <h2 className="text-xl font-semibold">
        Savings Trend
      </h2>

      <p className="text-muted text-sm mt-1">
        Track your monthly savings performance.
      </p>

      {/* Savings Summary */}
      <div className="grid grid-cols-2 gap-4 mt-6">

        <div>
          <p className="text-muted text-sm">
            Total Savings
          </p>

          <h3
            className={`text-2xl font-bold mt-1 ${
              totalSavings >= 0
                ? "text-success"
                : "text-danger"
            }`}
          >
            {formatCurrency(totalSavings)}
          </h3>
        </div>

        <div>
          <p className="text-muted text-sm">
            Average Monthly Savings
          </p>

          <h3 className="text-2xl font-bold mt-1">
            {formatCurrency(averageSavings)}
          </h3>
        </div>

      </div>

      {/* Savings Chart */}
      <div className="h-72 mt-6">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={savingsData}>

            {/* Gradient */}
            <defs>
              <linearGradient
                id="savingsGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#16a34a"
                  stopOpacity={0.3}
                />

                <stop
                  offset="95%"
                  stopColor="#16a34a"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />

            <Tooltip
              formatter={(value) => [
                formatCurrency(Number(value)),
                "Savings",
              ]}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            />

            <Area
              type="monotone"
              dataKey="savings"
              stroke="#16a34a"
              strokeWidth={3}
              fill="url(#savingsGradient)"
              dot={{
                r: 4,
                fill: "#ffffff",
                stroke: "#16a34a",
                strokeWidth: 2,
              }}
              activeDot={{ r: 6 }}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}