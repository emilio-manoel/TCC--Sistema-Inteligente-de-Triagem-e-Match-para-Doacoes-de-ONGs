import { Button } from "../components/ui/Button";
import { HeartPlus, Loader2 } from "lucide-react";
import UniqueFields from "../components/register/UniqueFields";
import MultipleFields from "../components/register/MultipleFields";
import NeedsFields from "../components/register/NeedsFields";
import { useRegisterOng } from "../hooks/useRegisterOng";

export default function RegisterOngPage() {
  const {
    formData,
    loading,
    feedback,
    clearFeedback,
    handleInputChange,
    handleAddFormArray,
    handleRemoveFormArray,
    handleAddNecessity,
    handleRemoveNecessity,
    handleKeyDown,
    handleSubmit,
  } = useRegisterOng();

  return (
    <div className="overflow-auto pb-12">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <UniqueFields formData={formData} onChange={handleInputChange} />
          <MultipleFields
            formData={formData}
            onAdd={handleAddFormArray}
            onRemove={handleRemoveFormArray}
          />
        </div>

        <NeedsFields
          necessidades={formData.necessidade}
          onAddNecessidade={handleAddNecessity}
          onRemoveNecessidade={handleRemoveNecessity}
        />

        {feedback.type === "info" && (
          <div className="w-full bg-secondary-button border border-border text-foreground p-4 rounded-xl flex items-center justify-between text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2">
              <span className="text-base">ℹ️</span>
              <span>{feedback.message}</span>
            </div>

            <button
              type="button"
              onClick={clearFeedback}
              className="text-foreground cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex justify-center w-full mt-4">
          <Button
            type="submit"
            variant="primary"
            icon={loading ? Loader2 : HeartPlus}
            disabled={loading}
            className="w-full sm:max-w-xs text-base py-4 shadow-lg"
          >
            {loading ? "Cadastrando..." : "Cadastrar ONG"}
          </Button>
        </div>
      </form>
    </div>
  );
}
