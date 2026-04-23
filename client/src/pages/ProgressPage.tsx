import React from 'react';
import { useTracker } from '../features/tracker/TrackerContext';
import { LoadingScreen } from '../components/LoadingScreen';

export const ProgressPage = () => {
  const { stats, topics, isLoading } = useTracker();

  if (isLoading) {
    return <LoadingScreen label="Loading progress report..." />;
  }

  const easyPercent = stats.easy.total > 0 ? Math.round((stats.easy.solved / stats.easy.total) * 100) : 0;
  const mediumPercent = stats.medium.total > 0 ? Math.round((stats.medium.solved / stats.medium.total) * 100) : 0;
  const hardPercent = stats.hard.total > 0 ? Math.round((stats.hard.solved / stats.hard.total) * 100) : 0;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="font-headline-lg text-headline-lg text-on-surface">Progress Report</h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Overview of your problem-solving journey.</p>
      </header>

      {/* Row 1: Stat Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {/* Easy */}
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-6 border-t-2 border-t-secondary flex flex-col justify-between h-[160px]">
          <div className="flex items-center gap-2 text-secondary">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span className="font-label-caps text-label-caps uppercase tracking-wider">Easy</span>
          </div>
          <div>
            <div className="text-[48px] leading-none font-bold text-on-surface tracking-tight">{easyPercent}%</div>
            <div className="font-body-sm text-body-sm text-on-surface-variant mt-2">{stats.easy.solved} / {stats.easy.total} solved</div>
          </div>
        </div>
        {/* Medium */}
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-6 border-t-2 border-t-tertiary flex flex-col justify-between h-[160px]">
          <div className="flex items-center gap-2 text-tertiary">
            <span className="material-symbols-outlined text-[18px]">adjust</span>
            <span className="font-label-caps text-label-caps uppercase tracking-wider">Medium</span>
          </div>
          <div>
            <div className="text-[48px] leading-none font-bold text-on-surface tracking-tight">{mediumPercent}%</div>
            <div className="font-body-sm text-body-sm text-on-surface-variant mt-2">{stats.medium.solved} / {stats.medium.total} solved</div>
          </div>
        </div>
        {/* Hard */}
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-6 border-t-2 border-t-error flex flex-col justify-between h-[160px]">
          <div className="flex items-center gap-2 text-error">
            <span className="material-symbols-outlined text-[18px]">warning</span>
            <span className="font-label-caps text-label-caps uppercase tracking-wider">Hard</span>
          </div>
          <div>
            <div className="text-[48px] leading-none font-bold text-on-surface tracking-tight">{hardPercent}%</div>
            <div className="font-body-sm text-body-sm text-on-surface-variant mt-2">{stats.hard.solved} / {stats.hard.total} solved</div>
          </div>
        </div>
      </section>

      {/* Row 2: Progress Bars */}
      <section className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-6">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Completion by Difficulty</h2>
        <div className="flex flex-col gap-5">
          {/* Easy Bar */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Easy</span>
              <span className="font-badge text-badge text-on-surface">{stats.easy.solved}/{stats.easy.total}</span>
            </div>
            <div className="w-full h-[10px] bg-[#1e1e1e] rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full transition-all duration-500" style={{ width: `${easyPercent}%` }}></div>
            </div>
          </div>
          {/* Medium Bar */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Medium</span>
              <span className="font-badge text-badge text-on-surface">{stats.medium.solved}/{stats.medium.total}</span>
            </div>
            <div className="w-full h-[10px] bg-[#1e1e1e] rounded-full overflow-hidden">
              <div className="h-full bg-tertiary rounded-full transition-all duration-500" style={{ width: `${mediumPercent}%` }}></div>
            </div>
          </div>
          {/* Hard Bar */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Hard</span>
              <span className="font-badge text-badge text-on-surface">{stats.hard.solved}/{stats.hard.total}</span>
            </div>
            <div className="w-full h-[10px] bg-[#1e1e1e] rounded-full overflow-hidden">
              <div className="h-full bg-error rounded-full transition-all duration-500" style={{ width: `${hardPercent}%` }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Row 3: Chapter-wise Breakdown Table */}
      <section className="bg-[#111111] border border-[#2a2a2a] rounded-lg overflow-hidden">
        <div className="p-6 border-b border-[#2a2a2a]">
          <h2 className="font-headline-md text-headline-md text-on-surface">Chapter-wise Breakdown</h2>
        </div>
        <div className="w-full overflow-x-auto">
          {/* Table Header */}
          <div className="grid grid-cols-[2fr_1.5fr_1fr_1.5fr] gap-4 px-6 py-3 border-b border-[#2a2a2a] bg-[#0a0a0a] min-w-[600px]">
            <div className="font-label-caps text-label-caps text-on-surface-variant">Chapter</div>
            <div className="font-label-caps text-label-caps text-on-surface-variant">E / M / H</div>
            <div className="font-label-caps text-label-caps text-on-surface-variant text-right">Solved</div>
            <div className="font-label-caps text-label-caps text-on-surface-variant">Progress</div>
          </div>
          {/* Table Rows */}
          <div className="flex flex-col min-w-[600px]">
            {topics.map((topic) => {
              const topicStats = stats.chapterProgress[topic.id];
              const percent = topicStats.total > 0 ? Math.round((topicStats.solved / topicStats.total) * 100) : 0;
              
              const easy = topic.problems.filter(p => p.difficulty.toLowerCase() === 'easy').length;
              const medium = topic.problems.filter(p => p.difficulty.toLowerCase() === 'medium').length;
              const hard = topic.problems.filter(p => p.difficulty.toLowerCase() === 'hard').length;

              return (
                <div key={topic.id} className="grid grid-cols-[2fr_1.5fr_1fr_1.5fr] gap-4 px-6 py-4 border-b border-[#2a2a2a] items-center hover:bg-[#161616] transition-colors duration-150 last:border-0">
                  <div className="font-body-sm text-body-sm font-medium text-on-surface">{topic.title}</div>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 rounded font-badge text-badge border border-secondary text-secondary">{easy}</span>
                    <span className="px-2 py-0.5 rounded font-badge text-badge border border-tertiary text-tertiary">{medium}</span>
                    <span className="px-2 py-0.5 rounded font-badge text-badge border border-error text-error">{hard}</span>
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface text-right">{topicStats.solved} / {topicStats.total}</div>
                  <div className="flex items-center gap-3">
                    <div className="w-full h-[6px] bg-[#1e1e1e] rounded-full overflow-hidden flex-1">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${percent}%` }}></div>
                    </div>
                    <span className="font-badge text-badge text-on-surface-variant w-[3ch]">{percent}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
