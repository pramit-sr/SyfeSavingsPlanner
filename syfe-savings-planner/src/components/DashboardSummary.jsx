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

  const avgProgress =
    goals.length === 0
      ? 0
      : Math.round(
          goals.reduce((sum, g) => {
            const saved = g.contributions.reduce((cSum, c) => cSum + c.amount, 0);
            const progress = Math.min((saved / g.target) * 100, 100);
            return sum + progress;
          }, 0) / goals.length
        );

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl sm:text-3xl font-semibold flex items-center gap-2">
          🎯 Financial Overview
        </h2>
        <button
          onClick={onRefresh}
          className={`bg-white text-indigo-600 px-4 py-2 rounded-md font-medium transition-all
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-100'}`}
          disabled={isLoading}
        >
          {isLoading ? 'Refreshing...' : 'Refresh Rates'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
        <div className="space-y-1">
          <div className="text-sm opacity-80">Total Target</div>
          <div className="text-2xl font-bold">
            ₹{totalTargetInINR.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <div className="text-xs opacity-70">
            ${totalTargetInUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-sm opacity-80">Total Saved</div>
          <div className="text-2xl font-bold">
            ₹{totalSavedInINR.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <div className="text-xs opacity-70">
            ${totalSavedInUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-sm opacity-80">Overall Progress</div>
          <div className="text-2xl font-bold">{avgProgress}%</div>
          <div className="text-xs opacity-70">Completion avg.</div>
        </div>
      </div>

      <div className="mt-6 text-sm text-center sm:text-right opacity-90">
        Exchange Rate: 1 USD = ₹{exchangeRate.toFixed(2)} &nbsp;|&nbsp; Last updated:{' '}
        {lastUpdated || 'N/A'}
      </div>
    </div>
  );
};

export default DashboardSummary;
