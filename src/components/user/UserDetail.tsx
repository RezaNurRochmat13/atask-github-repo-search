import type { GitHubUserDetail } from './../../types';

interface Props {
  user: GitHubUserDetail;
}

const UserDetail = ({ user }: Props) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500"
      />
      <h2 className="text-2xl font-bold text-white">{user.name || user.login}</h2>
      <p className="text-gray-300 mb-1">@{user.login}</p>
      <p className="text-sm text-gray-400 mb-2 italic">{user.bio}</p>
      <p className="text-sm text-gray-400 mb-1">{user.location}</p>
      <div className="flex justify-center gap-4 text-sm text-gray-200 mt-2">
        <span>Repos: {user.public_repos}</span>
        <span>👥 {user.followers} followers</span>
        <span>👣 {user.following} following</span>
      </div>
      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 text-blue-400 hover:underline"
      >
        View GitHub Profile →
      </a>
    </div>
  );
};

export default UserDetail;
