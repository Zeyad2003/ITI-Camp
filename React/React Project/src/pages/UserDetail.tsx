import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Mail, Phone, Globe, MapPin } from 'lucide-react';
import { User, Post, Todo } from '../types/api';
import { useTodos } from '../contexts/TodosContext';

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { completedTodos, toggleTodo } = useTodos();

  const { data: user, isLoading: userLoading } = useQuery<User>({
    queryKey: ['user', id],
    queryFn: async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      return response.json();
    },
  });

  const { data: posts, isLoading: postsLoading } = useQuery<Post[]>({
    queryKey: ['posts', id],
    queryFn: async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
      return response.json();
    },
  });

  const { data: todos, isLoading: todosLoading } = useQuery<Todo[]>({
    queryKey: ['todos', id],
    queryFn: async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`);
      return response.json();
    },
  });

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading user...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <p className="text-slate-600">User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="bg-slate-900 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
              <p className="text-slate-600 text-lg">@{user.username}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{user.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">{user.website}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{user.address.city}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Posts</h2>
            {postsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto"></div>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {posts?.map((post) => (
                  <div key={post.id} className="border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors">
                    <h3 className="font-semibold text-slate-900 mb-2 capitalize">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-600">{post.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">To-dos</h2>
            {todosLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto"></div>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {todos?.map((todo) => {
                  const isCompleted = completedTodos[todo.id] !== undefined
                    ? completedTodos[todo.id]
                    : todo.completed;

                  return (
                    <div
                      key={todo.id}
                      onClick={() => toggleTodo(todo.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        isCompleted
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-slate-50 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            isCompleted
                              ? 'bg-green-500 border-green-500'
                              : 'border-slate-300'
                          }`}
                        >
                          {isCompleted && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M5 13l4 4L19 7"></path>
                            </svg>
                          )}
                        </div>
                        <span
                          className={`text-sm ${
                            isCompleted
                              ? 'line-through text-green-700'
                              : 'text-slate-700'
                          }`}
                        >
                          {todo.title}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
