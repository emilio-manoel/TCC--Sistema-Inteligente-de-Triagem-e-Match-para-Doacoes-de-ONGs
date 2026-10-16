import type { ChangeEvent } from "react";
import { Input } from "../ui/Input";
import type { DadosONG } from "../../types/ongCreate";

interface UniqueFieldsProps {
  formData: DadosONG;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function UniqueFields({ formData, onChange }: UniqueFieldsProps) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-1">CNPJ</label>
        <Input
          name="cnpj"
          placeholder="00.000.000/0000-00"
          value={formData.cnpj}
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Cidade</label>
        <Input
          name="municipio"
          placeholder="Cidade / municipio"
          value={formData.municipio}
          onChange={onChange}
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
          onChange={onChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">CEP</label>
        <Input
          name="cep"
          placeholder="00000-000"
          value={formData.cep}
          onChange={onChange}
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
          onChange={onChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">descrição</label>
        <Input
          name="descricao"
          placeholder="descricao"
          value={formData.descricao}
          onChange={onChange}
        />
      </div>
    </>
  );
}