import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import GoalForm from './components/GoalForm';
import GoalCard from './components/GoalCard';
import AddContributionModal from './components/AddContributionModal';
import DashboardSummary from './components/DashboardSummary';

const App = () => {
  const [goals, setGoals] = useState([]);
  const [modalGoalId, setModalGoalId] = useState(null);

  // Load from cookie on first mount
  useEffect(() => {
    const saved = Cookies.get('syfe_goals');
    if (saved) {
      setGoals(JSON.parse(saved));
    }
  }, []);

  // Save to cookie when goals change
  useEffect(() => {
    Cookies.set('syfe_goals', JSON.stringify(goals), { expires: 7 });
  }, [goals]);

  const addGoal = (goal) => {
    setGoals(prev => [...prev, goal]);
  };

  const addContribution = (goalId, contribution) => {
    setGoals(prev =>
      prev.map(goal =>
        goal.id === goalId
          ? { ...goal, contributions: [...goal.contributions, contribution] }
          : goal
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f8ff] to-[#e0edff]">
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold text-center">𖣠 Syfe Savings Planner</h1>

        {/* Dashboard Summary */}
        <DashboardSummary goals={goals} />

        {/* Goal Creation */}
        <GoalForm addGoal={addGoal} />

        {/* Goal Cards */}
        <h2 className="text-xl font-semibold mt-4">🎯 Your Goals</h2>
        {goals.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">
            No goals yet. Click <strong>+ Add Goal</strong> to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {goals.map(goal => (
              <GoalCard
                key={goal.id}
                goal={goal}
                addContribution={(id) => setModalGoalId(id)}
              />
            ))}
          </div>
        )}

        {/* Add Contribution Modal */}
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
};

export default App;
