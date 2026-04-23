import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTracker } from '../features/tracker/TrackerContext';
import { LoadingScreen } from '../components/LoadingScreen';
import { ErrorState } from '../components/ErrorState';

export const DashboardPage = () => {
  const { stats, topics, isLoading, errorMessage } = useTracker();
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingScreen label="Loading your dashboard..." />;
  }

  if (errorMessage && topics.length === 0) {
    return (
      <ErrorState
        title="Could not load the dashboard"
        description={errorMessage}
      />
    );
  }

  const overallProgressPercent = stats.total > 0 ? Math.round((stats.solved / stats.total) * 100) : 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Row 1: Stat Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {/* Total Card */}
        <div className="bg-[#111111] border border-[#2a2a2a] border-l-4 border-l-indigo-500 rounded-lg p-5 flex flex-col gap-2">
          <span className="text-on-surface-variant font-body-sm uppercase tracking-wider">Total Solved</span>
          <div className="flex items-end gap-2">
            <span className="font-headline-lg text-on-surface">{stats.solved}</span>
            <span className="text-on-surface-variant font-body-md mb-1">/ {stats.total}</span>
          </div>
        </div>
        {/* Easy Card */}
        <div className="bg-[#111111] border border-[#2a2a2a] border-l-4 border-l-secondary rounded-lg p-5 flex flex-col gap-2">
          <span className="text-on-surface-variant font-body-sm uppercase tracking-wider">Easy Solved</span>
          <div className="flex items-end gap-2">
            <span className="font-headline-lg text-on-surface">{stats.easy.solved}</span>
            <span className="text-on-surface-variant font-body-md mb-1">/ {stats.easy.total}</span>
          </div>
        </div>
        {/* Hard Card */}
        <div className="bg-[#111111] border border-[#2a2a2a] border-l-4 border-l-error rounded-lg p-5 flex flex-col gap-2">
          <span className="text-on-surface-variant font-body-sm uppercase tracking-wider">Hard Solved</span>
          <div className="flex items-end gap-2">
            <span className="font-headline-lg text-on-surface">{stats.hard.solved}</span>
            <span className="text-on-surface-variant font-body-md mb-1">/ {stats.hard.total}</span>
          </div>
        </div>
      </section>

      {/* Row 2: Overall Progress */}
      <section className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-6 flex flex-col gap-4 mt-2">
        <div className="flex justify-between items-center w-full">
          <h2 className="font-headline-md text-on-surface">Overall Progress</h2>
          <span className="font-headline-md text-indigo-500">{overallProgressPercent}%</span>
        </div>
        <div className="w-full h-[8px] bg-[#1e1e1e] rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${overallProgressPercent}%` }}
          ></div>
        </div>
      </section>

      {/* Row 3: Chapters Grid */}
      <section className="mt-4">
        <h2 className="font-headline-md text-on-surface mb-4">Chapters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {topics.map((topic) => {
            const topicStats = stats.chapterProgress[topic.id];
            const percent = topicStats.total > 0 ? Math.round((topicStats.solved / topicStats.total) * 100) : 0;
            
            // Check difficulty presence for indicator dots
            const hasEasy = topic.problems.some(p => p.difficulty.toLowerCase() === 'easy');
            const hasMedium = topic.problems.some(p => p.difficulty.toLowerCase() === 'medium');
            const hasHard = topic.problems.some(p => p.difficulty.toLowerCase() === 'hard');

            return (
              <div
                key={topic.id}
                onClick={() => navigate('/topics', { state: { selectedTopicId: topic.id } })}
                className="bg-[#111111] border border-[#2a2a2a] hover:border-indigo-500 hover:bg-[#161616] rounded-lg p-5 transition-all duration-150 group cursor-pointer flex flex-col gap-4"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-headline-md text-on-surface group-hover:text-indigo-400 transition-colors">
                    {topic.title}
                  </h3>
                  <div className="flex gap-1">
                    {hasEasy && <span className="w-2 h-2 rounded-full bg-secondary"></span>}
                    {hasMedium && <span className="w-2 h-2 rounded-full bg-tertiary"></span>}
                    {hasHard && <span className="w-2 h-2 rounded-full bg-error"></span>}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-on-surface-variant font-body-sm">{topicStats.solved}/{topicStats.total} solved</span>
                    <span className="text-on-surface-variant font-body-sm">{percent}%</span>
                  </div>
                  <div className="w-full h-[4px] bg-[#1e1e1e] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
