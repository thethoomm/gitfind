import { StatusCodes } from "http-status-codes";
import * as GithubService from "../services/github.service.js";
import * as GitlabService from "../services/gitlab.service.js";
import * as BitbucketService from "../services/bitbucket.service.js";

async function aggregateProfiles(username) {
  const [githubResult, gitlabResult, bitbucketResult] =
    await Promise.allSettled([
      GithubService.findUser(username),
      GitlabService.findUser(username),
      BitbucketService.findUser(username),
    ]);

  const profiles = {
    github: githubResult.status === "fulfilled" ? githubResult.value : null,
    gitlab: gitlabResult.status === "fulfilled" ? gitlabResult.value : null,
    bitbucket:
      bitbucketResult.status === "fulfilled" ? bitbucketResult.value : null,
  };

  const foundPlatforms = Object.entries(profiles)
    .filter(([, profile]) => profile?.found)
    .map(([platform]) => platform);

  if (foundPlatforms.length === 0) {
    return {
      found: false,
    };
  }

  const allRepos = []
  allRepos.push(...profiles.github.repos)

  return {
    found: true,
    name: profiles.github.name || profiles.gitlab.name || profiles.bitbucket.name,
    login: profiles.github.login || profiles.gitlab.login || profiles.bitbucket.login,
    avatar: profiles.github.avatar || profiles.gitlab.avatar || profiles.bitbucket.avatar,
    platforms: foundPlatforms,
    repos: allRepos
  };
}

export async function findProfile(req, res) {
  const { q: username } = req.query;

  if (!username) {
    res.status(StatusCodes.BAD_GATEWAY).json({
      message: "O parâmetro q é obrigatório",
    });
    return;
  }

  try {
    const aggregatedProfile = await aggregateProfiles(username);

    res.status(StatusCodes.OK).json({
      profile: aggregatedProfile,
    });
  } catch (error) {
    console.error("Erro ao procurar perfil: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Ocorreu um erro interno no servidor",
    });
    return;
  }
}
