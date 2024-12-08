'use client';

import { PropertyEditForm } from './property-edit-form';
import { PropertyWithAddress } from '@/types/property';

interface Props {
  property: PropertyWithAddress;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function PropertyEditFormClient(props: Props) {
  return <PropertyEditForm {...props} />;
} 