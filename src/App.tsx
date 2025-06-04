import { useState } from 'react';
import UserList from './components/user/UserList';
import UserDetail from './components/user/UserDetail';
import UserRepos from './components/user/UserRepos';
import type { GitHubUser, GitHubUserDetail, GitHubRepo } from './types';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GitHubUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<GitHubUserDetail | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  const searchUsers = async () => {
    setSelectedUser(null);
    const res = await fetch(`https://api.github.com/search/users?q=${query}`);
    const data = await res.json();
    setResults(data.items || []);
  };

  const fetchUserDetail = async (username: string) => {
  const [userRes, repoRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`),
    fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
  ]);

  const userData: GitHubUserDetail = await userRes.json();
  const repoData: GitHubRepo[] = await repoRes.json();

  setSelectedUser(userData);
  setRepos(repoData);
};

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">🔍 GitHub User Explorer</h1>
      <div className="flex gap-2 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search username"
          className="p-2 rounded text-black w-64"
        />
        <button onClick={searchUsers} className="bg-blue-600 px-4 py-2 rounded">
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <UserList users={results} onSelect={fetchUserDetail} />
        </div>
        <div>
          {selectedUser && (
            <div>
              <UserDetail user={selectedUser} />
              <UserRepos repos={repos} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
