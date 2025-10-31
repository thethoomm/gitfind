import { Search, Code2, Sparkles } from "lucide-react";
import heroImage from "@/assets/gitfind.jpeg";

export const GitFindHeader = () => {
  return (
    <div 
      className="relative text-center mb-12 rounded-3xl overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="px-8 py-16">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <Search className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white">
            GitFind
          </h1>
        </div>
        
        <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
          Encontre perfis de desenvolvedores em GitHub, GitLab e Bitbucket em um só lugar
        </p>
        
        <div className="flex items-center justify-center gap-8 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-white" />
            <span>Busca Unificada</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-white" />
            <span>Interface Moderna</span>
          </div>
        </div>
      </div>
    </div>
  );
};