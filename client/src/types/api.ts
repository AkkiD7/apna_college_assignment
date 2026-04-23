export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  youtubeLink: string;
  leetcodeLink: string;
  articleLink: string;
  order?: number;
}

export interface Topic {
  id: string;
  title: string;
  slug?: string;
  order?: number;
  problems: Problem[];
}

export interface User {
  id: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface MeResponse {
  user: User;
}

export interface ProgressResponse {
  completedProblemIds: string[];
}

export interface UpdateProgressPayload {
  problemId: string;
  completed: boolean;
}

