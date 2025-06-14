import React, { useState } from 'react';

const AddContributionModal = ({ goalId, onSave, onClose }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSave = () => {
    if (!amount || amount <= 0 || !date) return alert("Invalid input");
    onSave(goalId, { amount: Number(amount), date });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center px-4 z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg space-y-4">
        <h3 className="text-lg font-semibold text-center">Add Contribution</h3>

        <input
          type="number"
          placeholder="Amount"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        <input
          type="date"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={date}
          onChange={e => setDate(e.target.value)}
        />

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContributionModal;
