import { useState } from 'react';
import { useForm } from 'react-hook-form';
import UserList from './components/user/UserList';
import UserDetail from './components/user/UserDetail';
import UserRepos from './components/user/UserRepos';
import Spinner from './shared/Spinner';
import type { GitHubUser, GitHubUserDetail, GitHubRepo, FormData } from './types';

function App() {
  const [results, setResults] = useState<GitHubUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<GitHubUserDetail | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

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


  const onSubmit = (data: FormData) => {
    searchUsers(data.username);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">🔍 GitHub User Explorer</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)();
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
            {...register('username', { required: 'Username is required' })}
            placeholder="e.g. torvalds"
            className={`w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 text-white border ${
              errors.username ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:ring-2 ${
              errors.username ? 'focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
          />
        </div>
        {errors.username && (
          <p className="mt-2 text-sm text-red-500">{errors.username.message}</p>
        )}
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg font-semibold"
        >
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <div>
          <div>
            {isLoading ? (
              <Spinner />
            ) : (
              <UserList users={results} onSelect={fetchUserDetail} />
            )}
          </div>
        </div>
        <div>
          {isLoadingDetail ? (
            <Spinner />
          ) : (
            selectedUser && (
              <>
                <UserDetail user={selectedUser} />
                <UserRepos repos={repos} />
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
