import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await API.post('/auth/login', form);
      login(res.data.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-white text-2xl font-bold mb-2">Welcome back</h1>
        <p className="text-slate-400 text-sm mb-6">Login to your GformA account</p>
        {error && <p className="text-red-400 text-sm mb-4 bg-red-400/10 p-3 rounded-lg">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-slate-300 text-sm block mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="text-slate-300 text-sm block mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-lg text-sm transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-slate-400 text-sm mt-6 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-400 hover:text-blue-300">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;