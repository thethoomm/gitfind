import { useState, useTransition } from "react";
import { Search } from "lucide-react";
import { GitFindHeader } from "@/components/header";
import { SearchBar } from "@/components/SearchBar";
import { PlatformCard } from "@/components/PlataformCard";
import { findProfiles } from "./utils/api";
import { object } from "zod";

export function App() {
  const [isPending, startTransition] = useTransition();
  const [profiles, setProfiles] = useState([]);

  function handleSearchUserInfo(username) {
    // Se o username === null: toast
  
    startTransition(async () => {
       const foundProfiles = await findProfiles(username);
        console.log("📡 Retorno da API:", foundProfiles); // 👈 veja no console
       setProfiles(foundProfiles);
    });
   }
   return (
    <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-4 py-12">
            <GitFindHeader />
            <div className="mb-12">
                <SearchBar onSearch={handleSearchUserInfo}   />
            </div>
             {isPending ? "Carregando..." : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {profiles.map((profile) => (
                    <PlatformCard key={profile.platform} platform={profile.platform} profile={profile} />
                   ))}
                   {profiles.github && (
                    <PlatformCard
                        key="github"
                        platform="github"
                        //passar as infos certas para o card
                        userProfile={{ username: profiles.github.login, name: profiles.github.name, avatar: profiles.github.avatar,   }}
                    />
                   )}
                </div>
            )}

            {
                !isPending && profiles.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-muted-foreground mb-4">
                        <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Digite um nome de usuário para começar a busca</p>
                        <p className="text-sm mt-2">Experimente buscar por "octocat" para ver a demonstração</p>
                        </div>
                    </div>
                )
            }
        </div>
    </div>
   );
}