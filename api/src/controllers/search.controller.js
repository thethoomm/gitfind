import { StatusCodes } from "http-status-codes";
import * as GithubService from "../services/github.service.js";

export async function findProfile(req, res) {
  const { q: username } = req.query;

  if (!username) {
    res.status(StatusCodes.BAD_GATEWAY).json({
      message: "O parâmetro q é obrigatório",
    });
    return;
  }

  try {
    const githubProfile = await GithubService.findUser(username);

    res.status(StatusCodes.OK).json({
      profiles: {
        github: githubProfile,
        gitlab: null,
        bitbucket: null,
      },
    });
  } catch (error) {
    console.error("Erro ao procurar perfil: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Ocorreu um erro interno no servidor",
    });
    return;
  }
}
