function Header() {

  return (
    <>
      <header className="border-b border-(--border) px-6 py-3">
      <nav className="flex items-center justify-between">
        {/* logo */}
        <div className="flex items-center gap-2">
          <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-full">
          </div>
          <span className="text-lg">
            <span className="text-muted-foreground font-medium"></span>
            <span className="font-extrabold"> </span>
          </span>
        </div>

        {/* Actions Buttons */}
        <div className="flex items-center gap-1">
            <span className="hidden sm:inline">Nova Simulação</span>
            <span className="hidden sm:inline">Histórico</span>
        </div>

      </nav>
    </header>
     
    </>
  )
}

export default Header