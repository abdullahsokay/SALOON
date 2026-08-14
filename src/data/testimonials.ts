// Illustrative placeholder quotes — NOT real client testimonials. Replace
// with actual reviews (name + quote, optionally a photo) once the client
// provides them. Google shows 1,213 real reviews at a 4.3 average; pulling a
// handful of verbatim ones (with permission) would be the ideal source.
export type Testimonial = {
  quote: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Best bridal makeup experience in Islamabad. The team understood exactly what I wanted for my Walima look.",
    role: "Bridal Client",
  },
  {
    quote:
      "Professional staff, clean studio, and my hair has never looked better. Highly recommend the keratin treatment.",
    role: "Regular Client",
  },
  {
    quote:
      "They came outstation for my sister's wedding and the whole family's makeup was flawless. Worth every penny.",
    role: "Wedding Guest",
  },
  {
    quote:
      "Loved my manicure and facial combo — relaxing environment and friendly staff throughout.",
    role: "Walk-in Client",
  },
];
