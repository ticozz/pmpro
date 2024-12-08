import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Download } from 'lucide-react';

interface DocumentListProps {
  property: {
    documents?: Array<{
      id: string;
      title: string;
      type: DocumentType;
      createdAt: string;
    }>;
  };
}

const documentTypes = {
  LEASE: 'Lease Agreement',
  INVOICE: 'Invoice',
  MAINTENANCE: 'Maintenance Report',
  INSPECTION: 'Inspection Report',
  INSURANCE: 'Insurance Document',
  LEGAL: 'Legal Document',
  OTHER: 'Other',
} as const;

type DocumentType = keyof typeof documentTypes;

export function DocumentList({ property }: DocumentListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Documents</h2>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="space-y-4">
        {property.documents?.map((document: any) => (
          <Card key={document.id}>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{document.title}</h3>
                    <p className="text-sm text-gray-500">
                      {documentTypes[document.type as DocumentType]}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {new Date(document.createdAt).toLocaleDateString()}
                  </span>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 