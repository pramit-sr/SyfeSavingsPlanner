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

    // Reset form and close modal
    setName('');
    setTarget('');
    setCurrency('INR');
    setIsOpen(false);
  };

  return (
    <div className="text-right">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700"
      >
        + Add Goal
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-4">Create New Goal</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Goal Name"
                className="w-full border rounded px-3 py-2"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                type="number"
                placeholder="Target Amount"
                className="w-full border rounded px-3 py-2"
                value={target}
                onChange={e => setTarget(e.target.value)}
              />
              <select
                className="w-full border rounded px-3 py-2"
                value={currency}
                onChange={e => setCurrency(e.target.value)}
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
              </select>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
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
