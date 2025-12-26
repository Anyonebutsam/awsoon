import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const Testimonials = () => {
  const { t } = useTranslation();
  
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="card-hover bg-card border-border/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;