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
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg space-y-4">
        <h3>Add Contribution</h3>
        <input type="number" placeholder="Amount" className="input" value={amount} onChange={e => setAmount(e.target.value)} />
        <input type="date" className="input" value={date} onChange={e => setDate(e.target.value)} />
        <div className="flex gap-2">
          <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
          <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddContributionModal;
