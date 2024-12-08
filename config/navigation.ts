import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  Wrench,
  BarChart3,
  Settings,
  HelpCircle,
} from 'lucide-react';

export const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Properties', href: '/properties', icon: Building2 },
  { name: 'Tenants', href: '/tenants', icon: Users },
  { name: 'Leases', href: '/leases', icon: FileText },
  { name: 'Maintenance', href: '/maintenance', icon: Wrench },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help', href: '/help', icon: HelpCircle },
];

export const authRoutes = {
  signIn: '/auth/login',
  signUp: '/auth/register',
  forgotPassword: '/auth/forgot-password'
} 