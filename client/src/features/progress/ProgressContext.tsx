import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { fetchTopics } from '../topics/topics-api';
import { fetchProgress, updateProgressRequest } from './progress-api';
import type { Topic } from '../../types/api';

interface ProgressContextValue {
  topics: Topic[];
  completedProblemIds: string[];
  isLoading: boolean;
  errorMessage: string;
  isSavingProblemId: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toggleProgress: (problemId: string, completed: boolean) => Promise<void>;
  stats: {
    total: number;
    solved: number;
    easy: { total: number; solved: number };
    medium: { total: number; solved: number };
    hard: { total: number; solved: number };
    chapterProgress: Record<string, { total: number; solved: number }>;
  };
}

export const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [completedProblemIds, setCompletedProblemIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSavingProblemId, setIsSavingProblemId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = async () => {
    if (!token) return;
    setIsLoading(true);
    setErrorMessage('');
    try {
      const [topicsRes, progressRes] = await Promise.all([
        fetchTopics(),
        fetchProgress(token),
      ]);
      setTopics(topicsRes);
      setCompletedProblemIds(progressRes.completedProblemIds);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to load progress data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, [token]);

  const toggleProgress = async (problemId: string, completed: boolean) => {
    if (!token) return;

    const previousIds = completedProblemIds;
    const nextIds = completed
      ? [...new Set([...completedProblemIds, problemId])]
      : completedProblemIds.filter((id) => id !== problemId);

    setCompletedProblemIds(nextIds);
    setIsSavingProblemId(problemId);

    try {
      const response = await updateProgressRequest({
        token,
        problemId,
        completed,
      });
      setCompletedProblemIds(response.completedProblemIds);
    } catch (err) {
      setCompletedProblemIds(previousIds);
      setErrorMessage(err instanceof Error ? err.message : 'Failed to update progress');
    } finally {
      setIsSavingProblemId('');
    }
  };

  const stats = useMemo(() => {
    const allProblems = topics.flatMap((t) => t.problems);
    const activeProblemIds = new Set(allProblems.map((problem) => problem.id));
    const solvedSet = new Set(completedProblemIds.filter((id) => activeProblemIds.has(id)));

    const initial = {
      total: allProblems.length,
      solved: solvedSet.size,
      easy: { total: 0, solved: 0 },
      medium: { total: 0, solved: 0 },
      hard: { total: 0, solved: 0 },
      chapterProgress: {} as Record<string, { total: number; solved: number }>,
    };

    return topics.reduce((acc, topic) => {
      const topicSolved = topic.problems.filter((p) => solvedSet.has(p.id)).length;
      acc.chapterProgress[topic.id] = {
        total: topic.problems.length,
        solved: topicSolved,
      };

      topic.problems.forEach((p) => {
        const diff = p.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard';
        if (acc[diff]) {
          acc[diff].total++;
          if (solvedSet.has(p.id)) {
            acc[diff].solved++;
          }
        }
      });

      return acc;
    }, initial);
  }, [topics, completedProblemIds]);

  return (
    <ProgressContext.Provider
      value={{
        topics,
        completedProblemIds,
        isLoading,
        errorMessage,
        isSavingProblemId,
        searchQuery,
        setSearchQuery,
        toggleProgress,
        stats,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
};
