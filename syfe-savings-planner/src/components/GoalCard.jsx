import React from 'react';

const GoalCard = ({ goal, exchangeRate, addContribution }) => {
  if (!goal || !exchangeRate) return null;

  const saved = goal.contributions.reduce((sum, c) => sum + c.amount, 0);
  const isGoalCompleted = saved >= goal.target;
  const progress = Math.min((saved / goal.target) * 100, 100);

  const converted = goal.currency === "USD"
    ? `₹${(goal.target * exchangeRate).toLocaleString()}`
    : `$${(goal.target / exchangeRate).toLocaleString()}`;

  // Remaining value, set to 0 if goal completed
  const remaining = Math.max(0, goal.target - saved);

  return (
    <div className="rounded-xl bg-white shadow-lg p-5 space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-md font-semibold">{goal.name}</h3>
        <span className="text-sm font-bold text-gray-400">{Math.round(progress)}%</span>
      </div>

      <p className="text-xl font-bold text-indigo-600">
        {goal.currency === "USD"
          ? `$${goal.target.toLocaleString()}`
          : `₹${goal.target.toLocaleString()}`}
      </p>

      <p className="text-xs text-gray-500">{converted}</p>

      <div className="text-sm text-gray-700">
        Progress: {goal.currency} {saved.toLocaleString()} saved
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="text-xs text-gray-500">
        {goal.contributions.length} contributions • {goal.currency} {remaining.toLocaleString()} remaining
      </div>

      {isGoalCompleted && (
        <div className="text-green-600 font-semibold text-sm mt-1">
          🎉 Goal Completed! Move on to your next goal!
        </div>
      )}

      <button
        className="w-full bg-white border border-indigo-400 text-indigo-600 rounded-md py-1 mt-2 hover:bg-indigo-50 disabled:opacity-50"
        onClick={() => {
          if (!isGoalCompleted) {
            addContribution(goal.id);
          } else {
            alert("✅ Goal already completed. Move on to your next goal!");
          }
        }}
        disabled={isGoalCompleted}
      >
        + Add Contribution
      </button>
    </div>
  );
};

export default GoalCard;
