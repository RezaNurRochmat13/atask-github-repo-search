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
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">🔍 GitHub User Explorer</h1>
      <h1 className="text-red-500 text-3xl">TEST STYLE</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchUsers();
        }}
        className="max-w-xl mx-auto bg-gray-800 p-6 rounded-xl shadow-md"
      >
        <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
          Enter GitHub Username
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            🔍
          </span>
          <input
            id="username"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. torvalds"
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg font-semibold"
        >
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
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
