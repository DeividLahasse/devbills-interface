import { ArrowUp, Calendar, TrendingUp, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "../components/Card";
import MonthYearSelect from "../components/MonthYearSelect";
import { getTransactionSummary, getTransactionsMonthly } from "../services/transactionService";
import type { MonthlyItem, TransactionSummary } from "../types/transactions";
import { formatCurrency } from "../utils/formatters";

const initialSummary: TransactionSummary = {
  balance: 0,
  totalExpenses: 0,
  totalIncomes: 0,
  expensesByCategory: [],
};

interface ChartLabelProps {
  categoryName?: string;
  percent?: number;
}

const formatToolTipValue = (value: number | string): string => {
  return formatCurrency(typeof value === "number" ? value : 0);
};

const Dashboard = () => {
  const currentDate = new Date();
  const [year, setYaer] = useState<number>(currentDate.getFullYear());
  const [month, setMoth] = useState(currentDate.getMonth() + 1);
  const [summary, setSummary] = useState<TransactionSummary>(initialSummary);
  const [monthlyItemsData, setMontlyItemData] = useState<MonthlyItem[]>([]);

  useEffect(() => {
    async function loadTransctionsSummary() {
      const response = await getTransactionSummary(month, year);
      console.log(response);

      setSummary(response);
    }

    loadTransctionsSummary();
  }, [month, year]);

  useEffect(() => {
    async function loadTransctionsMonthly() {
      const response = await getTransactionsMonthly(month, year, 4);
      console.log(response);

      setMontlyItemData(response.history);
    }

    loadTransctionsMonthly();
  }, [month, year]);

  const renderPieChateLabel = ({ categoryName, percent }: ChartLabelProps): string => {
    return `${categoryName ?? ""}: ${((percent ?? 0) * 100).toFixed(1)}%`;
  };

  return (
    
      
      <div className="container-app py-6 bg-gray-950">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Dashboard</h1>
          <MonthYearSelect month={month} year={year} onMonthChange={setMoth} onYearChange={setYaer} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Card
            icon={<ArrowUp size={20} className="text-primary-500" />}
            title="Saldo"
            hover
            glowEffect={summary.balance > 0}
          >
            <p
              className={`text-2xl font-semibold mt-2
       ${summary.balance > 0 ? "text-prymari-500" : "text-red-400"} 
        
        `}
            >
              {formatCurrency(summary.balance)}
            </p>
          </Card>

          <Card icon={<Wallet size={20} className="txt-primary-500" />} title="Receita" hover>
            <p className="text-2xl font-semibold mt-2 text-primary-500">{formatCurrency(summary.totalIncomes)}</p>
          </Card>

          <Card icon={<Wallet size={20} className="text-red-600" />} title="Despesas" hover>
            <p className="text-2xl font-semibold mt-2 text-red-600">{formatCurrency(summary.totalExpenses)}</p>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 mt-3">
          <Card
            icon={<TrendingUp size={20} className="text-primary-500" />}
            title="Despesas por Catgoria"
            className="min-h-80"
          >
            {summary.expensesByCategory.length > 0 ? (
              <div className="h-72 mt-4">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={summary.expensesByCategory}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="amount"
                      nameKey="categoryName"
                      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                      label={(props: any) => renderPieChateLabel(props)}
                    >
                      {summary.expensesByCategory.map((entry) => (
                        <Cell key={entry.categoryId} fill={entry.categoryColor} />
                      ))}
                    </Pie>

                    <Tooltip formatter={(value: any) => formatToolTipValue(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                Nemhuma despesa regitrada nesse perído
              </div>
            )}
          </Card>

          <Card
            icon={<Calendar size={20} className="text-primary-500" />}
            title="Histórico Mensal"
            className="min-h-80 p-2.5"
          >
            <div className="h-72 mt-4">
              {monthlyItemsData.length > 0 ? (
                <ResponsiveContainer>
                  <BarChart data={monthlyItemsData} margin={{ left: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="#94a3b9" tick={{ style: { textTransform: "capitalize" } }} />
                    <YAxis stroke="#94a3b9" tickFormatter={formatCurrency} tick={{ style: { fontSize: 14 } }} />
                    <Tooltip
                      formatter={(value: any) => formatToolTipValue(value)}
                      contentStyle={{ backgroundColor: "#1a1a1a", borderColor: "#2A2A2A" }}
                      labelStyle={{ color: "#f8f8f8" }}
                    />
                    <Legend />
<Bar dataKey="income" name="Receita" fill="#22c55e" radius={[10, 10, 0, 0]} />
<Bar dataKey="expense" name="Despesa" fill="#ef4444" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-500">
                  Nenhuma despesa registrada nesse período
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    
  );
};

export default Dashboard;
