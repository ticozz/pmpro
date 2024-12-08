import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

const testimonials = [
  {
    content: "Managing our properties has never been easier. This platform streamlined our entire operation, from tenant screening to maintenance requests.",
    author: {
      name: 'Sarah Johnson',
      role: 'Property Manager',
      company: 'Urban Living Properties',
      image: '/testimonials/sarah.jpg',
    },
    rating: 5,
  },
  {
    content: "The financial reporting tools are exceptional. I can track everything from rent collection to maintenance expenses in real-time.",
    author: {
      name: 'Michael Chen',
      role: 'Real Estate Investor',
      company: 'MCR Holdings',
      image: '/testimonials/michael.jpg',
    },
    rating: 5,
  },
  {
    content: "The tenant portal has significantly improved our communication and reduced administrative work. Highly recommended!",
    author: {
      name: 'Emily Rodriguez',
      role: 'Operations Director',
      company: 'Sunset Properties',
      image: '/testimonials/emily.jpg',
    },
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-blue-600">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by Property Managers Worldwide
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex flex-col justify-between bg-white p-8 shadow-lg ring-1 ring-gray-900/5 rounded-lg">
                <div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="mt-6 text-lg leading-7 text-gray-600">
                    "{testimonial.content}"
                  </div>
                </div>
                <div className="mt-8 flex items-center gap-x-4">
                  <Image
                    className="h-12 w-12 rounded-full bg-gray-50 object-cover"
                    src={testimonial.author.image}
                    alt={testimonial.author.name}
                    width={48}
                    height={48}
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.author.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.author.role} at {testimonial.author.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 