import { StatusCodes } from "http-status-codes";

const GITLAB_API_URL = "https://gitlab.com/api/v4";

export async function findUser(username) {
  try {
    const response = await fetch(`${GITLAB_API_URL}/users?username=${username}`, {
      method: "GET",
    });

    const data = await response.json();

    if (data.length === 0) {
      return {
        found: false,
        error: "Usuário não encontrado",
      };
    }

    const user = data[0];
    return {
      found: true,
      login: user.username,
      name: user.name,
      avatar: user.avatar_url,
    };
  } catch (error) {
    console.error(`Erro ao buscar no GitLab: ${username} - `, error.message);
    throw new Error("Erro com a API do GitLab");
  }
}