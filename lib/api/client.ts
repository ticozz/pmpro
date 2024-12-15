interface ApiOptions extends RequestInit {
  skipOrganization?: boolean;
}

const api = {
  async fetch(endpoint: string, options: ApiOptions = {}) {
    const headers = {
      ...options.headers,
      "Content-Type": "application/json",
    };

    const response = await fetch(`/api/${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  },
};

export default api;
