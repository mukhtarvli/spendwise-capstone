import { Link } from "react-router-dom";

import {
  ArrowRight,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";

import { recentTransactions } from "../../mocks/dashboardData";
import { formatCurrency } from "../../utils/formatCurrency";

export default function RecentTransactions() {
  return (
    <div className="bg-white border border-border rounded-xl p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-xl font-semibold">
            Recent Transactions
          </h2>

          <p className="text-muted text-sm mt-1">
            Your latest financial activity
          </p>
        </div>

        <Link
          to="/transactions"
          className="flex items-center gap-2 text-primary text-sm font-medium hover:underline"
        >
          View all
          <ArrowRight size={16} />
        </Link>

      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead>
            <tr className="border-b border-border text-sm text-muted">
              <th className="pb-4 font-medium">Transaction</th>
              <th className="pb-4 font-medium">Category</th>
              <th className="pb-4 font-medium">Date</th>
              <th className="pb-4 font-medium text-right">Amount</th>
            </tr>
          </thead>

          <tbody>

            {recentTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-border last:border-0 hover:bg-slate-50"
              >

                <td className="py-4">
                  <div className="flex items-center gap-3">

                    <div
                      className={`p-2 rounded-lg ${
                        transaction.amount > 0
                          ? "bg-green-100 text-success"
                          : "bg-red-100 text-danger"
                      }`}
                    >
                      {transaction.amount > 0 ? (
                        <ArrowDownLeft size={20} />
                      ) : (
                        <ArrowUpRight size={20} />
                      )}
                    </div>

                    <span className="font-medium">
                      {transaction.name}
                    </span>

                  </div>
                </td>

                <td className="py-4 text-sm text-muted">
                  {transaction.category}
                </td>

                <td className="py-4 text-sm text-muted">
                  {transaction.date}
                </td>

                <td
                  className={`py-4 text-right font-semibold ${
                    transaction.amount > 0
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {transaction.amount > 0 ? "+" : ""}
                  {formatCurrency(transaction.amount)}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}