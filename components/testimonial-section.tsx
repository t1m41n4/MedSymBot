import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Regular Customer",
    content:
      "AfyaGo has been a lifesaver for me. The delivery is always on time, and their prices are better than my local pharmacy. The AI chatbot helped me find the right medication for my allergies!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Omondi",
    role: "Diabetic Patient",
    content:
      "As someone who needs regular medication, AfyaGo makes it so convenient. Their prescription refill service is seamless, and their customer service is exceptional.",
    rating: 5,
  },
  {
    id: 3,
    name: "Amina Hassan",
    role: "New Mother",
    content:
      "I've been using AfyaGo for all my baby's needs. Their baby care section is comprehensive, and the fast delivery means I never run out of essentials.",
    rating: 4,
  },
]

const TestimonialSection = () => {
  return (
    <section className="py-12 bg-gray-50 rounded-xl my-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
          <p className="mt-2 text-lg text-gray-600">Trusted by thousands of customers across Kenya</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">{testimonial.content}</p>
                <div className="flex items-center">
                  <div className="bg-teal-100 text-teal-800 rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection

