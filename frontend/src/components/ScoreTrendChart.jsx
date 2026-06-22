import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';

const ScoreTrendChart = ({ results }) => {
  const data = results
    .slice()
    .reverse()
    .slice(-15)
    .map((r) => ({
      date: new Date(r.takenAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      score: parseFloat(r.finalScore.toFixed(2)),
      accuracy: parseFloat(r.accuracy.toFixed(2)),
    }));

  if (data.length === 0) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 flex items-center justify-center h-64">
        <p className="text-slate-400">No data yet. Save your first result from the extension.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h2 className="text-white font-semibold mb-4">Score Trend</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 12 }} />
          <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
            labelStyle={{ color: '#94a3b8' }}
            itemStyle={{ color: '#38bdf8' }}
          />
          <Line type="monotone" dataKey="score" stroke="#38bdf8" strokeWidth={2} dot={{ r: 4 }} name="Final Score" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreTrendChart;