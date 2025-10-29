import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';
import { User } from '../types/api';

export default function UserPostsCard() {
  const navigate = useNavigate();

  const { data: users, isLoading, error } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      return response.json();
    },
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-slate-900 p-3 rounded-lg">
          <Users className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Users & Posts</h2>
      </div>

      <p className="text-slate-600 mb-4">
        Browse users and view their posts and to-dos
      </p>

      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          Error loading users
        </div>
      )}

      {users && (
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => navigate(`/users/${user.id}`)}
              className="w-full text-left p-4 border border-slate-200 rounded-lg hover:border-slate-900 hover:bg-slate-50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 group-hover:bg-slate-900 text-slate-900 group-hover:text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{user.name}</p>
                  <p className="text-sm text-slate-600">{user.email}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
