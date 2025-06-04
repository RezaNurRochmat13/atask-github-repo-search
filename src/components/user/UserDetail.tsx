import type { GitHubUserDetail } from './../../types';

interface Props {
  user: GitHubUserDetail;
}

const UserDetail = ({ user }: Props) => {
  return (
    <div className="mt-6 p-4 bg-gray-800 rounded">
      <img src={user.avatar_url} alt={user.login} className="w-20 rounded-full mb-2" />
      <h2 className="text-xl font-bold">{user.name || user.login}</h2>
      <p>{user.bio}</p>
      <p className="text-sm text-gray-400">{user.location}</p>
      <div className="mt-2 text-sm">
        <p>Repos: {user.public_repos}</p>
        <p>Followers: {user.followers} | Following: {user.following}</p>
      </div>
      <a href={user.html_url} target="_blank" className="text-blue-400 mt-2 block">
        View on GitHub →
      </a>
    </div>
  );
};

export default UserDetail;
