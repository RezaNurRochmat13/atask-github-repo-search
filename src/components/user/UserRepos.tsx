import type { GitHubRepo } from '../../types';

interface Props {
  repos: GitHubRepo[];
}

const UserRepos = ({ repos }: Props) => {
  if (!repos.length) return <p className="text-gray-400">No repositories found.</p>;

  return (
    <div className="mt-4 space-y-3">
      <h3 className="text-lg font-semibold">📦 Public Repositories</h3>
      {repos.map((repo) => (
        <div key={repo.name} className="bg-gray-700 p-3 rounded">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 font-medium hover:underline"
          >
            {repo.name}
          </a>
          <p className="text-sm text-gray-300">{repo.description || 'No description'}</p>
          <span className="text-xs text-yellow-300">⭐ {repo.stargazers_count}</span>
        </div>
      ))}
    </div>
  );
};

export default UserRepos;
