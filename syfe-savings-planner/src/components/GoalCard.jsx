import React, { useState } from 'react';

const GoalCard = ({ goal, exchangeRate, addContribution, onDelete }) => {
  const [showHistory, setShowHistory] = useState(false);

  if (!goal || !exchangeRate) return null;

  const saved = goal.contributions.reduce((sum, c) => sum + c.amount, 0);
  const isGoalCompleted = saved >= goal.target;
  const progress = Math.min((saved / goal.target) * 100, 100);

  const converted =
    goal.currency === 'USD'
      ? `₹${(goal.target * exchangeRate).toLocaleString()}`
      : `$${(goal.target / exchangeRate).toLocaleString()}`;

  const remaining = Math.max(0, goal.target - saved);

  return (
    <div className="rounded-xl bg-white shadow-md p-5 sm:p-6 space-y-3 sm:space-y-4 w-full max-w-md mx-auto transition">
      <div className="flex justify-between items-center">
        <h3 className="text-base sm:text-lg font-semibold">{goal.name}</h3>
        <span className="text-sm font-bold text-gray-400">{Math.round(progress)}%</span>
      </div>

      <p className="text-xl sm:text-2xl font-bold text-indigo-600">
        {goal.currency === 'USD'
          ? `$${goal.target.toLocaleString()}`
          : `₹${goal.target.toLocaleString()}`}
      </p>

      <p className="text-xs sm:text-sm text-gray-500">{converted}</p>

      <div className="text-sm text-gray-700">
        Progress: {goal.currency} {saved.toLocaleString()} saved
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="text-xs text-gray-500">
        {goal.contributions.length} contributions • {goal.currency}{' '}
        {remaining.toLocaleString()} remaining
      </div>

      {isGoalCompleted && (
        <div className="text-green-600 font-semibold text-sm mt-1">
          🎉 Goal Completed! Move on to your next goal!
        </div>
      )}

      <button
        className="w-full bg-white border border-indigo-400 text-indigo-600 rounded-md py-2 text-sm hover:bg-indigo-50 transition disabled:opacity-50"
        onClick={() => {
          if (!isGoalCompleted) {
            addContribution(goal.id);
          } else {
            alert('✅ Goal already completed. Move on to your next goal!');
          }
        }}
        disabled={isGoalCompleted}
      >
        + Add Contribution
      </button>

      {/* View History & Delete */}
      <div className="flex flex-col sm:flex-row gap-2 mt-2">
        <button
          onClick={() => setShowHistory((prev) => !prev)}
          className="flex-1 border border-gray-300 text-gray-600 text-sm rounded-md py-2 hover:bg-indigo-50 hover:text-indigo-600 transition"
        >
          {showHistory ? 'Hide History' : '📜 View History'}
        </button>

        <button
          onClick={() => {
            if (window.confirm(`Delete goal "${goal.name}"?`)) {
              onDelete(goal.id);
            }
          }}
          className="flex-1 bg-red-50 text-red-600 border border-red-300 text-sm rounded-md py-2 hover:bg-red-100 transition"
        >
          🗑️ Delete
        </button>
      </div>

      {/* History List */}
      {showHistory && goal.contributions.length > 0 && (
        <ul className="mt-2 text-sm text-gray-700 space-y-1">
          {goal.contributions.map((c, idx) => (
            <li
              key={idx}
              className="flex justify-between border-b pb-1 text-sm sm:text-base"
            >
              <span>
                {goal.currency} {c.amount}
              </span>
              <span className="text-xs text-gray-500">
                {c.date ? new Date(c.date).toLocaleDateString() : 'No Date'}
              </span>
            </li>
          ))}
        </ul>
      )}

      {showHistory && goal.contributions.length === 0 && (
        <p className="text-sm text-gray-500 mt-1">No contributions yet.</p>
      )}
    </div>
  );
};

export default GoalCard;
