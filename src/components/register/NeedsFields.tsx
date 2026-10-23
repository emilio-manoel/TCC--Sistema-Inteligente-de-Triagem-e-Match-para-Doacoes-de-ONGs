import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import type { Necessidade } from "../../types/ongCreate";

interface NeedsFieldsProps {
  necessidades?: Necessidade[];
  onAddNecessity: (newNeed: Necessidade) => void;
  onRemoveNecessity: (index: number) => void;
}

export default function NeedsFields({
  necessidades,
  onAddNecessity,
  onRemoveNecessity,
}: NeedsFieldsProps) {
  const [tempItem, tempItemSet] = useState("");
  const [tempDescricao, tempDescricaoSet] = useState("");
  const [tempUrgencia, tempUrgenciaSet] = useState<"baixa" | "media" | "alta">(
    "baixa",
  );

  function handleAdd() {
    if (!tempItem.trim()) {
      alert("O campo 'item' é obrigatório para adicionar uma necessidade.");
      return;
    }

    const newNeed: Necessidade = {
      item: tempItem.trim(),
      categoria: tempDescricao.trim() || undefined,
      urgencia: tempUrgencia,
    };

    onAddNecessity(newNeed);

    tempItemSet("");
    tempDescricaoSet("");
    tempUrgenciaSet("baixa");
  }

  return (
    <div className="flex flex-col gap-3 col-span-1 md:col-span-2">
      <label className="block text-sm font-medium">Necessidades da ONG</label>

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

        <div className="bg-input flex items-center rounded-2xl p-3 sm:p-4 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
          <select
            value={tempUrgencia}
            onChange={(e) =>
              tempUrgenciaSet(e.target.value as "baixa" | "media" | "alta")
            }
            className="w-full bg-transparent text-base sm:text-sm outline-none text-foreground"
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
        <Button type="button" variant="secondary" onClick={handleAdd}>
          + Adicionar Necessidade
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {necessidades?.map((nec, index) => {
          if (!nec.item) return null;

          return (
            <span
              key={index}
              className="bg-secondary-button border border-border px-3 py-1 rounded-full text-xs flex items-center gap-2 shadow-sm"
            >
              <strong className="text-foreground wrap-break-word">
                {nec.item}
              </strong>
              {nec.categoria && (
                <span className="text-muted-foreground">({nec.categoria})</span>
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
                onClick={() => onRemoveNecessity(index)}
              >
                X
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
}
