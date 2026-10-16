import { useState } from "react";
import { Input } from "../ui/Input";
import type { DadosONG } from "../../types/ongCreate";

interface MultipleFieldsProps {
  formData: DadosONG;
  onAdd: (key: keyof DadosONG, novoValor: string) => void;
  onRemove: (key: keyof DadosONG, indexForRemove: number) => void;
}

export default function MultipleFields({
  formData,
  onAdd,
  onRemove,
}: MultipleFieldsProps) {
  const [tempArea, tempAreaSet] = useState("");
  const [tempSubArea, tempSubAreaSet] = useState("");
  const [tempContato, tempContatoSet] = useState("");
  const [tempRede, tempRedeSet] = useState("");

  return (
    <>
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
            onAdd("areas_atuacao", tempArea);
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
                onClick={() => onRemove("areas_atuacao", index)}
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
            onAdd("subareas_atuacao", tempSubArea);
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
                onClick={() => onRemove("subareas_atuacao", index)}
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
            onAdd("numero_contato", tempContato);
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
                onClick={() => onRemove("numero_contato", index)}
              >
                X
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">redes sociais</label>
        <Input
          placeholder="Adicione uma rede social..."
          value={tempRede}
          onChange={(e) => tempRedeSet(e.target.value)}
          suffix="Adicionar"
          onClickSuffix={() => {
            onAdd("redes_sociais", tempRede);
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
                onClick={() => onRemove("redes_sociais", index)}
              >
                X
              </button>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
