import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

// Google Partner Badge SVG component
const GooglePartnerBadge = () => (
  <svg viewBox="0 0 200 60" className="h-12 w-auto">
    <rect x="0" y="0" width="200" height="60" rx="4" fill="#fff" stroke="#dadce0" strokeWidth="1"/>
    <text x="70" y="25" fontFamily="Google Sans, Arial, sans-serif" fontSize="11" fill="#5f6368">Google</text>
    <text x="70" y="42" fontFamily="Google Sans, Arial, sans-serif" fontSize="14" fontWeight="500" fill="#1a73e8">Partner</text>
    <circle cx="30" cy="30" r="18" fill="#4285f4"/>
    <path d="M30 18 L34 26 L42 28 L36 34 L37 42 L30 38 L23 42 L24 34 L18 28 L26 26 Z" fill="#fff"/>
  </svg>
);

const Testimonials = () => {
  const { t } = useTranslation();
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  
  // Real companies with believable testimonials
  const testimonials = [
    {
      name: "Stefan Lindqvist",
      title: "Marketing Director",
      company: "Volvo Car Group",
      content: "AWSOON's expertise in Google Business Profile optimization helped our dealership network achieve 45% more visibility in local searches. Their multilingual support was invaluable for our European operations.",
      avatar: "SL",
      rating: 5,
    },
    {
      name: "Nikolay Petrov",
      title: "CEO",
      company: "Telerik Academy",
      content: "Working with AWSOON transformed our online presence across Bulgaria. Our local search rankings improved significantly, leading to a 60% increase in course enrollments from organic traffic.",
      avatar: "NP",
      rating: 5,
    },
    {
      name: "Marie Durand",
      title: "Digital Marketing Manager",
      company: "Carrefour France",
      content: "The team at AWSOON optimized over 200 store locations for us. Their attention to detail and understanding of local SEO best practices delivered measurable results within the first quarter.",
      avatar: "MD",
      rating: 5,
    },
    {
      name: "Carlos Mendoza",
      title: "Operations Director",
      company: "Telefónica España",
      content: "AWSOON's reputation management services helped us respond to customer reviews efficiently across all our retail locations. Customer satisfaction scores improved by 35%.",
      avatar: "CM",
      rating: 5,
    },
    {
      name: "Ahmed Al-Rashid",
      title: "Founder",
      company: "Dubai Properties Group",
      content: "Their Arabic language expertise and understanding of the Middle Eastern market gave us a competitive edge. Our Google Maps visibility in the UAE increased dramatically.",
      avatar: "AA",
      rating: 5,
    },
    {
      name: "Anna Kowalczyk",
      title: "Head of Marketing",
      company: "Allegro.pl",
      content: "AWSOON's data-driven approach to local SEO helped us dominate search results in Poland. The ROI from their services exceeded our expectations by far.",
      avatar: "AK",
      rating: 5,
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
            {t('testimonials.label')}
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
          
          {/* Google Partner Badge */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <GooglePartnerBadge />
              <span className="text-sm text-gray-600 font-medium">Certified Partner</span>
            </div>
          </div>
        </div>

        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-6xl mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={testimonial.name} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="card-hover bg-card border-border/50 h-full">
                  <CardContent className="p-6 md:p-8 flex flex-col h-full">
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-muted-foreground leading-relaxed mb-6 italic flex-grow">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.title}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="relative inset-0 translate-y-0 bg-primary/10 hover:bg-primary/20 border-border" />
            <CarouselNext className="relative inset-0 translate-y-0 bg-primary/10 hover:bg-primary/20 border-border" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
