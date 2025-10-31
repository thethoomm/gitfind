import { useState } from "react";
import { Github, GitBranch, Zap, MapPin, Link, Calendar, Star, GitFork, Eye } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const platformConfig = {
  github: {
    name: "GitHub",
    icon: Github,
    color: "text-github",
    bgColor: "bg-github",
    baseUrl: "https://github.com"
  },
  gitlab: {
    name: "GitLab", 
    icon: GitBranch,
    color: "text-gitlab",
    bgColor: "bg-gitlab",
    baseUrl: "https://gitlab.com"
  },
  bitbucket: {
    name: "Bitbucket",
    icon: Zap,
    color: "text-bitbucket", 
    bgColor: "bg-bitbucket",
    baseUrl: "https://bitbucket.org"
  }
};

export const PlatformCard = ({ platform, userProfile, isLoading, error }) => {
  const [showAllRepos, setShowAllRepos] = useState(false);
  const config = platformConfig[platform];
  const Icon = config.icon;

  if (isLoading) {
    return (
      <Card className="bg-gradient-card shadow-medium">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <Icon className={`h-6 w-6 ${config.color}`} />
            <h3 className="text-lg font-semibold">{config.name}</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-muted rounded-full" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-32" />
                <div className="h-3 bg-muted rounded w-24" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-3/4" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-gradient-card shadow-medium border-destructive/20">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <Icon className={`h-6 w-6 ${config.color}`} />
            <h3 className="text-lg font-semibold">{config.name}</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-destructive mb-2">Usuário não encontrado</div>
            <div className="text-sm text-muted-foreground">{error}</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!userProfile) {
    return (
      <Card className="bg-gradient-card shadow-medium">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <Icon className={`h-6 w-6 ${config.color}`} />
            <h3 className="text-lg font-semibold">{config.name}</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Faça uma busca para ver os resultados
          </div>
        </CardContent>
      </Card>
    );
  }

  const displayedRepos = showAllRepos ? userProfile.repositories : userProfile.repositories.slice(0, 3);

  return (
    <Card className="bg-gradient-card shadow-medium hover:shadow-large transition-smooth">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className={`h-6 w-6 ${config.color}`} />
            <h3 className="text-lg font-semibold">{config.name}</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open(`${config.baseUrl}/${userProfile.username}`, '_blank')}
            className="text-muted-foreground hover:text-foreground"
          >
            <Link className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* User Info */}
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
            <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h4 className="text-lg font-semibold truncate">{userProfile.name}</h4>
            <p className="text-sm text-muted-foreground">@{userProfile.username}</p>
            
            {userProfile.bio && (
              <p className="text-sm mt-2 text-foreground/80 line-clamp-2">{userProfile.bio}</p>
            )}
            
            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
              {userProfile.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{userProfile.location}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Desde {new Date(userProfile.createdAt).getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold">{userProfile.followers}</div>
            <div className="text-xs text-muted-foreground">Seguidores</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">{userProfile.following}</div>
            <div className="text-xs text-muted-foreground">Seguindo</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">{userProfile.publicRepos}</div>
            <div className="text-xs text-muted-foreground">Repositórios</div>
          </div>
        </div>

        {/* Repositories */}
        {userProfile.repositories.length > 0 && (
          <div className="space-y-3">
            <h5 className="font-medium">Repositórios Principais</h5>
            <div className="space-y-3">
              {displayedRepos.map((repo, index) => (
                <div key={index} className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h6 className="font-medium text-sm truncate">{repo.name}</h6>
                    <Badge variant="secondary" className="text-xs">
                      {repo.language}
                    </Badge>
                  </div>
                  {repo.description && (
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      <span>{repo.stars}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-3 w-3" />
                      <span>{repo.forks}</span>
                    </div>
                    {repo.isPrivate && (
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>Privado</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {userProfile.repositories.length > 3 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllRepos(!showAllRepos)}
                className="w-full"
              >
                {showAllRepos ? 'Ver menos' : `Ver mais ${userProfile.repositories.length - 3} repositórios`}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};