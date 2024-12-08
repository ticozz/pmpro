import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

const variants = {
  default: 'bg-blue-50 text-blue-800',
  error: 'bg-red-50 text-red-800',
  warning: 'bg-yellow-50 text-yellow-800',
  success: 'bg-green-50 text-green-800',
};

const icons = {
  default: Info,
  error: XCircle,
  warning: AlertCircle,
  success: CheckCircle,
};

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variants;
  title?: string;
}

export function Alert({
  className,
  variant = 'default',
  title,
  children,
  ...props
}: AlertProps) {
  const Icon = icons[variant];

  return (
    <div
      className={cn(
        'rounded-md p-4',
        variants[variant],
        className
      )}
      {...props}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className="h-5 w-5" />
        </div>
        <div className="ml-3">
          {title && (
            <h3 className="text-sm font-medium">{title}</h3>
          )}
          {children && (
            <div className="text-sm mt-1">{children}</div>
          )}
        </div>
      </div>
    </div>
  );
} 