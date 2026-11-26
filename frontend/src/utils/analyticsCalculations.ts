import type {
  MonthlyFinancialData,
  FinancialSummary,
  FinancialInsight,
  AnalyticsPeriod,
} from "../types/analytics";

// Filter financial records by reporting period
export function filterByPeriod(
  data: MonthlyFinancialData[],
  period: AnalyticsPeriod
): MonthlyFinancialData[] {

  const periodMap = {
    "3months": 3,
    "6months": 6,
    "12months": 12,
  };

  return data.slice(-periodMap[period]);
}

// Calculate overall financial summary
export function calculateFinancialSummary(
  data: MonthlyFinancialData[]
): FinancialSummary {

  const totalIncome = data.reduce(
    (total, item) => total + item.income,
    0
  );

  const totalExpenses = data.reduce(
    (total, item) => total + item.expenses,
    0
  );

  const netSavings = totalIncome - totalExpenses;

  const savingsRate =
    totalIncome > 0
      ? (netSavings / totalIncome) * 100
      : 0;

  return {
    totalIncome,
    totalExpenses,
    netSavings,
    savingsRate,
  };
}

// Calculate monthly savings
export function calculateMonthlySavings(
  data: MonthlyFinancialData[]
) {
  return data.map((item) => ({
    ...item,
    savings: item.income - item.expenses,
    savingsRate:
      item.income > 0
        ? ((item.income - item.expenses) / item.income) * 100
        : 0,
  }));
}

// Calculate percentage change between two values
export function calculatePercentageChange(
  current: number,
  previous: number
): number | null {

  if (previous === 0) return null;

  return ((current - previous) / previous) * 100;
}

// Generate financial insights
export function generateFinancialInsights(
  data: MonthlyFinancialData[]
): FinancialInsight[] {

  const insights: FinancialInsight[] = [];

  if (data.length === 0) return insights;

  const current = data[data.length - 1];

  const previous = data[data.length - 2];

  // Spending comparison
  if (previous) {
    const spendingChange = calculatePercentageChange(
      current.expenses,
      previous.expenses
    );

    if (spendingChange !== null && spendingChange < 0) {
      insights.push({
        id: "spending-decreased",
        title: "Your spending has decreased",
        description: `Your expenses decreased by ${Math.abs(
          spendingChange
        ).toFixed(1)}% compared to the previous month.`,
        type: "success",
      });
    } else if (
      spendingChange !== null &&
      spendingChange > 0
    ) {
      insights.push({
        id: "spending-increased",
        title: "Your spending has increased",
        description: `Your expenses increased by ${spendingChange.toFixed(
          1
        )}% compared to the previous month.`,
        type: "warning",
      });
    }
  }

  // Savings rate analysis
  const monthlySavings =
    current.income - current.expenses;

  const savingsRate =
    current.income > 0
      ? (monthlySavings / current.income) * 100
      : 0;

  if (current.expenses > current.income) {
    insights.push({
      id: "negative-cash-flow",
      title: "Expenses exceed income",
      description:
        "Your expenses are higher than your income this month. Consider reviewing your spending.",
      type: "warning",
    });
  } else if (current.income > 0 && savingsRate >= 20) {
    insights.push({
      id: "strong-savings",
      title: "Strong savings rate",
      description: `You saved ${savingsRate.toFixed(
        1
      )}% of your income this month.`,
      type: "success",
    });
  } else if (current.income > 0) {
    insights.push({
      id: "improve-savings",
      title: "Opportunity to increase savings",
      description: `Your monthly savings rate is ${savingsRate.toFixed(
        1
      )}%. Review your expenses to identify potential savings.`,
      type: "info",
    });
  }

  // Overall financial performance
  const summary = calculateFinancialSummary(data);

  if (summary.netSavings > 0) {
    insights.push({
      id: "positive-performance",
      title: "Positive financial performance",
      description:
        "Your total income exceeds your total expenses during the selected reporting period.",
      type: "success",
    });
  }

  return insights;
}