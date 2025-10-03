import { GitHubIcon } from "./icons/github-icon";
import { GitLabIcon } from "./icons/gitlab-icon";
import { BitBucketIcon } from "./icons/bitbucket-icon";

const serviceIcons = {
  github: GitHubIcon,
  gitlab: GitLabIcon,
  bitbucket: BitBucketIcon,
};

export function UserInfo({ profile }) {
  if (!profile) {
    return;
  }

  if (!profile.found) {
    return <p>Usuário não encontrado</p>;
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="w-full border border-gray-200 p-4 rounded-lg flex flex-col items-center gap-4">
        <img
          src={profile.avatar}
          alt={`Imagem do ${profile.name}`}
          className="size-24 rounded-full"
        />
        <div className="text-center">
          <p className="text-xl font-medium">{profile.name}</p>
          <p className="text-sm text-gray-600">@{profile.login}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            {profile.platforms.map((platform) => {
              const Icon = serviceIcons[platform];
              return Icon ? <Icon key={platform} className="size-6" /> : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
