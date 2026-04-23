import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTracker } from '../features/tracker/TrackerContext';
import { LoadingScreen } from '../components/LoadingScreen';

export const TopicsPage = () => {
  const { topics, completedProblemIds, toggleProgress, isSavingProblemId, stats, isLoading, searchQuery } = useTracker();
  const location = useLocation();
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);

  // Handle topic selection from Dashboard
  useEffect(() => {
    const state = location.state as { selectedTopicId?: string };
    if (state?.selectedTopicId) {
      setExpandedTopicId(state.selectedTopicId);
    } else if (topics.length > 0 && !expandedTopicId) {
      setExpandedTopicId(topics[0].id);
    }
  }, [location.state, topics]);

  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return topics;

    const query = searchQuery.toLowerCase();
    return topics.filter(topic => {
      const topicMatch = topic.title.toLowerCase().includes(query);
      const problemMatch = topic.problems.some(p => p.title.toLowerCase().includes(query));
      return topicMatch || problemMatch;
    }).map(topic => ({
      ...topic,
      problems: topic.problems.filter(p => 
        p.title.toLowerCase().includes(query) || topic.title.toLowerCase().includes(query)
      )
    }));
  }, [topics, searchQuery]);

  // Auto-expand if searching
  useEffect(() => {
    if (searchQuery.trim() && filteredTopics.length > 0) {
      setExpandedTopicId(filteredTopics[0].id);
    }
  }, [searchQuery, filteredTopics]);

  if (isLoading) {
    return <LoadingScreen label="Loading topics..." />;
  }

  const solvedSet = new Set(completedProblemIds);

  return (
    <div className="flex flex-col gap-[24px]">
      {/* Page Header */}
      <header className="flex flex-col gap-1 mb-4">
        <p className="font-body-md text-body-md text-on-surface-variant">Select a chapter to begin</p>
      </header>

      {/* Accordion List */}
      <div className="flex flex-col gap-element-gap">
        {filteredTopics.map((topic) => {
          const isExpanded = expandedTopicId === topic.id;
          const topicStats = stats.chapterProgress[topic.id];
          
          const hasEasy = topic.problems.some(p => p.difficulty.toLowerCase() === 'easy');
          const hasMedium = topic.problems.some(p => p.difficulty.toLowerCase() === 'medium');
          const hasHard = topic.problems.some(p => p.difficulty.toLowerCase() === 'hard');

          return (
            <div key={topic.id} className={`border border-[#2a2a2a] rounded-DEFAULT overflow-hidden transition-all duration-150 ${isExpanded ? 'bg-surface' : 'bg-surface-container-low hover:border-outline-variant'}`}>
              {/* Chapter Header */}
              <div 
                className={`flex items-center justify-between p-4 cursor-pointer group ${isExpanded ? 'bg-surface-container border-b border-[#2a2a2a]' : ''}`}
                onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
              >
                <h2 className={`font-headline-md text-headline-md transition-colors duration-150 ${isExpanded ? 'text-on-background' : 'text-on-background group-hover:text-primary'}`}>
                  {topic.title}
                </h2>
                <div className="flex items-center gap-4">
                  <div className="flex gap-1">
                    {hasEasy && <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>}
                    {hasMedium && <div className="w-1.5 h-1.5 rounded-full bg-tertiary"></div>}
                    {hasHard && <div className="w-1.5 h-1.5 rounded-full bg-error"></div>}
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    {topicStats.solved}/{topicStats.total}
                  </span>
                  <span className={`material-symbols-outlined text-[20px] transition-transform duration-150 ${isExpanded ? 'rotate-180 text-on-background' : 'text-on-surface-variant'}`}>
                    expand_more
                  </span>
                </div>
              </div>

              {/* Problems Table Area */}
              {isExpanded && (
                <div className="bg-surface-container-lowest flex flex-col">
                  {/* Table Header */}
                  <div className="flex items-center h-[32px] px-4 border-b border-[#2a2a2a] gap-gutter text-on-surface-variant font-label-caps text-label-caps bg-surface">
                    <div className="w-4 shrink-0"></div>
                    <div className="flex-1">Problem</div>
                    <div className="w-24 shrink-0">Difficulty</div>
                    <div className="w-[112px] shrink-0 text-center">Resources</div>
                  </div>

                  {/* Problem Rows */}
                  {topic.problems.map((problem) => {
                    const isSolved = solvedSet.has(problem.id);
                    const isSaving = isSavingProblemId === problem.id;
                    const difficulty = problem.difficulty.toLowerCase();

                    return (
                      <div 
                        key={problem.id} 
                        className={`flex items-center h-[48px] px-4 border-b border-[#2a2a2a] hover:bg-surface-container-low transition-all duration-150 gap-gutter group ${isSolved ? 'bg-[#1a1a1a]/60 opacity-80' : ''}`}
                      >
                        {/* Checkbox */}
                        <button 
                          onClick={() => toggleProgress(problem.id, !isSolved)}
                          disabled={isSaving}
                          className={`w-4 h-4 rounded-DEFAULT border flex items-center justify-center shrink-0 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                            isSolved ? 'bg-primary border-primary' : 'border-[#2a2a2a] hover:border-primary'
                          }`}
                        >
                          {isSolved && <span className="material-symbols-outlined text-[12px] text-background font-bold">check</span>}
                          {isSaving && <div className="w-2 h-2 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>}
                        </button>

                        {/* Title */}
                        <div className={`flex-1 font-body-sm text-body-sm truncate transition-colors duration-150 ${
                          isSolved ? 'text-on-surface-variant line-through' : 'text-on-background group-hover:text-primary'
                        }`}>
                          {problem.title}
                        </div>

                        {/* Difficulty */}
                        <div className="w-24 shrink-0 flex items-center">
                          <span className={`border rounded-full px-2 py-0.5 font-badge text-badge ${
                            difficulty === 'easy' ? 'border-secondary text-secondary' :
                            difficulty === 'medium' ? 'border-tertiary text-tertiary' :
                            'border-error text-error'
                          } ${isSolved ? 'opacity-50' : ''}`}>
                            {problem.difficulty}
                          </span>
                        </div>

                        {/* Resources */}
                        <div className={`w-[112px] shrink-0 flex gap-element-gap items-center justify-center ${isSolved ? 'opacity-50' : ''}`}>
                          {problem.leetcodeLink && (
                            <a 
                              href={problem.leetcodeLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="w-icon-btn-size h-icon-btn-size rounded-DEFAULT border border-[#2a2a2a] flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-background hover:border-outline-variant transition-all duration-150"
                              title="LeetCode"
                            >
                              <span className="material-symbols-outlined text-[18px]">code</span>
                            </a>
                          )}
                          {problem.youtubeLink && (
                            <a 
                              href={problem.youtubeLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="w-icon-btn-size h-icon-btn-size rounded-DEFAULT border border-[#2a2a2a] flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-background hover:border-outline-variant transition-all duration-150"
                              title="Video Solution"
                            >
                              <span className="material-symbols-outlined text-[18px]">smart_display</span>
                            </a>
                          )}
                          {problem.articleLink && (
                            <a 
                              href={problem.articleLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="w-icon-btn-size h-icon-btn-size rounded-DEFAULT border border-[#2a2a2a] flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-background hover:border-outline-variant transition-all duration-150"
                              title="Article"
                            >
                              <span className="material-symbols-outlined text-[18px]">article</span>
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {filteredTopics.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-48px">search_off</span>
            <p>No problems or topics found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};
