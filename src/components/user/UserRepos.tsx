import type { GitHubRepo } from '../../types';

interface Props {
  repos: GitHubRepo[];
}

const UserRepos = ({ repos }: Props) => {
  if (!repos.length) return <p className="text-gray-400 mt-4">No public repositories.</p>;

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4 text-white">📦 Public Repositories</h3>
      <div className="grid gap-4">
        {repos.map((repo) => (
          <div key={repo.name} className="bg-gray-800 p-4 rounded-xl shadow">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-400 hover:underline"
            >
              {repo.name}
            </a>
            <p className="text-sm text-gray-300 mt-1">{repo.description || 'No description'}</p>
            <span className="text-xs text-yellow-300 mt-2 inline-block">⭐ {repo.stargazers_count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRepos;
