import { Button } from "../ui/Button";
import { Divider } from "../ui/Divider";
import {
  TrendingUp,
  Clock,
  Moon,
  Sun,
  MapPinSearch,
  DatabasePlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

function Header() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-border px-3 sm:px-6 py-2.5 sm:py-3 shrink-0">
      <nav className="flex items-center justify-between gap-2 max-w-7xl mx-auto">
        {/* logo */}
        <div
          className="flex items-center gap-2 cursor-pointer select-none min-w-0 shrink"
          onClick={() => void navigate("/")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") void navigate("/");
          }}
        >
          <div className="bg-primary flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full text-white shadow-sm">
            <MapPinSearch className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="text-sm sm:text-base md:text-lg tracking-tight truncate">
            <span className="text-muted-foreground font-medium hidden sm:inline">
              Triagem e match{" "}
            </span>
            <span className="font-extrabold">para Doações</span>
            <span className="font-extrabold hidden md:inline"> de ONGs</span>
          </span>
        </div>

        {/* Actions Buttons */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <Button
            size="header"
            variant="secondaryStrong"
            icon={TrendingUp}
            onClick={() => void navigate("/")}
            title="Nova pesquisa"
            aria-label="Nova pesquisa"
          >
            <span className="hidden sm:inline">Nova pesquisa</span>
          </Button>
          <Button
            size="header"
            variant="secondary"
            icon={Clock}
            onClick={() => void navigate("/historico")}
            title="Histórico"
            aria-label="Histórico"
          >
            <span className="hidden sm:inline">Histórico</span>
          </Button>
          <Button
            size="header"
            variant="ghost"
            icon={DatabasePlus}
            onClick={() => void navigate("/cadastrar-ong")}
            title="Adicionar ONG"
            aria-label="Adicionar ONG"
          >
            <span className="hidden sm:inline">Adicionar Ong</span>
          </Button>
          <Divider
            orientation="vertical"
            spacing={6}
            className="h-5 self-center my-auto"
          />
          <Button
            size="header"
            aria-label={`Mudar para tema ${theme === "light" ? "escuro" : "claro"}`}
            title={`Mudar para tema ${theme === "light" ? "escuro" : "claro"}`}
            variant="ghost"
            icon={theme === "light" ? Moon : Sun}
            onClick={toggleTheme}
          />
        </div>
      </nav>
    </header>
  );
}

export default Header;
