import { useState } from "react";
import { Search, Github, GitBranch, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export const SearchBar = ({ onSearch, isLoading = false }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Digite o nome de usuário para buscar..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="pl-12 pr-32 h-14 text-lg bg-card shadow-elegant border-border/50 focus:ring-2 focus:ring-accent/50 focus:border-accent transition-smooth"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!username.trim() || isLoading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2  hover:opacity-90 transition-smooth px-6"
          >
            {isLoading ? (
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              "Buscar"
            )}
          </Button>
        </div>
      </form>
      
      {/* Platform indicators */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Github className="h-4 w-4 text-github" />
          <span>GitHub</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <GitBranch className="h-4 w-4 text-gitlab" />
          <span>GitLab</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Zap className="h-4 w-4 text-bitbucket" />
          <span>Bitbucket</span>
        </div>
      </div>
    </div>
  );
};