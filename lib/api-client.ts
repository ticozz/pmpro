type RequestConfig = {
  maxRetries?: number;
  retryDelay?: number;
};

export async function fetchWithRetry(
  url: string,
  options?: RequestInit,
  config: RequestConfig = {}
) {
  const { maxRetries = 3, retryDelay = 1000 } = config;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Request failed");
      }
      return response;
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, retryDelay * Math.pow(2, attempt))
        );
      }
    }
  }

  throw lastError;
}
