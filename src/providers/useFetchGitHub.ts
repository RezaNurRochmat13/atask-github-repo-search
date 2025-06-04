import { useState } from 'react';
import type { GitHubRepo, GitHubUser, GitHubUserDetail } from '../types';

export function useFetchGitHub() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [results, setResults] = useState<GitHubUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<GitHubUserDetail | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  const searchUsers = async (username?: string) => {
    setSelectedUser(null);
    setIsLoading(true);
    try {
      const res = await fetch(`https://api.github.com/search/users?q=${username}&per_page=5`);
      const data = await res.json();
      setResults(data.items || []);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserDetail = async (username: string) => {
    setIsLoadingDetail(true);
    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      const userData = await userRes.json();
      setSelectedUser(userData);

      const reposRes = await fetch(userData.repos_url);
      const reposData = await reposRes.json();
      setRepos(reposData);
    } catch (err) {
      console.error('Failed to fetch user detail:', err);
    } finally {
      setIsLoadingDetail(false);
    }
  };

  return {
    searchUsers,
    fetchUserDetail,
    isLoading,
    isLoadingDetail,
    results,
    selectedUser,
    repos,
  };
}
