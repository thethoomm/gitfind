import { StatusCodes } from "http-status-codes";

const GITHUB_API_URL = "https://api.github.com";

export async function findUser(username) {
  try {
    const response = await fetch(`${GITHUB_API_URL}/users/${username}`, {
      method: "GET",
    });

    const data = await response.json();

    if (Number(data.status) === StatusCodes.NOT_FOUND) {
      return {
        found: false,
        error: "Usuário não encontrado",
      };
    }

    const repos = await getRepositories(username)

    return {
      found: true,
      login: data.login,
      name: data.name,
      avatar: data.avatar_url,
      repos: repos
    };
  } catch (error) {
    console.error(`Erro ao buscar usuário no GitHub: ${username} - `, error.message);
    throw new Error("Erro com a API do GitHub");
  }
}


async function getRepositories(username) {
  try {
    const response = await fetch(`${GITHUB_API_URL}/users/${username}/repos`, {
      method: "GET",
    });

    const data = await response.json();

    return data
  } catch (error) {
    console.error(`Erro ao buscar repositórios no GitHub: ${username} - `, error.message);
    throw new Error("Erro com a API do GitHub");
  }
}