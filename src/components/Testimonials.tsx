import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
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
  
  const testimonials = [
    {
      name: "Erik Johansson",
      title: "CEO",
      company: "Nordic Solutions AB",
      content: "AWSOON transformed our online presence completely. Our Google visibility increased by 300% in just 3 months. The team's attention to detail and multilingual support made working across markets seamless.",
      avatar: "EJ",
      rating: 5,
    },
    {
      name: "Maria Petrova",
      title: "Marketing Director",
      company: "BG Tech Industries",
      content: "The combination of Swedish precision and Bulgarian pricing is unbeatable. Our local SEO rankings improved dramatically, and we're now the top result for our key search terms.",
      avatar: "MP",
      rating: 5,
    },
    {
      name: "Antoine Dubois",
      title: "Owner",
      company: "Paris Bistro Chain",
      content: "Working with AWSOON was a game-changer for our restaurant chain. Their multilingual team helped us optimize all 5 locations across different countries. Highly recommended!",
      avatar: "AD",
      rating: 5,
    },
    {
      name: "Sofia García",
      title: "Marketing Manager",
      company: "Barcelona Retail Group",
      content: "Incredible results! Our Google Business Profile went from barely visible to dominating local search. The team understood our needs perfectly and delivered beyond expectations.",
      avatar: "SG",
      rating: 5,
    },
    {
      name: "Ahmed Hassan",
      title: "Founder",
      company: "Cairo Digital Agency",
      content: "Their Arabic language support was exceptional. They understood the nuances of our market and helped us reach customers we never could before. Professional and reliable.",
      avatar: "AH",
      rating: 5,
    },
    {
      name: "Lina Bergström",
      title: "Operations Director",
      company: "Stockholm Consulting",
      content: "From day one, AWSOON demonstrated professionalism and expertise. Our online reputation has never been better, and the ROI has been outstanding.",
      avatar: "LB",
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
