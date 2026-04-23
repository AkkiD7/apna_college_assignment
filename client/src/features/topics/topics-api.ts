import { apiRequest } from "../../services/api";
import type { ProgressResponse, Topic, UpdateProgressPayload } from "../../types/api";

export const fetchTopics = () =>
  apiRequest<Topic[]>("/topics", {
    method: "GET"
  });

export const fetchProgress = (token: string) =>
  apiRequest<ProgressResponse>("/progress", {
    method: "GET",
    token
  });

export const updateProgressRequest = ({
  token,
  problemId,
  completed
}: UpdateProgressPayload & { token: string }) =>
  apiRequest<ProgressResponse>("/progress", {
    method: "POST",
    token,
    body: JSON.stringify({
      problemId,
      completed
    })
  });

