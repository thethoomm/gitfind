import { StatusCodes } from "http-status-codes";

const BITBUCKET_API_URL = "https://api.bitbucket.org/2.0";

export async function findUser(username) {
  try {
    const response = await fetch(`${BITBUCKET_API_URL}/users/${username}`, {
      method: "GET",
    });

    if (response.status === StatusCodes.NOT_FOUND) {
      return {
        found: false,
        error: "Usuário não encontrado",
      };
    }

    const data = await response.json();

    return {
      found: true,
      login: data.username,
      name: data.display_name,
      avatar: data.links.avatar.href,
    };
  } catch (error) {
    console.error(`Erro ao buscar no Bitbucket: ${username} - `, error.message);
    throw new Error("Erro com a API do Bitbucket");
  }
}