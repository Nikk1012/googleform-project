const StatCard = ({ title, value, suffix = '' }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <p className="text-slate-400 text-sm mb-2">{title}</p>
      <p className="text-white text-3xl font-bold">
        {value}<span className="text-slate-400 text-lg ml-1">{suffix}</span>
      </p>
    </div>
  );
};

export default StatCard;
