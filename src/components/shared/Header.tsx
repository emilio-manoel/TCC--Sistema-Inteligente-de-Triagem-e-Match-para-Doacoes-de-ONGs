import { Button } from "../ui/Button";
import { Divider } from "../ui/Divider";
import { TrendingUp, Clock, Moon, Sun, MapPinSearch, DatabasePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Theme/useTheme";

function Header() {
   const navigate = useNavigate();
  const {theme, toggleTheme} = useTheme();

  return (
      <header className="border-b border-(--border) px-6 py-3">
      <nav className="flex items-center justify-between">
        {/* logo */}
        <div className="flex items-center gap-2">
          <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-full">
            <MapPinSearch />
          </div>
          <span className="text-lg">
            <span className="text-muted-foreground font-medium">Triagem e match</span>
            <span className="font-extrabold"> para doações</span>
          </span>
        </div>

        {/* Actions Buttons */}
       <div className="flex items-center gap-1">
          <Button
            variant="secondaryStrong"
            icon={TrendingUp}
            onClick={() => void window.location.reload() && navigate('/')}
          >
            <span className="hidden sm:inline">Nova pesquisa </span>
          </Button>
          <Button
            variant="secondary"
            icon={Clock}
            onClick={() => void navigate('/historico')}
          >
            <span className="hidden sm:inline">Histórico</span>
          </Button>
          <Button
            variant="ghost"
            icon={DatabasePlus}
            onClick={() => void navigate('/cadastrar-ong')}
          >
            <span className="hidden sm:inline">Adicionar Ong </span>
          </Button>
          <Divider orientation="vertical"/>
          <Button
            aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
            variant="ghost"
            icon={theme === 'light' ? Moon : Sun}
            onClick={toggleTheme}
          />
        </div>

      </nav>
    </header>
  )
}

export default Header