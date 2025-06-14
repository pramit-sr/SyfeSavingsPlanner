import React, { useState } from 'react';

const GoalForm = ({ addGoal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [currency, setCurrency] = useState('INR');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || target <= 0) return alert("Enter valid inputs.");

    addGoal({
      id: Date.now(),
      name,
      target: Number(target),
      currency,
      contributions: [],
    });

    setName('');
    setTarget('');
    setCurrency('INR');
    setIsOpen(false);
  };

  return (
    <div className="text-right">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold px-5 py-2 rounded-lg shadow hover:shadow-md hover:from-blue-600 transition"
      >
        + Add Goal
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl transition"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Goal</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Goal Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                type="number"
                placeholder="Target Amount"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={target}
                onChange={e => setTarget(e.target.value)}
              />
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={currency}
                onChange={e => setCurrency(e.target.value)}
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
              </select>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition shadow"
              >
                Save Goal
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalForm;
