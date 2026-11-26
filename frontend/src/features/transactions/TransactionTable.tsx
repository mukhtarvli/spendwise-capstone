import {
  ArrowDownLeft,
  ArrowUpRight,
  Pencil,
  Trash2,
  Landmark,
  Lock,
  ReceiptText,
} from "lucide-react";

import type { Transaction } from "../../types/transaction";
import { formatCurrency } from "../../utils/formatCurrency";

interface TransactionTableProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export default function TransactionTable({
  transactions,
  onEdit,
  onDelete,
}: TransactionTableProps) {

  return (
    <div className="bg-white border border-border rounded-xl shadow-sm">

      {/* Empty State */}
      {transactions.length === 0 ? (

        <div className="flex flex-col items-center py-16">

          <ReceiptText size={48} className="text-slate-300" />

          <h3 className="font-semibold text-lg mt-4">
            No transactions found
          </h3>

          <p className="text-muted text-sm mt-2">
            Add a transaction or change your filters.
          </p>

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full text-left whitespace-nowrap">

            {/* Table Header */}
            <thead className="bg-slate-50 border-b border-border">

              <tr className="text-sm text-muted">

                <th className="p-4 font-medium">
                  Transaction
                </th>

                <th className="p-4 font-medium">
                  Category
                </th>

                <th className="p-4 font-medium">
                  Date
                </th>

                <th className="p-4 font-medium">
                  Source
                </th>

                <th className="p-4 font-medium text-right">
                  Amount
                </th>

                <th className="p-4 font-medium text-center">
                  Actions
                </th>

              </tr>

            </thead>

            {/* Table Body */}
            <tbody>

              {transactions.map((transaction) => (

                <tr
                  key={transaction.id}
                  className="border-b border-border last:border-0 hover:bg-slate-50"
                >

                  {/* Transaction Name */}
                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      <div
                        className={`p-3 rounded-lg ${
                          transaction.type === "income"
                            ? "bg-green-100 text-success"
                            : "bg-red-100 text-danger"
                        }`}
                      >

                        {transaction.type === "income" ? (
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

                  {/* Category */}
                  <td className="p-4 text-sm text-muted">
                    {transaction.category}
                  </td>

                  {/* Date */}
                  <td className="p-4 text-sm text-muted">
                    {transaction.date}
                  </td>

                  {/* Source */}
                  <td className="p-4">

                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        transaction.source === "bank"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >

                      {transaction.source === "bank" ? (
                        <>
                          <Landmark size={14} />
                          Bank
                        </>
                      ) : (
                        <>
                          <Pencil size={14} />
                          Manual
                        </>
                      )}

                    </span>

                  </td>

                  {/* Amount */}
                  <td
                    className={`p-4 text-right font-semibold ${
                      transaction.type === "income"
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >

                    {transaction.type === "income" ? "+" : ""}
                    {formatCurrency(transaction.amount)}

                  </td>

                  {/* Actions */}
                  <td className="p-4">

                    <div className="flex items-center justify-center gap-3">

                      {transaction.source === "manual" ? (

                        <>

                          <button
                            onClick={() => onEdit(transaction)}
                            className="p-2 rounded-lg text-primary hover:bg-blue-50"
                            title="Edit transaction"
                            aria-label="Edit transaction"
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            onClick={() => onDelete(transaction.id)}
                            className="p-2 rounded-lg text-danger hover:bg-red-50"
                            title="Delete transaction"
                            aria-label="Delete transaction"
                          >
                            <Trash2 size={18} />
                          </button>

                        </>

                      ) : (

                        <span
                          className="text-slate-400"
                          title="Bank-imported transaction"
                        >
                          <Lock size={18} />
                        </span>

                      )}

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

      {/* Table Footer */}
      <div className="border-t border-border p-4">

        <p className="text-sm text-muted">
          Showing {transactions.length} transactions
        </p>

      </div>

    </div>
  );
}