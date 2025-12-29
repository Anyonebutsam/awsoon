import { MapPin, Search, Megaphone, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

// Google Brand Colors
const GoogleBlue = "#4285F4";
const GoogleRed = "#EA4335";
const GoogleYellow = "#FBBC05";
const GoogleGreen = "#34A853";

const Services = () => {
  const { t } = useTranslation();
  
  const services = [
    {
      icon: MapPin,
      titleKey: "services.gbp.title",
      descriptionKey: "services.gbp.description",
      features: ["Profile Optimization", "Review Management", "Weekly Posts", "Photo Updates"],
      color: GoogleBlue, // Google Blue for Maps/GBP
    },
    {
      icon: Search,
      titleKey: "services.localSeo.title",
      descriptionKey: "services.localSeo.description",
      features: ["Citation Building", "NAP Consistency", "Maps Optimization", "Local Keywords"],
      color: GoogleGreen, // Google Green for SEO/Growth
    },
    {
      icon: Megaphone,
      titleKey: "services.digitalMarketing.title",
      descriptionKey: "services.digitalMarketing.description",
      features: ["SEO Strategy", "Social Media", "Paid Ads", "Content Marketing"],
      color: GoogleRed, // Google Red for Marketing/Ads
    },
    {
      icon: Users,
      titleKey: "services.reputation.title",
      descriptionKey: "services.reputation.description",
      features: ["Review Generation", "Response Templates", "Sentiment Analysis", "Brand Monitoring"],
      color: GoogleYellow, // Google Yellow for Reputation/Stars
    },
  ];

  return (
    <section id="services" className="section-padding bg-muted/50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
            {t('services.label')}
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card
              key={service.titleKey}
              className="card-hover bg-card border-border/50 overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <service.icon className="w-7 h-7" style={{ color: service.color }} />
                </div>
                <CardTitle className="font-display text-xl">{t(service.titleKey)}</CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {t(service.descriptionKey)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-accent text-accent-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
