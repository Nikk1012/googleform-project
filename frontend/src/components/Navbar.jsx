import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-700 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/dashboard" className="text-xl font-bold text-white">
          GformA
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="text-slate-300 hover:text-white text-sm">
            Dashboard
          </Link>
          <Link to="/history" className="text-slate-300 hover:text-white text-sm">
            History
          </Link>
          <Link to="/settings" className="text-slate-300 hover:text-white text-sm">
            Settings
          </Link>
          <span className="text-slate-400 text-sm">{user?.name}</span>
          <button
            onClick={handleLogout}
            className="bg-slate-700 hover:bg-slate-600 text-white text-sm px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;