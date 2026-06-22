import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import ScoreTrendChart from '../components/ScoreTrendChart';
import RecentResults from '../components/RecentResults';
import API from '../api/axios';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, resultsRes] = await Promise.all([
          API.get('/results/stats'),
          API.get('/results'),
        ]);
        setStats(statsRes.data.data);
        setResults(resultsRes.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Navbar />
        <div className="flex items-center justify-center h-96 text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-white text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Tests" value={stats?.totalTests || 0} />
          <StatCard title="Average Score" value={stats?.averageScore || 0} />
          <StatCard title="Best Score" value={stats?.bestScore || 0} />
          <StatCard title="Avg Accuracy" value={stats?.averageAccuracy || 0} suffix="%" />
        </div>
        <div className="mb-8">
          <ScoreTrendChart results={results} />
        </div>
        <RecentResults results={results} />
      </div>
    </div>
  );
};

export default Dashboard;