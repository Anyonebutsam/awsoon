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

const Testimonials = () => {
  const { t } = useTranslation();
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  
  // Believable testimonials from medium-small businesses
  const testimonials = [
    {
      name: "Erik Johansson",
      title: "Owner",
      company: "Stockholm Dental Clinic",
      content: "AWSOON's expertise in Google Business Profile optimization helped our dental practice achieve 45% more visibility in local searches. Patients now find us easily when searching for dentists in our area.",
      avatar: "EJ",
      rating: 5,
    },
    {
      name: "Dimitar Georgiev",
      title: "Managing Director",
      company: "Sofia Auto Service",
      content: "Working with AWSOON transformed our online presence. Our local search rankings improved significantly, leading to a 60% increase in new customers finding us through Google Maps.",
      avatar: "DG",
      rating: 5,
    },
    {
      name: "Sophie Martin",
      title: "Owner",
      company: "Lyon Patisserie & Café",
      content: "The team at AWSOON optimized our bakery's online presence beautifully. Their attention to detail and understanding of local SEO delivered measurable results within weeks.",
      avatar: "SM",
      rating: 5,
    },
    {
      name: "Carlos Fernández",
      title: "General Manager",
      company: "Barcelona Fitness Studio",
      content: "AWSOON's reputation management services helped us respond to customer reviews professionally. Our gym's Google rating went from 3.8 to 4.7 stars in just 4 months.",
      avatar: "CF",
      rating: 5,
    },
    {
      name: "Fatima Al-Hassan",
      title: "Founder",
      company: "Tunis Beauty Salon",
      content: "Their Arabic language expertise and understanding of our market gave us a competitive edge. Our salon's Google visibility in Tunisia increased dramatically.",
      avatar: "FA",
      rating: 5,
    },
    {
      name: "Petra Nilsson",
      title: "Co-Owner",
      company: "Malmö Pet Care Center",
      content: "AWSOON's data-driven approach to local SEO helped us stand out in our city. The ROI from their services exceeded our expectations - we're fully booked now!",
      avatar: "PN",
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
