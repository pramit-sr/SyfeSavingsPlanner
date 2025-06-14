import React from 'react';

const DashboardSummary = ({
  goals = [],
  exchangeRate = 1,
  lastUpdated = '',
  onRefresh,
  isLoading = false,
}) => {
  const totalTargetInUSD = goals.reduce((sum, g) => {
    return sum + (g.currency === 'INR' ? g.target / exchangeRate : g.target);
  }, 0);

  const totalSavedInUSD = goals.reduce((sum, g) => {
    const saved = g.contributions.reduce((cSum, c) => cSum + c.amount, 0);
    return sum + (g.currency === 'INR' ? saved / exchangeRate : saved);
  }, 0);

  const totalTargetInINR = totalTargetInUSD * exchangeRate;
  const totalSavedInINR = totalSavedInUSD * exchangeRate;

  const avgProgress = goals.length === 0
    ? 0
    : Math.round(
        goals.reduce((sum, g) => {
          const saved = g.contributions.reduce((cSum, c) => cSum + c.amount, 0);
          const progress = Math.min((saved / g.target) * 100, 100);
          return sum + progress;
        }, 0) / goals.length
      );

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-6 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">🎯 Financial Overview</h2>
        <button
          onClick={onRefresh}
          className={`bg-white text-indigo-600 px-3 py-1 rounded-md font-medium 
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-100'}`}
          disabled={isLoading}
        >
          {isLoading ? 'Refreshing...' : 'Refresh Rates'}
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-sm">Total Target</div>
          <div className="text-xl font-bold">
            ₹{totalTargetInINR.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <div className="text-xs opacity-70">
            ${totalTargetInUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
        </div>
        <div>
          <div className="text-sm">Total Saved</div>
          <div className="text-xl font-bold">
            ₹{totalSavedInINR.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <div className="text-xs opacity-70">
            ${totalSavedInUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
        </div>
        <div>
          <div className="text-sm">Overall Progress</div>
          <div className="text-xl font-bold">{avgProgress}%</div>
          <div className="text-xs opacity-70">Completion avg.</div>
        </div>
      </div>

      <div className="mt-4 text-sm">
        Exchange Rate: 1 USD = ₹{exchangeRate.toFixed(2)} &nbsp; | &nbsp; Last updated: {lastUpdated || 'N/A'}
      </div>
    </div>
  );
};

export default DashboardSummary;
