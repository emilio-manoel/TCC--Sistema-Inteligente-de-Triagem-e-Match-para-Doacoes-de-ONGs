import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { HeartPlus } from "lucide-react";
import type { DadosONG, Necessidade } from "../types/ongCreate";
import { createOng } from "../api/requestHttp";

function RegisterOngPage() {
  const [tempArea, tempAreaSet] = useState("");
  const [tempSubArea, tempSubAreaSet] = useState("");
  const [tempContato, tempContatoSet] = useState("");
  const [tempRede, tempRedeSet] = useState("");
  const [tempItem, tempItemSet] = useState("");
  const [tempDescricao, tempDescricaoSet] = useState("");
  const [tempUrgencia, tempUrgenciaSet] = useState<"baixa" | "media" | "alta">(
    "baixa",
  );
  const [feedback, setFeedback] = useState<{
    mensagem: string;
    tipo: "info" | "erro" | null;
  }>({
    mensagem: "",
    tipo: null,
  });

  const [formData, setFormData] = useState<DadosONG>({
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
  });

  function handleAddNecessidade() {
    if (!tempItem.trim()) {
      alert("O campo 'item' é obrigatório para adicionar uma necessidade.");
      return;
    }

    const novaNecessidade: Necessidade = {
      item: tempItem.trim(),
      categoria: tempDescricao.trim() || undefined,
      urgencia: tempUrgencia,
    };

    setFormData((prev) => ({
      ...prev,
      // Copia o que já tinha e adiciona o novo objeto de necessidade
      necessidade: [...(prev.necessidade || []), novaNecessidade],
    }));

    // Limpa todos os campos após adicionar com sucesso
    tempItemSet("");
    tempDescricaoSet("");
    tempUrgenciaSet("baixa");
  }

  function handleRemoveNecessidade(indexParaRemover: number) {
    setFormData((prev) => ({
      ...prev,
      necessidade: (prev.necessidade || []).filter(
        (_, index) => index !== indexParaRemover,
      ),
    }));
  }

  function handleAddFormArray(chave: keyof DadosONG, novoValor: string) {
    const valorLimpo = novoValor.trim();
    if (!valorLimpo) return;

    const listaAtual = formData[chave] as string[];

    if (listaAtual.includes(valorLimpo)) {
      alert("Este item já foi adicionado!");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [chave]: [...(prev[chave] as string[]), valorLimpo],
    }));
  }

  function handleRemoveFormArray(
    chave: keyof DadosONG,
    indexParaRemover: number,
  ) {
    setFormData((prev) => ({
      ...prev,
      [chave]: (prev[chave] as string[]).filter(
        (_, index) => index !== indexParaRemover,
      ),
    }));
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
    const dadosProntosParaEnvio = {
      ...formData,
      endereco_completo: enderecoFormatado.toUpperCase(),
    };

    try {
      const resposta = await createOng(dadosProntosParaEnvio);

      if (resposta?.message) {
        setFeedback({
          mensagem: resposta.message,
          tipo: "info",
        });
      }
    } catch (error: any) {
      const mensagemErro =
        error.response?.data?.message || "Ocorreu um erro ao cadastrar a ONG.";
      setFeedback({
        mensagem: mensagemErro,
        tipo: "info",
      });
    }
  }

  return (
    <div className="overflow-auto">
      <div className="flex flex-col items-center text-center m-2 max-w-2xl mx-auto px-4">
        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium mb-3 leading-relaxed">
          <span className="text-muted-foreground">
            bem-vindo ao area de cadastro de ONGs{" "}
          </span>
          <span className="font-extrabold block sm:inline mt-1 sm:mt-0">
            adicione aqui os dados para avaliação e divulgação das ong que
            precisam de ajuda
          </span>
        </p>
        <p className="text-[10px] sm:text-xs">
          <span className="inline-block bg-secondary-button border border-border rounded-3xl font-medium px-3 py-1.5 shadow-sm">
            Os dados devem ser enviadas por uma ong já autorizada
          </span>
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        className="flex flex-col gap-4 px-6"
      >
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">CNPJ</label>
            <Input
              name="cnpj"
              placeholder="00.000.000/0000-00"
              value={formData.cnpj}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Razão Social
            </label>
            <Input
              name="razao_social"
              placeholder="Nome oficial da ONG"
              value={formData.razao_social}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Endereço Completo
            </label>
            <Input
              name="endereco_completo"
              placeholder="Rua, número, bairro..."
              value={formData.endereco_completo}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cidade</label>
            <Input
              name="municipio"
              placeholder="Cidade / municipio"
              value={formData.municipio}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">UF</label>
            <Input
              name="uf"
              placeholder="SP"
              maxLength={2}
              value={formData.uf}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">CEP</label>
            <Input
              name="cep"
              placeholder="00000-000"
              value={formData.cep}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              natureza juridica
            </label>
            <Input
              name="natureza_juridica"
              placeholder="natureza juridica"
              value={formData.natureza_juridica}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">descrição</label>
            <Input
              name="descricao"
              placeholder="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Áreas de Atuação
            </label>
            <Input
              placeholder="Adicione uma área..."
              value={tempArea}
              onChange={(e) => tempAreaSet(e.target.value)}
              suffix="Adicionar"
              onClickSuffix={() => {
                handleAddFormArray("areas_atuacao", tempArea);
                tempAreaSet("");
              }}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.areas_atuacao.map((item, index) => (
                <span
                  key={index}
                  className="bg-secondary-button px-3 py-1 rounded-full text-xs"
                >
                  {item}
                  <button
                    type="button"
                    className="ml-2 font-bold text-red-500"
                    onClick={() =>
                      handleRemoveFormArray("areas_atuacao", index)
                    }
                  >
                    X
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              sub Áreas de Atuação
            </label>
            <Input
              placeholder="Adicione uma sub área..."
              value={tempSubArea}
              onChange={(e) => tempSubAreaSet(e.target.value)}
              suffix="Adicionar"
              onClickSuffix={() => {
                handleAddFormArray("subareas_atuacao", tempSubArea);
                tempSubAreaSet("");
              }}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.subareas_atuacao.map((item, index) => (
                <span
                  key={index}
                  className="bg-secondary-button px-3 py-1 rounded-full text-xs"
                >
                  {item}
                  <button
                    type="button"
                    className="ml-2 font-bold text-red-500"
                    onClick={() =>
                      handleRemoveFormArray("subareas_atuacao", index)
                    }
                  >
                    X
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Numero para contato
            </label>
            <Input
              placeholder="Adicione uma numero para contato..."
              value={tempContato}
              onChange={(e) => tempContatoSet(e.target.value)}
              suffix="Adicionar"
              onClickSuffix={() => {
                handleAddFormArray("numero_contato", tempContato);
                tempContatoSet("");
              }}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.numero_contato.map((item, index) => (
                <span
                  key={index}
                  className="bg-secondary-button px-3 py-1 rounded-full text-xs"
                >
                  {item}
                  <button
                    type="button"
                    className="ml-2 font-bold text-red-500"
                    onClick={() =>
                      handleRemoveFormArray("numero_contato", index)
                    }
                  >
                    X
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              redes sociais
            </label>
            <Input
              placeholder="Adicione uma rede social..."
              value={tempRede}
              onChange={(e) => tempRedeSet(e.target.value)}
              suffix="Adicionar"
              onClickSuffix={() => {
                handleAddFormArray("redes_sociais", tempRede);
                tempRedeSet("");
              }}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.redes_sociais.map((item, index) => (
                <span
                  key={index}
                  className="bg-secondary-button px-3 py-1 rounded-full text-xs"
                >
                  {item}
                  <button
                    type="button"
                    className="ml-2 font-bold text-red-500"
                    onClick={() =>
                      handleRemoveFormArray("redes_sociais", index)
                    }
                  >
                    X
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 col-span-1 md:col-span-2">
          <label className="block text-sm font-medium">
            Necessidades da ONG
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input
              placeholder="Item (ex: Cesta Básica)"
              value={tempItem}
              onChange={(e) => tempItemSet(e.target.value)}
            />

            <Input
              placeholder="Descrição/Categoria (ex: Alimentos)"
              value={tempDescricao}
              onChange={(e) => tempDescricaoSet(e.target.value)}
            />

            <div className="bg-input flex items-center rounded-2xl p-4 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
              <select
                value={tempUrgencia}
                onChange={(e) =>
                  tempUrgenciaSet(e.target.value as "baixa" | "media" | "alta")
                }
                className="w-full bg-transparent text-sm outline-none text-foreground"
              >
                <option value="baixa" className="text-black">
                  Urgência: Baixa
                </option>
                <option value="media" className="text-black">
                  Urgência: Média
                </option>
                <option value="alta" className="text-black">
                  Urgência: Alta
                </option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={handleAddNecessidade}
            >
              + Adicionar Necessidade
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {formData.necessidade?.map((nec, index) => {
              if (!nec.item) return null;

              return (
                <span
                  key={index}
                  className="bg-secondary-button border border-border px-3 py-1 rounded-full text-xs flex items-center gap-2 shadow-sm"
                >
                  <strong className="text-foreground wrap-break-words">
                    {nec.item}
                  </strong>
                  {nec.categoria && (
                    <span className="text-muted-foreground">
                      ({nec.categoria})
                    </span>
                  )}
                  <span
                    className={`font-semibold ${
                      nec.urgencia === "alta"
                        ? "text-red-500"
                        : nec.urgencia === "media"
                          ? "text-yellow-500"
                          : "text-green-500"
                    }`}
                  >
                    • {nec.urgencia}
                  </span>
                  <button
                    type="button"
                    className="ml-1 font-bold text-red-500 hover:text-red-700 transition-colors"
                    onClick={() => handleRemoveNecessidade(index)}
                  >
                    X
                  </button>
                </span>
              );
            })}
          </div>
        </div>

        {/* Renderização condicional do banner azul de aviso */}
        {feedback.tipo === "info" && (
          <div className="w-full bg-secondary-button border border-border text-foreground p-4 rounded-xl flex items-center justify-between text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2">
              <span className="text-base">ℹ️</span>
              <span>{feedback.mensagem}</span>
            </div>

            <button
              type="button"
              onClick={() => setFeedback({ mensagem: "", tipo: null })}
              className="text-foreground"
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex justify-center w-full mt-4">
          <Button
            type="submit"
            variant="primary"
            icon={HeartPlus}
            className="w-full sm:max-w-xs text-base py-4 shadow-lg"
          >
            Cadastrar ONG
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RegisterOngPage;
