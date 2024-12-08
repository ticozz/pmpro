import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function requireAuth() {
  const headersList = headers();
  const userData = headersList.get('x-user-data');

  if (!userData) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    return JSON.parse(userData);
  } catch {
    return NextResponse.json({ error: 'Invalid user data' }, { status: 401 });
  }
}

export function signOut() {
  // Keep a copy of the sidebar state
  const sidebarState = localStorage.getItem('sidebarExpanded');
  
  // Clear session storage
  sessionStorage.clear();
  
  // Clear local storage except sidebar state
  localStorage.clear();
  
  // Restore sidebar state
  if (sidebarState) {
    localStorage.setItem('sidebarExpanded', sidebarState);
  } else {
    localStorage.setItem('sidebarExpanded', 'true');
  }
}