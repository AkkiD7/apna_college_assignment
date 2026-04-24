import { apiRequest } from "../../utils/api-client";
import type { ProgressResponse, UpdateProgressPayload } from "../../types/api";

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
