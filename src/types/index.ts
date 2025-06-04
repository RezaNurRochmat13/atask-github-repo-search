export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface GitHubUserDetail extends GitHubUser {
  name: string;
  bio: string;
  location: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
}
