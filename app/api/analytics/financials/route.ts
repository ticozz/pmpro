import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PaymentStatus, TransactionType } from "@prisma/client";
import { startOfMonth, endOfMonth, subMonths, format } from "date-fns";

export async function GET() {
  try {
    const months = Array.from({ length: 12 }, (_, i) => {
      const date = subMonths(new Date(), i);
      return {
        start: startOfMonth(date),
        end: endOfMonth(date),
        label: format(date, "MMM yyyy"),
      };
    }).reverse();

    const financialData = await Promise.all(
      months.map(async ({ start, end, label }) => {
        const income = await prisma.transaction.aggregate({
          where: {
            type: TransactionType.INCOME,
            date: {
              gte: start,
              lte: end,
            },
          },
          _sum: {
            amount: true,
          },
        });

        const expenses = await prisma.transaction.aggregate({
          where: {
            type: TransactionType.EXPENSE,
            date: {
              gte: start,
              lte: end,
            },
          },
          _sum: {
            amount: true,
          },
        });

        const incomeAmount = income._sum.amount || 0;
        const expenseAmount = expenses._sum.amount || 0;

        return {
          date: label,
          income: incomeAmount,
          expenses: expenseAmount,
          profit: incomeAmount - expenseAmount,
          forecast: calculateForecast(incomeAmount, expenseAmount),
        };
      })
    );

    return NextResponse.json(financialData);
  } catch (error) {
    console.error("Error fetching financial data:", error);
    return NextResponse.json(
      { error: "Failed to fetch financial data" },
      { status: 500 }
    );
  }
}

function calculateForecast(income: number, expenses: number): number {
  // Simple forecast calculation - can be made more sophisticated
  const profit = income - expenses;
  return profit * 1.1; // 10% growth projection
}
