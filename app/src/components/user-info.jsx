import { GitHubIcon } from "./icons/github-icon";
import { GitLabIcon } from "./icons/gitlab-icon";
import { BitBucketIcon } from "./icons/bitbucket-icon";

const serviceIcons = {
  github: GitHubIcon,
  gitlab: GitLabIcon,
  bitbucket: BitBucketIcon,
};

export function UserInfo({ profiles }) {
  if (!profiles) {
    return null;
  }

  return (
    <div className="w-full grid grid-cols-3 gap-6">
      {Object.entries(profiles).map(([service, data]) => {
        const { found = false } = data ?? {};
        const Icon = serviceIcons[service];

        if (!found) {
          return (
            <div key={service} className="flex flex-col items-center gap-2">
              <Icon className="size-6" />

              <p>Usuário não encontrado</p>
            </div>
          );
        }

        return (
          <div key={service} className="flex flex-col items-center gap-2">
            <Icon className="size-6" />

            <div className="w-full border border-gray-200 p-3 rounded flex items-center gap-4">
              <img
                src={data.avatar}
                alt={`Imagem do ${data.name}`}
                className="size-12 rounded-full"
              />

              <div className="flex flex-col -space-y-1">
                {data.name && <p className="font-medium">{data.name}</p>}
                {data.login && <p className="text-xs text-gray-600">@{data.login}</p>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
