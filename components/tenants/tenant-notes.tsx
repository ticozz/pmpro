"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { formatDistanceToNow } from "date-fns";

interface Note {
  id: string;
  content: string;
  createdAt: string;
  createdBy: {
    firstName: string;
    lastName: string;
  };
}

interface TenantNotesProps {
  tenantId: string;
  notes: Note[];
  onAddNote?: () => void;
}

export function TenantNotes({ tenantId, notes = [], onAddNote }: TenantNotesProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/tenants/${tenantId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) throw new Error("Failed to add note");

      toast({
        title: "Success",
        description: "Note added successfully",
      });

      setContent("");
      onAddNote?.();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add note",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Add a note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px]"
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Note"}
          </Button>
        </form>

        <div className="mt-6 space-y-4">
          {notes?.map((note) => (
            <div key={note.id} className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">
                {note.createdBy.firstName} {note.createdBy.lastName} •{" "}
                {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
              </p>
              <p className="whitespace-pre-wrap">{note.content}</p>
            </div>
          ))}
          {(!notes || notes.length === 0) && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No notes yet
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 