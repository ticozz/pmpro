export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const user = sessionStorage.getItem('user');
  
  if (!user) {
    throw new Error('Not authenticated');
  }

  const headers = {
    'Content-Type': 'application/json',
    'x-user-data': user,
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    sessionStorage.removeItem('user');
    window.location.href = '/auth/login';
    throw new Error('Unauthorized');
  }

  return response;
} 