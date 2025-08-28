"use client";

import { Star } from "lucide-react";

export default function DriverRatings() {
  const reviews = [
    {
      id: "1",
      customerName: "John Doe",
      rating: 5,
      comment: "Pengalaman yang luar biasa, driver sangat ramah dan perjalanan nyaman.",
      date: "2024-09-18",
    },
    {
      id: "2",
      customerName: "Jane Smith",
      rating: 4,
      comment: "Perjalanan lancar, hanya saja ada sedikit keterlambatan.",
      date: "2024-09-17",
    },
    {
      id: "3",
      customerName: "Alice Johnson",
      rating: 3,
      comment: "Cukup baik, tapi mobilnya sedikit berisik.",
      date: "2024-09-16",
    },
  ];

  function StarRating({ rating }: { rating: number }) {
    return (
      <div className="flex">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${index < rating ? "text-yellow-500" : "text-gray-300"}`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Ulasan & Rating</h2>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center">
                  {review.customerName[0]}
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-800">{review.customerName}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <span>{review.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <StarRating rating={review.rating} />
              </div>
            </div>

            <div className="mt-2 text-sm text-gray-700">{review.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
