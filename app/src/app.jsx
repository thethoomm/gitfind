import { useTransition, useState } from "react";
import { findProfiles } from "./utils/api";
import { UserInfo } from "./components/user-info";

export function App() {
  const [isPending, startTransition] = useTransition();
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState();

  function handleSearchUserInfo(event) {
    // Se o username === null: toast
    event.preventDefault();

    startTransition(async () => {
      const foundProfiles = await findProfiles(username);

      setProfile(foundProfiles);
    });
  }

  return (
    <div className="min-h-svh w-full p-6">
      <input
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Digite seu username do Github, Gitlab ou Bitbucket"
      />
      <button type="button" onClick={handleSearchUserInfo}>
        Buscar Agora
      </button>

      {isPending ? "Carregando..." : <UserInfo profile={profile} />}
    </div>
  );
}
