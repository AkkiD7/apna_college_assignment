const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

interface ApiRequestOptions extends Omit<RequestInit, "headers"> {
  token?: string;
  headers?: HeadersInit;
}

interface ErrorPayload {
  message?: string;
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const apiRequest = async <T>(path: string, options: ApiRequestOptions = {}): Promise<T> => {
  const { token, headers, ...requestOptions } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...requestOptions,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });

  const payload = (await response.json().catch(() => ({}))) as ErrorPayload | T;

  if (!response.ok) {
    const message =
      payload &&
      typeof payload === "object" &&
      "message" in payload &&
      typeof payload.message === "string"
        ? payload.message
        : "Request failed";
    throw new ApiError(message, response.status);
  }

  return payload as T;
};
