export type Difficulty = "Easy" | "Medium" | "Hard";

export interface ProblemSeed {
  id: string;
  title: string;
  difficulty: Difficulty;
  youtubeLink: string;
  leetcodeLink: string;
  articleLink: string;
  order?: number;
}

export interface TopicSeed {
  slug: string;
  title: string;
  order: number;
  problems: ProblemSeed[];
}

export interface ProblemResponse {
  id: string;
  title: string;
  difficulty: Difficulty;
  youtubeLink: string;
  leetcodeLink: string;
  articleLink: string;
  order: number;
}

export interface TopicResponse {
  id: string;
  slug: string;
  title: string;
  order: number;
  problems: ProblemResponse[];
}

export interface AuthUser {
  id: string;
  email: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: AuthUser;
  token: string;
}

export interface UpdateProgressInput {
  problemId: string;
  completed: boolean;
}

export interface ProgressResponse {
  completedProblemIds: string[];
}

