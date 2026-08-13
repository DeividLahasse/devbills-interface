
import type { Category, CategorySumary } from "./category";

export const TransactionType = {
  EXPENSE: "expense",
  INCOME: "income",
} as const;

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];

export interface Transaction {
    id: string;
  userId: string;
  description: string;
  amount: number;
  date: string | Date;
  categoryId: string;
  category: Category;
  type: TransactionType;
  updatedAt: string | Date;
  createdAt: string | Date;
}

export interface CreateTransactionDTO {
  description:string;
  amount:number;
  date:Date;
  categoryId:string;
  type:TransactionType;


}



export interface TranasactionFilter {
  month: number;
  year: number;
  categoryId: string;
  type?: TransactionType;
}

export interface TransactionSummary {
  totalExpenses: number;
  totalIncomes: number;
  balance: number;
  expensesByCategory: CategorySumary[];
}

export interface MonthlyItem {
  name: string;
  expense: number;
  income: number;
}
