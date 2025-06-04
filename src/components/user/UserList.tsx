import type { GitHubUser } from './../../types';

interface Props {
  users: GitHubUser[];
  onSelect: (username: string) => void;
}

const UserList = ({ users, onSelect }: Props) => {
  return (
    <ul className="space-y-2">
      {users.map((user) => (
        <li
          key={user.login}
          className="flex items-center gap-4 p-2 bg-gray-800 rounded hover:cursor-pointer hover:bg-gray-700"
          onClick={() => onSelect(user.login)}
        >
          <img src={user.avatar_url} alt={user.login} className="w-10 h-10 rounded-full" />
          <span>{user.login}</span>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
