import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  Wrench,
  BarChart3,
  Settings,
  HelpCircle,
  Wallet,
  BanknoteIcon,
  BarChart4,
} from "lucide-react";

interface NavigationItem {
  name: string;
  href: string;
  icon: any;
  submenu?: NavigationSubItem[];
}

interface NavigationSubItem {
  name: string;
  href: string;
}

export const navigation: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Properties",
    href: "/properties",
    icon: Building2,
  },
  {
    name: "Tenants",
    href: "/tenants",
    icon: Users,
  },
  {
    name: "Leases",
    href: "/leases",
    icon: FileText,
  },
  {
    name: "Maintenance",
    href: "/maintenance",
    icon: Wrench,
  },
  {
    name: "Accounting",
    href: "#",
    icon: Wallet,
    submenu: [
      {
        name: "Bank Accounts",
        href: "/accounting/bank-accounts",
      },
      {
        name: "Chart of Accounts",
        href: "/accounting/chart-of-accounts",
      },
    ],
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart4,
  },
];

export const authRoutes = {
  signIn: "/auth/login",
  signUp: "/auth/register",
  forgotPassword: "/auth/forgot-password",
};
