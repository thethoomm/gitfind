import { useState, useTransition } from "react";
import { Search } from "lucide-react";
import { GitFindHeader } from "@/components/header";
import { SearchBar } from "@/components/SearchBar";
import { PlatformCard } from "@/components/PlataformCard";
import { findProfiles } from "./utils/api";

export function App() {
  const [isPending, startTransition] = useTransition();
  const [profile, setProfile] = useState();

  function handleSearchUserInfo(username) {
    // Se o username === null: toast

    startTransition(async () => {
      const data = await findProfiles(username);
      console.log("📡 Retorno da API:", data); // 👈 veja no console
      setProfile(data);
    });
  }
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-12">
        <GitFindHeader />
        <div className="mb-12">
          <SearchBar onSearch={handleSearchUserInfo} />
        </div>
        {isPending ? (
          "Carregando..."
        ) : (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile &&
              profile.platforms &&
              profile.platforms.map((platform) => (
                <PlatformCard
                  key={platform}
                  platform={platform}
                  userProfile={{
                    username: profile.login,
                    name: profile.name,
                    avatar: profile.avatar,
                    repositories: profile.repos.map((repo) => ({...repo, stars: repo.stargazers_count, forks: repo.forks_count, isPrivate: repo.private})),
                  }}
                />
              ))}
          </div>
        )}

        {!isPending && profile === null  && (
          <div className="text-center py-16">
            <div className="text-muted-foreground mb-4">
              <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">
                Digite um nome de usuário para começar a busca
              </p>
              <p className="text-sm mt-2">
                Experimente buscar por "octocat" para ver a demonstração
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
