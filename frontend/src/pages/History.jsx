import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import API from '../api/axios';

const History = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await API.get('/results');
        setResults(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/results/${id}`);
      setResults(results.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

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
        <h1 className="text-white text-2xl font-bold mb-6">History</h1>
        {results.length === 0 ? (
          <p className="text-slate-400">No results yet. Use the extension to save your first result.</p>
        ) : (
          <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 border-b border-slate-700">
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Scheme</th>
                  <th className="text-left p-4">Total</th>
                  <th className="text-left p-4">Correct</th>
                  <th className="text-left p-4">Wrong</th>
                  <th className="text-left p-4">Raw</th>
                  <th className="text-left p-4">Penalty</th>
                  <th className="text-left p-4">Final</th>
                  <th className="text-left p-4">Accuracy</th>
                  <th className="text-left p-4"></th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r._id} className="border-b border-slate-700/50 hover:bg-slate-800/50">
                    <td className="p-4 text-slate-300">
                      {new Date(r.takenAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="p-4">
                      <span className="bg-slate-700 text-slate-200 px-2 py-1 rounded text-xs">
                        {r.examScheme}
                      </span>
                    </td>
                    <td className="p-4 text-slate-300">{r.totalQuestions}</td>
                    <td className="p-4 text-emerald-400">{r.correct}</td>
                    <td className="p-4 text-red-400">{r.wrong}</td>
                    <td className="p-4 text-slate-300">{r.rawScore}</td>
                    <td className="p-4 text-red-400">-{r.penalty}</td>
                    <td className="p-4 text-white font-medium">{r.finalScore}</td>
                    <td className="p-4 text-emerald-400">{r.accuracy}%</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(r._id)}
                        className="text-red-400 hover:text-red-300 text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;