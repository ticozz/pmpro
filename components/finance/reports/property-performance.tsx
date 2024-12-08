'use client';
import React from 'react';
import { Card } from '@/components/ui/card';
import { Selectui, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, TrendingDown, Building2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface PropertyMetrics {
  id: string;
  name: string;
  units: number;
  occupancyRate: number;
  revenue: number;
  expenses: number;
  noi: number;
  capRate: number;
  roi: number;
  delinquencyRate: number;
  maintenanceCosts: number;
  yearOverYearGrowth: number;
}

interface PropertyPerformanceProps {
  period: string;
  properties: PropertyMetrics[];
}

export function PropertyPerformance({ period, properties }: PropertyPerformanceProps) {
  const portfolioTotals = {
    units: properties.reduce((sum, p) => sum + p.units, 0),
    revenue: properties.reduce((sum, p) => sum + p.revenue, 0),
    expenses: properties.reduce((sum, p) => sum + p.expenses, 0),
    noi: properties.reduce((sum, p) => sum + p.noi, 0),
    maintenanceCosts: properties.reduce((sum, p) => sum + p.maintenanceCosts, 0),
  };

  const averages = {
    occupancyRate: properties.reduce((sum, p) => sum + p.occupancyRate, 0) / properties.length,
    capRate: properties.reduce((sum, p) => sum + p.capRate, 0) / properties.length,
    roi: properties.reduce((sum, p) => sum + p.roi, 0) / properties.length,
    delinquencyRate: properties.reduce((sum, p) => sum + p.delinquencyRate, 0) / properties.length,
    yearOverYearGrowth: properties.reduce((sum, p) => sum + p.yearOverYearGrowth, 0) / properties.length,
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold">Property Performance</h2>
            <p className="text-sm text-gray-500">{period}</p>
          </div>
          <div className="flex gap-2">
            <Selectui>
              <SelectTrigger>
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { label: 'Last Month', value: 'last-month' },
                  { label: 'Last Quarter', value: 'last-quarter' },
                  { label: 'Year to Date', value: 'ytd' },
                  { label: 'Last Year', value: 'last-year' },
                ].map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Selectui>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-600">Total Units</h3>
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <p className="mt-2 text-2xl font-semibold">{portfolioTotals.units}</p>
              <p className="mt-1 text-sm text-gray-500">
                Avg. Occupancy {(averages.occupancyRate * 100).toFixed(1)}%
              </p>
            </div>
          </Card>

          <Card>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-600">Total NOI</h3>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <p className="mt-2 text-2xl font-semibold">
                {formatCurrency(portfolioTotals.noi)}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                YoY Growth {(averages.yearOverYearGrowth * 100).toFixed(1)}%
              </p>
            </div>
          </Card>

          <Card>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-600">Avg. Cap Rate</h3>
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <p className="mt-2 text-2xl font-semibold">
                {(averages.capRate * 100).toFixed(1)}%
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Avg. ROI {(averages.roi * 100).toFixed(1)}%
              </p>
            </div>
          </Card>

          <Card>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-600">Delinquency Rate</h3>
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
              <p className="mt-2 text-2xl font-semibold">
                {(averages.delinquencyRate * 100).toFixed(1)}%
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Portfolio-wide average
              </p>
            </div>
          </Card>
        </div>

        {/* Property List */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Property</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Units</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Occupancy</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Revenue</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">NOI</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Cap Rate</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">YoY Growth</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.id} className="border-b border-gray-200">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {property.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-right text-gray-600">
                    {property.units}
                  </td>
                  <td className="px-4 py-4 text-sm text-right text-gray-600">
                    {(property.occupancyRate * 100).toFixed(1)}%
                  </td>
                  <td className="px-4 py-4 text-sm text-right text-gray-600">
                    {formatCurrency(property.revenue)}
                  </td>
                  <td className="px-4 py-4 text-sm text-right text-gray-600">
                    {formatCurrency(property.noi)}
                  </td>
                  <td className="px-4 py-4 text-sm text-right text-gray-600">
                    {(property.capRate * 100).toFixed(1)}%
                  </td>
                  <td className={`px-4 py-4 text-sm text-right ${
                    property.yearOverYearGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {(property.yearOverYearGrowth * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
} 