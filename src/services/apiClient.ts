const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

export async function apiRequest<TResponse>(
  path: string,
  options: RequestInit = {},
): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    let message = `API request failed with status ${response.status}`;

    try {
      const errorBody = (await response.json()) as { error?: string };
      if (errorBody.error) {
        message = errorBody.error;
      }
    } catch {
      // Keep the status-based message when the API does not return JSON.
    }

    throw new Error(message);
  }

  return response.json() as Promise<TResponse>;
}
