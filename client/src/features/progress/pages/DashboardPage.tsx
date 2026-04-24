import { useNavigate } from 'react-router-dom';
import { useProgress } from '../ProgressContext';
import { LoadingScreen } from '../../../components/LoadingScreen';
import { ErrorState } from '../../../components/ErrorState';

export const DashboardPage = () => {
  const { stats, topics, isLoading, errorMessage } = useProgress();
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
  const easyPercent = stats.easy.total > 0 ? Math.round((stats.easy.solved / stats.easy.total) * 100) : 0;
  const mediumPercent = stats.medium.total > 0 ? Math.round((stats.medium.solved / stats.medium.total) * 100) : 0;
  const hardPercent = stats.hard.total > 0 ? Math.round((stats.hard.solved / stats.hard.total) * 100) : 0;
  const difficultyProgress = [
    { label: 'Easy', value: easyPercent, tone: 'text-secondary' },
    { label: 'Medium', value: mediumPercent, tone: 'text-tertiary' },
    { label: 'Hard', value: hardPercent, tone: 'text-error' }
  ];

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <section className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-6 flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">DSA Sheet Progress</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Resume your practice from the topic-wise problem list.
          </p>
        </div>

        <div className="flex items-end gap-3">
          <span className="text-[56px] leading-none font-bold text-on-surface">{stats.solved}</span>
          <span className="font-body-md text-body-md text-on-surface-variant mb-2">/ {stats.total} problems solved</span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="font-body-sm text-body-sm text-on-surface-variant">Overall progress</span>
            <span className="font-body-sm text-body-sm text-indigo-400">{overallProgressPercent}%</span>
          </div>
          <div className="w-full h-[8px] bg-[#1e1e1e] rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${overallProgressPercent}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {difficultyProgress.map((item) => (
            <div key={item.label} className="rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] px-4 py-3">
              <div className="font-body-sm text-body-sm text-on-surface-variant">{item.label}</div>
              <div className={`font-headline-md text-headline-md ${item.tone}`}>{item.value}%</div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => navigate('/topics')}
          className="w-fit bg-primary text-on-primary border border-transparent rounded-lg px-5 py-2.5 font-body-md text-body-md font-medium hover:bg-primary-fixed hover:border-primary-fixed-dim transition-all duration-150 active:scale-[0.98]"
        >
          Continue Practice
        </button>
      </section>

      <section className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-6 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h2 className="font-headline-md text-on-surface">Available Topics</h2>
          <span className="font-body-sm text-body-sm text-on-surface-variant">{topics.length} topics</span>
        </div>
        <div className="w-full h-[6px] bg-[#1e1e1e] rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${overallProgressPercent}%` }}
          ></div>
        </div>
      </section>
    </div>
  );
};
