import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const contactInfo = {
  address: '123 Property Street, Suite 100, New York, NY 10001',
  phone: '+1 (555) 123-4567',
  email: 'contact@propertypro.com',
  hours: 'Monday - Friday: 9:00 AM - 6:00 PM',
};

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="flex items-start">
        <MapPin className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-900">Address</h3>
          <p className="mt-1 text-sm text-gray-600">{contactInfo.address}</p>
        </div>
      </div>

      <div className="flex items-start">
        <Phone className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-900">Phone</h3>
          <p className="mt-1 text-sm text-gray-600">{contactInfo.phone}</p>
        </div>
      </div>

      <div className="flex items-start">
        <Mail className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-900">Email</h3>
          <p className="mt-1 text-sm text-gray-600">{contactInfo.email}</p>
        </div>
      </div>

      <div className="flex items-start">
        <Clock className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-900">Business Hours</h3>
          <p className="mt-1 text-sm text-gray-600">{contactInfo.hours}</p>
        </div>
      </div>
    </div>
  );
} 