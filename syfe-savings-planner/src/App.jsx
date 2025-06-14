import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import GoalForm from './components/GoalForm';
import GoalCard from './components/GoalCard';
import AddContributionModal from './components/AddContributionModal';
import DashboardSummary from './components/DashboardSummary';
import { fetchExchangeRate } from './services/exchangeRate';

function App() {
  const [goals, setGoals] = useState([]);
  const [modalGoalId, setModalGoalId] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(80);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const savedGoals = Cookies.get('syfe_goals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }

    loadRate();
  }, []);

  useEffect(() => {
    Cookies.set('syfe_goals', JSON.stringify(goals), { expires: 7 });
  }, [goals]);

  const loadRate = async () => {
    try {
      const data = await fetchExchangeRate();
      setExchangeRate(data.rate);
      setLastUpdated(data.time);
    } catch (err) {
      alert("Failed to fetch exchange rate.");
    }
  };

  const addGoal = (goal) => setGoals(prev => [...prev, goal]);

  const addContribution = (goalId, contribution) => {
    setGoals(prev => prev.map(goal =>
      goal.id === goalId
        ? { ...goal, contributions: [...goal.contributions, contribution] }
        : goal
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f8ff] to-[#e0edff]">
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold text-center">💰 Syfe Savings Planner</h1>

        <div className="overflow-hidden w-full bg-white py-2 rounded-md shadow-inner">
          <p className="scroll-horizontal text-sm text-gray-700 px-4">
            Exchange Rate (USD to INR): {exchangeRate} | Last updated: {lastUpdated || 'N/A'}
          </p>
        </div>

        {/* ✅ Pass props here */}
        <DashboardSummary
          goals={goals}
          exchangeRate={exchangeRate}
          lastUpdated={lastUpdated}
        />

        <GoalForm addGoal={addGoal} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {goals.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              exchangeRate={exchangeRate}
              addContribution={setModalGoalId}
            />
          ))}
        </div>

        {modalGoalId && (
          <AddContributionModal
            goalId={modalGoalId}
            onSave={addContribution}
            onClose={() => setModalGoalId(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
