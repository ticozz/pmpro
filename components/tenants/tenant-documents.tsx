"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { FileUpload } from "@/components/ui/file-upload";
import { 
  Selectui as Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { fetchWithRetry } from "@/lib/api-client";

interface Document {
  id: string;
  title: string;
  type: string;
  fileUrl: string;
  createdAt: string;
}

interface TenantDocumentsProps {
  tenantId: string;
  documents: Document[];
  onUpload?: () => void;
}

export function TenantDocuments({ tenantId, documents, onUpload }: TenantDocumentsProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("type", type);

      const response = await fetchWithRetry(
        `/api/tenants/${tenantId}/documents`,
        {
          method: "POST",
          body: formData,
        },
        { maxRetries: 3 }
      );

      if (!response.ok) throw new Error("Failed to upload document");

      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });

      setTitle("");
      setType("");
      setFile(null);
      onUpload?.();
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload document",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Document</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Document Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Document Type</Label>
              <Select onValueChange={setType} value={type}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LEASE">Lease</SelectItem>
                  <SelectItem value="IDENTIFICATION">Identification</SelectItem>
                  <SelectItem value="INCOME">Income Verification</SelectItem>
                  <SelectItem value="REFERENCE">Reference</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>File</Label>
              <FileUpload
                url={`/api/tenants/${tenantId}/documents`}
                onSuccess={() => {
                  setFile(null);
                  setTitle("");
                  setType("");
                }}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
            </div>

            <Button type="submit" disabled={isUploading || !file}>
              {isUploading ? "Uploading..." : "Upload Document"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{doc.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-x-2">
                  <a 
                    href={doc.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                  >
                    View
                  </a>
                </div>
              </div>
            ))}
            {documents.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No documents found
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 