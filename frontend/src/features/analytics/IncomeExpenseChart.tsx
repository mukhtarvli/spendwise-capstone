import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { monthlyData } from "../../mocks/dashboardData";
import { formatCurrency } from "../../utils/formatCurrency";

interface IncomeExpenseData {
  month: string;
  income: number;
  expenses: number;
}

interface IncomeExpenseChartProps {
  data?: IncomeExpenseData[];
}

export default function IncomeExpenseChart({
  data = monthlyData,
}: IncomeExpenseChartProps) {

  return (
    <div className="bg-white border border-border rounded-xl p-6 shadow-sm">

      {/* Chart Header */}
      <h2 className="text-xl font-semibold">
        Income vs Expenses
      </h2>

      <p className="text-muted text-sm mt-1">
        Compare your monthly income and expenses.
      </p>

      {/* Chart */}
      <div className="h-80 mt-6">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart
            data={data}
            barGap={6}
          >

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
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
              tickFormatter={(value) => `$${value}`}
            />

            <Tooltip
              formatter={(value) =>
                formatCurrency(Number(value))
              }
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            />

            <Legend />

            <Bar
              dataKey="income"
              name="Income"
              fill="#2563eb"
              radius={[5, 5, 0, 0]}
              maxBarSize={40}
            />

            <Bar
              dataKey="expenses"
              name="Expenses"
              fill="#94a3b8"
              radius={[5, 5, 0, 0]}
              maxBarSize={40}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}