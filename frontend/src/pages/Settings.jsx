import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const schemes = ['CDS', 'UPSC Prelims', 'AFCAT', 'SSC CGL', 'NEET', 'Custom'];

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [defaultScheme, setDefaultScheme] = useState(
    localStorage.getItem('defaultScheme') || 'CDS'
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('defaultScheme', defaultScheme);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="text-white text-2xl font-bold mb-6">Settings</h1>

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-white font-semibold mb-4">Account</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400 text-sm">Name</span>
              <span className="text-white text-sm">{user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 text-sm">Email</span>
              <span className="text-white text-sm">{user?.email}</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-white font-semibold mb-4">Default Exam Scheme</h2>
          <select
            value={defaultScheme}
            onChange={(e) => setDefaultScheme(e.target.value)}
            className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
          >
            {schemes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button
            onClick={handleSave}
            className="mt-4 bg-blue-600 hover:bg-blue-500 text-white text-sm px-6 py-2 rounded-lg transition"
          >
            {saved ? 'Saved ✓' : 'Save Preference'}
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">Extension Token</h2>
          <p className="text-slate-400 text-sm mb-3">
            Copy your token and paste it in the GformA extension to sync results.
          </p>
          <div className="bg-slate-800 rounded-lg p-3 text-slate-300 text-xs break-all mb-3">
            {localStorage.getItem('token') || 'Login to see your token'}
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(localStorage.getItem('token') || '')}
            className="bg-slate-700 hover:bg-slate-600 text-white text-sm px-6 py-2 rounded-lg transition"
          >
            Copy Token
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/30 font-medium py-3 rounded-lg text-sm transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;