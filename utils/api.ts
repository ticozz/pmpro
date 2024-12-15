import { useOrganization } from "../contexts/OrganizationContext";

interface ApiOptions extends RequestInit {
  skipOrganization?: boolean;
}

const api = {
  async fetch(endpoint: string, options: ApiOptions = {}) {
    const { currentOrganization } = useOrganization();

    if (!options.skipOrganization && !currentOrganization?.id) {
      throw new Error("No organization selected");
    }

    const headers = {
      ...options.headers,
      "Content-Type": "application/json",
      ...(options.skipOrganization
        ? {}
        : {
            "X-Organization-ID": currentOrganization?.id,
          }),
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
