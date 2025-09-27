import { StatusCodes } from "http-status-codes";

export async function findProfile(req, res) {
  const { q: username } = req.query;

  if (!username) {
    res.status(StatusCodes.BAD_GATEWAY).json({
      message: "O parâmetro q é obrigatório",
    });
    return;
  }

  try {
    res.send("Usuário: ", username);
  } catch (error) {
    console.error("Erro ao procurar perfil: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Ocorreu um erro interno no servidor",
    });
    throw error;
  }
}
