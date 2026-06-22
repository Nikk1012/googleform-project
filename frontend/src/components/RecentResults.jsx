const RecentResults = ({ results }) => {
  if (results.length === 0) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-white font-semibold mb-4">Recent Results</h2>
        <p className="text-slate-400 text-sm">No results yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h2 className="text-white font-semibold mb-4">Recent Results</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 border-b border-slate-700">
              <th className="text-left pb-3">Date</th>
              <th className="text-left pb-3">Scheme</th>
              <th className="text-left pb-3">Score</th>
              <th className="text-left pb-3">Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {results.slice(0, 5).map((r) => (
              <tr key={r._id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                <td className="py-3 text-slate-300">
                  {new Date(r.takenAt).toLocaleDateString('en-IN')}
                </td>
                <td className="py-3">
                  <span className="bg-slate-700 text-slate-200 px-2 py-1 rounded text-xs">
                    {r.examScheme}
                  </span>
                </td>
                <td className="py-3 text-white font-medium">{r.finalScore.toFixed(2)}</td>
                <td className="py-3 text-emerald-400">{r.accuracy.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentResults;