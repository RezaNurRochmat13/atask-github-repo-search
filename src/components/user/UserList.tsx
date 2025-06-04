import type { GitHubUser } from './../../types';

interface Props {
  users: GitHubUser[];
  onSelect: (username: string) => void;
}

const UserList = ({ users, onSelect }: Props) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-white">🔍 Search Results</h3>
      <ul className="space-y-3">
        {users.map((user) => (
          <li
            key={user.login}
            onClick={() => onSelect(user.login)}
            className="flex items-center gap-4 bg-gray-800 p-3 rounded-xl cursor-pointer hover:bg-gray-700 transition"
          >
            <img src={user.avatar_url} alt={user.login} className="w-10 h-10 rounded-full" />
            <span className="text-white font-medium">{user.login}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
