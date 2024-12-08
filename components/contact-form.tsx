'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      // Add your form submission logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
      setSuccess(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {success && (
        <div className="bg-green-50 text-green-800 p-4 rounded-md mb-6">
          Thank you for your message. We'll get back to you soon!
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          {...register('name')}
        />
        <Input
          type="email"
          {...register('email')}
        />
      </div>

      <Input
        type="tel"
        {...register('phone')}
      />

      <Input
        {...register('subject')}
      />

      <Textarea
        {...register('message')}
      />

      <Button
        type="submit"
        className="w-full"
        isLoading={isSubmitting}
      >
        Send Message
      </Button>
    </form>
  );
} 