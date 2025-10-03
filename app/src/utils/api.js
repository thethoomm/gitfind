const GITFIND_API_URL = import.meta.env.VITE_GITFIND_API_URL;

export async function findProfiles(username) {
  try {
    const response = await fetch(`${GITFIND_API_URL}/search?q=${username}`, {
      method: "GET",
    });

    const data = await response.json();

    return data.profile;
  } catch (error) {
    console.error("Erro na requisição á API Gitfind", error);
  }
}
