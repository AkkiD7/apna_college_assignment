import { apiRequest } from "../../utils/api-client";
import type { Topic } from "../../types/api";

export const fetchTopics = () =>
  apiRequest<Topic[]>("/topics", {
    method: "GET"
  });

