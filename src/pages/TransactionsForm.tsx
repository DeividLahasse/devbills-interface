import { AlertCircle, Calendar, DollarSign, LoaderCircle, Save, Tag } from "lucide-react";
import { type ChangeEvent, type FormEvent, useEffect, useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import { Select } from "../components/Select";
import TransactionTypeSelector from "../components/TransactionTypeSelector";
import { getCategories } from "../services/categoryService";
import { createTrasaction } from "../services/transactionService";
import type { Category } from "../types/category";
import { type CreateTransactionDTO, TransactionType } from "../types/transactions";

interface FormData {
  date: string | number | Date;
  categoryId: string;
  description: string;
  amount: number;
  data: string;
  category: string;
  type: TransactionType;
}

const initialFormData: FormData = {
  description: "",
  amount: 0,
  data: "",
  category: "",
  type: TransactionType.EXPENSE,
  categoryId: "",
  date: "",
};

const TransactionsForm = () => {
  const [categories, setCategory] = useState<Category[]>([]);
  const [formData, setFomData] = useState<FormData>(initialFormData);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const formId = useId();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async (): Promise<void> => {
      const response = await getCategories();
      setCategory(response);
    };

    fetchCategory();
  }, []);

  const filteredCategories = categories.filter((category) => category.type === formData.type);

  const validadeForm = (): boolean => {
    if (!formData.description || !formData.amount || !formData.data || !formData.categoryId) {
      setError("Preencha todos os campos🚨");
      return false;
    }

    if (formData.amount <= 0) {
      setError("O valor deve ser maior que zero🚨");
      return false;
    }

    return true;
  };

  const handleTransactionType = (itemType: TransactionType): void => {
    setFomData((prev) => ({ ...prev, type: itemType }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = event.target;

    setFomData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    console.log("form data no submit:", formData);
    setError(null);

    try {
      if (!validadeForm()) {
        return;
      }

      const transactionData: CreateTransactionDTO = {
        description: formData.description,
        amount: Number(formData.amount),
        categoryId: formData.categoryId,
        type: formData.type,
        date: new Date(formData.data),
      };
      // console.log("Dados enviados para a API:", transactionData);
      await createTrasaction(transactionData);
      toast.success("Transação adicionada com sucesso!✅");
      navigate("/transacoes");
    } catch (error) {
      console.log(error);
      toast.error("Falha ao adicionar transação🚨");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/transacoes");
  };

  return (
    <div className="container-app py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Nova Transação</h1>
        <Card>
          {error && (
            <div className="flex items-center bg-red-300 border border-red-700 rounded-xl p-4 mb-6 gap-2">
              <AlertCircle className="w-5 h-5 text-red-700" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4 flex gap-2 flex-col">
              <label htmlFor={formId}>Tipo de Transação</label>
              <TransactionTypeSelector id={formId} value={formData.type} onChange={handleTransactionType} />
            </div>

            <Input
              label="Descrição"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Ex: Supermercado, Sálario, etc..."
            />

            <Input
              label="Valor"
              name="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              placeholder="R$ 0,00"
              icon={<DollarSign className="w-4 h-4" />}
              required
            />

            <Input
              label="Data"
              name="data"
              type="date"
              value={formData.data}
              onChange={handleChange}
              icon={<Calendar className="w-4 h-4 " />}
            />

            <Select
              label="categoria"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              icon={<Tag className="w-4 h-4" />}
              options={[
                { value: "", label: "Selecione uma categoria" },
                ...filteredCategories.map((category) => ({
                  value: category.id,
                  label: category.name,
                })),
              ]}
            />

            <div className="flex justify-end space-x-3 mt-2">
              <Button
                className="transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg"
                variant="outline"
                onClick={handleCancel}
                type="button"
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                className="transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg"
                type="submit"
                disabled={loading}
                variant={formData.type === TransactionType.EXPENSE ? "danger" : "success"}
              >
                {loading ? (
                  <div className="flex flex-col items-center justify-center mx-auto gap-2">
                    Carregando
                    <LoaderCircle className="mx-auto w-8 h-8 animate-spin text-blue-500" />
                  </div>
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Salvar
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default TransactionsForm;
