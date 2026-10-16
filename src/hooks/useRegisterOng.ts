import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import type { DadosONG, Necessidade } from "../types/ongCreate";
import { createOng } from "../api/requestHttp";

const initialFormData: DadosONG = {
  cnpj: "",
  razao_social: "",
  natureza_juridica: "",
  endereco_completo: "",
  cep: "",
  municipio: "",
  uf: "",
  descricao: "",
  areas_atuacao: [],
  subareas_atuacao: [],
  numero_contato: [],
  redes_sociais: [],
  necessidade: [
    {
      item: "",
      categoria: "",
      urgencia: "baixa",
    },
  ],
};

export function useRegisterOng() {
  const [formData, setFormData] = useState<DadosONG>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    message: string;
    type: "info" | "erro" | null;
  }>({
    message: "",
    type: null,
  });

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleAddFormArray(key: keyof DadosONG, newValue: string) {
    const valueClean = newValue.trim();
    if (!valueClean) return;

    const currentList = (formData[key] as string[]) || [];

    if (currentList.includes(valueClean)) {
      alert("Este item já foi adicionado!");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [key]: [...((prev[key] as string[]) || []), valueClean],
    }));
  }

  function handleRemoveFormArray(key: keyof DadosONG, indexForRemove: number) {
    setFormData((prev) => ({
      ...prev,
      [key]: ((prev[key] as string[]) || []).filter(
        (_, index) => index !== indexForRemove,
      ),
    }));
  }

  function handleAddNecessity(newNecessity: Necessidade) {
    setFormData((prev) => ({
      ...prev,
      necessidade: [...(prev.necessidade || []), newNecessity],
    }));
  }

  function handleRemoveNecessity(indexForRemove: number) {
    setFormData((prev) => ({
      ...prev,
      necessidade: (prev.necessidade || []).filter(
        (_, index) => index !== indexForRemove,
      ),
    }));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (
      event.key === "Enter" &&
      (event.target as HTMLElement).tagName === "INPUT"
    ) {
      event.preventDefault();
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const enderecoFormatado = `${formData.endereco_completo}, ${formData.municipio}, ${formData.uf}, ${formData.cep}`;
    const dataReadyToSend = {
      ...formData,
      endereco_completo: enderecoFormatado.toUpperCase(),
    };

    setLoading(true);
    try {
      const response = await createOng(dataReadyToSend);

      if (response?.message) {
        setFeedback({
          message: response.message,
          type: "info",
        });
      }
    } catch (error: any) {
      const messageErro =
        error.response?.data?.message || "Ocorreu um erro ao cadastrar a ONG.";
      setFeedback({
        message: messageErro,
        type: "info",
      });
    } finally {
      setLoading(false);
    }
  }

  function clearFeedback() {
    setFeedback({ message: "", type: null });
  }

  function resetForm() {
    setFormData(initialFormData);
    clearFeedback();
  }

  return {
    formData,
    loading,
    feedback,
    setFeedback,
    clearFeedback,
    resetForm,
    handleInputChange,
    handleAddFormArray,
    handleRemoveFormArray,
    handleAddNecessity,
    handleRemoveNecessity,
    handleKeyDown,
    handleSubmit,
  };
}
