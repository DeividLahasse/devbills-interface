import { AlertCircle, ArrowDown, ArrowUp, LoaderCircle, Plus, Search, Trash2 } from "lucide-react";
import { type ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import MonthYearSelect from "../components/MonthYearSelect";
import { deleteTransactions, getTransactions } from "../services/transactionService";
import { type Transaction, TransactionType } from "../types/transactions";
import { formatCurrency, formateDate } from "../utils/formatters";

const Transactions = () => {
  const currentDate = new Date();
  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredtransactions, setfilteredTransactions] = useState<Transaction[]>([]);

  const [deletingId, setDeletingId] = useState<string>("");
  const [searchText, setserachText] = useState<string>("");

  const fetchTransactions = async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");
      const data = await getTransactions({ month, year });
      setTransactions(data);
      setfilteredTransactions(data);
    } catch (error) {
      console.error(error);
      setError("Não foi possivel carregar as transações🚨, tente novamente");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      setDeletingId(id);

      await deleteTransactions(id);
      setfilteredTransactions((prev) => prev.filter((t) => t.id !== id));
      toast.success("Transação deleteda com sucesso ✅");
    } catch (error) {
      console.error(error);
      toast.error("Falha ao completa Transação");
    } finally {
      setDeletingId("");
    }
  };

  const confirmDelete = (id: string): void => {
    if (window.confirm("Tem certeza que deseja delta essa transação ? ")) {
      handleDelete(id);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchTransactions();
  }, [month, year]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const search = event.target.value;
    setserachText(search);

    const searchUpper = search.toLocaleUpperCase();

    setfilteredTransactions(
      transactions.filter(
        (transaction) =>
          transaction.description?.toLocaleUpperCase().includes(searchUpper) ||
          transaction.category.name.toLocaleUpperCase().includes(searchUpper),
      ),
    );
  };

  return (
    <div className="container-app py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Transaçõs</h1>
        <Link
          to="/transacoes/nova"
          className="bg-primary-500 text-[#051626] font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center hover:bg-primary-600 transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Transação
        </Link>
      </div>
      <Card className="mb-6">
        <MonthYearSelect month={month} year={year} onMonthChange={setMonth} onYearChange={setYear} />
      </Card>

      <Card className="mb-6">
        <Input
          placeholder="Buscar Transações..."
          icon={<Search className="w-4 h-4" />}
          fullWidth
          onChange={handleSearchChange}
          value={searchText}
        />
      </Card>

      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center mx-auto gap-2">
            Carregando
            <LoaderCircle className="mx-auto w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p>{error}</p>
            <Button className="mx-auto mt-6" variant="primary" onClick={fetchTransactions}>
              Tentar Novamente
            </Button>
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Nehuma Transação Encontrada🚨</p>

            <Link
              to="/transacoes/nova"
              className="w-fit mx-auto bg-primary-500 text-[#051626] font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center hover:bg-primary-600 transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Transação
            </Link>
          </div>
        ) : (
          <div className="over-flow-x-auto">
            <table className="divide-y divide-gray-700 min-h-full w-full">
              <thead>
                <tr>
                  <th scope="col" className="px-3 py-3 text-left font-medium text-gray-400">
                    Descrição
                  </th>
                  <th scope="col" className="px-3 py-3 text-left font-medium text-gray-400">
                    Data
                  </th>
                  <th scope="col" className="px-3 py-3 text-left font-medium text-gray-400">
                    Categoria
                  </th>
                  <th scope="col" className="px-3 py-3 text-left font-medium text-gray-400">
                    Valor
                  </th>
                  <th scope="col" className="px-3 py-3 text-left font-medium text-gray-400">
                    {" "}
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-700">
                {filteredtransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-800">
                    <td className="px-6 text-sm text">
                      <div className="flex items-center">
                        <div className="mr-2">
                          {transaction.type === TransactionType.INCOME ? (
                            <ArrowUp className="w-4 h-4 text-primary-500" />
                          ) : (
                            <ArrowDown className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-50">{transaction.description}</span>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-gray-400 whitespace-nowrap">{formateDate(transaction.date)}</td>
                    <td className="px-3 py-4 text-gray-400">
                      <div className="flex items-center">
                        <div
                          className="w-2 h-2 rounded-full mr-2"
                          style={{ backgroundColor: transaction.category.color }}
                        />
                        <span className="text-sm text-gray-400"> {transaction.category.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-gray-400">
                      <span
                        className={`${transaction.type === TransactionType.INCOME ? "text-primary-500" : "text-red-500"}`}
                      >
                        {formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="px-3 py-4 cursor-pointer duration-500 ease-in-out hover:-translate-y-2 ">
                      {/** biome-ignore lint/a11y/useButtonType: <explanation> */}
                      <button
                        type="button"
                        onClick={() => confirmDelete(transaction.id)}
                        className="text-red-500 hover:text-red-400 rounded-full cursor-pointer"
                        disabled={deletingId === transaction.id}
                      >
                        {deletingId === transaction.id ? (
                          <span className="inline-block w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Transactions;
