import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { categoryData } from "../../mocks/dashboardData";

import type {
  CategorySpending,
} from "../../types/analytics";

import { formatCurrency } from "../../utils/formatCurrency";

interface SpendingChartProps {
  data?: CategorySpending[];
  subtitle?: string;
}

// Convert existing dashboard data to the new format
const defaultData: CategorySpending[] = categoryData.map(
  (item) => ({
    category: item.name,
    amount: item.value,
    color: item.color,
  })
);

export default function SpendingChart({
  data = defaultData,
  subtitle = "Understand where your money goes.",
}: SpendingChartProps) {

  // Calculate total spending
  const totalSpending = data.reduce(
    (total, item) => total + item.amount,
    0
  );

  return (
    <div className="bg-white border border-border rounded-xl p-6 shadow-sm">

      {/* Header */}
      <h2 className="text-xl font-semibold">
        Spending Breakdown
      </h2>

      <p className="text-muted text-sm mt-1">
        {subtitle}
      </p>

      {totalSpending > 0 ? (
        <>

          {/* Donut Chart */}
          <div className="relative h-64 mt-6">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={data}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={3}
                  stroke="none"
                >

                  {data.map((item) => (
                    <Cell
                      key={item.category}
                      fill={item.color}
                    />
                  ))}

                </Pie>

                <Tooltip
                  formatter={(value) =>
                    formatCurrency(Number(value))
                  }
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                  }}
                />

              </PieChart>

            </ResponsiveContainer>

            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">

              <h3 className="text-xl font-bold">
                {formatCurrency(totalSpending)}
              </h3>

              <p className="text-muted text-xs mt-1">
                Total Expenses
              </p>

            </div>

          </div>

          {/* Category Breakdown */}
          <div className="space-y-4 mt-6">

            {data.map((item) => {

              const percentage =
                (item.amount / totalSpending) * 100;

              return (
                <div key={item.category}>

                  <div className="flex items-center justify-between gap-2 mb-2">

                    <div className="flex items-center gap-2">

                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{
                          backgroundColor: item.color,
                        }}
                      />

                      <span className="text-sm font-medium">
                        {item.category}
                      </span>

                    </div>

                    <div className="flex items-center gap-3">

                      <span className="text-sm font-semibold">
                        {formatCurrency(item.amount)}
                      </span>

                      <span className="text-muted text-xs w-12 text-right">
                        {percentage.toFixed(1)}%
                      </span>

                    </div>

                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">

                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: item.color,
                      }}
                    />

                  </div>

                </div>
              );
            })}

          </div>

        </>
      ) : (

        /* Empty State */
        <div className="text-center py-16">

          <h3 className="font-semibold">
            No spending data available
          </h3>

          <p className="text-muted text-sm mt-2">
            Your expense breakdown will appear here.
          </p>

        </div>

      )}

    </div>
  );
}