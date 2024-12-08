export interface PropertyWithAddress {
  id: string;
  name: string;
  type: string;
  status: string;
  managerId: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  } | null;
  manager: {
    firstName: string;
    lastName: string;
  } | null;
  _count?: {
    units: number;
  };
  createdAt: Date;
  updatedAt: Date;
}